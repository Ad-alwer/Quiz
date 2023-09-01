<template>
  <div
    :class="
      edit
        ? 'container d-flex flex-column blur'
        : 'container d-flex flex-column'
    "
  >
    <pheader />
    <div class="justify-content-center d-flex my-3">
      <nav class="d-flex justify-content-center rounded-4 user">
        <img
          src="../assets/Imgs/img.png"
          class="img-thumbnail rounded-4"
          alt=""
        />
        <div class="ms-5 mt-4 texts">
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
    </div>
    <div class="d-flex justify-content-center my-3">
      <shower type="quiz" class="w-50" />
    </div>
    <div class="d-flex justify-content-center my-3">
      <shower type="create" class="w-50" />
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
import shower from "../components/Profile/lastshower.vue";
import { info } from "../../config/default";
import regfunc from "../components/reg.vue";
// import Swal from "sweetalert2";

let jwt = regfunc.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];
export default {
  name: "Profile",
  beforeMount() {
    if (jwt) {
      this.getuser();
    } else {
      location.href = "#/login";
    }
  },
  components: {
    pheader,
    pedit,
    shower,
  },
  data() {
    return {
      edit: false,
      user: [],
    };
  },
  methods: {
    getuser: function () {
      axios.get(`${apiaddress}jwt/${jwt}`).then((res) => {
        if (res.data.status == "ok") {
          this.user = res.data.data;
        } else {
          location.href = "#/login";
        }
      });
    },
    closepopup: function () {
      this.edit = false;
      this.getuser();
    },
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
.user {
  width: 50%;
  border: 2px #c5c2e7 solid;
  padding: 10px;
  box-shadow: -3px 26px 30px -32px rgba(0, 0, 0, 1);
  -webkit-box-shadow: -3px 26px 30px -32px rgba(0, 0, 0, 1);
  -moz-box-shadow: -3px 26px 30px -32px rgba(0, 0, 0, 1);
}
@media screen and (max-width: 768px) {
  .user {
    width: 60%;
  }
  img {
    scale: 0.72;
    position: relative;
    left: 20%;
  }
  .texts {
    scale: 0.85;
   position: relative;
   left: -20px;
  }
  #editawesome {
    position: absolute;
    right: 30%;
  }
}
</style>
