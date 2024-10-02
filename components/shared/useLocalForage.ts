import localforage from "localforage";
import { useEffect, useState } from "react";

const useLocalForage = () => {
  const [notes, setNotes] = useState<NotesProps[]>([])

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await localforage.getItem('notes-data');
        setNotes(storedNotes as NotesProps[] || []);
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    try {
      localforage.setItem('notes-data', notes);
    } catch (error) {
      console.log(error)      
    }
  }, [notes])

  return {
    notes,
    setNotes  
  }
}

export default useLocalForage