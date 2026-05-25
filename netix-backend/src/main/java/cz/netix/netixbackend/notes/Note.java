package cz.netix.netixbackend.notes;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "ap_note")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 4000)
    private String text;

    private Instant createdAt;
    private Instant updatedAt;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getText() { return text; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setText(String text) { this.text = text; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}