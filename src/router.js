import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Login from "./views/login.vue";
import AddEnv from "./views/addEnv.vue";
import EditEnv from "./views/editEnv.vue";
import firebase from "./firebase/init";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        requiresGuest: true
      }
    },

    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        // requiresGuest: true
      }
    },

    {
      path: "/addEnv",
      name: "addEnv",
      component: AddEnv,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/editEnv/:env_id",
      name: "editEnv",
      component: EditEnv,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// //Nav Guards

// router.beforeEach((to, from, next) => {
//   // check for requiredAuth
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!firebase.auth.currentUser) {
//       //go to login
//       next({
//         path: "/login",
//         query: to.fullPath
//       });
//     } else {
//       //Proceed to route
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (firebase.auth.currentUser) {
//       //go to index
//       next({
//         path: "/",
//         query: to.fullPath
//       });
//     } else {
//       //Proceed to route
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
