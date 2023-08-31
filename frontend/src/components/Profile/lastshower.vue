<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="popup-inner rounded-4 d-flex flex-column">
    <div v-if="type == 'quiz'">
      <table class="table">
        <thead>
          <tr class="pb-3">
            <th class="text-capitalize text-center" scope="col">name</th>
            <th
              class="text-capitalize text-center border-start ps-3"
              scope="col"
            >
              Mark
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in quiz" @click.prevent="examview(x.quizdetail.id)">
            <th class="text-capitalize text-center w-75" w-75 scope="col">
              {{ x.quizdetail.name }}
            </th>
            <th
              class="text-capitalize text-center border-start w-25 text-center w-"
              scope="col"
            >
              {{ x.mark }}
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-dark">
            <th
              colspan="3"
              class="text-center fs-4 pt-0"
              @click.prevent="goto(type)"
            >
              ...
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr class="pb-3">
            <th class="text-capitalize w-75 text-center" scope="col">name</th>
            <th class="text-capitalize w-25 text-center border-start ps-3" scope="col">
              participant
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in quiz">
            <th
              class="text-capitalize text-center"
              scope="col"
              @click.prevent="console.log(quiz)"
            >
              {{ x.name }}
            </th>
            <th class="text-capitalize border-start ps-3 text-center" scope="col">
              {{ x.participantcount }}
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-dark">
            <th
              colspan="3"
              class="text-center fs-4 pt-0"
              @click.prevent="goto(type)"
            >
              ...
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { info } from "../../../config/default";
import regfunc from "../../components/reg.vue";
let jwt = regfunc.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];

// import Swal from "sweetalert2";

// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });

export default {
  name: "shower",
  beforeMount() {
    axios.get(`${apiaddress}last/${jwt}&${this.type}`).then((res) => {
      this.quiz = res.data;
    });
  },

  data() {
    return {
      quiz: [],
    };
  },
  props: ["type"],
  methods: {
    examview: function (id) {
      location.href = `#/exam/${id}`;
    },
    goto: function (type) {
      if(type=='quiz'){
        location.href="#/profile/exams"
      }else{
        location.href="#/profile/created"
      }
    },
  },
};
</script>

<style scoped>
.popup-inner {
  background-color: white;
  color: black;
  position: relative;
  padding: 28px;
  padding-bottom: 0px;
  max-height: 720px;
  border: 2px #C5C2E7 solid;
  box-shadow: -3px 26px 30px -32px rgba(0,0,0,1);
-webkit-box-shadow: -3px 26px 30px -32px rgba(0,0,0,1);
-moz-box-shadow: -3px 26px 30px -32px rgba(0,0,0,1);
  
  
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
tr {
  cursor: pointer;
}
</style>
