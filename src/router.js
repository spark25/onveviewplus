import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Login from "./views/login.vue";
import AddEnv from "./views/addEnv.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },

    {
      path: "/addEnv",
      name: "addEnv",
      component: AddEnv
    }
  ]
});
