package cz.netix.netixbackend.ruian.okres.service;

import cz.netix.netixbackend.ruian.okres.entity.Okres;
import cz.netix.netixbackend.ruian.okres.repository.OkresRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OkresService {

    private final OkresRepository repository;

    public OkresService(OkresRepository repository) {
        this.repository = repository;
    }

    public List<Okres> getVsechny() {
        return repository.findAll();
    }

    public List<Okres> getAktivni() {
        return repository.findByAktivniTrue();
    }

    public Okres getPodleKodu(Integer kod) {
        return repository.findById(kod)
            .orElseThrow(() -> new RuntimeException("Okres nenalezen: " + kod));
    }

    public List<Okres> getPodleKraje(Integer krajKod) {
        return repository.findByKrajKod(krajKod);
    }

    public List<Okres> hledat(String text) {
        return repository.findByNazevContainingIgnoreCase(text);
    }
}
