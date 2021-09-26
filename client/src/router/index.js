import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Manage from "../views/Manage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/manage",
    component: Manage,
  },
];

/**
 * Tried using history mode, but it raised errors after deployment.
 */
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
