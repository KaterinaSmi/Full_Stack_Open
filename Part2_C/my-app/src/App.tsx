import { useState, useEffect } from 'react';
import Note from './components/Note';
import React from 'react';
import notesServices from './services/notes'
import './index.css'
import Notification from './components/Notification';

const App = () => {
  interface Note {
    id: number;
    content: string;
    important: boolean;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>('Some error happaned...')


  useEffect(() => {
    notesServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      .catch(error => {
        console.error(error); // Log the error for debugging
        setErrorMessage("Error fetching data");
      });
        setTimeout(() => setErrorMessage(null), 5000);
  }, []);

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: Note = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1, 
    }
    
    notesServices
    .create(noteObject)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    }).catch(error => {
      console.error(error)
      setErrorMessage('Failed to add note');
      setTimeout(() => setErrorMessage(null), 5000);
    });
   
   
  };
  

  const toggleImportanceOf = (id:number) => {
    const note = notes.find((n)=> n.id===id);
    if (!note) return;
    const changedNote = {...note, important: !note.important}

    notesServices
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n=> n.id !== id ? n : returnedNote ))
    })
    .catch(error => {
      console.error(error)
      setErrorMessage( `Note '${note.content}' was already removed from the server` )
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(note => note.id !== id))
    });

  };

 

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important === true)

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' :'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() =>toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
