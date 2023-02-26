const QuestionSchema = require("../models/questionModel");
const AnswersSchema = require("../models/answerModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.POST_ANSWER = function (req, res) {
  const reply = new AnswersSchema({
    answer: req.body.answer,
  });

  reply.save().then((answer) => {
    AnswersSchema.updateOne(
      { _id: answer._id },
      { _id: answer._id, question_id: req.params.id }
    ).exec();

    QuestionSchema.updateOne(
      { _id: req.params.id },
      { $push: { answers_ids: answer._id.toString() } }
    ).exec();

    return res.status(200).json({
      statusMessage: "Answer was pubilshed successfully",
      answer: answer,
    });
  });
};
module.exports.GET_ALL_ANSWERS = async function (req, res) {
  await AnswersSchema.find()
    .sort("answers")
    .then((answers) => {
      return res.status(200).json({ answers: answers });
    });
};

module.exports.GET_ANSWERS = async function (req, res) {
  await AnswersSchema.find({ question_id: req.params.id }).then((answers) => {
    return res.status(200).json({ answers: answers });
  });
};

module.exports.DELETE_ANSWER = (req, res) => {
  AnswersSchema.deleteOne({ _id: req.params.id }).then((answers) => {
    return res.status(200).json({
      statusMessage: "Answer was successfully deleted",
      deleted: answers,
    });
  });
};
