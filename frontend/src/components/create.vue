<template>
  <form v-if="!shareshow" :class="formclass">
    <div>
      <p class="text-center fs-2 fw-bold text-capitalize">Create exam</p>
      <input
        ref="nameinp"
        id="nameinp"
        @keyup="namevalidator"
        type="text"
        class="form-control text-capitalize ps-2 pe-5 mt-2 ms-4 border border-2 d-inline"
        placeholder="Name"
      />
      <font-awesome-icon
        icon="fa-solid fa-times-circle"
        class="text-danger"
        id="nameawesome"
        v-if="!nameregflag"
      />
      <font-awesome-icon
        icon="fa-solid fa-check-circle"
        class="text-success"
        id="nameawesome"
        v-else
      />
      <input
        type="number"
        class="form-control ps-2 pe-2 mt-2 ms-4 border border-2 d-block"
        id="timeinp"
        ref="timeinp"
        placeholder="Time (Min)"
      />
    </div>
   
    <div class="mt-4">
      <p class="text-secondary fs-5 fw-bold">Questions</p>
      <button
        @click.prevent="addquestion"
        class="form-control fs-5 btngreen border ms-4 border-2"
      >
        +
      </button>
      <div v-for="y in quesions" :key="y" class="mt-2">
        <input
          type="text"
          class="form-control fs-5 border ms-4 border-2 text-capitalize text-center btn"
          readonly
          :value="y.Question"
          @click="deletequestion(y.Question)"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <button
        class="btn btn-info text-white px-3 py-2 me-5"
        @click.prevent="next"
      >
        Next
      </button>
      <button class="btn btn-secondary px-3 py-2"  @click.prevent="back">Back</button>
    </div>
  </form>
  <popup v-if="popupshow" @closepopup="closepop" @save="savequestion($event)" />
  <share
    v-if="shareshow"
    :url="url"
    :creatername="examname"
    :examname="examname"
  />
</template>

<script>
import Swal from "sweetalert2";
import { info } from "../../config/default";
import popup from "./create/popupcreate.vue";
import axios from "axios";

import regfuncs from "./reg.vue";
import share from "./create/share.vue";
let apiaddress = info.fetch["address"];

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

export default {
  name: "create",
  data() {
    return {
      field: ["name"],
      quesions: [],
      nameregflag: false,
      popupshow: false,
      formclass: "container mt-5",
      url: null,
      examname: null,
      examcreater: null,

      shareshow: false,
    };
  },
  methods: {
    deletefield: function (item) {
      let index = this.field.findIndex((e) => {
        return e.name == item;
      });
      this.field.splice(index, 1);
    },
    addfield: function () {
      Swal.fire({
        title: "Please Enter Field Name",
        input: "text",

        showCancelButton: true,
        confirmButtonText: "confirm",
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          let nameReg = /^[a-z A-Z]*$/;
          if (nameReg.test(name)) {
            this.field.push(name);
          } else {
            Swal.showValidationMessage("You Only Allow To Use Letter & Space");
          }
        },
      });
    },
    namevalidator: function () {
      let nameReg = /^[0-9A-Za-z\s]{5,10}$/;
      if (nameReg.test(this.$refs.nameinp.value)) {
        this.nameregflag = true;
      } else {
        this.nameregflag = false;
      }
    },
    addquestion: function () {
      this.formclass = "container mt-5 blur";
      this.popupshow = true;
    },
    closepop: function () {
      this.popupshow = !this.popupshow;
      this.formclass = "container mt-5 ";
    },
    savequestion: function (e) {
      this.quesions.push(e);
      this.closepop();
    },
    deletequestion: function (item) {
      let index = this.quesions.findIndex((e) => {
        return e.Question == item;
      });
      this.quesions.splice(index, 1);
    },
    next: function () {
      if (
        this.quesions.length > 0 &&
        this.field.length > 0 &&
        this.$refs.nameinp.value &&
        this.$refs.timeinp.value
      ) {
        let jwt = regfuncs.methods.getcookies("jwt");

        axios
          .post(`${apiaddress}add`, {
            name: this.$refs.nameinp.value,
            jwt,
            field: this.field,
            questions: this.quesions,
            time: this.$refs.timeinp.value,
          })
          .then((res) => {
            if (res.data.status == "ok") {
              let quizid = res.data.data._id;
              this.examcreater=res.data.data.autor.username
              this.examname=res.data.data.name
              this.url = `${info.server}/#/exam/${quizid}`;
              this.shareshow = true;
            }
            else{
              Toast.fire({
          icon: "info",
          title: `Try again later`,
        });
            }
          });
      } else {
        Toast.fire({
          icon: "error",
          title: `Please Fill All Inputs`,
        });
      }
    },
    back:function(){
      location.href="#/home"
    }
  },
  components: {
    popup,
    share,
  },
};
</script>

<style scoped>
#nameinp,
#timeinp {
  width: 350px;
}

.fieldbtn {
  width: 150px;
}
.btngreen {
  background-color: rgb(8, 204, 8);
}
#nameawesome {
  position: relative;
  left: -25px;
}
.blur {
  filter: blur(5px);
}
</style>
