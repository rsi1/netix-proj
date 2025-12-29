package cz.netix.netixbackend.ruian.obec.service;

import cz.netix.netixbackend.ruian.obec.entity.Obec;
import cz.netix.netixbackend.ruian.obec.repository.ObecRepository;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ObecService {

    private final ObecRepository obecRepository;

    public ObecService(ObecRepository obecRepository) {
        this.obecRepository = obecRepository;
    }

    // metody

    public List<Obec> findAll() {
        return obecRepository.findAll();
    }
}
