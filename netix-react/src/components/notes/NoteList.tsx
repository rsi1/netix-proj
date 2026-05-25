import NoteItem from "./NoteItem";

type Note = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}