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
import EditDeck from './pages/EditDeck';

const App = () => {
  const emptyDeck = [{
    "id": 6,
    "front": "",
    "back": "",
    "deckId": 8,
    "deck": null
}]
  const [loggedIn, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({ "uid": 0 })
  const [currentDbId, setCurrentDbId] = useState()
  const [currentDeck, setCurrentDeck] = useState({id:0})
  const [usersDecks, setUsersDecks] = useState([])
  const [publicDecks, setPublicDecks] = useState([])
  const [deckCards, setDeckCards] = useState(emptyDeck)
  const navigate = useNavigate()

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user===currentUser) {
    } else if (user) {
      setCurrentUser(user)
      getDbId(user.uid)
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

  const gatherCards = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Cards')
      .then(
        (response) => {
          const dbData = response.data
          const theseCards = dbData.filter((card) => {
            return card.deckId === currentDeck.id
          })
          setDeckCards(theseCards)
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  //grabs all decks that are public
  const filterPublicDecks = (data) => {
    const theseDecks = data.filter((deck) => {
      return deck.private === false
    })
    setPublicDecks(theseDecks)
   }

  //function that loooks for decks with userid
  const filterUsersDecks = (data) => {
   const theseDecks = data.filter((deck) => {
     return deck.userId === currentDbId
   })
   setUsersDecks(theseDecks)
  }
  
  //function request to API for all decks and then calls on function above for decks belonging to user 
  const findUsersDecks = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Decks')
      .then(
        (response) => {
          const dbData = response.data
          filterUsersDecks(dbData)
          filterPublicDecks(dbData)
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    findUsersDecks()
  }, [currentDbId])

  useEffect(() => {
    gatherCards()
  },
  [currentDeck]
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
              currentUser={currentUser}
                usersDecks={usersDecks}
                currentDeck={currentDeck}
                setCurrentDeck={setCurrentDeck}
                publicDecks={publicDecks}
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
              <Card currentDeck={currentDeck} deckCards={deckCards} currentUser={currentUser} />
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
          <Route path="/editdeck" element={<EditDeck currentDeck={currentDeck} deckCards={deckCards}/>} />
        </Routes>
      </main>


    </>

  )
}

export default App;
