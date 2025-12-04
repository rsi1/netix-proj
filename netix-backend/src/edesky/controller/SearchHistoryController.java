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
        return service.save(request.getQueryText(), request.getResultsCount());
    }

    @GetMapping
    public List<SearchHistory> listAll() {
        return service.getAll();
    }
}
