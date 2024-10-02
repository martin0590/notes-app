type NotesProps = {
  editmode: boolean,
  id: string,
  text: string,
  theme: string,
  timestamp: number,
  isBold: boolean
}

type NotesContextProps = {
  notes: NotesProps[],
  addNote: (theme: string) => void,
  deleteNote: (noteId: string) => void,
  saveNote: (noteId: string, text: string) => void,
  changeBold: (noteId: string, isBold: boolean) => void
}