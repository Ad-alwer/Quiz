<template>
  <router-view></router-view>
</template>

<script>
import regfunc from "./components/reg.vue";
import axios from "axios";
import { info } from "../config/default";

export default {
  created() {
    if (regfunc.methods.getcookies("jwt")) {
      let jwt = regfunc.methods.getcookies("jwt");
      let apiaddress = info.fetch["address"];

      axios.get(`${apiaddress}jwt/${jwt}`).then((res) => {
        if (res.data.status !== "ok") {
          regfunc.methods.removecookies(7, jwt);
          location.href = "#/login";
        }
      });
    } else {
      location.href = "#/login";
    }
  },
  name: "App",
};
</script>

<style>
:root {
  --blue: #4072e8;
  --header-blue-light: #b3c7f6;
  --header-blue-dark: #8caaf1;
  --dark-blue: #170e9e;
}
* {
  font-family: "Roboto";
}
@font-face {
  font-family: "Lora";
  src: local("Lora"),
    url(./assets/fonts/Lora-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
    url(./assets/fonts/RobotoSlab-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "Digital";
  src: local("Digital"), url(./assets/fonts/DS-DIGI.TTF) format("truetype");
}
</style>
