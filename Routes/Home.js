const express = require("express");
const router = express.Router();
const userData = require("../Public/data/users.json");

router.get("/", (req, res) => {
  res.render("Home");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

router.post("/login", (req, res, next) => {
  const { username = "", password = "" } = req.body;
  if (!username || !password) {
    let err = new Error(`Field harus diisi lengkap!`);
    err.statusCode = "001";
    err.shouldRedirect = true;

    next(err);
  } else {
    for (let i = 0; i < userData.length; i++) {
      const { id, username: name, password: pass, email } = userData[i];
      if (name.includes(username) && pass.includes(password)) {
        res.status(200);
        res.redirect("/");
        break;
      } else {
        let err = new Error(`Username atau password tidak sesuai!`);
        err.statusCode = "002";
        err.shouldRedirect = true;

        next(err);
        break;
      }
    }
  }
});

router.get("/rockpaperscissor", (req, res) => {
  res.render("RockPaperScissor");
});

module.exports = router;
