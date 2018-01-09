

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require('dotenv').config();
// const { dbUser, database, connectionString } = require("../config").massive;
// const { secret } = require("../config").session;
// const { domain, clientID, clientSecret } = require("../config.js").passportAuth0;
// const domain = process.env.PASSPORT_DOMAIN;
// const clientID = process.env.PASSPORT_CLIENT_ID;
// const clientSecret = process.env.PASSPORT_CLIENT_SECRET;
// const secret = process.env.SESSION_SECRET;
const port = 3001;
// const connectionString = `postgres://${dbUser}@localhost/${database}`;
// console.log(process.env.CONNECTION_STRING);
const app = express();
app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);


app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.PASSPORT_DOMAIN,
      clientID: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
      callbackURL: "/api/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .get_user_by_auth_id(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .create_user_by_auth_id([profile.id, profile.displayName])
              .then(created => {
                console.log(created);
                return done(null, created[0]);
              });
          } else {
            console.log(response)
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  "/api/login", function(req, res, next) {
    console.log("redirected")
    next()
  },
  passport.authenticate("auth0", { successRedirect: "/dashboard" })
);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})



app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);
    req.app.get('db').get_user_by_auth_id([req.user.authid])
    .then((user) => res.status(200).send(user[0] ))
    .catch(() => res.status(500).send());

  
});

app.get("/api/test", (req, res, next) => {
  req.app
    .get("db")
    .get_users()
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.get("/api/logout", passport.authenticate('autho0', {successRedirect: "http://localhost:3000/"}))
const recipeCtrl = require('./controllers/recipe_controller');
const favoriteCtrl = require('./controllers/favorites_controller');
const userCtrl = require('./controllers/user_controller');


//recipes
app.get('/api/recipes', recipeCtrl.getAll);
app.get('/api/steps/:recipe_id', recipeCtrl.getSteps);
app.get('/api/recipe/:recipe_id', recipeCtrl.getRecipe);
app.get('/api/ingredients/:recipe_id', recipeCtrl.getIngredients);
app.post('/api/recipes/:user_id', recipeCtrl.addRecipe);
app.get('/api/recipes/:user_id', recipeCtrl.getUserRecipes);
app.post('/api/recipes/steps/:recipe_id', recipeCtrl.addStep);
app.get('/api/recipes/:title/recommended', recipeCtrl.getRecommended);
app.get('/api/comments/:recipe_id', recipeCtrl.getRecipeComments);
app.post('/api/comments/:recipe_id', recipeCtrl.addComment);
app.put('/api/recipes/:recipe_id/edit', recipeCtrl.updateRecipe);
app.put('/api/recipes/:recipe_id/steps/edit', recipeCtrl.updateRecipeSteps);
app.put('/api/recipes/:recipe_id/ingredients/edit', recipeCtrl.updateRecipeIngredients);
app.post('/api/recipes/ingredients/:recipe_id', recipeCtrl.addIngredient);
app.delete('/api/recipes/:recipe_id', recipeCtrl.deleteRecipe);
app.delete('/api/recipes/ingredients/:recipe_id', recipeCtrl.deleteIngredients);
app.delete('/api/recipes/steps/:recipe_id', recipeCtrl.deleteSteps);
app.get('/api/recipes/search/:search_terms', recipeCtrl.searchRecs);

//user attributes
app.get('/api/users/dashboard', userCtrl.getAllUserData);
app.post('/api/favorites/:user_id', favoriteCtrl.addFavorite);
app.get('/api/favorites/:user_id', favoriteCtrl.getFavorites);
app.get('/api/users/:user_id/tastes', userCtrl.getUserTastes);
app.put('/api/users/:user_id/edit', userCtrl.updateUser);



const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});