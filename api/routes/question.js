const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  CREATE_QUESTION,
  GET_QUESTIONS,
  GET_QUESTION_BY_ID,
  DELETE_QUESTION,
} = require("../controllers/questions");

router.post("/question", CREATE_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.get("/question/:id", GET_QUESTION_BY_ID);
router.delete("/question/:id", auth, DELETE_QUESTION);

module.exports = router;
