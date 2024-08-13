export default {
  namespaced: true,
  state: {
    userList: [],
    role: [],
  },
  mutations: {
    setUserList(state, { users, role }) {
      state.userList = users;
      state.role = role;
    },
  },
  actions: {
    setAllUsers({ commit }, { users, role }) {
      commit("setUserList", { users, role });
    },
    deleteAllUsers({ commit }) {
      commit("setUserList", { users: [], role: [] });
    },
  },
};
