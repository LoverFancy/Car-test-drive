<template>
  <div class="my-contract">
    <van-row v-for="(list,index) in lists" :key="index">
      <van-col span="24">
        <van-panel class="common-panel">
          <van-row>
            <van-col offset="2">
              <div class="common-item">
                <span>合同编号：</span>
                {{list.contractNo}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>租赁方式：</span>
                {{list.leaseModeName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>租期：</span>
                {{list.leaseTermName}}期
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
                <span>销售顾问：</span>
                {{list.salesAdvisorName}}
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
                <span>金融产品：</span>
                {{list.productName}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>4s店：</span>
                {{list.storeName}}
              </div>
            </van-col>
            <van-col span="10" offset="2">
              <div class="common-item">
                <span>状态：</span>
                <div
                  class="common-item-status"
                  :class="list.signStatus | status"
                >{{list.signStatus | capitalize }}</div>
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="5" offset="10">
              <van-button
                class="common-button"
                :to="{ name: 'signcontract',query:{contractId:list.contractId}}"
                block
                type="info"
                size="small"
                v-if="list.signStatus === 0"
              >
                签订
                <van-icon name="edit" />
              </van-button>
            </van-col>
            <van-col span="5" offset="2">
              <van-button
                class="common-button"
                :to="{ name: 'contractdetails',query:{contractId:list.contractId}}"
                block
                type="info"
                size="small"
              >
                详情
                <van-icon name="chat-o" />
              </van-button>
            </van-col>
          </van-row>
        </van-panel>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request from '@/lib/request';
import { Row, Col, Panel, Button, Icon, Toast, ImagePreview } from 'vant';
import { State, Mutation } from 'vuex-class';
Vue.use(Row)
  .use(Col)
  .use(Panel)
  .use(Button)
  .use(Icon)
  .use(ImagePreview)
  .use(Toast);
@Component({
  name: 'MyContract',
  filters: {
    capitalize(value: number) {
      if (value === 0) {
        return '未签订';
      } else if (value === 1) {
        return '已签订';
      } else {
        return '';
      }
    },
    status(value: number) {
      if (value === 0) {
        return 'red';
      } else if (value === 1) {
        return 'green';
      } else {
        return '';
      }
    },
  },
})
export default class MyContract extends Vue {
  @State('loginSuccess') public stateLoginSuccess: any;
  @Mutation('quitLogin') public mutationQuitLogin: any;
  public $router: any;
  public lists = [];
  public getMemberContractInfo() {
    const data = {
      memberId: this.stateLoginSuccess.memberId.toString(),
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/mycontract`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: json,
    })
      .then((result) => {
        this.lists = result.data.map.contract;
      })
      .catch((err) => {
        Toast.fail(err);
      });
  }
  // 身份验证
  public getUserLegality() {
    const data = {
      memberId: this.stateLoginSuccess.memberId,
    };
    $request({
      url: `api/user/userLegality`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    }).then((result) => {
      if (result.data.map.legality === 2 || result.data.map.legality === 1) {
        Toast.fail(result.data.msg);
        this.$router.replace({ name: 'home' });
        this.mutationQuitLogin('quitLogin');
      } else {
        this.getMemberContractInfo();
      }
    });
  }
  private mounted() {
    // this.getUserLegality();
    this.getMemberContractInfo();
  }
}
</script>

<style lang="scss" scoped>
.my-contract {
  font-size: 12px;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>