package cz.netix.netixbackend.ruian.obec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cz.netix.netixbackend.ruian.obec.entity.Obec;   

public interface ObecRepository extends JpaRepository<Obec, Integer> {

    List<Obec> findByNazevContainingIgnoreCase(String nazev);
}
