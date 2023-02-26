const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  title: { type: String },
  question: { type: String },
  dateCreated: { type: String },
  answers_ids: { type: Array },
});

module.exports = mongoose.model("Question", questionSchema);
