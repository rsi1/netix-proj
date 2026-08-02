package cz.netix.netixbackend.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class DbUserDetailsService
        implements UserDetailsService {

    private final AppUserRepository userRepository;

    public DbUserDetailsService(
            AppUserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String username
    ) throws UsernameNotFoundException {

        AppUser user = userRepository
            .findByUsernameIgnoreCase(username)
            .orElseThrow(() ->
                new UsernameNotFoundException(
                    "Uživatel nebyl nalezen."
                )
            );

        String[] authorities = user.getRoles()
            .stream()
            .map(AppRole::getCode)
            .filter(code ->
                code != null && !code.isBlank()
            )
            .map(code ->
                code.startsWith("ROLE_")
                    ? code
                    : "ROLE_" + code
            )
            .toArray(String[]::new);

        return User.withUsername(user.getUsername())
            .password(user.getPasswordHash())
            .authorities(authorities)
            .disabled(!user.isEnabled())
            .build();
    }
}