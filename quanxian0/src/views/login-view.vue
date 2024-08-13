<template>
  <div>
    <h1>Login</h1>
    <div class="Login">
      <input type="text" v-model="username" placeholder="用户名" />
      <input type="password" v-model="password" placeholder="密码" />
      <button @click="subject">提交</button>
      <h1>{{ loginStatus }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { HomeApi } from "../api/homeapi";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();

const username = ref("");
const password = ref("");
const loginStatus = ref("");

const subject = async () => {
  const HomeRes = await HomeApi.finduser({
    name: username.value,
    password: password.value,
  });

  if (HomeRes.data.status == 200) {
    console.log("用户找到", HomeRes.data);
    const RoleRes = await HomeApi.findrole({
      id: HomeRes.data.data[0].id,
    });
    console.log(RoleRes.data.data);
    let loginOne = {
      username: HomeRes.data.data[0].name,
      role: RoleRes.data.data.roleRid,
    };
    store.dispatch("login/Login", loginOne);
    store.dispatch("login/addRouterMy", { tree: RoleRes.data.data.routerList });
    store.dispatch("login/addRoutes", RoleRes.data.data.routerList);
    router.push("/")
  } else {
    loginStatus.value = "登录失败";
  }
};

</script>

<style scoped>
.Login {
  width: 100%;
  height: 100px;
}
</style>
