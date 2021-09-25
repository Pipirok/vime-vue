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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
