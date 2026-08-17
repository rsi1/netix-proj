package cz.netix.netixbackend.audit;

import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuditService {

    private final ApLogRepository logRepo;

    public AuditService(ApLogRepository logRepo) {
        this.logRepo = logRepo;
    }

    public void log(
            String action,
            String tableName,
            Long recordId,
            String detail) {

        ApLog log = new ApLog();

        log.setChangedAt(Instant.now());
        log.setUsername("dev");
        log.setAction(action);
        log.setTableName(tableName);
        log.setRecordId(recordId);
        log.setDetail(detail);

        logRepo.save(log);
    }
}