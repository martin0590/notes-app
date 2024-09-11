'use client'
import { useContext } from "react"
import Note from "./Note"
import useNotesContext from "./shared/useNotesContext"

const NotesContainer = () => {

  const {notes} = useNotesContext()

  return (
    <div className="p-2">
      <h2 className="text-2xl text-white">Notes</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {notes.map(note => <Note note={note} key={note.id} />)}
      </div>
    </div>
  )
}

export default NotesContainer