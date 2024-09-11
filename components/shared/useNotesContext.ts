'use client'

import { useContext } from 'react';
import { NotesContext } from './NotesContext';

const useNotesContext = () => {
  const notesContext = useContext(NotesContext);

  if (!notesContext) {
    throw new Error('ContextProvider must be used inside a NotesContextProvider');
  }

  return notesContext;
};

export default useNotesContext;