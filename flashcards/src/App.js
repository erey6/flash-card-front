import './App.css';
import { useState } from 'react';
import { Navigate, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { SignInWithGoogle, SignOutUser } from './Firebase/firebase';
import Header from './components/Header.js';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import DeckBuilder from './pages/DeckBuilder';
import SignUp from './pages/SignUp';
import AuthContextProvider from './contexts/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const App = () => {
  const [loggedIn, setLogin] = useState(false)
  const navigate = useNavigate()

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          console.log("appjs", uid);
          console.log("appjs", uid);
          setLogin(true);
      } else {
          setLogin(false)
      }
  });


  const handleSignOut = () => {
    SignOutUser()
    setLogin(false)
    navigate("/")
}

  const handleLogin = (e) => {
    e.preventDefault()
    SignInWithGoogle()

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
      <Header loggedIn={loggedIn} handleLogin={handleLogin} handleSignOut={handleSignOut} />
      <main>
        <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Welcome loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp loggedIn={loggedIn} handleLogin={handleLogin}  />} />

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
