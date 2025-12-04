@Service
public class SearchHistoryService {

    private final SearchHistoryRepository repo;

    public SearchHistoryService(SearchHistoryRepository repo) {
        this.repo = repo;
    }

    public SearchHistory save(String query, int count) {
        SearchHistory s = new SearchHistory();
        s.setQueryText(query);
        s.setResultsCount(count);
        return repo.save(s);
    }

    public List<SearchHistory> getAll() {
        return repo.findAll();
    }
}
