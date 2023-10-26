import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Users from './components/Users'
import Notes from './components/Notes'
import Home from './components/Home'

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <div>
      <h1>Notes App</h1>
        <Routes>
          <Route path='/notes' element={<Notes/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
        

      </div>
    </Router>

  )
}

export default App