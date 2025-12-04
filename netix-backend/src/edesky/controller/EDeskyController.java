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
