const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt = require("jsonwebtoken");
mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const quizschema = new mongoose.Schema({
  username: { type: String, required: true, uniqe: true, lowercase: true },
  email: { type: String, required: true, uniqe: true, lowercase: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, default: null },
  quiz: [],
  create: [],
});
quizschema.plugin(timestamp);

const User = mongoose.model("user", quizschema);

async function adduser(name, mail, pass) {
  let mailcheck = await User.findOne({ email: mail });
  let usernamecheck = await User.findOne({ username: name });
  if (mailcheck) {
    return {
      Problem: "email",
      message: "This email already exsit",
    };
  } else if (usernamecheck) {
    return {
      Problem: "username",
      message: "This username already exsit",
    };
  } else {
    let token;
    const user = new User({
      username: `${name}`,
      email: `${mail}`,
      password: `${pass}`,
    });
    const resault = await user.save();
    console.log(resault);
    token = jwt.sign({ _id: user.id }, config.info.jwt_key);
    return {
      Problem: false,
      message: "ok",
      token: token,
    };
  }
}

async function login(name, password) {
  let user = await User.findOne({ username: name });

  if (user) {
    if (user.password === password) {
      const token = jwt.sign({ _id: user.id }, config.info.jwt_key);
      return {
        status: true,
        code: 200,
        data: user,
        token: token,
        message: "login done",
      };
    } else {
      return {
        status: false,
        code: 404,
        message: "Your password or username was incorrect",
      };
    }
  } else {
    return {
      status: false,
      code: 404,
      message: "Your password or username was incorrect",
    };
  }
}

async function getbyjwt(userjwt) {
  const decode = jwt.verify(userjwt, config.info.jwt_key);
  let user = await User.findOne({ _id: decode });
  return {
    status: "ok",
    data: user,
  };
}
async function addcreate(userid, quizid) {
  let user = await User.findOne({ _id: userid });
  let usercreate = user.create;
  usercreate.push(quizid);
  let resault = await User.findByIdAndUpdate(
    userid,
    {
      $set: {
        create: usercreate,
      },
    },
    { new: true }
  );
  return resault
}

module.exports = {
  adduser,
  login,
  getbyjwt,
  addcreate,
};
