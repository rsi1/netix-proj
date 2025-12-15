package cz.netix.netixbackend.edesky.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/edesky")
public class EDeskyController {

    @GetMapping("/search")
    public Map<String, String> search(@RequestParam String text) {
        return Map.of("query","Zadej dotaz" + text);
    }
}
