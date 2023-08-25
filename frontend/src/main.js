import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import { createRouter, createWebHashHistory } from "vue-router";

import Register from "./components/reg.vue";
import login from "./components/login.vue";
import home from "./components/home.vue";
import create from "./components/create.vue";
import exam from "./components/exam.vue";
import notfound from "./components/404.vue";
import test from "./components/exam/detailshower.vue";

const routes = [
  { path: "/", component: App },
  { path: "/register", component: Register },
  { path: "/login", component: login },
  { path: "/home", component: home },
  { path: "/createexam", component: create },
  { path: "/exam/:id", component: exam },
  { path: "/404", component: notfound },
  { path: "/mnb", component: test },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faGithub,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

import {
  faCheckCircle,
  faCopy,
  faEye,
  faEyeSlash,
  faShare,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faGithub,
  faInstagram,
  faTelegram,
  faCheckCircle,
  faEye,
  faEyeSlash,
  faTimes,
  faTimesCircle,
  faShare,
  faCopy
);

import VueSocialSharing from "vue-social-sharing";

createApp(App)
  .use(bootstrap)
  .use(VueSocialSharing)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
