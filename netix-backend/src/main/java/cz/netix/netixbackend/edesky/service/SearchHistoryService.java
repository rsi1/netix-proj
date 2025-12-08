package cz.netix.netixbackend.edesky.service;

import cz.netix.netixbackend.edesky.entity.SearchHistory;
import cz.netix.netixbackend.edesky.repository.SearchHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchHistoryService {

    private final SearchHistoryRepository repository;

    public SearchHistoryService(SearchHistoryRepository repository) {
        this.repository = repository;
    }

    public SearchHistory save(String queryText, int resultsCount) {
        SearchHistory s = new SearchHistory();
        s.setQueryText(queryText);
        s.setResultsCount(resultsCount);
        return repository.save(s);
    }

    public List<SearchHistory> getAll() {
        return repository.findAll();
    }
}
