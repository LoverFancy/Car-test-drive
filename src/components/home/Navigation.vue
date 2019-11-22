<template>
  <nav class="navigation">
    <template v-for="(navtitle,key) in navtitles">
      <router-link
        tag="div"
        :to="navtitle.to"
        class="nav-list"
        :key="key"
        :data-title="navtitle.title"
      >
        <div class="nav-img">
          <img :src="navtitle.icon" :alt="navtitle.title" />
        </div>
        <div class="nav-text">{{navtitle.title}}</div>
      </router-link>
    </template>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'Navigation' })
export default class Navigation extends Vue {
  public navtitles: object[] = [
    {
      title: '我要试驾',
      icon: require(`@/assets/iconApply.png`),
      to: { name: 'drivefirst' },
    },
    {
      title: '我的试驾',
      icon: require('@/assets/Myloan.png'),
      to: { name: 'mydrive' },
    },
    {
      title: '我的合同',
      icon: require('@/assets/iconContract.png'),
      to: { name: 'mycontract' },
    },
    {
      title: '试驾指南',
      icon: require('@/assets/iconBill.png'),
      to: {},
    },
  ];
}
</script>

<style lang="scss">
.navigation {
  @include flex($direction: row, $justify: space-around, $align: space-between);
  flex-wrap: wrap;
  //居中容器的宽度
  @extend .center-container-width;
}
.nav-list {
  @include flex($direction: column, $align: center);

  width: 21%;
  height: 0;
  margin: 10px 0;
  padding-bottom: 25%;
}
.nav-img {
  width: 65%;
  height: 0;
  padding-bottom: 80%;
  border-radius: 50%;
}
.nav-text {
  text-align: center;
  font-size: 13px;
  white-space: nowrap;
  color: #606266;
}
.nav-img img {
  width: 100%;
}
</style>