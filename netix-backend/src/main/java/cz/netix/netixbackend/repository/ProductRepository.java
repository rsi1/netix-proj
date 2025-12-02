package cz.netix.netixbackend.repository;

import  cz.netix.netixbackend.model.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {}
