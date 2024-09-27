'use client'
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import useNotesContext from "./shared/useNotesContext"
import { toast } from 'react-hot-toast'

const Note = ({ note }: { note: NotesProps }) => {
  const { saveNote, deleteNote } = useNotesContext()

  const [isEditMode, setIsEditMode] = useState(note.editmode)
  const [text, setText] = useState(note.text)
  const textareaRef = useRef< HTMLTextAreaElement >(null)

  const handleSaveNote = () => {
    saveNote(note.id, text)
    setIsEditMode(false)
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
    toast("Text Copied", { duration: 1000 })
  }

  const getDateString = (timestamp: number) =>  {
    const temp = new Date(timestamp).toDateString().split(" ")
    return `${temp[2]} ${temp[1]} ${temp[3]}`
  }

  const handleEditButtonClick = () => {
    if(textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
      toast("Edit Mode", { duration: 1000 })
    }
    setIsEditMode(true)
  }

  useEffect(() => {
    if(textareaRef.current){
      textareaRef.current.style.minHeight = textareaRef.current.scrollHeight + 'px'
    }
  }, [textareaRef.current?.scrollHeight])
  

  return (
    <>
    <div className="flex flex-col px-1 py-2 rounded shadow-sm border-2 border-[#ddd]" style={{background: note.theme}}>
      <textarea 
        ref={textareaRef} 
        readOnly={!isEditMode}
        onChange={(e) => setText(e.target.value)}
        className="textarea-class resize-none bg-transparent border-none outline-none min-h-[200px] w-full flex-1 text-[#222]"
        value={text}
        autoFocus
      >
      </textarea>

      <div className="px-2 py-0 flex items-center gap-2">
        <p className="flex-1 text-[#555] text-md">{getDateString(note.timestamp)}</p>
        {!isEditMode && (
            <button title="Enable Edit Note" onClick={handleEditButtonClick} className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#222] hover:bg-[#ffb703] border-none outline-none cursor-pointer">
              <Image
                src={'/assets/icon-pencil.svg'}
                width={20}
                alt="edit content icon"
                height={20}
                className="text-white"
              />
            </button>
          )
        }
        {isEditMode && (
            <button title="Save Note" onClick={handleSaveNote} className="bg-green-600 flex justify-center items-center w-[30px] h-[30px] rounded-full border-none outline-none cursor-pointer">
              <Image
                src={'/assets/icon-save.svg'}
                width={20}
                alt="delete content icon"
                height={20}
                className="text-white"
          />
            </button >
          )
        }
        <button title="Delete Note" className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#222] hover:bg-[#ce2828] border-none outline-none cursor-pointer" onClick={(e) => deleteNote(note.id)}>
          <Image
            src={'/assets/icon-trash.svg'}
            width={20}
            alt="delete content icon"
            height={20}
            className="text-white"
          />
        </button>

        <button title="Copy Text" className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#222] hover:bg-[#6b6666] border-none outline-none cursor-pointer" onClick={() => handleCopyText()}>
          <Image
            src={'/assets/icon-copy.svg'}
            width={20}
            alt="delete content icon"
            height={20}
            className=""
          />
        </button>
      </div>
    </div>
    </>
  )
}

export default Note