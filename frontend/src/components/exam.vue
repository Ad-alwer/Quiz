<template>
  <div v-if="!loading">
    <div class="my-4 py-3 mx-2 rounded-4 border border-info border-2">
      <p class="text-uppercase text-center fw-bold fs-1">{{ name }}</p>
      <div class="d-flex justify-content-center flex-nowrap gap-2">
        <input
          v-for="x in field"
          :key="x"
          :placeholder="x.name"
          type="text"
          :ref="x.name + 'inp'"
          class="form-control text-capitalize ms-1 border-1 border-black inputfield"
        />
      </div>
      <div id="timer" class="text-danger fs-2">
        <p>{{ minutes }}:{{ seconds }}</p>
      </div>
    </div>
    <div>
      <div
        v-for="x in questions"
        :key="x"
        class="mt-3 border border-2 border-info my-4 py-3 mx-2 rounded-4"
      >
        <p class="fs-5 fw-bold text-center">{{ x.Question }}</p>
        <div class="d-flex justify-content-around mt-3 disabled">
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option1"
            @click.prevent="check(x.Question, x.Option1, 1)"
            :ref="x.Question + 'Option1'"
          />
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option2"
            @click.prevent="check(x.Question, x.Option2, 2)"
            :ref="x.Question + 'Option2'"
          />
        </div>
        <div class="d-flex justify-content-around mt-3">
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option3"
            @click.prevent="check(x.Question, x.Option3, 3)"
            :ref="x.Question + 'Option3'"
          />
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option4"
            @click.prevent="check(x.Question, x.Option4, 4)"
            :ref="x.Question + 'Option4'"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <img src="../assets/Imgs/clear.png" @click="clear(x.Question)" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary fs-5 py-2 px-4" @click="finish">
        Finish
      </button>
    </div>

    <div></div>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import axios from "axios";
import loader from "../components/loader.vue";
import { info } from "../../config/default";
import regfunc from "../components/reg.vue";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

let apiaddress = info.fetch["address"];
export default {
  name: "exam",
  beforeMount() {
    let locationhash = location.hash;
    let loc = locationhash.split("m/")[1];
    this.h1 = loc;
    axios.get(`${apiaddress}search/${loc}`).then((data) => {
      if (data.data.status) {
        if (data.data.data.status == "open") {
          data.data.data.field.forEach((e) => {
            let newfield = {
              name: e,
              val: null,
            };
            this.field.push(newfield);
          });

          this.examdetail = data.data.data;
          this.name = data.data.data.name;
          this.autor = data.data.data.autor;
          this.questions = data.data.data.questions;
          this.remainingTime = data.data.data.time * 60;
          this.questions.forEach((e) => {
            let newanswer = {
              question: e.Question,
              correct: e.answer,
              personanswer: null,
            };
            this.answer.push(newanswer);
          });
        } else {
          location.href = "#/404";
        }
      } else {
        location.href = "#/404";
      }
    });
  },
  computed: {
    minutes() {
      return Math.floor(this.remainingTime / 60)
        .toString()
        .padStart(2, "0");
    },
    seconds() {
      return (this.remainingTime % 60).toString().padStart(2, "0");
    },
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.loading = false;
      }
    };
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.intervalId);
        console.log("finish");
      }
    }, 1000);
  },
  data() {
    return {
      examdetail: [],
      field: [],
      name: [],
      autor: null,
      questions: [],
      answer: [],
      remainingTime: null,
      intervalId: null,
      loading: true,
      fieldsval: false,
    };
  },
  methods: {
    check: function (question, option, num) {
        this.field.forEach((e) => {
        const ref = e.name + "inp";

        if (this.$refs[ref][0].value) {
          e.val = this.$refs[ref][0].value;
          this.fieldsval = true
        } else {
          Toast.fire({
            icon: "error",
            title: `Please Fill All Inputs`,
          });
          return this.fieldsval =false
        }
    });
   
    if(this.fieldsval){
        let options = [
        `${question}Option1`,
        `${question}Option2`,
        `${question}Option3`,
        `${question}Option4`,
      ];
      let answer = `${question}Option${num}`;

      let item = this.$refs[answer];

      let index = options.findIndex((e) => {
        return e == answer;
      });
      options.splice(index, 1);
      options.forEach((e) => {
        this.$refs[e][0].style.backgroundColor = "#fff";
      });
      item[0].style.backgroundColor = "#66bb6a";

      let answerindex = this.answer.findIndex((e) => {
        return e.question == question;
      });

      this.answer[answerindex].personanswer = option;
    
    }
},
    clear: function (question) {
      let options = [
        `${question}Option1`,
        `${question}Option2`,
        `${question}Option3`,
        `${question}Option4`,
      ];
      options.forEach((e) => {
        this.$refs[e][0].style.backgroundColor = "#fff";
      });
      let answerindex = this.answer.findIndex((e) => {
        return e.question == question;
      });

      this.answer[answerindex].personanswer = null;
      console.log(this.answer[answerindex]);
    },
    finish: function () {
    
        let mark = this.scrore();
        let jwt = regfunc.methods.getcookies("jwt");
        axios
          .post(`${apiaddress}finish`, {
            mark,
            autor: this.autor,
            jwt,
            answers: this.answer,
            quizid: this.examdetail._id,
            field:this.field
          })
          .then((res) => console.log(res));
     
    },
    scrore: function () {
      let lenght = this.answer.length;
      let counter = 0;
      let corectcounter = 0;
      this.answer.forEach((e) => {
        let personanswer = e.personanswer;
        let corectanswer = e.correct;

        let obj = this.examdetail.questions[counter];
        if (e.correct == personanswer) {
          corectcounter++;
        } else {
          if (personanswer) {
            const foundoptioncorrect = Object.keys(obj).find(
              (key) => obj[key] === corectanswer
            );
            let correcttbtn = obj["Question"] + foundoptioncorrect;
            this.$refs[correcttbtn][0].style.backgroundColor = "#4b8c4d";

            const foundoptionfalse = Object.keys(obj).find(
              (key) => obj[key] === personanswer
            );
            let Falsetbtn = obj["Question"] + foundoptionfalse;
            this.$refs[Falsetbtn][0].style.backgroundColor = "#fc2100";
            //   console.log(obj['Question'])
            //   console.log(foundoptionfalse);
          } else {
            const foundoptioncorrect = Object.keys(obj).find(
              (key) => obj[key] === corectanswer
            );
            let correcttbtn = obj["Question"] + foundoptioncorrect;
            this.$refs[correcttbtn][0].style.backgroundColor = "#4b8c4d";
          }
        }

        counter++;
      });
      let resualt = (corectcounter / lenght) * 100;
      return resualt;
    },
    checkfield: function () {
      this.field.forEach((e) => {
        const ref = e.name + "inp";

        if (this.$refs[ref][0].value) {
          e.val = this.$refs[ref][0].value;
          console.log(e);
        } else {
          Toast.fire({
            icon: "error",
            title: `Please Fill All Inputs`,
          });
          return (this.fieldsval = false);
        }
        return (this.fieldsval = true);
      });
    },
  },
  components: {
    loader,
  },
};
</script>

<style scoped>
.inputfield {
  width: 350px;
}
input {
  width: 450px;
  cursor: pointer;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
img {
  width: 60px;
  cursor: pointer;
}
#timer {
  position: fixed;
  top: 10%;
  right: 3%;
}
#timer p {
  font-family: "Digital";
}
</style>
