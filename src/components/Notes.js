import { useState, useEffect, useRef } from 'react'
import noteService from '../services/notes'

import Note from './Note'
import Togglable from './Togglable'
import NoteForm from './NoteForm'

export default function Notes({ setErrorMessage }) {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const noteFormRef = useRef()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])
        
      useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            setIsLoggedIn(true)
        }
      }, [])


    const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
      
    noteService
        .update(id, changedNote)
        .then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
            setErrorMessage(
                `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        })
    }

    const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
        .create(noteObject)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
        })
    }

    const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
    </Togglable>
    )
      
    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    return (
        <>
            {isLoggedIn ? noteForm() : null}
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
                </button>
            </div>      
            <ul>
                {notesToShow.map(note => 
                <Note
                    key={note.id}
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                />
                )}
            </ul>
        </>
      )
}