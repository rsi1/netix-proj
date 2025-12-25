package cz.netix.netixbackend.ruian.okres.repository;

import cz.netix.netixbackend.ruian.okres.entity.Okres;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OkresRepository
        extends JpaRepository<Okres, Integer> {

    List<Okres> findByAktivniTrue();

    List<Okres> findByKrajKod(Integer krajKod);

    List<Okres> findByNazevContainingIgnoreCase(String nazev);
}
