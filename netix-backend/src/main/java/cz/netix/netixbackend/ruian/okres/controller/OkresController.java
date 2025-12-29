package cz.netix.netixbackend.ruian.okres.controller;

import cz.netix.netixbackend.ruian.okres.entity.Okres;
import cz.netix.netixbackend.ruian.okres.service.OkresService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ruian/okresy")
public class OkresController {

    private final OkresService service;

    public OkresController(OkresService service) {
        this.service = service;
    }

    @GetMapping
    public List<Okres> findAll() {
        return service.findAll();
    }
/* 
    @GetMapping("/aktivni")
    public List<Okres> aktivni() {
        return service.getAktivni();
    }

    @GetMapping("/{kod}")
    public Okres detail(@PathVariable Integer kod) {
        return service.getPodleKodu(kod);
    }

    @GetMapping("/kraj/{krajKod}")
    public List<Okres> podleKraje(@PathVariable Integer krajKod) {
        return service.getPodleKraje(krajKod);
    }

    @GetMapping("/hledat")
    public List<Okres> hledat(@RequestParam String q) {
        return service.hledat(q);
    }
*/        
}
