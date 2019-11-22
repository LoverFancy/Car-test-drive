<template>
  <div>
    <div class="myloan">
      <div v-for="(list,index) in lists" :key="index">
        <van-panel class="common-panel">
          <van-row>
            <van-col offset="2">
              <div class="common-item">
                <span>贷款编号：</span>
                {{list.loanId}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>金融产品：</span>
                {{list.productName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>4s店：</span>
                {{list.storeName}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>租赁类型：</span>
                {{list.leaseModeName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>租期：</span>
                {{list.leaseTermName}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>客户类型：</span>
                {{list.customerTypeName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>状态：</span>
                <div
                  class="common-item-status"
                  :class="list.status | status"
                >{{list.status | capitalize }}</div>
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>贷款人姓名：</span>
                {{list.customerName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>销售顾问：</span>
                {{list.salesAdvisorName}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col class="idealeft" offset="2">
              <span style="font-size: 12px;color: #909399;">审核意见：</span>
              <span class="idea">{{list.auditOpinions}}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="5" offset="10">
              <van-button
                class="common-button"
                block
                v-if="list.status !== 1"
                type="info"
                size="small"
                @click="edit($event)"
                :data-loanId="list.loanId"
              >
                编辑
                <van-icon :data-loanId="list.loanId" name="edit" />
              </van-button>
            </van-col>
            <van-col span="5" offset="2">
              <van-button
                class="common-button"
                block
                type="info"
                :to="{ name: 'loandetails', params:{loanId: list.loanId}}"
                size="small"
              >
                详情
                <van-icon name="chat-o" />
              </van-button>
            </van-col>
          </van-row>
        </van-panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Row, Col, Button, Icon, Panel, Toast } from 'vant';
import $request from '@/lib/request';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Icon)
  .use(Panel)
  .use(Toast);

@Component({
  name: 'MyDrive',
  filters: {
    capitalize(value) {
      if (value === 0) {
        return '待审核';
      } else if (value === 1) {
        return '审核通过';
      } else if (value === 2) {
        return '审核未通过';
      }
    },
    status(value) {
      if (value === 0) {
        return 'red';
      } else if (value === 1) {
        return 'green';
      } else if (value === 2) {
        return 'red';
      }
    },
  },
})
export default class MyDrive extends Vue {
  public lists = [];
  public loanId: string = '';
  public edit(event) {
    // 获取贷款申请表的数据
    if (event.target.dataset.loanid != '') {
      this.$toast.loading({
        message: '加载中...',
        mask: true,
        duration: 0,
        forbidClick: true,
      });
      this.loanId = event.target.dataset.loanid;
      const data = {
        loanId: this.loanId,
      };
      const json = JSON.stringify(data);
      $request({
        url: `api/loan/getApplyLoanInfo`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: json,
      })
        .then((result) => {
          this.$store.commit('loanEdit');
          this.$store.commit('editLoan1', result.data.map.loan);
          this.$store.commit('editLoan2', result.data.map.customer);
          this.$store.commit('editLoan3', result.data.map.customerApply);
          this.$store.commit('setEvidence', result.data.map.evidence);
          this.$router.push({ name: 'applyfirst' });
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.fail(err);
        });
    }
  }
  //   返回
  public previou() {
    this.$router.back();
  }
  // 获取会员id和数据
  public getMemberLoanInfo() {
    this.$toast.loading({
      mask: true,
      message: '加载中...',
      forbidClick: true,
      duration: 10000,
    });
    const data = {
      memberId: this.$store.state.loginSuccess.memberId,
    };
    $request({
      url: `api/loan/getMemberLoanInfo`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        this.lists = result.data.map.loan;
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.fail('系统异常');
      });
  }
  public getUserLegality() {
    const data = {
      memberId: this.$store.state.loginSuccess.memberId,
    };
    $request({
      url: `api/user/userLegality`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    }).then((result) => {
      if (result.data.map.legality === 2 || result.data.map.legality === 1) {
        this.$toast.fail(result.data.msg);
        this.$router.replace({ name: 'home' });
        this.$store.commit('quitLogin');
      } else {
        this.getMemberLoanInfo();
      }
    });
  }
  private mounted() {
    this.getUserLegality();
  }
}
</script>

<style lang="scss" scoped>
.myloan {
  margin: 0 auto;
  min-height: 100vh;
}
.myloan-title {
  text-align: center;
  font-size: 20px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  color: #303133;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
.red {
  color: red;
}
.green {
  color: green;
}
.idealeft {
  width: 84%;
  padding: 5px 0;
  font-size: 12px;
  line-height: 20px;
}
.idea {
  font-size: 14px;
  font-weight: 600;
}
</style>