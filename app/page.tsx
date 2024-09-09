'use client'

import NotesContainer from "@/components/NotesContainer";
import Sidebar from "@/components/Sidebar";
import { v4 as uuidv4 } from 'uuid';
import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext<NotesContextProps>({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  saveNote: () => {},
})

export default function Home() {
  const [notes, setNotes] = useState<NotesProps[]>(() => {
    const notes = localStorage.getItem("notes-data")
    if(notes){
      return JSON.parse(notes)
    }
    return[]
  })

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

  useEffect(() => {
    localStorage.setItem("notes-data", JSON.stringify(notes))
  }, [notes])
  

  const value = {
    notes,
    addNote,
    deleteNote,
    saveNote
  }

  return (
    <NotesContext.Provider value={value}>
      <main className="grid min-h-screen grid-cols-[65px_1fr] ">
        <Sidebar />
        <NotesContainer />
      </main>
    </NotesContext.Provider>
  );
}
