<template>
  <div class="container ms-lg-4">
    <div id="text-reg">
      <div>
        <p class="fs-1 fw-bold mt-4 mb-4 text-center text-capitalize">Login</p>
      </div>

      <div class="ms-2">
        <form action="">
          <div>
            <div class="mt-3 mb-1 ps-4">
              <label for="username-reg" class="pb-3 text-secondary"
                >Username</label
              >
              <input
                type="text"
                name="username"
                ref="usernameinput"
                id="username-reg"
                @keyup="usernamechecker"
              />
              <font-awesome-icon :class="userawesome" :icon="usernameicn" />
            </div>

            <div class="mb-4 ps-4 mt-4">
              <label for="password-reg" class="pb-3 text-secondary"
                >Password</label
              >
              <input
                type="password"
                ref="passwordinput"
                name="password"
                id="password-reg"
                @keyup="passwordchecker"
              />
              <font-awesome-icon
                id="eye-icon"
                :icon="eyeicon"
                @click="changetype"
              />
              <font-awesome-icon :class="passawesome" :icon="passicn" />
              <p class="palert" ref="passwordalert"></p>
            </div>
          </div>
          <div></div>
        </form>
      </div>

      <div class="d-flex justify-content-center flex-nowrap ">
        <button
          type="submit "
          id="btn-login"
          class="text-uppercase btn btn-danger fs-4 mt-4 px-5 py-3 rounded-4"
          @click="login"
        >
          Login
        </button>
        <button
          type="submit"
          id="btn-haveaccount"
          class="btn fs-5 mt-4 mb-2 me-1"
          @click="tosignuppage"
        >
          I need to create account
        </button>
      </div>

      <div class="mt-5 ms-3">
        <div id="footer-div">
          <div id="footer-p" class="ms-2 fs-5 pt-4 d-flex flex-nowrap ">
            <p class="text-capitalize ">Follow us in our social media</p>
          </div >
          <div id="footer-icn" class="ms-5 pt-3 d-flex justify-content-center flex-nowrap">
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1"
              icon="fa-brands fa-instagram"
              @click="social('instagram')"
            />
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1 ms-2"
              icon="fa-brands fa-telegram"
              @click="social('telegram')"
            />
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1 ms-2"
              icon="fa-brands fa-github"
              @click="social('github')"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="img-reg-div">
      <img class="" id="img" src="../assets/Imgs/pen.png" alt="" />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import regfuncs from "./reg.vue";
