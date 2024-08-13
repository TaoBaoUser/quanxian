import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home-view.vue";
import LoginView from "../views/login-view.vue";
import login from "../store/login";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { needLogin } = to.meta;
  const { loginstatus } = login.state.user;

  if (needLogin && !loginstatus) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
