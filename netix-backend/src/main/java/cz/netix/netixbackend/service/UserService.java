package cz.netix.netixbackend.service;

import  cz.netix.netixbackend.api.user;
import  cz.netix.netixbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }
    public User  save(User user) {
        return repo.save(user);
    }
}
