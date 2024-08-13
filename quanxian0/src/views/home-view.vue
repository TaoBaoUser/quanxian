<template>
  <div id="home">
    <div>
      <h1>角色:<span>{{ user.username }}</span></h1>
      <h5>您是:</h5>
      <h5 v-for="item in user.role">{{ item.name }}</h5>
      <button @click="logout">退出登录</button>
    </div>
    <div>
      <h1>路由</h1>
      <p v-for="item in tree">
      <h5>path:{{ item.path }}---------name:{{ item.name }}---------meta:{{ item.meta }}</h5>
      </p>
      <div v-if="tree.length != 0">
        <div class="add-user">
          <h5>添加用户</h5>
          <input type="text" v-model="username" placeholder="输入账号" /><br>
          <input type="text" v-model="password" placeholder="输入密码" /><br>
          <button @click="addUserSubmit">提交</button>
        </div>
        <div class="check-user">
          <button @click="toCheckUser">点击我查看</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from "vuex";
import { HomeApi } from '../api/homeapi';

const store = useStore();
const user = computed(() => store.state.login.user);
const tree = computed(() => store.state.login.routerMy.tree);

// 添加用户
const username = ref("");
const password = ref("");
const addUserSubmit = async () => {
  let param = {
    username: username.value,
    password: password.value
  }
  const addRes = await HomeApi.adduser(param);
  username.value = "";
  password.value = "";
  if (addRes.status == 200) {
    alert("注册成功");
  } else {
    alert("注册失败");
  }
}
//------------------------------

// 退出
const logout = async () => {
  await store.dispatch("login/logout");
  await store.dispatch("login/clearRouterMy");
};
//------------------------------

// 查看所以用户
const toCheckUser = async () => {
  const usersList = await HomeApi.findalluser({ username: 123 });
  console.log(usersList.data);
}
</script>
<style scoped>
#home {
  width: 100%;
  /* height: 100vh; */
  display: flex;
}

#home>div {
  flex: 5;
}

#home>div:nth-child(1) {
  flex: 1;
}
</style>
