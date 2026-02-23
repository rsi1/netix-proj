package cz.netix.netixbackend.dev;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
public class DevPasswordGenerator implements CommandLineRunner {

@Override
public void run(String... args) {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    String[] passwords = {
            "draCo-2025"
        /*     ,"Krutibrk1333#" */
    };

    System.out.println("=================================");

    for (String raw : passwords) {
        String hash = encoder.encode(raw);
        System.out.println("RAW  : " + raw);
        System.out.println("HASH : " + hash);
        System.out.println("---------------------------------");
    }


    System.out.println("=================================");
}

public class DevPasswordGenerator2 {
        String raw = "draCo-2025";
        String hashFromDb = "$2a$10$0VjCFKD7PkQrtCd9iMgZ.ODl.VziFymy9F/sM5YAAA89p.3OyVzNG";

     System.out.println("MATCH: " + encoder.matches(raw, hashFromDb));

}

}
