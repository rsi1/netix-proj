#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/dev/netix-proj"
JAR_SRC="$PROJECT_DIR/netix-backend/target/netix-backend-0.0.1-SNAPSHOT.jar"
NAS_TARGET="rsime@netix:/volume1/homes/rsime/apps/netix/app/netix-backend.jar"

cd "$PROJECT_DIR"
mvn -f netix-backend/pom.xml clean package -DskipTests

jar tf "$JAR_SRC" | grep AuthMeController

scp -P 223 "$JAR_SRC" "$NAS_TARGET"

ssh -p 223 rsime@netix 'cd /volume1/homes/rsime/apps/netix && docker compose -f compose.yaml up -d --force-recreate && docker compose -f compose.yaml logs --tail=50 netix-backend'