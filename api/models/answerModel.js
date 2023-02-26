const mongoose = require("mongoose");

const answersSchema = mongoose.Schema({
  answer: { type: String, required: true, min: 3 },
  question_id: { type: String },
});

module.exports = mongoose.model("answers", answersSchema);
