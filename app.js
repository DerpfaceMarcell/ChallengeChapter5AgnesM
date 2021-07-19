const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");

//Routing
const home = require("./Routes/Home");
const features = require("./Routes/Features");
const newsletter = require("./Routes/Newsletter");
const requirements = require("./Routes/Requirements");
const theGames = require("./Routes/TheGames");
const topScores = require("./Routes/TopScores");
const getUsers = require("./Routes/GetUsers");

//Application level middleware
morgan("tiny");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "Public")));

//set view engine
app.set("view engine", "ejs");

//Routing Middleware
app.use("/", home);
app.use("/features", features);
app.use("/newsletter", newsletter);
app.use("/requirements", requirements);
app.use("/thegames", theGames);
app.use("/topscores", topScores);
app.use("/getusers", getUsers);

//middleware error handling
app.use("/", (err, req, res, next) => {
  console.log(JSON.stringify(err), "Ini error code");
  if (!err.statusCode && err.shouldRedirect == false) {
    err.statusCode = 500;
  } else {
    if (err.shouldRedirect) {
      res.send(`<h1>${err.message}</h1>`);
    } else {
      res.status(err.statusCode).send(err.message);
    }
  }
});

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
