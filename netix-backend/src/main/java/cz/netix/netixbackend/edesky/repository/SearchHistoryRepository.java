package cz.netix.netixbackend.edesky.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cz.netix.netixbackend.edesky.entity.SearchHistory;
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
}
