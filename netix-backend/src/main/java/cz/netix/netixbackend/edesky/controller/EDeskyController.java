package cz.netix.netixbackend.edesky.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/edesky")
public class EDeskyController {

    // 🔹 TEST – ověření, že backend běží
    @GetMapping("/test")
    public String test() {
        return "edesky controller OK";
    }  
    // 🔹 krok 1: ověříme příjem parametru
    @GetMapping("/search")
    public String search(@RequestParam String text) {
        return "hledano: " + text;
    }
}
