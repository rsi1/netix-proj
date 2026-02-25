package cz.netix.netixbackend.service;

import cz.netix.netixbackend.repository.security.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class DbUserDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(DbUserDetailsService.class);

    private final AppUserRepository users;

    public DbUserDetailsService(AppUserRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("LOGIN ATTEMPT: {}", username);

        var user = users.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        log.info("DB USER FOUND: {}", user.getUsername());

        var authorities = user.getRoles().stream()
            .map(r -> new SimpleGrantedAuthority(r.getName()))
            .toList();

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPasswordHash())
            .authorities(authorities)
            .disabled(!user.isEnabled())
            .build();
    }
}
