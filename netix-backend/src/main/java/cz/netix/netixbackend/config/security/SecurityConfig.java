package cz.netix.netixbackend.config.security;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

            // ✅ aby API nikdy nevracelo HTML login page
            .exceptionHandling(e -> e
                .authenticationEntryPoint((req, res, ex) -> res.sendError(401))
                .accessDeniedHandler((req, res, ex) -> res.sendError(403))
            )

            .authorizeHttpRequests(auth -> auth
                // preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // veřejné
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // admin
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // všechno ostatní API vyžaduje login (session)
                .requestMatchers("/api/**").authenticated()

                // ostatní (pokud nějaké máš mimo /api)
                .anyRequest().permitAll()
            )

            // ponecháme API login endpoint přes formLogin POST
            .formLogin(form -> form
                .loginProcessingUrl("/api/auth/login")
                .successHandler((req, res, a) -> res.setStatus(200))
                .failureHandler((req, res, ex) -> res.sendError(401))
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/api/auth/logout")
                .logoutSuccessHandler((req, res, a) -> res.setStatus(200))
            );

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}