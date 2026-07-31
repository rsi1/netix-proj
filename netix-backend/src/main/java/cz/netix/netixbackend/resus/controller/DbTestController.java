package cz.netix.netixbackend.resus.controller;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DbTestController {

    private final JdbcTemplate jdbcTemplate;

    public DbTestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

@GetMapping("/api/db/test")
public String testDb() {
    try {
        jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return "DB OK – připojeno k databázi na NASu";
    } catch (DataAccessException e) {
        return "DB ERROR: " + e.getMessage();
    }
}
}

