package cz.netix.netixbackend.api.users;

import cz.netix.netixbackend.api.users.dto.AppUserDto;
import cz.netix.netixbackend.model.security.AppRole;
import cz.netix.netixbackend.model.security.AppUser;
import cz.netix.netixbackend.repository.security.AppUserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AppUserRepository users;

    public UserController(AppUserRepository users) {
        this.users = users;
    }

    // Doporučení: tohle typicky jen pro ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<AppUserDto> list() {
        return users.findAll()
                .stream()
                .map(UserController::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public AppUserDto get(@PathVariable Long id) {
        AppUser u = users.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
        return toDto(u);
    }

    private static AppUserDto toDto(AppUser u) {
        // Pokud máš jen jednu roli jako String, uprav níže.
        Set<String> roles = Set.of();

        // Varianta, kdy máš relaci na AppRole: u.getRoles()
        if (u.getRoles() != null) {
            roles = u.getRoles().stream()
                    .map(AppRole::getName) // např. "ADMIN"
                    .collect(Collectors.toSet());
        }

        return new AppUserDto(
                u.getId(),
                u.getUsername(),
                u.isEnabled(),
                roles
        );
    }
}
