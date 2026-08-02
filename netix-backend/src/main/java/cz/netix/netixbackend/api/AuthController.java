package cz.netix.netixbackend.api;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public AuthResponse me(
            Authentication authentication
    ) {
        if (
            authentication == null
            || !authentication.isAuthenticated()
            || authentication
                instanceof AnonymousAuthenticationToken
        ) {
            return new AuthResponse(
                false,
                null,
                List.of()
            );
        }

        List<String> roles = authentication
            .getAuthorities()
            .stream()
            .map(authority ->
                authority.getAuthority()
            )
            .toList();

        return new AuthResponse(
            true,
            authentication.getName(),
            roles
        );
    }

    public record AuthResponse(
        boolean authenticated,
        String username,
        List<String> roles
    ) {
    }
}