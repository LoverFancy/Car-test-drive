<template>
  <div class="swiper-container" id="homeswiper">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img,index) in imgs" :key="index">
        <img width="100%" style="display:block;" :src="img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Swipe, SwipeItem } from 'vant';
import $request from '@/lib/request';
Vue.use(Swipe).use(SwipeItem);

import { Vue, Component } from 'vue-property-decorator';
@Component({ name: 'HomeSwiper' })
export default class HomeSwiper extends Vue {
  public imgs: string[] = [
    'http://rz.htkrtech.com/static/img/2019/09/201909101015450687.png',
    'http://rz.htkrtech.com/static/img/2019/09/201909101015450687.png',
  ];
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 90%;
  margin: 10px auto;
  height: auto;
  border-radius: 10px;
}
.swiper-slide img {
  width: 100%;
  border-radius: 10px;
}
.van-swipe {
  border-radius: 10px;
}
.van-swipe-item {
  border-radius: 10px;
  overflow: hidden;
}
</style>