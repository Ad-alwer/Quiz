<template>
  <div class="container ms-lg-4">
    <div id="text-reg">
      <div>
        <p class="fs-1 fw-bold mt-4 mb-4 text-center text-capitalize">
          Sign up
        </p>
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
              <p class="palert" ref="usernamealert"></p>
            </div>

            <div class="mb-1 ps-4">
              <label for="email-reg" class="pb-3 text-secondary">Email</label>
              <input
                type="text"
                ref="emailinput"
                name="email"
                id="email-reg"
                @keyup="emailchecker"
              />
              <font-awesome-icon :class="emailawesome" :icon="emailicn" />
              <p class="palert" ref="emailalert"></p>
            </div>

            <div class="mb-4 ps-4">
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
            </div>
          </div>
        </form>
      </div>

      <div>
        <button
          type="submit "
          id="btn-signup"
          class="text-uppercase btn signup fs-4 mt-4 px-4 py-2 ms-5 rounded-4"
          @click="signup"
        >
          Sign up
        </button>
        <button
          type="submit"
          id="btn-haveaccount"
          class="btn fs-5 mt-4 mb-2"
          @click="tologinpage"
        >
          I am ready a member
        </button>
      </div>

      <div class="mt-5 ms-3">
        <div id="footer-div">
          <div id="footer-p" class="ms-5 fs-5 pt-4">
            <p class="text-capitalize">Follow us in our social media</p>
          </div>
          <div id="footer-icn" class="ms-5 pt-3">
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1"
              icon="fa-brands fa-instagram"
              @click="social('instagram')"
            />
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1 ms-3"
              icon="fa-brands fa-telegram"
              @click="social('telegram')"
            />
            <font-awesome-icon
              class="icon-brand fs-3 rounded-circle p-1 ms-3"
              icon="fa-brands fa-github"
              @click="social('github')"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="img-reg-div">
      <img class="" id="img" src="../assets/Imgs/Untitled-1.png" alt="" />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import {info} from "../../config/default";
let apiaddress = info.fetch["address"];
export default {
  name: "Reg",
  data() {
    return {
      eyeicon: "fa-solid fa-eye-slash",

      passicn: "fa-solid fa-check-circle",
      emailicn: "fa-solid fa-check-circle",
      usernameicn: "fa-solid fa-check-circle",

      emailawesome: "icons-check",
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
    tologinpage: function () {
      location.href = "#/login";
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
    signup: function () {
      this.$refs.usernamealert.innerHTML = "";
      this.$refs.emailalert.innerHTML = "";
      const passwordvalidate = this.passwordchecker();
      const usernamevalidate = this.usernamechecker();
      const emailvalidate = this.emailchecker();
      if (passwordvalidate && usernamevalidate && emailvalidate) {
        
        axios
          .post(`${apiaddress}reg`, {
            username: this.$refs.usernameinput.value.toLowerCase(),
            email: this.$refs.emailinput.value.toLowerCase(),
            password: this.$refs.passwordinput.value.toLowerCase(),
          })
          .then((res) => {
            let problem = res.data["Problem"];
            let message = res.data["message"];
            let token = res.data["token"];
            if (problem == "email") {
              this.$refs.emailalert.innerHTML = message;
            } else if (problem == "username") {
              this.$refs.usernamealert.innerHTML = message;
            } else {
              this.$refs.usernamealert.innerHTML = '';
              this.$refs.emailalert.innerHTML = '';
              this.setcookies(7, token);
              Swal.fire({
                icon: "success",
                title: "Welcome",
                showConfirmButton: false,
                timer: 1500,
              });
              setInterval(()=> {
                location.href='#/home'
              }, 1600);

              
            }
          });
      }
    },
    setcookies: function (expireday, value) {
      const now = new Date();

      now.setTime(now.getTime() + expireday * 24 * 60 * 60 * 1000);

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
    getcookies: function (cookiename) {
      let cookiesArray = document.cookie.split(";");

      let mainCookie = null;

      cookiesArray.some((cookie) => {
        if (cookie.includes(cookiename)) {
          mainCookie = cookie.substring(cookie.indexOf("=") + 1);
          return true;
        }
      });

      return mainCookie;
    },
    removecookies:function (expireday, value) {
      const now = new Date();

      now.setTime(now.getTime() - expireday * 24 * 60 * 60 * 1000);

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
  },
};
 
</script>

<style scoped >

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
  border-bottom: var(--blue) 2px solid;
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

  left: -30px;
  /* top: 40px; */
}
#img {
  height: 500px;
  
  position: relative;
  top: 50px;
  
  left: -75px;

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
.signup,.signup:hover{
  background-color: var(--blue);
}
</style>
