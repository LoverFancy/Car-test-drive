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
import $request, { picUrl } from '@/lib/request';
Vue.use(Swipe).use(SwipeItem);

import { Vue, Component } from 'vue-property-decorator';
@Component({ name: 'HomeSwiper' })
export default class HomeSwiper extends Vue {
  public imgs: string[] = [];
  public getSlideImgInfo() {
    $request
      .get('api/banners')
      .then((result) => {
        const reimgs = result.data.map.slideList;
        this.imgs = reimgs.map((items: any) => {
          return picUrl + items.slidePic;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  private mounted() {
    this.getSlideImgInfo();
  }
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