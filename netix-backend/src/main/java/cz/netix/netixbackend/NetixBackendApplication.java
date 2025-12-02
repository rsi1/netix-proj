package cz.netix.netixbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NetixBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NetixBackendApplication.class, args);
        System.out.println("🚀 NETIX Backend běží na http://localhost:8080");
    }
}
