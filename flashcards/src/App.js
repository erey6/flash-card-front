import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Welcome from './pages/Welcome';
import Home from './pages/Home';


const App = () => {
  const [loggedIn, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(!loggedIn)
  }

  return (
    <>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} />
      <main>
        <Routes>
          <Route path='/welcome' element={<Welcome loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path='/home' element={<Home loggedIn={loggedIn} handleLogin={handleLogin} />} />
        </Routes>
      </main>


    </>

  )
}

export default App;
