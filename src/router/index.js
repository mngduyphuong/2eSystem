import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/airlines",
    name: "airlines",
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
