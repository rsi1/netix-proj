package cz.netix.netixbackend.controller;

import cz.netix.netixbackend.products;
import cz.netix.netixbackend.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController{
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public String getProduct(@PathVariable Long id) {
        return "Produkt s ID: " + id;
    }
    @PostMapping
    public String createProduct(@RequestBody products product) {
        return service.saveProduct(product);

}
}