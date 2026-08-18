package cz.netix.netixbackend.audit;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "audit_log")
public class ApLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant changedAt;

    private String username;

    private String action;

    private String tableName;

    private Long recordId;

    @Column(length = 4000)
    private String detail;

    public Long getId() { return id; }
    public Instant getChangedAt() { return changedAt; }
    public String getUsername() { return username; }
    public String getAction() { return action; }
    public String getTableName() { return tableName; }
    public Long getRecordId() { return recordId; }
    public String getDetail() { return detail; }

    public void setId(Long id) { this.id = id; }
    public void setChangedAt(Instant changedAt) { this.changedAt = changedAt; }
    public void setUsername(String username) { this.username = username; }
    public void setAction(String action) { this.action = action; }
    public void setTableName(String tableName) { this.tableName = tableName; }
    public void setRecordId(Long recordId) { this.recordId = recordId; }
    public void setDetail(String detail) { this.detail = detail; }
}