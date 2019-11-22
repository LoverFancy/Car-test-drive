<template>
  <div class="announcement-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-cell
        :value="list.noticeTitle"
        v-for="list in lists"
        size="large"
        :key="list.noticeId"
        :to="{name: 'announcementdetails', params:{noticeId:list.noticeId}}"
        is-link
        clickable
      />
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request from '@/lib/request';
import { Row, Col, PullRefresh, Cell } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Cell)
  .use(PullRefresh);

@Component({ name: 'AnnouncementList' })
export default class AnnouncementList extends Vue {
  public lists = [];
  public isLoading: boolean = false; // 下拉刷新
  public isFinished: boolean = false;
  //   下拉刷新
  public onRefresh() {
    const data = {
      noticeId: 0,
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/system/getInvoiceInfo`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        if (result.data.success) {
          this.lists = result.data.map.noticeList;
          // 加载状态结束
          this.isLoading = false;
          this.$toast.success('加载成功');
        } else {
          this.$toast.fail('加载失败');
          this.isLoading = false;
        }
      })
      .catch((err) => {
        this.$toast.fail(err);
      });
  }
  // 获取信息
  public getInvoiceInfo() {
    this.$toast.loading('加载中...');
    const data = {
      noticeId: 0,
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/system/getInvoiceInfo`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        this.lists = result.data.map.noticeList;
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.fail(err);
      });
  }
  private mounted() {
    this.getInvoiceInfo();
  }
}
</script>

<style lang="scss" scoped>
.announcement-list {
  @include flex($direction: column);
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.van-pull-refresh {
  min-height: 100vh;
}
li {
  font-size: 14px;
  line-height: 24px;
}
.van-cell {
  width: 90%;
  margin: 5px auto;
  padding: 10px 0;
  border-radius: 10px;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
.van-cell__value {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>