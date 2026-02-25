package cz.netix.netixbackend.repository.security;

import cz.netix.netixbackend.model.security.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
Optional<AppUser> findByUsername(String username);
}