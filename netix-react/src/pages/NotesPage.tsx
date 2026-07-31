import { useEffect, useState } from "react";

import NoteList from "../components/notes/NoteList";
import NoteForm from "../components/notes/NoteForm";

type Note = {
  id: number;
  title: string;
  text: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  const loadNotes = () => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNew = () => {
    setEditingNote({
      id: 0,
      title: "",
      text: "",
    });
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleSaved = () => {
    setEditingNote(null);
    loadNotes();
  };

  const handleCancel = () => {
    setEditingNote(null);
  };

  return (
    <div>
      <h1>Poznámky</h1>

      {!editingNote && (
        <button onClick={handleNew}>
          Nová poznámka
        </button>
      )}

      {editingNote && (
        <div style={{ marginTop: "20px" }}>
          <NoteForm
            note={editingNote.id ? editingNote : undefined}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <NoteList
          notes={notes}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}