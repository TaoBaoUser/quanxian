<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!loginState" to="/login">Login</router-link>
    <template v-for="item in treeMy" :key="item.path">
      <span v-if="item.meta.childMy">| <router-link :to="item.path">{{ item.name }}</router-link> |</span>
      <span v-else>- <router-link :to="item.path">{{ item.name }}</router-link> -</span>
    </template>
  </nav>
  <router-view />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const treeMy = computed(() => store.state.login.routerMy.tree);
const loginState = computed(() => store.state.login.user.loginstatus);
</script>

<style lang="scss"></style>
