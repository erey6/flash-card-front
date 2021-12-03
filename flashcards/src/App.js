import './App.css';
import { useState } from 'react';
import { Navigate, useLocation, Route, Routes } from 'react-router-dom';
import { SignInWithFirebase } from './Firebase/firebase';
import Header from './components/Header.js';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import DeckBuilder from './pages/DeckBuilder';
import SignUp from './pages/SignUp';
import AuthContextProvider from './contexts/AuthContext';


const App = () => {
  const [loggedIn, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(!loggedIn)
    SignInWithFirebase()

  }

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    if (!loggedIn) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
  }

  return (
    <>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} />
      <main>
        <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Welcome loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp loggedIn={loggedIn}  />} />

          <Route path='/home' element={
            <RequireAuth>
              <Home loggedIn={loggedIn} handleLogin={handleLogin} />
            </RequireAuth>
          } />
          <Route path="/deckbuilder" element={
            <RequireAuth>
              <DeckBuilder />
            </RequireAuth>
          } />
        </Routes>
        </AuthContextProvider>
      </main>


    </>

  )
}

export default App;
