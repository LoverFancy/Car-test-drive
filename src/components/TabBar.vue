<template>
  <van-tabbar route v-model="active" active-color="#e46e40" safe-area-inset-bottom>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/message" icon="comment-o" :info="info">消息</van-tabbar-item>
    <van-tabbar-item replace to="/car" icon="service-o">车辆</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

@Component({ name: 'TabBar' })
export default class TabBar extends Vue {
  get active() {
    const map = {
      '/': 0,
      '/message': 1,
      '/car': 2,
      '/mine': 3,
    };
    return map[this.$route.path];
  }
  set active(val) {}
  get info() {
    if (this.$store.state.readMesg === 0) {
      return null;
    } else {
      return this.$store.state.readMesg;
    }
  }
}
</script>