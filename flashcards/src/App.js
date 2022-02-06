import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import AddQuiz from './pages/AddQuiz';
import AddQuestion from './pages/AddQuestion';
import Question from './pages/Question';
import EditQuiz from './pages/EditQuiz';
import PublicSpace from './pages/PublicSpace'

const App = () => {

  //creates emptyDeck for state so map function doesn't error out
  const emptyDeck = [{
    "id": 0,
    "front": "Loading...",
    "back": "Loading...",
    "deckId": 0,
    "deck": null
  }]
  
  //creates emptyQuiz for state so map function doesn't error out
  const emptyQuiz = [{
    "id": 0,
    "Query": "Loading...",
    "Options": ["i", "e"],
    "QuizId": 0,
    "quiz": null
  }]
  const [loggedIn, setLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({ "uid": 0 })
  const [currentDbId, setCurrentDbId] = useState()
  const [currentDeck, setCurrentDeck] = useState({ id: 4 })
  const [currentQuiz, setCurrentQuiz] = useState({ id: 1 })
  const [usersDecks, setUsersDecks] = useState([])
  const [usersQuizzes, setUsersQuizzes] = useState([])
  const [publicDecks, setPublicDecks] = useState(emptyDeck)
  const [publicQuizzes, setPublicQuizzes] = useState(emptyQuiz)
  const [deckCards, setDeckCards] = useState(emptyDeck)
  const [quizQuestions, setQuizQuestions] = useState(emptyQuiz)
  const navigate = useNavigate()

  const auth = getAuth();
  ////////////////////////////////////////////////////////
  //when user logs in, sets user, gets their database id
  ///////////////////////////////////////////////////////
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
      getDbId(user.uid)
      setLogin(true)
    } else {
      setLogin(false)
    }
  });

  ////////////////////////////////////////////////////////////////////////
  ////when someone clicks logoff, calls firebase function 'SignOutUser()'
  ///////////////////////////////////////////////////////////////////////
  const handleSignOut = () => {
    SignOutUser()
    setLogin(false)    
  }
  /////////////////////////////////////////
  //handler when someone logs in via GOOGLE
  /////////////////////////////////////////
  const handleLogin = (e) => {
    e.preventDefault()
    SignInWithGoogle()
    navigate("/home")
  }


  //////////////////////////////////////////
  //blocks off routes to nonlogged in users
  //////////////////////////////////////////  
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    if (!loggedIn) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
  }

  //delete something
  const deleteSomething = (id, address) => {
    axios
      .delete(`https://flashcard6.azurewebsites.net/api/${address}/${id}`)
      .then((response) => {
        findUsersDecks()
        if (address === "Cards") {
          gatherCards()
        } else if (address === "Questions") {
          gatherQuestions()
        } else if (address === "Quizzes") {
          findUsersQuizzes()
        }
      })
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
  
  //gets all questions for current quiz
  const gatherQuestions = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Questions')
      .then(
        (response) => {
          const dbData = response.data
          const theseQuestions = dbData.filter((question) => {
            return question.quizId === currentQuiz.id
          })
          setQuizQuestions(theseQuestions)
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  //gets all cards for current deck 
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
  
  //grabs all decks or quizzes that are public
  const filterPublicDecks = (data, type) => {
    const theseResults = data.filter((item) => {
      return item.private === false
    })
    if (type === "decks") {
      setPublicDecks(theseResults)
    } else {
      setPublicQuizzes(theseResults)
    }
  }

  //function that loooks for decks or quizzes with userid
  const filterUsersDecks = (data, type) => {

    const theseResults = data.filter((deck) => {
      if (loggedIn === true) {
        return deck.userId === currentDbId
      } else {
        return deck
      }
    })
    if (type === "decks") {
      setUsersDecks(theseResults)
    } else {
      setUsersQuizzes(theseResults)
    }

  }

  //function request to API for all decks and then calls on function above for decks belonging to user 
  const findUsersDecks = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Decks')
      .then(
        (response) => {
          const dbData = response.data
          filterUsersDecks(dbData, "decks")
          filterPublicDecks(dbData, "decks")
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  //function request to API for all decks and then calls on function above for quizzes belonging to user 
  const findUsersQuizzes = () => {
    axios
      .get('https://flashcard6.azurewebsites.net/api/Quizzes')
      .then(
        (response) => {
          const dbData = response.data
          filterUsersDecks(dbData, "quizzes")
          filterPublicDecks(dbData, "quizzes")

        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  /////////////////////////////////////////////////////////////////////////
  //after flash card is edited, gets flashcard deck again with edits added
  /////////////////////////////////////////////////////////////////////////
  const getUpdatedDeck = () => {
    let editedDeck = usersDecks.find((deck) => deck.id === currentDeck.id)
    setCurrentDeck(editedDeck)
  }
  ////////////////////////////////////////////////////////////////
  //function from editcard puts new card, then resets currentdeck
  ////////////////////////////////////////////////////////////////
  const editCard = (card) => {
    axios
      .put(`https://flashcard6.azurewebsites.net/api/Cards/${card.id}`,
        card)
      .then((response) => {
        gatherCards()
        findUsersDecks()
        getUpdatedDeck()
      })
  }

  useEffect(() => {
    findUsersDecks()
    findUsersQuizzes()
  }, [currentDbId])

  useEffect(() => {
    gatherCards()
  },
    [currentDeck]
  )

  useEffect(() => {
    gatherQuestions()
  },
    [currentQuiz]
  )


  return (
    <>

      <Header loggedIn={loggedIn} handleLogin={handleLogin} handleSignOut={handleSignOut} />
      <main>
        <Routes>
          <Route path="/card" element={<Card currentDeck={currentDeck} deckCards={deckCards} />} />
          <Route path="/question" element={<Question currentQuiz={currentQuiz} quizQuestions={quizQuestions} />} />
          <Route path="/" element={<Welcome loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp loggedIn={loggedIn} handleLogin={handleLogin} />} />

          <Route path="/publicspace" element={<PublicSpace loggedIn={loggedIn} usersDecks={usersDecks}
            usersQuizzes={usersQuizzes}
            setCurrentDeck={setCurrentDeck}
            setCurrentQuiz={setCurrentQuiz}
            gatherCards={gatherCards}
            gatherQuestions={gatherQuestions}
            publicDecks={publicDecks}
            currentDeck={currentDeck}
            currentQuiz={currentQuiz}
            publicQuizzes={publicQuizzes} />} />
          <Route path='/home' element={
            <RequireAuth>
              <Home
                currentUser={currentUser}
                usersDecks={usersDecks}
                usersQuizzes={usersQuizzes}
                setCurrentDeck={setCurrentDeck}
                setCurrentQuiz={setCurrentQuiz}
                publicDecks={publicDecks}
                publicQuizzes={publicQuizzes}
                currentDbId={currentDbId}
                loggedIn={loggedIn}
              />
            </RequireAuth>
          } />
          <Route path="/deckbuilder" element={
            <RequireAuth>
              <DeckBuilder setCurrentDeck={setCurrentDeck} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />

          <Route path="/cardbuilder" element={
            <RequireAuth>
              <CardBuilder setCurrentDeck={setCurrentDeck} findUsersDecks={findUsersDecks} currentDeck={currentDeck} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />
          <Route path="/addquestion" element={
            <RequireAuth>
              <AddQuestion currentQuiz={currentQuiz} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />
          <Route path="/addquiz" element={
            <RequireAuth>
              <AddQuiz setCurrentQuiz={setCurrentQuiz} currentQuiz={currentQuiz} currentUser={currentUser} currentDbId={currentDbId} />
            </RequireAuth>
          } />
          <Route path="/login" element={
            <LogIn
              loggedIn={loggedIn}
              currentUser={currentUser}
              handleLogin={handleLogin}
              handleSignOut={handleSignOut} />
          } />
          <Route path="/editdeck" element={<EditDeck editCard={editCard} findUsersDecks={findUsersDecks} currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} deckCards={deckCards} deleteSomething={deleteSomething} />} />
          <Route path="/editquiz" element={
            <EditQuiz findUsersQuizzes={findUsersQuizzes}
              currentQuiz={currentQuiz}
              gatherQuestions={gatherQuestions}
              quizQuestions={quizQuestions}
              deleteSomething={deleteSomething} />} />

        </Routes>
      </main>
    </>

  )
}

export default App;
