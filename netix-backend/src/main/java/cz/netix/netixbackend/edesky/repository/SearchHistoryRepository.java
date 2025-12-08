-- Active: 1764612427089@@192.168.3.31@3306@demo
package cz.netix.netixbackend.edesky.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cz.netix.netixbackend.edesky.entity.SearchHistory;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
}
