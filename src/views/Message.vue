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
import { PullRefresh, Row, Col, Toast, Panel } from 'vant';
Vue.use(PullRefresh)
  .use(Row)
  .use(Toast)
  .use(Panel)
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
  public isLoading: boolean = false;
  public lists: any = [
    {
      msgId: 1,
      contractNo: 'QZZ1911002第（002）号',
      msgType: 1,
      nickName: 'Juzi',
      memberId: 1,
      title: '还款通知',
      memberName: '范常',
      msgTime: 1573528362000,
      msgContent:
        '您融资租赁贷款最新还款信息，还款金额：人民币8334.0元，还款日期：2019-11-12 11:12:42，融资租赁贷款1/6期账单已还清。',
    },
    {
      msgId: 1,
      contractNo: 'QZZ1911002第（002）号',
      msgType: 1,
      nickName: 'Juzi',
      memberId: 1,
      title: '还款通知',
      memberName: '范常',
      msgTime: 1573528362000,
      msgContent:
        '您融资租赁贷款最新还款信息，还款金额：人民币8334.0元，还款日期：2019-11-12 11:12:42，融资租赁贷款1/6期账单已还清。',
    },
    {
      msgId: 1,
      contractNo: 'QZZ1911002第（002）号',
      msgType: 1,
      nickName: 'Juzi',
      memberId: 1,
      title: '还款通知',
      memberName: '范常',
      msgTime: 1573528362000,
      msgContent:
        '您融资租赁贷款最新还款信息，还款金额：人民币8334.0元，还款日期：2019-11-12 11:12:42，融资租赁贷款1/6期账单已还清。',
    },
  ];
  // 生命周期，挂载
  public mounted() {
    this.getMsgDetailList();
  }
  // 下拉刷新
  public onRefresh() {
    setTimeout(() => {
      this.$toast('刷新成功');
      this.isLoading = false;
    }, 1000);
  }
  public getMsgDetailList() {
    this.lists.forEach((item, index, array) => {
      item.msgContent = item.msgContent.split('，');
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