import axios from "axios";
import { info } from "../../config/default";
let jwt = regfuncs.methods.getcookies("jwt");
export default {
  name: "login",
  beforeMount() {
    if (jwt) {
      regfuncs.methods.removecookies(7, jwt);
    }
  },
  data() {
    return {
      eyeicon: "fa-solid fa-eye-slash",

      passicn: "fa-solid fa-check-circle",

      usernameicn: "fa-solid fa-check-circle",

      passawesome: "icons-check",
      userawesome: "icons-check",
    };
  },
  methods: {
    social: function (name) {
      if (name == "telegram") {
        location.href = "https://t.me/Alwerco";
      } else if (name == "instagram") {
        location.href = "https://github.com/Ad-alwer";
      } else if (name == "github") {
        location.href = "https://github.com/Ad-alwer";
      }
    },
    changetype: function () {
      if (this.$refs.passwordinput.type == "password") {
        this.$refs.passwordinput.type = "text";
        this.eyeicon = "fa-solid fa-eye";
      } else if (this.$refs.passwordinput.type == "text") {
        this.$refs.passwordinput.type = "password";
        this.eyeicon = "fa-solid fa-eye-slash";
      }
    },
    tosignuppage: function () {
      location.href = "#/register";
    },
    emailchecker: function () {
      /* eslint-disable-next-line */
      const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexemail.test(this.$refs.emailinput.value)) {
        this.emailawesome = "icons-times";
        this.emailicn = "fa-solid fa-times-circle";
        return false;
      } else {
        this.emailawesome = "icons-check";
        this.emailicn = "fa-solid fa-check-circle";
        return true;
      }
    },
    usernamechecker: function () {
      /* eslint-disable-next-line */
      const regexusername = /^[a-zA-Z][a-zA-Z0-9_]{4,29}$/;
      if (!regexusername.test(this.$refs.usernameinput.value)) {
        this.userawesome = "icons-times";
        this.usernameicn = "fa-solid fa-times-circle";
        return false;
      } else {
        this.userawesome = "icons-check";
        this.usernameicn = "fa-solid fa-check-circle";
        return true;
      }
    },
    passwordchecker: function () {
      /* eslint-disable-next-line */
      const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!regexpassword.test(this.$refs.passwordinput.value)) {
        this.passawesome = "icons-times";
        this.passicn = "fa-solid fa-times-circle";
        return false;
      } else {
        this.passawesome = "icons-check";
        this.passicn = "fa-solid fa-check-circle";
        return true;
      }
    },
    login: function () {
      const passwordvalidate = this.passwordchecker();
      const usernamevalidate = this.usernamechecker();
      let apiaddress = info.fetch["address"];
      if (passwordvalidate && usernamevalidate) {
        axios
          .post(`${apiaddress}login`, {
            username: this.$refs.usernameinput.value.toLowerCase(),
            password: this.$refs.passwordinput.value,
          })
          .then((data) => {
            if (data.data.code == 200) {
              this.$refs.passwordalert.innerHTML = "";
              regfuncs.methods.setcookies(7, data.data.token);
              Swal.fire({
                icon: "success",
                title: "Welcome back",
                showConfirmButton: false,
                timer: 1500,
              });
              setInterval(() => {
                location.href = "#/home";
              }, 1600);
            } else {
              this.$refs.passwordalert.innerHTML = data.data.message;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  overflow: hidden;
  /* text-transform: capitalize */
  letter-spacing: 0.8px;
}
div.container {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
input[type="text"],
input[type="password"] {
  outline: none;
  border: none;
  border-bottom: 2px solid black;
  border-radius: 4px;
  width: 70%;
}
label {
  display: block;
}
#text-reg {
  /* background-color: blueviolet; */
  width: 90%;
  font-family: "Lora";
  display: flex;
  flex-direction: column;
}

#img-reg {
  width: 10%;
  background-color: aqua;
}
.icons-check {
  margin-left: -15px;
  color: green;
}
.icons-times {
  margin-left: -15px;
  color: red;
}
#btn-haveaccount {
  margin-left: 20%;
  border-bottom: 2px solid var(--blue);
  border-radius: 0;
}
#footer-div {
  display: flex;
  border-top: 2px solid rgba(0, 0, 0, 0.562);
}
#footer-p {
  flex: 2;
}
#footer-icn {
  flex: 1;
}
.icon-brand {
  border: 1px solid rgba(0, 0, 0, 0.945);
  cursor: pointer;
}
#img-reg-div {
  position: relative;
  left: -80px;
}
#img {
  scale: 1.2;
  position: relative;
  top: 80px;
  left: -55px;

  z-index: 5;
}
#eye-icon {
  margin-left: -45px;
  margin-right: 25px;
  cursor: pointer;
}
.palert {
  font-size: 15px;
  margin-top: 5px;
  font-family: "Lora";
  color: #e60a0a;
}
@media screen and (max-width: 1080px) {
  #img-reg-div {
    display: none;
  }
  .icon-brand{
  scale: 0.9;
  margin: 0; 
}
}
@media screen and (max-width: 768px) {
 
    #btn-haveaccount {
      margin-left: 7%;
      
      
      
    
  }
  input[type="text"],
input[type="password"] {

  width: 95%;
}
.icon-brand{
  scale: 0.8;
  margin: 0; 
}
#footer-p p{
  
  text-align: center;
  
}
}
</style>
