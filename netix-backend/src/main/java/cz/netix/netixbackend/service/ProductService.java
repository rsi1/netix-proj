package cz.netix.netixbackend.service;

import cz.netix.netixbackend.model.Product;
import cz.netix.netixbackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public Product findById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Product save(Product product) {
        return repo.save(product);
    }
}
