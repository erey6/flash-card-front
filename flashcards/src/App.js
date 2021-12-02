import './App.css';
import { useState } from 'react';
import Header from './components/header.js';

const App = () => {
  const [loggedIn, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(!loggedIn)
  }

  return (
    <>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} />

    </>

  )
}

export default App;
