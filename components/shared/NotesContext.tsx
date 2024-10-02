'use client'
import { createContext, useContext, useEffect, useState } from "react";
import useLocalForage from "./useLocalForage";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


export const NotesContext = createContext<NotesContextProps>({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  saveNote: () => {},
})

const NotesProvider = ({ children }: {children: React.ReactNode}) => {
  const { notes, setNotes } = useLocalForage()

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
    toast("Note Added", { duration: 1000 })
  }

  const deleteNote = (noteId: string) => {
    setNotes(
      notes.filter(note => note.id != noteId)
    )
    toast("Note Deleted", { duration: 1000 })
  }

  const saveNote = (noteId: string, text: string) => {
    const note = notes.find(note => note.id === noteId)
    if(!note) return
    note.text = text
    note.editmode = false
    setNotes([...notes])
    toast("Note Saved", { duration: 1000 })
    
  }
  

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