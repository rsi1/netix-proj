package cz.netix.netixbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 



@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:5173",   // dev
                                "https://app.neti.cz"      // produkce
                        )
                        .allowedMethods("*")
                        .allowCredentials(true);
            }
        };
    }
 
}