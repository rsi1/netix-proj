import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

type Note = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  note?: Note | null;
  onSaved?: () => void;
  onCancel?: () => void;
};

export default function NoteForm({
  note,
  onSaved,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setText(note?.text ?? "");
    setError("");
  }, [note]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");

    const url = note?.id
      ? `/api/notes/${note.id}`
      : "/api/notes";

    const method = note?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Uložení selhalo: HTTP ${response.status}`,
        );
      }

      if (!note?.id) {
        setTitle("");
        setText("");
      }

      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Poznámku se nepodařilo uložit.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {note?.id
          ? "Upravit poznámku"
          : "Nová poznámka"}
      </h2>

      <label>
        Název
        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />
      </label>

      <label>
        Text
        <textarea
          value={text}
          onChange={(event) =>
            setText(event.target.value)
          }
          required
        />
      </label>

      {error && <p role="alert">{error}</p>}

      <button type="submit">
        {note?.id ? "Uložit změny" : "Přidat"}
      </button>

      {note?.id && (
        <button
          type="button"
          onClick={onCancel}
        >
          Zrušit
        </button>
      )}
    </form>
  );
}