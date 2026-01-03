package cz.netix.netixbackend.ruian.obec.controller;


import cz.netix.netixbackend.ruian.obec.entity.Obec;
import cz.netix.netixbackend.ruian.obec.service.ObecService;
//import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/ruian/obce")
public class ObecController {

    private final ObecService service;

    public ObecController(ObecService service) {
        this.service = service;
    }

    @GetMapping("/search")
    public List<Obec> search(@RequestParam String text) {
        System.out.println(">>> SEARCH TEXT = " + text);
        return service.hledat(text);
    }

    // (volitelné)
    @GetMapping
    public List<Obec> findAll() {
        return service.findAll();
    }
}