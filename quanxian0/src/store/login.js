import router from "@/router";

function flattenRoutes(routesData, parentPath = "") {
  let flatRoutes = [];

  routesData.forEach((route) => {
    const component = route.conpenent
      ? () => import(`../views${route.conpenent}`)
      : undefined;
    const path = parentPath + route.path;
    let childMy = true;
    if (parentPath != "") {
      childMy = false;
    }

    flatRoutes.push({
      path,
      name: route.name,
      component,
      meta: {
        needLogin: true,
        childMy,
      },
    });

    if (route.child) {
      const childRoutes = flattenRoutes(route.child, path);
      flatRoutes = flatRoutes.concat(childRoutes);
    }
  });

  return flatRoutes;
}

export default {
  namespaced: true,
  state: {
    user: {
      username: null,
      role: null,
      loginstatus: false,
    },
    routerMy: {
      tree: [],
    },
  },
  mutations: {
    setUser(state, { username, role, loginstatus }) {
      state.user.username = username;
      state.user.role = role;
      state.user.loginstatus = loginstatus;
    },
    setRouterTree(state, { tree }) {
      state.routerMy.tree = tree;
    },
  },
  actions: {
    Login({ commit }, { username, role }) {
      commit("setUser", {
        username: username,
        role: role,
        loginstatus: true,
      });
    },
    logout({ commit }) {
      commit("setUser", { username: null, role: null, loginstatus: false });
    },
    addRouterMy({ commit }, { tree }) {
      commit("setRouterTree", { tree });
    },
    clearRouterMy({ commit }) {
      commit("setRouterTree", { tree: [] });
    },
    addRoutes({ commit }, routerData) {
      const routes = flattenRoutes(routerData);
      commit("setRouterTree", { tree: routes });
      routes.forEach((route) => {
        router.addRoute(route);
      });
    },
  },
};
