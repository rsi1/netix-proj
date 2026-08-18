package cz.netix.netixbackend.api;

import cz.netix.netixbackend.audit.ApLog;
import cz.netix.netixbackend.audit.ApLogRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {

    private final ApLogRepository repository;

    public AuditController(ApLogRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ApLog> list() {
        return repository.findAllByOrderByChangedAtDesc();
    }
}