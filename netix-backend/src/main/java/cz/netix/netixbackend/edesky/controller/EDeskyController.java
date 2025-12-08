
package cz.netix.netixbackend.edesky.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cz.netix.netixbackend.edesky.dto.EDeskyResponseDto;
import cz.netix.netixbackend.edesky.service.EDeskyService;

@RestController
@RequestMapping("/api/edesky")
@CrossOrigin
public class EDeskyController {

    private final EDeskyService service;

    public EDeskyController(EDeskyService service) {
        this.service = service;
    }

    @GetMapping("/search")
    public EDeskyResponseDto search(@RequestParam String query) {
        return service.search(query);
    }
}
