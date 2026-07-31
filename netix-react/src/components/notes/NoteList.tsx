type Note = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteList({
  notes,
  onEdit,
  onDelete,
}: Props) {
  function handleDelete(note: Note) {
    const confirmed = window.confirm(
      `Opravdu chcete smazat poznámku „${note.title}“?`,
    );

    if (confirmed) {
      onDelete(note.id);
    }
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div className="note-row" key={note.id}>
          <h2 className="note-title">
            {note.title || "Bez názvu"}
          </h2>

          <p className="note-text">
            {note.text || "Bez textu"}
          </p>

          <div className="note-actions">
            <button
              type="button"
              onClick={() => onEdit(note)}
            >
              Upravit
            </button>

            <button
              className="delete-button"
              type="button"
              onClick={() => handleDelete(note)}
            >
              Smazat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}