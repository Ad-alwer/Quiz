const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt =require("jsonwebtoken")

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const quizschema = new mongoose.Schema({
  name: { type: String },
  autor: {},
  field: [],
  questions: [],
  participant: [],
  time: Number,
  status: { type: String, default: "open" },
});
quizschema.plugin(timestamp);

const Quiz = mongoose.model("quiz", quizschema);

async function addquiz(name, autor, field, questions, time) {
  const quiz = new Quiz({
    name,
    autor,
    field,
    questions,
    time,
  });
  const resault = await quiz.save();
  return resault;
}
async function searchquiz(quizid) {
  let validate = mongoose.Types.ObjectId.isValid(quizid);
  if (validate) {
    let quiz = await Quiz.findOne({ _id: quizid });

    if (quiz) {
      return {
        status: true,
        data: quiz,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function addparticipant(quizid,userjwt) {
  const decode = jwt.verify(userjwt, config.info.jwt_key);
  
  let quiz = await Quiz.findOne({ _id: quizid });
  let quizez =quiz.participant
  //TODO
}

module.exports = {
  addquiz,
  searchquiz,
  addparticipant
};
