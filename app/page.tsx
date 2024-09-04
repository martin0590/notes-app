'use client'

import NotesContainer from "@/components/NotesContainer";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext(null)

export default function Home() {
  const [notes, setNotes] = useState(() => {
    const notes = localStorage.getItem("notes-data")
    if(notes){
      return JSON.parse(notes)
    }
    return[]
  })

  const addNote = (theme) => {
    setNotes([
      {
        id: Math.random().toString(36),
        text: "",
        theme,
        timestamp: +new Date(),
        editmode: true
      },
      ...notes
    ])
  }

  const deleteNote = (noteId) => {
    setNotes(
      notes.filter(note => note.id != noteId)
    )
  }

  const saveNote = (noteId, text) => {
    const note = notes.find(note => note.id === noteId)
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
