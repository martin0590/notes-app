'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalForage from "./useLocalForage";
import toast from "react-hot-toast";


export const NotesContext = createContext<NotesContextProps>({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  saveNote: () => {},
  changeBold: () => {}
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
        isBold: false,
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

  const changeBold = (noteId: string, isBold: boolean) => {
    const note = notes.find(note => note.id === noteId)
    if(!note) return
    note.isBold = isBold
    setNotes([...notes])
  }
  

  const value = {
    changeBold,
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

// export const useNotesContext = () => useContext(NotesContext)