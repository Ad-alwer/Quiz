const express = require("express");
const cors = require("cors");
const app = express();

const userDB = require("./Database/users");
const quizDB = require("./Database/Quiz");

app.use(express.json());
app.use(cors());

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
        userDB.addcreate(autor["id"], data._id);
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

// finish
app.post("/finish", (req, res) => {
 console.log( req.body.answers)
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
          req.body.quizid
        )
        .then(() => {
          return res.send({ status: "complete" });
        });
    });
});
//

app.listen(3000, () => console.log("listen"));
