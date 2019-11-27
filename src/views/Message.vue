<template>
  <div class="message">
    <van-nav-bar title="消息"></van-nav-bar>
    <van-pull-refresh class="message-list" v-model="isLoading" @refresh="onRefresh">
      <van-panel v-for="(list,index) in lists" :key="index" class="common-panel">
        <van-row type="flex" justify="space-between">
          <van-col offset="1">
            <div class="title">{{list.title}}</div>
          </van-col>
          <van-col offset="1">
            <div style="margin-top: 10px;">{{list.msgTime | timeFilters}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col offset="1">
            <div>尊敬的客户{{list.memberName}}:</div>
          </van-col>
        </van-row>
        <van-row v-for="(msg,index) in list.msgContent" :key="index">
          <van-col offset="1">
            <div>{{msg}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="end"></van-row>
      </van-panel>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { PullRefresh, Row, Col, Toast, Panel, NavBar } from 'vant';
import { State, Mutation } from 'vuex-class';
import $request from '@/lib/request';
Vue.use(PullRefresh)
  .use(Row)
  .use(Toast)
  .use(Panel)
  .use(NavBar)
  .use(Col);

@Component({
  name: 'Message',
  filters: {
    timeFilters(value: string): string {
      const date = new Date(value);
      return `${date.getFullYear()}年${
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      }月${date.getDate()}日`;
    },
  },
})
export default class Message extends Vue {
  @State public loginSuccess: any;
  @Mutation public readMesgMutation: any;
  public isLoading: boolean = false;
  public lists: any = [];
  // 生命周期，挂载
  public mounted() {
    this.getMsgDetailList();
  }
  // 下拉刷新
  public onRefresh() {
    setTimeout(() => {
      Toast('刷新成功');
      this.isLoading = false;
    }, 1000);
  }
  /**
   * 调用接口获取信息
   */
  public getMsgDetailList() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
    const data = JSON.stringify({
      memberId: this.loginSuccess.memberId,
    });
    $request({
      url: 'api/message',
      method: 'post',
      data,
    })
      .then((result) => {
        Toast.clear();
        this.readMesgMutation(0);
        this.lists = result.data.readMesg;
        this.lists.forEach((item: any) => {
          item.msgContent = item.msgContent.split('，');
        });
      })
      .catch((err) => {
        Toast.clear();
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.message {
  @extend .center-container-width;
  min-height: 90vh;

  font-size: 12px;
  line-height: 30px;
}
.message-list {
  overflow: visible;
}
</style>