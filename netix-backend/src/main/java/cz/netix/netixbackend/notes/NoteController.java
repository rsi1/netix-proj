package cz.netix.netixbackend.notes;

import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepo;
    private final ApLogRepository logRepo;

    public NoteController(NoteRepository noteRepo, ApLogRepository logRepo) {
        this.noteRepo = noteRepo;
        this.logRepo = logRepo;
    }

    @GetMapping
    public List<Note> list() {
        return noteRepo.findAll();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        Instant now = Instant.now();
        note.setId(null);
        note.setCreatedAt(now);
        note.setUpdatedAt(now);

        Note saved = noteRepo.save(note);
        log("CREATE", "ap_note", saved.getId(), saved.getTitle());

        return saved;
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note input) {
        Note note = noteRepo.findById(id).orElseThrow();

        note.setTitle(input.getTitle());
        note.setText(input.getText());
        note.setUpdatedAt(Instant.now());

        Note saved = noteRepo.save(note);
        log("UPDATE", "ap_note", saved.getId(), saved.getTitle());

        return saved;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Note note = noteRepo.findById(id).orElseThrow();

        noteRepo.deleteById(id);
        log("DELETE", "ap_note", id, note.getTitle());
    }

    private void log(String action, String tableName, Long recordId, String detail) {
        ApLog l = new ApLog();
        l.setChangedAt(Instant.now());
        l.setUsername("dev");
        l.setAction(action);
        l.setTableName(tableName);
        l.setRecordId(recordId);
        l.setDetail(detail);
        logRepo.save(l);
    }
}