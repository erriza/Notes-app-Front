import { useState } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Users from './components/Users'
import Notes from './components/Notes'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <h1>Notes App</h1>

      <Notification message={errorMessage} />
      <Users 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <Notes
        isLoggedIn={isLoggedIn}
        setErrorMessage={setErrorMessage}
      />
      <Footer />
    </div>
  )
}

export default App