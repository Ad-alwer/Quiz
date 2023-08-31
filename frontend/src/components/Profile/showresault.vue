vue
<template>
    <div>
        <a href="#/home">
            <img src="../../assets/Imgs/home.png" class="img-fluid " alt="">
        </a>
    </div>
  <div id="parent" class="d-flex justify-content-center">
    <div class="child my-4">
      <table class="table">
        <thead>
          <tr>
            <th class="text-capitalize text-center w-50">name</th>
            <th class="text-capitalize text-center w-25 border-start">mark</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in arr" class="custom-row-height" :key="x">
            <th class="text-center pb-1 text-capitalize align-middle">
              {{ x.field[0].val }}
            </th>
            <th
              class="text-center pb-1 text-capitalize border-start align-middle"
            >
              {{ x.mark }}/100
            </th>
          </tr>
        </tbody>
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
export default {
  name: "report",
  beforeMount() {
    if (jwt) {
      let locationhash = location.hash;
      this.quizid = locationhash.split("report/")[1];
      axios
        .post(`${apiaddress}report`, {
          jwt,
          quizid: this.quizid,
        })
        .then((res) => {
          if (res.data.status) {
            let lastarr = res.data.data[0].participant;
            lastarr.forEach((e) => {
              if (e.field[0].val) {
                this.arr.push(e);
              }
            });
          } else {
            location.href = "#/login";
          }
        });
    } else {
      location.href = "#/login";
    }
  },

  data() {
    return {
      quizid: "",
      arr: [],
    };
  },
};
</script>

<style scoped>
.child {
  width: 70%;
}
img{
    width: 30px;
    position: absolute;
    bottom: 10%;
    right: 3%;
   
}
</style>
