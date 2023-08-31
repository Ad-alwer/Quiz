const express = require("express");
const cors = require("cors");
const app = express();

const userDB = require("./Database/users");
const quizDB = require("./Database/Quiz");

app.use(express.json());
app.use(cors());

//JWT App.vue
app.get("/jwt/:userjwt", (req, res) => {
  userDB.getbyjwt(req.params.userjwt).then((data) => res.send(data));
});
//

// Register
app.post("/reg", (req, res) => {
  userDB
    .adduser(req.body.username, req.body.email, req.body.password)
    .then((data) => {
      res.send(data);
    });
});

//

// Login
app.post("/login", (req, res) => {
  userDB.login(req.body.username, req.body.password).then((data) => {
    res.send(data);
    res.status(data.code);
  });
});
//

// Add exam
app.post("/add", (req, res) => {
  userDB.getbyjwt(req.body.jwt).then((data) => {
    let autor = { id: data.data._id, username: data.data.username };

    quizDB
      .addquiz(
        req.body.name,
        autor,
        req.body.field,
        req.body.questions,
        req.body.time
      )
      .then((data) => {
        userDB.addcreate(autor["id"], data._id, req.body.name);
        res.send({
          status: "ok",
          data: data,
        });
      });
  });
});
//

// Search exam
app.get("/search/:id", (req, res) => {
  quizDB.searchquiz(req.params.id).then((data) => res.send(data));
});
//

// Finish
app.post("/finish", (req, res) => {
  quizDB
    .addparticipant(
      req.body.quizid,
      req.body.jwt,
      req.body.mark,
      req.body.answers,
      req.body.field
    )
    .then(() => {
      userDB
        .addquiz(
          req.body.jwt,
          req.body.mark,
          req.body.answers,
          req.body.autor.username,
          req.body.quizid,
          req.body.quizname
        )
        .then(() => {
          return res.send({ status: "complete" });
        });
    });
});
//

// Check User
app.post("/check", (req, res) => {
  userDB.checkuser(req.body.jwt, req.body.loc).then((data) => res.send(data));
});
//

// Edit
app.post("/edit", (req, res) => {
  if (req.body.newusername) {
    userDB.usernameexist(req.body.newusername).then((data) => {
      if (!data) {
        userDB
          .changeusername(req.body.jwt, req.body.newusername)
          .then((data) => res.send(data));
      } else {
        res.send({
          status: "err",
          msg: "This username already taken",
        });
      }
    });
  } else if (req.body.newemail) {
    userDB.emailexist(req.body.newemail).then((data) => {
      if (!data) {
        userDB.changeemail(req.body.jwt, req.body.newemail).then((data) => {
          res.send(data);
        });
      } else {
        res.send({
          status: "err",
          msg: "This email already taken",
        });
      }
    });
  } else {
    userDB.changepassword(req.body.jwt, req.body.newpassword).then((data) => {
      res.send(data);
    });
  }
});
//

//GET last
app.get("/last/:jwt&:type", (req, res) => {
  if (req.params.type == "quiz") {
    userDB.lastshow(req.params.jwt).then((data) => res.send(data));
  } else {
    quizDB.getlastquiz(req.params.jwt).then((data) => res.send(data));
  }
});
//

// Get exams
app.get("/getexams/:jwt", (req, res) => {
  userDB.getallexam(req.params.jwt).then((data) => res.send(data));
});
//

// Get created
app.get("/getcreated/:jwt", (req, res) => {
  quizDB.getallquiz(req.params.jwt).then((data) => res.send(data));
});
//
app.post("/changestatus", (req, res) => {
  quizDB
    .changestatus(req.body.status, req.body.id)
    .then((data) => res.send(data));
});
// Changestatus

//Report

app.post("/report", (req, res) => {

  userDB.checkpartisipaint(req.body.jwt, req.body.quizid).then((data) => {
    if (data) {
      quizDB.quizparticipant(req.body.quizid).then((data) => res.send(data));
    } else {
      res.send({
        status: false,
      });
    }
  });
});

//

app.listen(3000, () => console.log("listen"));
