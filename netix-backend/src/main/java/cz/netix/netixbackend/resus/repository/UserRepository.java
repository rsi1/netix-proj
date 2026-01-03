package cz.netix.netixbackend.resus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cz.netix.netixbackend.resus.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}


