import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/airlines",
    name: "Airlines",
    component: () => import("../views/airlines.vue"),
  },
  {
    path: "/airports",
    name: "Airports",
    component: () => import("../views/airports.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
