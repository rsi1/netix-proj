@Entity
@Table(name = "search_history")
@Data
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String queryText;

    private Integer resultsCount;

    private LocalDateTime createdAt = LocalDateTime.now();
}
