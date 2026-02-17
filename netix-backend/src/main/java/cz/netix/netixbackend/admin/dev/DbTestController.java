package cz.netix.netixbackend.admin.dev;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;
import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;

@Profile("dev")
@RestController
@RequestMapping("/admin/dev")
public class DbTestController {

    private final DataSource dataSource;

    public DbTestController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/dbtest")
    public Map<String, Object> dbTest() throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            return Map.of(
                    "status", "OK",
                    "database", conn.getMetaData().getDatabaseProductName(),
                    "url", conn.getMetaData().getURL()
            );
        }
    }
}
