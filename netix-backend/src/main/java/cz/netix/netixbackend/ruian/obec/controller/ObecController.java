package cz.netix.netixbackend.ruian.obec.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cz.netix.netixbackend.ruian.obec.entity.Obec;

@RestController
@RequestMapping("/api/ruian/obce")
public class ObecController {

    private final ObecService service;

    public ObecController(ObecService service) {
        this.service = service;
    }

    @GetMapping
    public List<Obec> vsechny() {
        return service.getVsechny();
    }

    @GetMapping("/aktivni")
    public List<Obec> aktivni() {
        return service.getAktivni();
    }

    @GetMapping("/{kod}")
    public Obec detail(@PathVariable Integer kod) {
        return service.getPodleKodu(kod);
    }

    @GetMapping("/okres/{okresKod}")
    public List<Obec> podleOkresu(@PathVariable Integer okresKod) {
        return service.getPodleOkresu(okresKod);
    }

    @GetMapping("/hledat")
    public List<Obec> hledat(@RequestParam String q) {
        return service.hledat(q);
    }
}