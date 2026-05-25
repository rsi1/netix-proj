import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  text: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function saveNote(e: React.FormEvent) {
    e.preventDefault();

    const note = { title, text };

    if (editId) {
      await fetch(`/api/notes/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
    } else {
      await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
    }

    setTitle("");
    setText("");
    setEditId(null);

    loadNotes();
  }

  async function deleteNote(id: number) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    loadNotes();
  }

  function editNote(note: Note) {
    setEditId(note.id);
    setTitle(note.title);
    setText(note.text);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Poznámky</h1>

      <form onSubmit={saveNote}>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Název"
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text poznámky"
            rows={5}
            cols={50}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit">
            {editId ? "Uložit změny" : "Přidat poznámku"}
          </button>
        </div>
      </form>

      <hr />

      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{note.title}</h3>

          <p>{note.text}</p>

          <button onClick={() => editNote(note)}>
            Editovat
          </button>

          <button
            onClick={() => deleteNote(note.id)}
            style={{ marginLeft: 10 }}
          >
            Smazat
          </button>
        </div>
      ))}
    </div>
  );
}