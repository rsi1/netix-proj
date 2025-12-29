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

    public List<Okres> findAll() {
        return repository.findAll();
    }

}
