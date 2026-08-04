#!/usr/bin/env bash

set -Eeuo pipefail

NAS_USER="rsime"
NAS_HOST="192.168.3.31"
NAS_PORT="223"
NAS_PATH="/volume1/web/neti.cz/app"

SCRIPT_DIR="$(
    cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
    pwd
)"

PROJECT_DIR="$(
    cd -- "${SCRIPT_DIR}/.."
    pwd
)"

FRONTEND_DIR="${PROJECT_DIR}/netix-react"
DIST_DIR="${FRONTEND_DIR}/dist"

MODE="${1:---dry-run}"

if [[ ! -f "${FRONTEND_DIR}/package.json" ]]; then
    echo "CHYBA: Nebyl nalezen projekt netix-react."
    echo "Očekávaný soubor: ${FRONTEND_DIR}/package.json"
    exit 1
fi

case "${MODE}" in
    --dry-run)
        echo "ZKUŠEBNÍ REŽIM: na NAS se nic nezmění."
        DRY_RUN_ARGS=(--dry-run)
        ;;

    --deploy)
        echo "OSTRÉ NASAZENÍ aplikace NETIX na NAS."
        DRY_RUN_ARGS=()
        ;;

    *)
        echo "Použití:"
        echo "  ./scripts/sync-netix.sh --dry-run"
        echo "  ./scripts/sync-netix.sh --deploy"
        exit 1
        ;;
esac

command -v npm >/dev/null 2>&1 || {
    echo "CHYBA: Příkaz npm není nainstalovaný."
    exit 1
}

command -v rsync >/dev/null 2>&1 || {
    echo "CHYBA: Příkaz rsync není nainstalovaný."
    exit 1
}

echo
echo "Sestavuji React aplikaci..."
echo

(
    cd -- "${FRONTEND_DIR}"
    npm ci
    npm run build
)

if [[ ! -f "${DIST_DIR}/index.html" ]]; then
    echo "CHYBA: Sestavení nevytvořilo dist/index.html."
    exit 1
fi

echo
echo "Zdroj: ${DIST_DIR}/"
echo "Cíl:   ${NAS_USER}@${NAS_HOST}:${NAS_PATH}/"
echo

rsync \
    -avzh \
    --itemize-changes \
    --delete-delay \
    --no-perms \
    --no-owner \
    --no-group \
    "${DRY_RUN_ARGS[@]}" \
    --exclude="#recycle/" \
    --exclude="@eaDir/" \
    -e "ssh -p ${NAS_PORT}" \
    "${DIST_DIR}/" \
    "${NAS_USER}@${NAS_HOST}:${NAS_PATH}/"

echo

if [[ "${MODE}" == "--dry-run" ]]; then
    echo "Kontrola dokončena. Na NAS se nic nezměnilo."
    echo "Pro skutečné nahrání použijte:"
    echo "  ./scripts/sync-netix.sh --deploy"
else
    echo "Nasazení React aplikace NETIX dokončeno."
    echo "Adresa: https://neti.cz/app/"
fi