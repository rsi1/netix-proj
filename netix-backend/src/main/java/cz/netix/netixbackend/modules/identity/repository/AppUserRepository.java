package cz.netix.netixbackend.modules.identity.repository;

import cz.netix.netixbackend.modules.identity.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
Optional<AppUser> findByUsername(String username);
}