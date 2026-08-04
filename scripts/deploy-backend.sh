#!/usr/bin/env bash

set -Eeuo pipefail

NAS_USER="rsime"
NAS_HOST="192.168.3.31"
NAS_PORT="223"

NAS_APP_DIR="/volume1/homes/rsime/apps/netix/app"
NAS_JAR_NAME="netix-backend.jar"

CONTAINER_NAME="netix-backend"
HEALTH_URL="http://127.0.0.1:8081/actuator/health"

SCRIPT_DIR="$(
    cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
    pwd
)"

PROJECT_DIR="$(
    cd -- "${SCRIPT_DIR}/.."
    pwd
)"

BACKEND_DIR="${PROJECT_DIR}/netix-backend"
TARGET_DIR="${BACKEND_DIR}/target"

MODE="${1:---dry-run}"
DEPLOY_STAMP="$(date '+%Y%m%d-%H%M%S')"

if [[ ! -f "${BACKEND_DIR}/pom.xml" ]]; then
    echo "CHYBA: Nebyl nalezen projekt netix-backend."
    echo "Očekávaný soubor: ${BACKEND_DIR}/pom.xml"
    exit 1
fi

if [[ ! -x "${BACKEND_DIR}/mvnw" ]]; then
    echo "CHYBA: Nebyl nalezen spustitelný Maven Wrapper."
    echo "Očekávaný soubor: ${BACKEND_DIR}/mvnw"
    exit 1
fi

case "${MODE}" in
    --dry-run)
        echo "ZKUŠEBNÍ REŽIM: backend se sestaví,"
        echo "ale na NASu se nic nezmění."
        RSYNC_DRY_RUN_ARGS=(--dry-run)
        ;;

    --deploy)
        echo "OSTRÉ NASAZENÍ backendu NETIX na NAS."
        RSYNC_DRY_RUN_ARGS=()
        ;;

    *)
        echo "Použití:"
        echo "  ./scripts/deploy-backend.sh --dry-run"
        echo "  ./scripts/deploy-backend.sh --deploy"
        exit 1
        ;;
esac

command -v rsync >/dev/null 2>&1 || {
    echo "CHYBA: Příkaz rsync není nainstalovaný."
    exit 1
}

command -v ssh >/dev/null 2>&1 || {
    echo "CHYBA: Příkaz ssh není nainstalovaný."
    exit 1
}

echo
echo "Sestavuji Spring Boot backend..."
echo

(
    cd -- "${BACKEND_DIR}"
    ./mvnw clean package -DskipTests
)

mapfile -t JAR_FILES < <(
    find "${TARGET_DIR}" \
        -maxdepth 1 \
        -type f \
        -name 'netix-backend-*.jar' \
        ! -name '*-sources.jar' \
        ! -name '*-javadoc.jar' \
        | sort
)

if [[ "${#JAR_FILES[@]}" -ne 1 ]]; then
    echo "CHYBA: Nebyl nalezen právě jeden výsledný JAR."
    echo "Nalezené soubory:"

    if [[ "${#JAR_FILES[@]}" -eq 0 ]]; then
        echo "  žádné"
    else
        printf '  %s\n' "${JAR_FILES[@]}"
    fi

    exit 1
fi

JAR_FILE="${JAR_FILES[0]}"
REMOTE_NEW_FILE="${NAS_APP_DIR}/${NAS_JAR_NAME}.new"

echo
echo "JAR:  ${JAR_FILE}"
echo "Cíl:  ${NAS_USER}@${NAS_HOST}:${REMOTE_NEW_FILE}"
echo

echo "Kontroluji cílový adresář a kontejner..."

ssh \
    -p "${NAS_PORT}" \
    "${NAS_USER}@${NAS_HOST}" \
    bash -s -- \
    "${NAS_APP_DIR}" \
    "${CONTAINER_NAME}" <<'REMOTE_CHECK'
set -Eeuo pipefail

PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"
export PATH

nas_app_dir="$1"
container_name="$2"

find_docker() {
    local detected=""

    detected="$(command -v docker 2>/dev/null || true)"

    if [[ -n "${detected}" && -x "${detected}" ]]; then
        printf '%s\n' "${detected}"
        return
    fi

    local candidate

    for candidate in \
        /usr/local/bin/docker \
        /var/packages/ContainerManager/target/usr/bin/docker \
        /var/packages/Docker/target/usr/bin/docker
    do
        if [[ -x "${candidate}" ]]; then
            printf '%s\n' "${candidate}"
            return
        fi
    done

    return 1
}

DOCKER_BIN="$(find_docker || true)"

if [[ -z "${DOCKER_BIN}" ]]; then
    echo "CHYBA: Příkaz docker nebyl na NASu nalezen."
    echo "PATH=${PATH}"
    exit 1
fi

echo "Docker: ${DOCKER_BIN}"

if [[ ! -d "${nas_app_dir}" ]]; then
    echo "CHYBA: Na NASu neexistuje adresář:"
    echo "  ${nas_app_dir}"
    exit 1
fi

if ! "${DOCKER_BIN}" inspect "${container_name}" >/dev/null; then
    echo "CHYBA: Kontejner nelze načíst:"
    echo "  ${container_name}"
    exit 1
