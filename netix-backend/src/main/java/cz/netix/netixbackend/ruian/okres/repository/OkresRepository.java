package cz.netix.netixbackend.ruian.okres.repository;

import cz.netix.netixbackend.ruian.okres.entity.Okres;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OkresRepository
        extends JpaRepository<Okres, Integer> {

}
