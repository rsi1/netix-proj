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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Poznámky se nepodařilo načíst.");
        }

        return res.json();
      })
      .then((data: Note[]) => setNotes(data))
      .catch((error) => {
        console.error(error);
      });
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Poznámku se nepodařilo smazat.");
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id),
      );

      if (editingNote?.id === id) {
        setEditingNote(null);
      }
    } catch (error) {
      console.error(error);
      window.alert("Poznámku se nepodařilo smazat.");
    }
  };

  return (
    <div>
      <h1>Poznámky</h1>

      {!editingNote && (
        <button type="button" onClick={handleNew}>
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
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}