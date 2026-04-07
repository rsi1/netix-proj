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

import cz.netix.netixbackend.modules.identity.service.DbUserDetailsService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("### SecurityConfig LOADED: API chain ###");
        http
           .securityMatcher("/api/**")
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
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/auth/logout").permitAll()
                .requestMatchers("/api/auth/me").permitAll()   // ✅ DŮLEŽITÉ

                .requestMatchers("/api/admin/dev/hashcheck").permitAll()
                .requestMatchers("/api/admin/dev/genhash").permitAll()

                // admin
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // všechno ostatní API vyžaduje login (session)
                .requestMatchers("/api/**").authenticated()

                // ostatní (pokud nějaké máš mimo /api)
                .anyRequest().permitAll()
            )
.addFilterBefore(new OncePerRequestFilter() {
    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain) throws java.io.IOException, jakarta.servlet.ServletException {

        System.out.println("SECURITY CHAIN HIT: " + req.getMethod() + " " + req.getRequestURI());
        chain.doFilter(req, res);
    }
}, UsernamePasswordAuthenticationFilter.class)

            // ponecháme API login endpoint přes formLogin POST
            .formLogin(form -> form
                .loginProcessingUrl("/api/auth/login")
                .successHandler((req, res, a) -> {
                    System.out.println("LOGIN OK: " + a.getName());
                    res.setStatus(200);
                })
                .failureHandler((req, res, ex) -> {
                    System.out.println("LOGIN FAIL: " + ex.getClass().getName());
                    System.out.println("MESSAGE: " + ex.getMessage());
                    if (ex.getCause() != null) {
                        System.out.println("CAUSE: " + ex.getCause().getClass().getName());
                        System.out.println("CAUSE MSG: " + ex.getCause().getMessage());
                    }
                    res.sendError(401);
                })
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

    @Bean
public DaoAuthenticationProvider authenticationProvider(
        DbUserDetailsService userDetailsService,
        PasswordEncoder passwordEncoder) {

    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder);
    return provider;
}
@Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
}
}