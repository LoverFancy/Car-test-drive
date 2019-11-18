<template>
  <!-- 公告 -->
  <div class="announcement">
    <router-link tag="div" :to="{name:'announcementlist'}" class="announcement-logo">
      <div class="announcement-first">仁通</div>
      <div class="announcement-second">头条</div>
    </router-link>
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      class="swiper-container"
      :vertical="true"
      :show-indicators="false"
      :height="50"
      :touchable="false"
    >
      <van-swipe-item v-for="(list,index) in lists" :key="index" class="announcement-list">
        <router-link
          v-for="item in list"
          :key="item.noticeId"
          :to="{name:'announcementdetails',params:{ noticeId:item.noticeId }}"
          tag="div"
          class="swiper-slide announcement-text"
        >
          <div class="swiper-icon">
            <div>公告</div>
          </div>
          <div class="overflow">{{item.noticeTitle}}</div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Swipe, SwipeItem } from 'vant';
import { Vue, Component } from 'vue-property-decorator';
Vue.use(Swipe).use(SwipeItem);

@Component({ name: 'Announcement' })
export default class Announcement extends Vue {
  public lists = [];
  public mounted() {
    this.getInvoiceInfo();
  }
  public getInvoiceInfo() {
    const noticeList: object[] = [
      {
        noticeId: 1,
        noticeTitle: '备战双十二，超级大优惠！！！',
        noticeContent: '新客户首次贷款即送25kg金龙鱼大米一袋，请咨询销售顾问。',
        issuer: '系统管理员',
        issueTime: 1573541741000,
      },
    ];
    for (let i = 1; i <= noticeList.length; i++) {
      // 如果公告不足2条
      if (noticeList.length <= 2) {
        this.lists.push(noticeList);
      } else {
        if (i % 2 === 0) {
          const list1 = [];
          list1.push(noticeList[i - 2], noticeList[i - 1]);
          this.lists.push(list1);
        }
      }
    }
    if (noticeList.length >= 3 && noticeList.length % 2 === 1) {
      this.lists.push([noticeList[noticeList.length - 1]]);
    }
  }
}
</script>

<style lang="scss" scoped>
/* 轮播 */
.swiper-container {
  width: 100%;
  height: 50px;
}
/* 公告 */
.announcement {
  @include flex($direction: row, $justify: space-between);

  height: 50px;
  width: 90%;
  border: 1px solid #ececec;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px 0;

  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
}
.announcement-logo {
  @include flex($direction: column, $justify: center, $align: center);
  width: 30%;
  color: #303133;
}
.announcement-list {
  display: flex;
  flex-direction: column;
}
.swiper-slide {
  height: 25px;
}
.announcement-text {
  @include flex($align: center);
  font-size: 14px;
  color: #303133;
}
.overflow {
  @extend .text-ellipsis;
}
.announcement-first {
  color: #a13238;
  margin-bottom: 5px;
}
.swiper-icon {
  margin-right: 5px;
  width: 15%;
  min-width: 40px;

  border-radius: 5px;
  text-align: center;
  background-color: #6272b0;
  color: #fff;
}
</style>