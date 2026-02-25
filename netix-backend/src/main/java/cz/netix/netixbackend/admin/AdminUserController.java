package cz.netix.netixbackend.admin;

import cz.netix.netixbackend.model.security.AppRole;
import cz.netix.netixbackend.model.security.AppUser;
import cz.netix.netixbackend.repository.security.AppUserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AppUserRepository appUserRepository;

    public AdminUserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @GetMapping
    public List<UserRowDto> listUsers() {
        return appUserRepository.findAll()
                .stream()
                .map(UserRowDto::from)
                .toList();
    }

    // DTO – posíláme jen bezpečná pole (žádné heslo/hash)
    public record UserRowDto(
            Long id,
            String username,
            Boolean enabled,
            List<String> roles
    ) {
        static UserRowDto from(AppUser u) {
            List<String> roleNames = u.getRoles() == null ? List.of()
                    : u.getRoles().stream().map(AppRole::getName).toList();

            return new UserRowDto(
                    u.getId(),
                    u.getUsername(),
                    // pokud nemáš enabled, dej null nebo to smaž z DTO
                    hasMethodEnabled(u) ? u.isEnabled() : null,
                    roleNames
            );
        }

        // hack jen aby to zkompilovalo i když enabled nemáš – radši to uprav podle entity
        private static boolean hasMethodEnabled(AppUser u) {
            try { u.getClass().getMethod("isEnabled"); return true; }
            catch (NoSuchMethodException e) { return false; }
        }
    }
}