<!-- eslint-disable vue/require-v-for-key -->
<template>
  <form id="popup">
    <div class="popup-inner rounded-4 d-flex flex-column">
      <div v-if="!choose">
        <nav><p class="fs-4 fw-bold text-center text-uppercase">edit</p></nav>
        <div class="d-flex justify-content-center gap-5">
          <button class="btn btn-info py-2 px-3" @click="choose ='username'">Username</button>
          <button class="btn btn-info py-2 px-3" @click="choose ='email'">Email</button>
          <button class="btn btn-info py-2 px-3" @click="choose ='password'">Password</button>
        </div>
      </div>
      <div v-else  >
        
        <div v-if="choose =='username'" class="d-flex gap-3 mt-3">
          <input
            class="form-control text-center text-capitalize border-black"
            type="text"
            name=""
            id=""
            :value="username"
            readonly
          />
          <input
            class="form-control text-capitalize border-black"
            type="text"
            ref="newusernameval"
            @keyup="checkusername"
            placeholder="New Username"
            maxlength="20"
          />
          <font-awesome-icon
            :icon="
              regexusername
                ? 'fa-solid fa-check-circle'
                : 'fa-solid fa-times-circle'
            "
            :class="
              regexusername
                ? 'text-success regexawesome '
                : 'text-danger  regexawesome'
            "
          />
        </div>
        <div v-if="choose =='email'" class="d-flex gap-3 mt-3">
          <input
            class="form-control text-center text-capitalize border-black"
            type="text"
            name=""
            id=""
            :value="email"
            readonly
          />
          <input
            class="form-control text-capitalize border-black"
            type="text"
            name=""
            id=""
            ref="newemailval"
            @keyup="checkemail"
            placeholder="New Email"
            maxlength="30"
          />
          <font-awesome-icon
            :icon="
              regexemail
                ? 'fa-solid fa-check-circle'
                : 'fa-solid fa-times-circle'
            "
            :class="
              regexemail
                ? 'text-success regexawesome'
                : 'text-danger regexawesome'
            "
          />
        </div>
        <div v-if="choose =='password'" class="d-flex gap-3 mt-3">
          <input
            class="form-control text-center text-capitalize border-black"
            type="password"
            name=""
            id=""
            :value="password"
            readonly
          />

          <input
            class="form-control  border-black"
            :type="eye ? 'text' : 'Password'"
            ref="newpassval"
            placeholder="New Password"
            maxlength="20"
          />
          <font-awesome-icon
            :icon="eye ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
            id="editawesome"
            @click="eye = !eye"
          />
        </div>
        <div class="mt-3 d-flex justify-content-center gap-4">
          <button
            class="btn-primary btn px-3 py-2 text-capitalize ms-3"
            @click="save"
          >
            Save
          </button>
          <button
            class="btn-secondary btn px-3 py-2 text-capitalize"
            @click="close"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";
import regfunc from "../../components/reg.vue";
let jwt = regfunc.methods.getcookies("jwt");
let apiaddress = info.fetch["address"];

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

export default {
  name: "popupchange",

  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  data() {
    return {
      eye: false,
      regexusername: false,
      regexemail: false,
      choose:null
    };
  },
  props: ["username", "password", "email"],
  methods: {
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
    checkusername: function () {
      const regexusername = /^[a-zA-Z][a-zA-Z0-9_]{4,29}$/;
      if (regexusername.test(this.$refs.newusernameval.value)) {
        this.regexusername = true;
      } else {
        this.regexusername = false;
      }
    },
    checkemail: function () {
      /* eslint-disable-next-line */
      const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regexemail.test(this.$refs.newemailval.value)) {
        this.regexemail = true;
      } else {
        this.regexemail = false;
      }
    },
    save: function () {
     if(this.choose == 'username'){
      if (this.checkusername) {
        if (this.$refs.newusernameval.value) {
          axios.post(`${apiaddress}edit`, {
            jwt,
            newusername: this.$refs.newusernameval.value,
          }).then(res => {
            if(res.data.status== 'ok'){
              Toast.fire({
              icon: "success",
              title: `Succesfully changed`,
            });
            this.close()
            }else{
              Toast.fire({
              icon: "error",
              title: `${res.data.msg}`,
            });
            this.close()
            }
          })
        }
      }

     }else if(this.choose == 'email'){
      
      if (this.checkemail) {
        if (this.$refs.newemailval.value) {
          axios.post(`${apiaddress}edit`, {
            jwt,
            newemail: this.$refs.newemailval.value,
          }).then(res => {
            if(res.data.status== 'ok'){
              Toast.fire({
              icon: "success",
              title: `Succesfully changed`,
            });
            this.close()
            }else{
              Toast.fire({
              icon: "error",
              title: `${res.data.msg}`,
            });
            this.close()
            }
          })
        }
      }
     }else if(this.choose =='password'){
      if(this.$refs.newpassval.value){
        axios.post(`${apiaddress}edit`, {
            jwt,
            newpassword: this.$refs.newpassval.value,
          }).then(res => {
            if(res.data.status== 'ok'){
              Toast.fire({
              icon: "success",
              title: `Succesfully changed`,
            });
            this.close()
            }
          })
      }
     }
     

      // if(!this.$refs.newpassval.value == this.password){
      //   console.log('pc')

      // }
    },
  },
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: white;
    color: black;
    position: relative;
    padding: 28px;
    max-height: 720px;
  }
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
input[type="text"],
input[type="password"] {
  width: 315px;
}
#editawesome {
  position: absolute;
  right: 6%;
  top: 33%;
  scale: 0.9;
  cursor: pointer;
}

.regexawesome {
  position: absolute;
  right: 6%;
  top: 33%;
}
</style>
