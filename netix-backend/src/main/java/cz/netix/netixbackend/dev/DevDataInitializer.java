package cz.netix.netixbackend.dev;

import cz.netix.netixbackend.model.security.AppUser;
import cz.netix.netixbackend.repository.security.AppUserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Profile("dev")
@Configuration
public class DevDataInitializer {

@Bean
CommandLineRunner initUsers(AppUserRepository repo, PasswordEncoder encoder) {
  return args -> init(repo, encoder);
}

@Transactional
void init(AppUserRepository repo, PasswordEncoder encoder) {
  if (repo.findByUsername("dev").isEmpty()) {
    AppUser user = new AppUser();
    user.setUsername("dev");
    user.setPasswordHash(encoder.encode("draCo-2025"));
    user.setEnabled(true);
    repo.save(user);
    System.out.println(">>> DEV USER CREATED <<<");
  } else {
    System.out.println(">>> DEV USER EXISTS <<<");
  }
}
}