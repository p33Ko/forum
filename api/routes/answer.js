const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  POST_ANSWER,
  GET_ANSWERS,
  DELETE_ANSWER,
  GET_ALL_ANSWERS,
} = require("../controllers/answers");

router.post("/question/:id/answers", POST_ANSWER);

router.get("/question/:id/answers", GET_ANSWERS);

router.delete("/answer/:id", auth, DELETE_ANSWER);

router.get("/answers", GET_ALL_ANSWERS);

module.exports = router;
