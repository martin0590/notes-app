import { NotesContext } from "@/app/page"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"

const Note = ({ note }) => {
  const { saveNote, deleteNote } = useContext(NotesContext)

  const [isEditMode, setIsEditMode] = useState(note.editmode)
  const [text, setText] = useState(note.text)
  const textareaRef = useRef(null)

  const handleSaveNote = () => {
    saveNote(note.id, text)
    setIsEditMode(false)
  }

  const getDateString = (timestamp) =>  {
    const temp = new Date(timestamp).toDateString().split(" ")
    return `${temp[2]} ${temp[1]} ${temp[3]}`
  }

  const adjustTextareaHeight = () => {
    textareaRef.current.style.maxHeight = "1px"
    textareaRef.current.style.minHeight = "1px"
    textareaRef.current.style.height = "1px"

    textareaRef.current.style.minHeight = (
      Math.max(textareaRef.current.scrollHeight, 100)
    ) + "px"

    textareaRef.current.style.height = null
    textareaRef.current.style.maxHeight = null
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [text])
  
  useEffect(() => {
    window.addEventListener("rezise", adjustTextareaHeight)
    return () => {
      window.removeEventListener("resize", adjustTextareaHeight)
    }
  }, [])
  

  return (
    <div className="flex flex-col px-1 py-2 rounded shadow-sm border-2 border-[#ddd]" style={{background: note.theme}}>
      <textarea 
        ref={textareaRef} 
        readOnly={!isEditMode}
        onChange={(e) => setText(e.target.value)}
        className="resize-none bg-transparent border-none outline-none min-h-[100px] w-full flex-1"  
      >
        {text}
      </textarea>

      <div className="px-2 py-0 flex items-center gap-2">
        <p className="flex-1 text-[#555] text-md">{getDateString(note.timestamp)}</p>
        {!isEditMode && (
            <button onClick={(e) => setIsEditMode(true)} className="w-[30px] h-[30px] rounded-full bg-[#222] border-none outline-none cursor-pointer">
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
            <button onClick={handleSaveNote} className="w-[30px] h-[30px] rounded-full bg-[#222] border-none outline-none cursor-pointer">
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
        <button className="w-[30px] h-[30px] rounded-full bg-[#222] border-none outline-none cursor-pointer" onClick={(e) => deleteNote(note.id)}>
          <Image
            src={'/assets/icon-trash.svg'}
            width={20}
            alt="delete content icon"
            height={20}
            className="text-white"
          />
        </button>
      </div>
    </div>
  )
}

export default Note