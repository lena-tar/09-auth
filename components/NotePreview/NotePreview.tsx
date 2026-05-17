import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreview({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