fi

echo "Kontejner nalezen: ${container_name}"
REMOTE_CHECK

echo
echo "Nahrávám nový JAR pod dočasným názvem..."
echo

rsync \
    -avzh \
    --itemize-changes \
    --no-perms \
    --no-owner \
    --no-group \
    "${RSYNC_DRY_RUN_ARGS[@]}" \
    -e "ssh -p ${NAS_PORT}" \
    "${JAR_FILE}" \
    "${NAS_USER}@${NAS_HOST}:${REMOTE_NEW_FILE}"

if [[ "${MODE}" == "--dry-run" ]]; then
    echo
    echo "Kontrola dokončena. Na NASu se nic nezměnilo."
    echo "Pro skutečné nasazení použijte:"
    echo "  ./scripts/deploy-backend.sh --deploy"
    exit 0
fi

echo
echo "Aktivuji nový backend..."
echo

ssh \
    -p "${NAS_PORT}" \
    "${NAS_USER}@${NAS_HOST}" \
    bash -s -- \
    "${NAS_APP_DIR}" \
    "${NAS_JAR_NAME}" \
    "${CONTAINER_NAME}" \
    "${HEALTH_URL}" \
    "${DEPLOY_STAMP}" <<'REMOTE_DEPLOY'
set -Eeuo pipefail

PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"
export PATH

nas_app_dir="$1"
jar_name="$2"
container_name="$3"
health_url="$4"
deploy_stamp="$5"

find_docker() {
    local detected=""

    detected="$(command -v docker 2>/dev/null || true)"

    if [[ -n "${detected}" && -x "${detected}" ]]; then
        printf '%s\n' "${detected}"
        return
    fi

    local candidate

    for candidate in \
        /usr/local/bin/docker \
        /var/packages/ContainerManager/target/usr/bin/docker \
        /var/packages/Docker/target/usr/bin/docker
    do
        if [[ -x "${candidate}" ]]; then
            printf '%s\n' "${candidate}"
            return
        fi
    done

    return 1
}

DOCKER_BIN="$(find_docker || true)"

if [[ -z "${DOCKER_BIN}" ]]; then
    echo "CHYBA: Příkaz docker nebyl na NASu nalezen."
    exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
    echo "CHYBA: Příkaz curl nebyl na NASu nalezen."
    exit 1
fi

current_jar="${nas_app_dir}/${jar_name}"
new_jar="${current_jar}.new"
backup_jar="${current_jar}.bak-${deploy_stamp}"

if [[ ! -s "${new_jar}" ]]; then
    echo "CHYBA: Nový JAR neexistuje nebo je prázdný:"
    echo "  ${new_jar}"
    exit 1
fi

if [[ ! -s "${current_jar}" ]]; then
    echo "CHYBA: Původní JAR neexistuje nebo je prázdný:"
    echo "  ${current_jar}"
    exit 1
fi

if ! "${DOCKER_BIN}" inspect "${container_name}" >/dev/null; then
    echo "CHYBA: Kontejner nelze načíst:"
    echo "  ${container_name}"
    exit 1
fi

echo "Vytvářím zálohu:"
echo "  ${backup_jar}"

cp -p -- "${current_jar}" "${backup_jar}"

rollback_required=0

rollback() {
    local exit_code=$?

    if [[ "${rollback_required}" -eq 1 ]]; then
        echo
        echo "Nasazení selhalo. Obnovuji původní backend..."

        "${DOCKER_BIN}" stop \
            "${container_name}" >/dev/null 2>&1 || true

        cp -p -- "${backup_jar}" "${current_jar}"

        "${DOCKER_BIN}" start \
            "${container_name}" >/dev/null

        echo "Původní backend byl obnoven."
    fi

    exit "${exit_code}"
}

trap rollback EXIT

echo "Zastavuji kontejner ${container_name}..."

"${DOCKER_BIN}" stop \
    "${container_name}" >/dev/null

rollback_required=1

mv -- "${new_jar}" "${current_jar}"

echo "Spouštím kontejner ${container_name}..."

"${DOCKER_BIN}" start \
    "${container_name}" >/dev/null

echo "Čekám na spuštění backendu..."

for ((attempt = 1; attempt <= 20; attempt++)); do
    response="$(
        curl \
            --fail \
            --silent \
            --show-error \
            "${health_url}" 2>/dev/null ||
        true
    )"

    if printf '%s' "${response}" |
        grep -q '"status"[[:space:]]*:[[:space:]]*"UP"'
    then
        rollback_required=0
        trap - EXIT

        echo
        echo "Backend je spuštěný:"
        echo "  ${response}"
        echo
        echo "Záloha:"
        echo "  ${backup_jar}"

        exit 0
    fi

    echo "  Pokus ${attempt}/20 – backend zatím není připraven."
    sleep 2
done

echo
echo "CHYBA: Backend nebyl do 40 sekund připraven."
echo "Poslední logy kontejneru:"

"${DOCKER_BIN}" logs \
    --tail 100 \
    "${container_name}" || true

exit 1
REMOTE_DEPLOY

echo
echo "Nasazení backendu NETIX bylo dokončeno."
echo "Health: https://api.neti.cz/actuator/health"