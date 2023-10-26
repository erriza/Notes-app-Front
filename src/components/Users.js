import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'

import loginService from '../services/login'
import noteService from '../services/notes'

export default function Users({ isLoggedIn, setIsLoggedIn, errorMessage, setErrorMessage }) {

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          noteService.setToken(user.token)
        }
      }, [])

    //handle Login for User
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
          ) 
          noteService.setToken(user.token)
          setUser(user)
          setIsLoggedIn(true)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setErrorMessage('wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
    
    //Function to display the login button or not
    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }
    
        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={() => setLoginVisible(true)}>log in</button>
            </div>
            <div style={showWhenVisible}>
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
              <button onClick={() => setLoginVisible(false)}>cancel</button>
            </div>
          </div>
        )
      }

      return (
        <>
        {!user && loginForm()} 
        {user && <div>
            <p>{user.name} logged in</p>
            {/* {noteForm()} */}
            </div>
        }
        </>
      )
    }