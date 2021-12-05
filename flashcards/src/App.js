import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { SignInWithGoogle, SignOutUser } from './Firebase/firebase';
import Header from './components/Header.js';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import DeckBuilder from './pages/DeckBuilder';
import Card from './pages/Card'
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CardBuilder from './pages/CardBuilder';

const App = () => {
  const [loggedIn, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({ "uid": 0 })
  const [currentDbId, setCurrentDbId] = useState()
  const [currentDeck, setCurrentDeck] = useState()
  const [usersDecks, setUsersDecks] = useState([])
  const navigate = useNavigate()


  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user===currentUser) {
      console.log('chek')
    } else if (user) {
      setCurrentUser(user)
      getDbId(user.uid)
      console.log('chek2')
      setLogin(true)
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
    navigate("/home")
  }

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    if (!loggedIn) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
  }
  //gets userID stored in database.
  const getDbId = (fbId) => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Users')
      .then(
        (response) => {
          const dbData = response.data
          const foundUser = dbData.find(({ firebaseID }) => firebaseID === fbId)
          setCurrentDbId(foundUser.id)
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  const filterUsersDecks = (data) => {
   const theseDecks = data.filter((deck) => {
     return deck.userId === currentDbId
     console.log('tring')
   })
   setUsersDecks(theseDecks)
  }

  const findUsersDecks = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Decks')
      .then(
        (response) => {
          const dbData = response.data
          console.log(dbData)
          filterUsersDecks(dbData)
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    findUsersDecks()
  },
  []
  )

  return (
    <>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} handleSignOut={handleSignOut} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp loggedIn={loggedIn} handleLogin={handleLogin} />} />

          <Route path='/home' element={
            <RequireAuth>
              <Home
                usersDecks={usersDecks}
                currentDeck={currentDeck}
                setCurrentDeck={setCurrentDeck}
                currentDbId={currentDbId}
                handleLogin={handleLogin} />
            </RequireAuth>
          } />
          <Route path="/deckbuilder" element={
            <RequireAuth>
              <DeckBuilder setCurrentDeck={setCurrentDeck} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />
          <Route path="/card" element={
            <RequireAuth>
              <Card setCurrentDeck={setCurrentDeck} currentUser={currentUser} />
            </RequireAuth>
          } />
          <Route path="/cardbuilder" element={
            <RequireAuth>
              <CardBuilder setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />
          <Route path="/login" element={
            <LogIn
              loggedIn={loggedIn}
              currentUser={currentUser}
              handleLogin={handleLogin}
              handleSignOut={handleSignOut} />
          } />
        </Routes>
      </main>


    </>

  )
}

export default App;
