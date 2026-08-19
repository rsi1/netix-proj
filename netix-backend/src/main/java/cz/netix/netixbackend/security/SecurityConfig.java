package cz.netix.netixbackend.security;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/actuator/health",
                    "/api/auth/**"
                ).permitAll()
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")
                .requestMatchers("/api/audit/**")
                    .hasRole("AUDIT")
                .requestMatchers("/api/notes/**")
                    .authenticated()                   
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
                .loginProcessingUrl(
                    "/api/auth/login"
                )
                .successHandler(
                    (request, response, authentication) ->
                        response.setStatus(
                            HttpServletResponse.SC_OK
                        )
                )
                .failureHandler(
                    (request, response, exception) ->
                        response.setStatus(
                            HttpServletResponse.SC_UNAUTHORIZED
                        )
                )
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/api/auth/logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler(
                    (request, response, authentication) ->
                        response.setStatus(
                            HttpServletResponse.SC_NO_CONTENT
                        )
                )
            )
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(
                    (request, response, exception) ->
                        response.sendError(
                            HttpServletResponse.SC_UNAUTHORIZED
                        )
                )
            );

        return http.build();
    }
}