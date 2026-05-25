type Note = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  note: Note;
};

export default function NoteItem({ note }: Props) {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </div>
  );
}