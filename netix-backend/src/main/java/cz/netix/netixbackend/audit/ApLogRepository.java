package cz.netix.netixbackend.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ApLogRepository extends JpaRepository<ApLog, Long> {
        List<ApLog> findAllByOrderByChangedAtDesc();
}