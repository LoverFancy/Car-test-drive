<template>
  <div>
    <van-nav-bar left-text="返回" :title="title" @click-left="goback" left-arrow></van-nav-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { NavBar } from 'vant';
Vue.use(NavBar);

import Router from 'vue-router';
import store from '../store/index';
declare module 'vue/types/vue' {
  interface Vue {
    $router: Router;
  }
}

@Component({ name: 'TopBar' })
export default class TopBar extends Vue {
  public goback() {
    this.$router.back();
  }
  get title() {
    return this.$store.state.pageTitle ? this.$store.state.pageTitle : '';
  }
}
</script>