import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });

    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}
        style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
      >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titulek"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
      />

      <button type="submit">
        Uložit
      </button>
    </form>
  );
}