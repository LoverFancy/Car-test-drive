<template>
  <div id="app">
    <TopBar v-show="!$route.meta.navShow && !$route.meta.topNav === true" />
    <router-view />
    <div class="clear-fixed"></div>
    <TabBar :actives="actives" v-show="$route.meta.navShow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TopBar: () => import('./components/TopBar.vue'),
    TabBar: () => import('./components/TabBar.vue'),
  },
})
export default class App extends Vue {
  public actives: number = 0;
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fff;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.clear-fixed {
  width: 100%;
  height: 50px;
}
</style>
