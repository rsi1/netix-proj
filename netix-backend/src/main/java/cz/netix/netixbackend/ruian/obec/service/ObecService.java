package cz.netix.netixbackend.ruian.obec.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cz.netix.netixbackend.ruian.obec.entity.Obec;
import cz.netix.netixbackend.ruian.obec.repository.ObecRepository;

@Service
public class ObecService {

    private final ObecRepository obecRepository;

    public ObecService(ObecRepository obecRepository) {
        this.obecRepository = obecRepository;
    }

    // metody
    public List<Obec> hledat(String text) {
        System.out.println(">>> hledat() called, text=" + text);
        return obecRepository.findByNazevContainingIgnoreCase(text);
}
    public List<Obec> findAll() {
        return obecRepository.findAll();
    }

    @SuppressWarnings("null")
    public Obec ulozObec(Obec obec) {
        return obecRepository.save(obec);
    }
}
