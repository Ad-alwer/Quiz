<template>
  <div class="container">
    <pheader @change="change" />
    <div v-if="!loader" class="my-4">
      <div v-if="loc == 'exams'" class="d-flex justify-content-center">
        <table class="table ">
          <thead>
            <tr>
              <th class="text-capitalize text-center w-50">name</th>
              <th class="text-capitalize text-center w-25 border-start">
                mark
              </th>
              <th class="text-capitalize text-center w-25 border-start">
                show
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in arr" class="custom-row-height" :key="x">
              <th class="text-center pb-1 text-capitalize align-middle">
                {{ x.quizdetail.name }}
              </th>
              <th
                class="text-center pb-1 text-capitalize border-start align-middle"
              >
                {{ x.mark }}
              </th>
              <th
                class="text-center pb-1 text-capitalize border-start align-middle"
              >
                <button
                  type="submit"
                  class="p-2 rounded-3 btn btn-secondary text-capitalize"
                  @click.prevent="showexam(x.quizdetail.id)"
                >
                  show more
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="d-flex justify-content-center">
        <table class="table w-75">
          <thead>
            <tr>
              <th class="text-capitalize text-center w-50">name</th>
              <th class="text-capitalize text-center w-25 border-start">
                Participant
              </th>
              <th class="text-capitalize text-center w-25 border-start">
                status
              </th>
              <th class="text-capitalize text-center w-25 border-start">
                show
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in arr" class="custom-row-height" :key="x">
              <th class="text-center pb-1 text-capitalize align-middle">
                {{ x.name }}
              </th>
              <th
                class="text-center pb-1 text-capitalize border-start align-middle"
              >
                {{ x.participantcount }}
              </th>
              <th
                class="text-center pb-1 text-capitalize border-start align-middle"
                @click.prevent="statuschange(x.status, x._id)"
              >
                {{ x.status }}
              </th>
              <th
                class="text-center pb-1 text-capitalize border-start align-middle"
              >
                <button
                  type="submit"
                  class="p-2 rounded-3 btn btn-secondary text-capitalize"
                  @click.prevent="showcreate(x._id)"
                >
                  show more
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
    <loader v-else @change="change" />
  </div>
</template>
<script>
import axios from "axios";
import { info } from "../../../config/default";
import regfunc from "../../components/reg.vue";
import pheader from "./header.vue";
import loader from "../loader.vue";
let jwt = regfunc.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "shower",
  beforeMount() {
    if (jwt) {
      this.change();
    } else {
      location.href = "#/login";
    }
  },

  data() {
    return {
      loc: null,
      arr: [],
      loader: true,
      isChecked: false,
    };
  },
  methods: {
    showexam: function (id) {
      location.href = `#/exam/${id}`;
    },
    change: function () {
      this.loader = true;
      setTimeout(() => {
        let locationhash = location.hash;
        this.loc = locationhash.split("profile/")[1];
       
        if (this.loc == "exams") {
          axios.get(`${apiaddress}getexams/${jwt}`).then((res) => {
            this.arr = res.data;
          });
          this.loader = false;
        } else {
          axios.get(`${apiaddress}getcreated/${jwt}`).then((res) => {
            this.arr = res.data;
          });
          this.loader = false;
        }
      });
    },
    statuschange: function (status, id) {
      if (status == "open") {
        axios.post(`${apiaddress}changestatus`,{
          status:'close',
          id
        }).then(()=>{
          this.change()
        })
      }else{
        axios.post(`${apiaddress}changestatus`,{
          status:'open',
          id
        }).then(()=>{
          this.change()
        })
      }
    },
    showcreate:function(id){
      location.href=`#/report/${id}`
    }
  },

  components: {
    pheader,
    loader,
  },
};
</script>
<style scoped>
.custom-row-height {
  height: 60px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #101010;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
