package cz.netix.netixbackend.admin;

import cz.netix.netixbackend.admin.dto.UserRowDto;
import cz.netix.netixbackend.modules.identity.repository.AppUserRepository;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/ping")
    public String ping() {
        return "admin ok";
    }

    @GetMapping("/whoami")
    public Object whoami(Authentication auth) {
        return auth.getAuthorities();
    }
}