#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

BACKEND_PORT="${BACKEND_PORT:-8080}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"
ENV_FILE="${ROOT_DIR}/netix-backend/.env"
HEALTH_URL="http://localhost:${BACKEND_PORT}/actuator/health"

echo "🔍 NETIX dev start (root: $ROOT_DIR)"
echo "   - backend  : http://localhost:${BACKEND_PORT}"
echo "   - frontend : http://localhost:${FRONTEND_PORT}"
echo

cleanup() {
  echo
  echo "🧹 Ukončuji dev procesy..."
  jobs -p | xargs -r kill 2>/dev/null || true
  exit 0
}
trap cleanup INT TERM

kill_port() {
  local port="$1"
  if ss -lntp 2>/dev/null | grep -q ":${port} "; then
    echo "⚠️  Port ${port} je obsazený → ukončuji proces..."
    local pid
    pid="$(ss -lntp 2>/dev/null | awk -v p=":${port}" '$4 ~ p {print $0}' \
      | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' | head -n 1)"
    if [[ -n "${pid}" ]]; then
      kill "${pid}" 2>/dev/null || true
      sleep 0.5
    fi
  fi
}

load_env() {
  if [[ -f "${ENV_FILE}" ]]; then
    echo "🔑 Načítám .env: ${ENV_FILE}"
    set -a
    # shellcheck disable=SC1090
    source "${ENV_FILE}"
    set +a
  else
    echo "⚠️  .env nenalezen: ${ENV_FILE}"
    echo "    Backend poběží jen s default configem / env z prostředí."
  fi

  export SPRING_PROFILES_ACTIVE="${SPRING_PROFILES_ACTIVE:-dev}"

  # Mapování pro tvůj případ: .env má JDBC_URL, app často očekává DB_URL
  if [[ -z "${DB_URL:-}" && -n "${JDBC_URL:-}" ]]; then
    export DB_URL="${JDBC_URL}"
  fi
}

wait_for_backend() {
  echo "⏳ Čekám na backend: ${HEALTH_URL}"
  # max ~30s (60 * 0.5s)
  for i in $(seq 1 60); do
    if curl -fsS "${HEALTH_URL}" >/dev/null 2>&1; then
      echo "✅ Backend je UP"
      return 0
    fi

    # když backend proces spadl, nemá smysl čekat
    if ! kill -0 "${BACKEND_PID}" 2>/dev/null; then
      echo "❌ Backend proces skončil (PID ${BACKEND_PID}). Koukej do logu výš."
      return 1
    fi

    sleep 0.5
  done

  echo "❌ Backend nenaběhl do 30s."
  return 1
}

run_backend() {
  echo "⚙️  Spouštím Spring Boot backend..."
  (cd "${ROOT_DIR}/netix-backend" && ./mvnw spring-boot:run \
    -Dspring-boot.run.arguments="--server.port=${BACKEND_PORT}")
}

run_frontend() {
  echo "🌐 Spouštím React frontend (Vite)..."
  (cd "${ROOT_DIR}/netix-react" && npm run dev -- --port "${FRONTEND_PORT}")
}

echo "🧯 Kontrola portů..."
kill_port "${BACKEND_PORT}"
kill_port "${FRONTEND_PORT}"

load_env

run_backend & BACKEND_PID=$!

# čekej na backend (healthcheck)
wait_for_backend

run_frontend & FRONTEND_PID=$!

echo
echo "✅ Spuštěno:"
echo "   Frontend: http://localhost:${FRONTEND_PORT}"
echo "   Backend : http://localhost:${BACKEND_PORT}"
echo "   Health  : ${HEALTH_URL}"
echo "   Test API: curl http://localhost:${FRONTEND_PORT}/api/ping"
echo
echo "⛔ Ukončení: Ctrl+C"

wait
