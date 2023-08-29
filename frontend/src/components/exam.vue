<template>
  <div v-if="!loading && !detail">
    <div class="my-4 py-3 mx-2 rounded-4 border border-info border-2">
      <p class="text-uppercase text-center fw-bold fs-1">{{ name }}</p>
      <div class="d-flex justify-content-center flex-nowrap gap-2">
        <input
          v-for="x in field"
          :readonly="savedanswer"
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
        v-for="(x, i) in questions"
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
            @click.prevent="check(i, x.Option1, 1, x.Question)"
            :ref="i + 'Option1'"
          />
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option2"
            @click.prevent="check(i, x.Option2, 2, x.Question)"
            :ref="i + 'Option2'"
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
            @click.prevent="check(i, x.Option3, 3, x.Question)"
            :ref="i + 'Option3'"
          />
          <input
            type="text"
            name=""
            id=""
            class="form-control border border-1 border-black text-center"
            readonly
            :value="x.Option4"
            @click.prevent="check(i, x.Option4, 4, x.Question)"
            :ref="i + 'Option4'"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <img src="../assets/Imgs/clear.png" @click="clear(x.Question, i)" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary fs-5 py-2 px-4 mb-3" @click="finish">
        Finish
      </button>
    </div>

    <div></div>
  </div>
  <div v-else-if="loading">
    <loader />
  </div>
  <detail
    v-else-if="!loading && detail"
    :percent="mark"
    :correct="corectcounter"
    :hmquestion="length"
    :answer="answer"
  />
</template>

<script>
import axios from "axios";
import loader from "../components/loader.vue";
import detail from "../components/exam/examdetail.vue";
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
    // this.h1 = loc;
    let jwt = regfunc.methods.getcookies("jwt");

    if (jwt) {
      axios.get(`${apiaddress}jwt/${jwt}`).then((res) => {
        if (res.data.status == "ok") {
          axios
            .post(`${apiaddress}check`, {
              jwt,
              loc,
            })
            .then((res) => {
              if (res.data.status == "participant") {
                this.loading=false
                this.detail=true
                this.mark = res.data.data.mark;
                this.answer = res.data.data.answer;
                this.length = this.answer.length;
                this.corectcounter=0
                this.answer.forEach((e) => {
                  if (e.correct == e.personanswer) {
                    this.corectcounter++;
                  }
                });
              } else if(res.data.status == "creator"){
                //TODO WRITE AFTER WRITE PROFILE

              }else if(!res.data.status){
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
                    this.loading = false;
                    this.timer=true
                  } else {
                    location.href = "#/404";
                  }
                } else {
                  location.href = "#/404";
                }
              });
              }
         
            });
        } else {
          regfunc.methods.removecookies(7, jwt);
          location.href = "#/login";
        }
      });
    } else {
      location.href = "#/login";
    }
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
    
   if(this.timer){
// document.onreadystatechange = () => {
    //   if (document.readyState == "complete") {
    //     this.loading = false;
    //   }
    // };
   }
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
      loading: false,
      fieldsval: false,
      detail: true,
      mark: null,
      corectcounter: null,
      length: null,
      savedanswer: false,
      test: null,
      timer:false
    };
  },
  methods: {
    check: function (i, option, num, question) {
      if (!this.savedanswer) {
        this.field.forEach((e) => {
          const ref = e.name + "inp";

          if (this.$refs[ref][0].value) {
            e.val = this.$refs[ref][0].value;
            this.fieldsval = true;
          } else {
            Toast.fire({
              icon: "error",
              title: `Please Fill All Inputs`,
            });
            return (this.fieldsval = false);
          }
        });

        if (this.fieldsval) {
          let options = [
            `${i}Option1`,
            `${i}Option2`,
            `${i}Option3`,
            `${i}Option4`,
          ];
          let answer = `${i}Option${num}`;

          let item = this.$refs[answer];

          let index = options.findIndex((e) => {
            return e == answer;
          });
          options.splice(index, 1);
          options.forEach((e) => {
            this.$refs[e][0].style.backgroundColor = "#fff";
          });
          item[0].style.backgroundColor = "#66bb6a";
          console.log(answer);

          let answerindex = this.answer.findIndex((e) => {
            return e.question == question;
          });
          this.readonly = true;

          this.answer[answerindex].personanswer = option;
        }
      }
    },
    clear: function (question, i) {
      let options = [
        `${i}Option1`,
        `${i}Option2`,
        `${i}Option3`,
        `${i}Option4`,
      ];
      options.forEach((e) => {
        this.$refs[e][0].style.backgroundColor = "#fff";
      });
      let answerindex = this.answer.findIndex((e) => {
        return e.question == question;
      });

      this.answer[answerindex].personanswer = null;
    },
    finish: function () {
      this.savedanswer = true;
      this.mark = this.scrore();
      let jwt = regfunc.methods.getcookies("jwt");

      if (jwt) {
        axios
          .post(`${apiaddress}finish`, {
            mark: this.mark,
            autor: this.autor,
            jwt,
            answers: this.answer,
            quizid: this.examdetail._id,
            field: this.field,
          })
          .then((res) => {
            if (res.data.status == "complete") {
              setTimeout(() => {
                this.detail = true;
              }, 5000);
            }
          });
      }
    },
    scrore: function () {
      this.length = this.answer.length;
      let counter = 0;
      this.corectcounter = 0;
      this.answer.forEach((e) => {
        let personanswer = e.personanswer;
        let corectanswer = e.correct;

        let obj = this.examdetail.questions[counter];
        console.log(obj);

        if (e.correct == personanswer) {
          this.corectcounter++;
        } else {
          if (personanswer) {
            const foundoptioncorrect = Object.keys(obj).find(
              (key) => obj[key] === corectanswer
            );

            let correcttbtn = counter + foundoptioncorrect;

            this.$refs[correcttbtn][0].style.backgroundColor = "#4b8c4d";

            const foundoptionfalse = Object.keys(obj).find(
              (key) => obj[key] === personanswer
            );
            let Falsetbtn = counter + foundoptionfalse;
            this.$refs[Falsetbtn][0].style.backgroundColor = "#fc2100";
          } else {
            const foundoptioncorrect = Object.keys(obj).find(
              (key) => obj[key] === corectanswer
            );
            let correcttbtn = counter + foundoptioncorrect;
            this.$refs[correcttbtn][0].style.backgroundColor = "#4b8c4d";
          }
        }

        counter++;
      });

      let resualt = Math.ceil((this.corectcounter / this.length) * 100);
      return resualt;
    },
    checkfield: function () {
      this.field.forEach((e) => {
        const ref = e.name + "inp";

        if (this.$refs[ref][0].value) {
          e.val = this.$refs[ref][0].value;
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
    detail,
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
