  package cz.netix.netixbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NetixBackendApplication {

    public static void main(String[] args) {

        // 🔥 1. Načíst .env
        Dotenv dotenv = Dotenv.configure()
                .directory(".")       // DŮLEŽITÉ: hledá .env v rootu projektu
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();

        // 🔥 2. Nastavit všechny DB proměnné, které Spring používá

        if (dotenv.get("DB_USERNAME") != null) {
            System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        }

        if (dotenv.get("DB_PASSWORD") != null) {
            System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        }

        if (dotenv.get("JDBC_URL") != null) {
            System.setProperty("JDBC_URL", dotenv.get("JDBC_URL"));
        }
        //
       // System.setProperty("EDESKY_API_KEY", dotenv.get("EDESKY_API_KEY"));
      //  System.setProperty("SPRING_PORT", dotenv.get("SPRING_PORT"));

        // 🔥 3. Start Spring Boot
        SpringApplication.run(NetixBackendApplication.class, args);

    }
}
