package cz.netix.netixbackend.ruian.sync.controller;

import cz.netix.netixbackend.ruian.sync.service.RuianImportService;
import lombok.RequiredArgsConstructor;

//import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/sync/ruian")
@RequiredArgsConstructor
public class RuianImportController {

    private final RuianImportService service;

    public RuianImportController(RuianImportService service) {
        this.service = service;
    }    

    @PostMapping
    public String sync() {
        service.importAll();
        return "RÚIAN import dokončen";
    }
}
