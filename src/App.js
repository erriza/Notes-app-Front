import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import Users from './components/Users'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [username, setUsername] = useState('') 
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  console.log(isLoggedIn)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     noteService.setToken(user.token)
  //   }
  // }, [])

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
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />
      <Users 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

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

      <Footer />
    </div>
  )
}

export default App