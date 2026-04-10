1. Build backend:
   mvn -f netix-backend/pom.xml clean package -DskipTests

2. Copy jar to NAS:
   scp -P 223 ...

3. Restart backend on NAS:
   docker compose -f compose.yaml up -d --force-recreate

4. Verify:
   curl http://127.0.0.1:8080/api/auth/me