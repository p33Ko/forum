const express = require("express");
const router = express.Router();
const { REGISTER, LOGIN, GET_NEW_TOKEN } = require("../controllers/users");

router.post("/register", REGISTER);
router.post("/login", LOGIN);

router.get("/getNewJwtToken", GET_NEW_TOKEN);

module.exports = router;
