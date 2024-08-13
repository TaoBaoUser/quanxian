import { createStore } from "vuex";
import loginModule from "./login";
import users from "./user";

const store = createStore({
  modules: {
    login: loginModule,
    users: users,
  },
});

export default store;
