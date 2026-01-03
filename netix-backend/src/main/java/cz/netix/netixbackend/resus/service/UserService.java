package cz.netix.netixbackend.resus.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import cz.netix.netixbackend.resus.model.User;
import cz.netix.netixbackend.resus.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        return repository.findById(id).orElse(null);
    }

    public User save(User user) {
        Objects.requireNonNull(user, "user must not be null");
        return repository.save(user);
    }

    public void delete(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        repository.deleteById(id);
    }
}
