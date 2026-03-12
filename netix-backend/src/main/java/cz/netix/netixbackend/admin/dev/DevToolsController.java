package cz.netix.netixbackend.admin.dev;

import cz.netix.netixbackend.modules.identity.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dev")
public class DevToolsController {

    private final AppUserRepository users;
    private final PasswordEncoder encoder;

    public DevToolsController(AppUserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @GetMapping("/hashcheck")
    public Map<String, Object> checkHash() {

        var u = users.findByUsername("dev")
                .orElseThrow();

        boolean ok = encoder.matches("draCo-2025", u.getPasswordHash());

        return Map.of(
                "username", u.getUsername(),
                "enabled", u.isEnabled(),
                "matches", ok,
                "hashPrefix", u.getPasswordHash().substring(0, 12)
        );
    }

    @GetMapping("/genhash")
    public String gen() {
        return encoder.encode("draCo-2025");
    }
}