package cz.netix.netixbackend.modules.identity.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthMeController {

    private static final Logger logger = LoggerFactory.getLogger(AuthMeController.class);

    @GetMapping("/api/auth/me")
    public Map<String, Object> me(Authentication auth) {

        // ✅ debug výpis do konzole Spring Bootu
        logger.debug("AuthMeController auth = {}", auth);

        if (auth == null ||
                auth instanceof AnonymousAuthenticationToken ||
                !auth.isAuthenticated()) {
            return Map.of("authenticated", false);
        }

        var roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Map.of(
                "authenticated", true,
                "username", auth.getName(),
                "roles", roles
        );
    }
}