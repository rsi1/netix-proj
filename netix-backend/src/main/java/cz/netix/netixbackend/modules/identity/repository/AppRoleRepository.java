package cz.netix.netixbackend.modules.identity.repository;

import cz.netix.netixbackend.modules.identity.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    Optional<AppRole> findByName(String name);
}
