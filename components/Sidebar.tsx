'use client'

import { NotesContext } from "@/app/page"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"

const colors = [
  "#ebcfad",
  "#f5b0a4",
  "#84dada",
  "#eff5b1",
  "#9adbf6",
]

const Sidebar = () => {
  const {addNote} = useContext(NotesContext)

  const [selectedTheme, setSelectedTheme] = useState(colors[0])

  return (
    <div className="flex flex-col py-2 items-center gap-1 px-1 border-r-2 border-r-[#ccc]">
      <button 
        className="flex justify-center items-center w-[40px] h-[40px] text-[1em] bg-transparent border-2 border-[#888] rounded-full text-[#222] cursor-pointer"
        onClick={() => addNote(selectedTheme)}>
          <Image
            src={'/assets/icon-plus.svg'}
            width={20}
            alt="plus icon"
            height={20}
            className="text-white"
          />
      </button>

      <div className="mt-2">
        {colors.map((color: string) => (
          <div key={color} className="mx-2 my-0">
            <input
              type="radio"
              name="color-input"
              value={color}
              id={"color-"+color}
              checked={selectedTheme === color}
              onChange={(e) => setSelectedTheme(color)}
              className="hidden"
            />
            <label 
              className="inline-block w-[20px] h-[20px] rounded-full cursor-pointer"
              htmlFor={"color-"+color}
              style = {{ background: color}}
            ></label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar