const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt = require("jsonwebtoken");
const userDB = require("./users");

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

async function addparticipant(quizid, userjwt, mark, answer, field) {
  const decode = jwt.verify(userjwt, config.info.jwt_key);

  let quiz = await Quiz.findOne({ _id: quizid });
  let participantquizez = quiz.participant;
  let newparticipant = {
    participantid: decode._id,
    mark,
    answer,
    field,
  };

  participantquizez.push(newparticipant);
  let resault = await Quiz.findByIdAndUpdate(
    quizid,
    {
      $set: {
        participant: participantquizez,
      },
    },
    { new: true }
  );
  console.log(resault);
}
async function findquiz(quizid) {
  let quiz = await Quiz.findOne({ _id: quizid });
  if (quiz) {
    return {
      status: "ok",
      data: quiz,
    };
  } else {
    return {
      status: false,
    };
  }
}

async function getlastquiz(jwt) {
  let user = await userDB.getbyjwt(jwt);
  let quiz = await Quiz.find(
    { "autor.id": user.data._id },
    {
      _id: 1,
      name: 1,
      participantcount: { $size: "$participant" },
    }
  ).limit(5);

  return quiz;
}
async function getallquiz(jwt) {
  let user = await userDB.getbyjwt(jwt);
  let quiz = await Quiz.find(
    { "autor.id": user.data._id },
    {
      _id: 1,
      status: 1,
      name: 1,
      participantcount: { $size: "$participant" },
    }
  );

  return quiz;
}
async function changestatus(newstatus, id) {
  let resault = await Quiz.findByIdAndUpdate(
    id,
    {
      $set: {
        status: newstatus,
      },
    },
    { new: true }
  );
}
async function quizparticipant(quizid) {
  let quiz = await Quiz.find(
    { _id: quizid },
    {
      participant: 1,
    }
  );
  return {
    status: true,
    data: quiz,
  };
}
module.exports = {
  addquiz,
  searchquiz,
  addparticipant,
  findquiz,
  getlastquiz,
  getallquiz,
  changestatus,
  quizparticipant
};
