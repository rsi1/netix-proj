package cz.netix.netixbackend.ruian.sync.controller;

import cz.netix.netixbackend.ruian.sync.service.RuianImportService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/sync/ruian")
public class RuianImportController {

    private RuianImportService service;

    @PostMapping
    public String sync() {
        service.importAll();
        return "RÚIAN import dokončen";
    }
}
