package cz.netix.netixbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NetixBackendApplication {

    public static void main(String[] args) {

        // 🔥 Načtení .env ještě PŘED startem Springu
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();

        // 🔥 Nastavení environment proměnných
        if (dotenv.get("DB_PASSWORD") != null) {
            System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        }

        if (dotenv.get("JDBC_URL") != null) {
            System.setProperty("JDBC_URL", dotenv.get("JDBC_URL"));
        }

        SpringApplication.run(NetixBackendApplication.class, args);
    }
}
