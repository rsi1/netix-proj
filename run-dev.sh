#!/bin/bash

echo "🔍 Spouštím Netix dev prostředí..."

#   export SPRING_PROFILES_ACTIVE=dev

# === Funkce: Spustí backend ===
run_backend() {
    echo "⚙️  Spouštím Spring Boot backend..."
    if [ -f "./netix-backend/mvnw" ]; then
        echo "➡️  Používám ./mvnw"
        (cd netix-backend && ./mvnw spring-boot:run)
    else
        echo "➡️  Maven Wrapper nenalezen, používám systémový mvn"
        (cd netix-backend && mvn spring-boot:run)
    fi
}

# === Funkce: Spustí frontend ===
run_frontend() {
    echo "🌐 Spouštím React frontend (Vite)..."
    (cd netix-react && npm run dev)
}

# === Jsi ve VS Code? ===
if [ -n "$VSCODE_PID" ]; then
    echo "🖥️  Detekován VS Code – spouštím oba servery v jednom terminálu..."
    run_backend &   # spustit na pozadí
    run_frontend &  # spustit na pozadí
    wait            # čekat na oba
    exit 0
fi

# === Jinak: zkus spustit v nových terminálech ===
if command -v gnome-terminal &> /dev/null; then
    echo "🪟 Spouštím v gnome-terminal..."
    gnome-terminal -- bash -c "cd netix-backend && ./mvnw spring-boot:run || mvn spring-boot:run; exec bash"
    gnome-terminal -- bash -c "cd netix-react && npm run dev; exec bash"

elif command -v konsole &> /dev/null; then
    echo "🪟 Spouštím v konsole..."
    konsole --hold -e bash -c "cd netix-backend && ./mvnw spring-boot:run || mvn spring-boot:run"
    konsole --hold -e bash -c "cd netix-react && npm run dev"

else
    echo "⚠️  Nebyl nalezen žádný grafický terminál – spouštím oba procesy v jednom terminálu..."
    run_backend &   # na pozadí
    run_frontend &  # na pozadí
    wait
fi
