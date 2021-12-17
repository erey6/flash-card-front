import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'


// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)




//function checks if user is in db, if not adds them
const compareUsers = (fbId, dbData) => {
    const foundUser = dbData.find(({ firebaseID }) => firebaseID === fbId)
    if (foundUser === undefined) {
        return false
    } else {
        return true
    }
}

const addUserToDb = (user) => {
    const newUser = {"Name": user.email, "FirebaseID": user.uid}
    axios
    .post('https://flashcard6.azurewebsites.net/api/Users',
    newUser)
    .then((response) => {
    //   console.log(response)
      console.log("user added")
    })
}
//function gets users from DB
const getDbUsers = (user) => {
    axios
        .get('https://flashcard6.azurewebsites.net/api/Users')
        .then(
            (response) => {
                // console.log('db data', response.data);
                const userCheck = compareUsers(user.uid, response.data);
                if (userCheck === false) {
                    addUserToDb(user)
                }
            },
            (err) => console.error(err)
        )
        .catch((error) => console.error(error))
}


const SignInWithGoogle = () => {
    const google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            //This is the firebase id
            // const userId = user.uid
            // console.log('user id', userId);
            getDbUsers(user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            console.log(errorCode)
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            // const email = error.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

}

const CreateWithEmail = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            addUserToDb(user)

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });

}

const SignInWithEP = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
           
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}


const SignOutUser = () => {
    signOut(auth).then(() => {
        // console.log('sign out success');
        // Sign-out successful.
    }).catch((error) => {
        console.log(error);
    });
}

export {
    SignInWithEP,
    SignInWithGoogle,
    CreateWithEmail,
    SignOutUser
}

// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };