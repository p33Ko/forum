const QuestionSchema = require("../models/questionModel");

module.exports.CREATE_QUESTION = function (req, res) {
  const question = new QuestionSchema({
    title: req.body.title,
    question: req.body.question,
    dateCreated: new Date(),
    answers_ids: [],
  });

  question.save().then(() => {
    return res
      .status(200)
      .json({ response: "Question was created succesfully" });
  });
};

module.exports.GET_QUESTIONS = function (req, res) {
  QuestionSchema.find()
    .sort("question")
    .then((results) => {
      return res.status(200).json({ question: results });
    });
};

module.exports.GET_QUESTION_BY_ID = function (req, res) {
  QuestionSchema.findOne({ _id: req.params.id }).then((results) => {
    return res.status(200).json({ question: results });
  });
};

module.exports.DELETE_QUESTION = (req, res) => {
  QuestionSchema.deleteOne({ _id: req.params.id }).then((question) => {
    return res.status(200).json({
      statusMessage: "Question was successfully deleted",
      deleted: question,
    });
  });
};
