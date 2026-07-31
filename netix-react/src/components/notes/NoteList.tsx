type Note = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
};

export default function NoteList({ notes, onEdit }: Props) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} style={{ marginBottom: "30px" }}>
          <h2>{note.title}</h2>

          <p>{note.text}</p>

          <button type="button" onClick={() => onEdit(note)}>
            Upravit
          </button>
        </div>
      ))}
    </div>
  );
}