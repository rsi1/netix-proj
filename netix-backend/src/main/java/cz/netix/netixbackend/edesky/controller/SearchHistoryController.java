package cz.netix.netixbackend.edesky.controller;

import cz.netix.netixbackend.edesky.entity.SearchHistory;
import cz.netix.netixbackend.edesky.service.SearchHistoryService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search-history")
@CrossOrigin
public class SearchHistoryController {

    private final SearchHistoryService service;

    public SearchHistoryController(SearchHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public SearchHistory save(@RequestBody SearchHistory request) {
        return service.save(
                request.getQueryText(),
                request.getResultsCount()
        );
    }

    @GetMapping
    public List<SearchHistory> listAll() {
        return service.getAll();
    }
}
