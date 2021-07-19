const express = require("express");
const router = express.Router();
const userData = require("../Public/data/users.json");

router.get("/", (req, res) => {
  res.json(userData);
});

module.exports = router;
