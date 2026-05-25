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

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <div>
      <h1>Poznámky</h1>

      <NoteForm />

      <NoteList notes={notes} />
    </div>
  );
}