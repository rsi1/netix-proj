package cz.netix.netixbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.boot.CommandLineRunner;

@Configuration
public class EnvDebugConfig {

    @Bean
    CommandLineRunner envDebug(Environment env) {
        return args -> {
            System.out.println("===== ENV DEBUG (DB) =====");
            System.out.println("spring.datasource.url = " +
                    env.getProperty("spring.datasource.url"));
            System.out.println("spring.datasource.username = " +
                    env.getProperty("spring.datasource.username"));
            System.out.println("spring.datasource.password = " +
                    (env.getProperty("spring.datasource.password") != null ? "***SET***" : "NULL"));
            System.out.println("==========================");
        };
    }
}
