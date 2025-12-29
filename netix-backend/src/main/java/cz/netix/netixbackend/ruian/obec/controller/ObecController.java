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

    @GetMapping
    public List<Obec> findAll() {
        return service.findAll();
    }
/*  
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
    }  */
   
}