package cz.netix.netixbackend.notes;

import cz.netix.netixbackend.audit.AuditService;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    public record NoteRequest(String title, String text) {}
    public record NoteUpdateRequest(String title, String text) {}

    private static final String TABLE_NOTE = "ap_note";
    private final NoteRepository noteRepo;
    private final AuditService auditService;

    public NoteController(
            NoteRepository noteRepo,
            AuditService auditService) {

        this.noteRepo = noteRepo;
        this.auditService = auditService;
    }

    @GetMapping
    public List<Note> list() {
        return noteRepo.findAll();
    }

    @PostMapping
    public Note create(@RequestBody NoteRequest dto) {

        Instant now = Instant.now();

        Note note = new Note();

        note.setTitle(dto.title());
        note.setText(dto.text());
        note.setCreatedAt(now);
        note.setUpdatedAt(now);

        Note saved = noteRepo.save(note);

        auditService.log(
                "CREATE",
                TABLE_NOTE,
                saved.getId(),
                saved.getTitle()
        );

        return saved;
    }

    @PutMapping("/{id}")
    public Note update(
            @PathVariable Long id,
            @RequestBody Note input) {

        Note note = noteRepo.findById(id)
                .orElseThrow();

        note.setTitle(input.getTitle());
        note.setText(input.getText());
        note.setUpdatedAt(Instant.now());

        Note saved = noteRepo.save(note);

        auditService.log(
                "UPDATE",
                TABLE_NOTE,
                saved.getId(),
                saved.getTitle()
        );

        return saved;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        Note note = noteRepo.findById(id)
                .orElseThrow();

        noteRepo.deleteById(id);

        auditService.log(
                "DELETE",
                TABLE_NOTE,
                id,
                note.getTitle()
        );
    }
}