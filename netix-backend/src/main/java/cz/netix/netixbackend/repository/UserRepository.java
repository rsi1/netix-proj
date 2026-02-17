package cz.netix.netixbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cz.netix.netixbackend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}


