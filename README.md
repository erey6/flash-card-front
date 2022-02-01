# BIGGER BRAIN flashcard app

Links to the Bigger Brain flashcard and quiz app.
Front end: https://github.com/erey6/flash-card-front
Back end: https://github.com/erey6/flash-card-back
App hosted on Azure: https://flashcardreact.azurewebsites.net/

The app was inspired by my use of flashcards to learn Javascript array methods for the General Assembly Software Engineering Immersive course.

## Technology used
- Front end was bootstrapped with Create React App.
- User authentication is implemented with Firebase. A user can log in with their Google account or create an email account.
- Backend database uses PostreSQL.
- RESTful routes to the database are achieved with ASP.NET and the Entity Core Framework.
- Styling for the front end was created with Tailwind and Google fonts.
- The front end and the back end ASP.NET API are hosted on Microsoft Azure. 
- The database is hosted on a Google Cloud e2 instance running Ubuntu.

## How to use the app
- No login needed to try a quiz or a flashcard deck
- When taking a quiz, the user sees how many questions they have answered correctly.
- A user can create a flashcard deck or quiz once logged in.
- A user can post deck public or private.
- After creating the deck, a user can edit the information. 

# Issues in the creation
- On the back end, .NET 5 had advanced to version 6 just a week before I began this project. I made the decision to use .NET 5 so I could follow more tutorials on the web. However, I had to roll back many of the packages that were installed, because by default any packages I installed with NuGet were for version 6. 
- Also, on the back end, I wasn't able to properly set up a one-to-many relationship. This was due to the unfamiliarity with the ASP.NET and the Entity Core Framework.
- On the front end, I chose to use Firebase authentication. I initially had trouble with veryifying on different pages, but eventually dove deep enough into the documention to keep various pages behind login walls.
