

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const { dbUser, database, connectionString } = require("../config").massive;
const { secret } = require("../config").session;
const { domain, clientID, clientSecret } = require("../config.js").passportAuth0;

const port = 3001;
// const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log);

const recipeCtrl = require('./controllers/recipe_controller');
const favoriteCtrl = require('./controllers/favorites_controller');
const userCtrl = require('./controllers/user_controller');

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
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
  "/api/login",
  passport.authenticate("auth0", { successRedirect: "http://localhost:3000/dashboard" })
);



app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);
  res.status(200).json(req.user);
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

// app.get("/api/logout", passport.authenticate('autho0', {successRedirect: "http://localhost:3000/"}))


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

//user attributes
app.get('/api/users/dashboard', userCtrl.getAllUserData);
app.post('/api/favorites/:user_id', favoriteCtrl.addFavorite);
app.get('/api/favorites/:user_id', favoriteCtrl.getFavorites);
app.get('/api/users/:user_id/tastes', userCtrl.getUserTastes);





app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});