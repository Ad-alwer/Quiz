const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt = require("jsonwebtoken");
// const quizDB = require("./Quiz");
mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const quizschema = new mongoose.Schema({
  username: { type: String, required: true, uniqe: true, lowercase: true },
  email: { type: String, required: true, uniqe: true, lowercase: true },
  password: { type: String, required: true },
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
  if (user) {
    return {
      status: "ok",
      data: user,
    };
  } else {
    return {
      status: false,
    };
  }
}
async function addcreate(userid, quizid, quizname) {
  let user = await User.findOne({ _id: userid });
  let usercreate = user.create;
  usercreate.push({ id: quizid, name: quizname });
  let resault = await User.findByIdAndUpdate(
    userid,
    {
      $set: {
        create: usercreate,
      },
    },
    { new: true }
  );
  return resault;
}

async function addquiz(jwt, mark, answer, autor, quizid, quizname) {
  let user = await getbyjwt(jwt);

  let userquizes = user.data.quiz;

  let newquiz = {
    quizdetail: { name: quizname, id: quizid },
    mark,
    answer,
    autor,
  };
  userquizes.push(newquiz);
  let resault = await User.findByIdAndUpdate(
    user.data._id,
    {
      $set: {
        quiz: userquizes,
      },
    },
    { new: true }
  );
  return resault;
}

async function checkuser(jwt, quizdetail) {
  let user = await getbyjwt(jwt);

  const resault = user.data.create.find((e) => {
    return e.id == quizdetail;
  });

  if (resault) {
    return {
      status: "creator",
      data: resault,
    };
  } else {
    const checkjoin = user.data.quiz.find((e) => {
      return e.quizdetail.id == quizdetail;
    });

    if (checkjoin) {
      return {
        status: "participant",
        data: checkjoin,
      };
    } else {
      return {
        status: false,
        data: checkjoin,
      };
    }
  }
}
async function usernameexist(name) {
  let user = await User.findOne({ username: name });
  if (user) {
    return true;
  } else {
    return false;
  }
}
async function emailexist(mail) {
  let user = await User.findOne({ email: mail });

  if (user) {
    return true;
  } else {
    return false;
  }
}
async function changeusername(userjwt, newusername) {
  const user = await getbyjwt(userjwt);

  let resault = await User.findByIdAndUpdate(
    user.data._id,
    {
      $set: {
        username: newusername,
      },
    },
    { new: true }
  );
  return {
    status: "ok",
    data: resault,
  };
}
async function changeemail(userjwt, newemail) {
  const user = await getbyjwt(userjwt);

  let resault = await User.findByIdAndUpdate(
    user.data._id,
    {
      $set: {
        email: newemail,
      },
    },
    { new: true }
  );
  return {
    status: "ok",
    data: resault,
  };
}
async function changepassword(userjwt, newepassword) {
  const user = await getbyjwt(userjwt);

  let resault = await User.findByIdAndUpdate(
    user.data._id,
    {
      $set: {
        password: newepassword,
      },
    },
    { new: true }
  );
  return {
    status: "ok",
    data: resault,
  };
}
async function lastshow(userjwt) {
  const user = await getbyjwt(userjwt);

  const resault = user.data.quiz.slice(0, 5);

  return resault;
}
async function getallexam(userjwt) {
  const user = await getbyjwt(userjwt);
  return user.data.quiz;
}
async function checkpartisipaint(jwt, quizid) {
  console.log(quizid);
  let user = await getbyjwt(jwt);

  let resault = user.data.create.find((e) => {
    return e.id == quizid;
  });
  console.log(resault);
  return resault;
}

module.exports = {
  adduser,
  login,
  getbyjwt,
  addcreate,
  addquiz,
  checkuser,
  usernameexist,
  emailexist,
  changeusername,
  changeemail,
  changepassword,
  lastshow,
  getallexam,
  checkpartisipaint,
  checkpartisipaint,
};
