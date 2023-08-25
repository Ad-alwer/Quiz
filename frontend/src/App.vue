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

      axios
        .post(`${apiaddress}jwt`, {
          jwt,
        })
        .then((res) => {
          if (res.data.status) {
            if (
              location.href == `${info.server}#/home` ||
              location.href == `${info.server}` ||
              location.href == `${info.server}#/`
            ) {
              return (location.href = `${info.server}#/home`);
            }
          } else {
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

<style >
:root{
  --blue:#4072E8;
  --header-blue-light:#B3C7F6;
  --header-blue-dark:#8CAAF1;
  --dark-blue:#170e9e;
  
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
  src: local("Digital"),
    url(./assets/fonts/DS-DIGI.TTF) format("truetype");
}
</style>
