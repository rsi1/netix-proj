package cz.netix.netixbackend.audit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApLogRepository extends JpaRepository<ApLog, Long> {
}