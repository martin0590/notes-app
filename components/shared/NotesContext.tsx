'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import localforage from "localforage";
import useLocalForage from "./useLocalForage";


export const NotesContext = createContext<NotesContextProps>({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  saveNote: () => {},
})

const NotesProvider = ({ children }: {children: React.ReactNode}) => {
  const { notes, setNotes } = useLocalForage()
  // const [notes, setNotes] = useState<NotesProps[]>( () => {
  //   const notes = localStorage.getItem("notes-data")
  //   if(notes){
  //     return JSON.parse(notes)
  //   }
  //   return[]
  // })


  const addNote = (theme: string) => {
    setNotes([
      ...notes,
      {
        id: uuidv4(),
        text: "",
        theme,
        timestamp: +new Date(),
        editmode: true
      }
    ])
  }

  const deleteNote = (noteId: string) => {
    setNotes(
      notes.filter(note => note.id != noteId)
    )
  }

  const saveNote = (noteId: string, text: string) => {
    const note = notes.find(note => note.id === noteId)
    if(!note) return
    note.text = text
    note.editmode = false
    setNotes([...notes])
  }

  // useEffect(() => {
  //   localStorage.setItem("notes-data", JSON.stringify(notes))
  // }, [notes])
  

  const value = {
    notes,
    addNote,
    deleteNote,
    saveNote
  }

  return (
    <NotesContext.Provider value={value}>
      { children }
    </NotesContext.Provider>
  )
}

export default NotesProvider;

export const useNotesContext = () => useContext(NotesContext)