const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const cors = require("cors");
const routes = require("./routes/api");
const Repository = require("./repository");

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "theSecretestOfSecrets",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));

//AUTHENTICATION
passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "password",
    },
    function (userId, password, done) {
      const ok = Repository.verifyUser(userId, password);

      if (!ok) {
        return done(null, false, { message: "Invalid username/password" });
      }

      const user = Repository.getUser(userId);
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = Repository.getUser(id);

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

app.use(passport.initialize());
app.use(passport.session());

//--- Routes -----------
app.use("/", routes);

//handling 404
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"));
});

module.exports = app;
