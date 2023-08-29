<template>
  <div
    :class="
      edit
        ? 'container d-flex flex-column blur'
        : 'container d-flex flex-column'
    "
  >
    <pheader />
    <div class="ms-5">
      <nav class="d-flex mt-5">
        <img
          src="../assets/Imgs/img.png"
          class="img-thumbnail rounded-4"
          alt=""
        />
        <div class="ms-5 mt-4">
          <p class="fw-bold text-capitalize mb-1">{{ user.username }}</p>
          <span class="text-secondary text-capitalize">{{ user.email }}</span>
        </div>
        <div class="ms-5 mt-4">
          <font-awesome-icon
            icon="fa-solid fa-edit"
            class="btn fs-6"
            id="editawesome"
            @click="edit = true"
          />
        </div>
      </nav>
      <div></div>
      <div></div>
    </div>
  </div>
  <pedit
    v-if="edit"
    @closepopup="closepopup"
    :email="user.email"
    :password="user.password"
    :username="user.username"
  />
</template>

<script>
import axios from "axios";
import pheader from "../components/Profile/header.vue";
import pedit from "../components/Profile/popupchange.vue";
import { info } from "../../config/default";
import regfunc from "../components/reg.vue";
// import Swal from "sweetalert2";

let jwt = regfunc.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "Profile",
  beforeMount() {
    if (jwt) {
     this.getuser()
    } else {
      location.href = "#/login";
    }
  },
  components: {
    pheader,
    pedit,
  },
  data() {
    return {
      edit: false,
      user: null,
    }
  },
  methods: {
    getuser:function(){
      axios.get(`${apiaddress}jwt/${jwt}`).then((res) => {
        if (res.data.status == "ok") {
          this.user = res.data.data;
        } else {
          location.href = "#/login";
        }
      });
    },
    closepopup:function(){
      this.edit = false
      this.getuser()
    }
  },
};
</script>

<style scoped>
img {
  width: 100px;
}
.blur {
  filter: blur(3px);
}
</style>
