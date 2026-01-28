package cz.netix.netixbackend.ruian.obec.controller;

import cz.netix.netixbackend.ruian.obec.entity.Obec;
import cz.netix.netixbackend.ruian.obec.service.ObecService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ruian/obce")
@RequiredArgsConstructor
public class ObecController {

    private final ObecService service;

    @GetMapping("/search")
    public List<Obec> search(@RequestParam String text) {
        System.out.println(">>> SEARCH TEXT = " + text);
        return service.hledat(text);
    }

    @GetMapping
    public List<Obec> findAll() {
        return service.findAll();
    }

    // ✅ SPRÁVNÝ POST
    @PostMapping(consumes = "application/json")
    public Obec uloz(@RequestBody Obec obec) {
        return service.ulozObec(obec);
    }
}