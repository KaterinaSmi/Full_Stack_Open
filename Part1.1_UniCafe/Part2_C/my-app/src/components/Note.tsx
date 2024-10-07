import React from 'react'
import '../index.css'

interface Note {
    id: number;
    content: string;
    important: boolean;
  }
  interface NoteProps {
    note: Note;
    toggleImportance: () => void;
}

const Note: React.FC<NoteProps> = ({note, toggleImportance}) => {
  const label = note.important
    ? 'make not important' : 'make important'
  return (
    <li className='note'> 
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note