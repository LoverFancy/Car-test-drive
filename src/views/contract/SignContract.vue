<template>
  <div class="sign-contact">
    <van-row>
      <van-col span="20" offset="2">
        <div class="common-item">
          <span>合同编号：</span>
          {{list.contractNo}}
        </div>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>金融产品：</span>
              {{list.productName}}
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>4S店：</span>
              {{list.storeName}}
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>租赁方式：</span>
              {{list.leaseModeName}}
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>客户类型：</span>
              {{list.customerTypeName}}
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>租期：</span>
              {{list.leaseTermName}}期
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>客户名称：</span>
              {{list.customerName}}
            </div>
          </van-col>
        </van-row>

        <van-row>
          <van-col>
            <div class="common-item">
              <span>证件号码：</span>
              {{list.cardNumber}}
            </div>
          </van-col>
        </van-row>
        <!-- 担保人 -->
        <div>
          <van-row>
            <van-col span="12">
              <div class="common-item">
                <span>担保人一姓名：</span>
                {{list.guarantorName}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div class="common-item">
                <span>担保人一身份证号：</span>
                {{list.guarantorIDNumber}}
              </div>
            </van-col>
          </van-row>
        </div>
        <div>
          <van-row>
            <van-col span="12">
              <div class="common-item">
                <span>担保人二姓名：</span>
                {{list.guarantorName2}}
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div class="common-item">
                <span>担保人二身份证号：</span>
                {{list.guarantorIDNumber2}}
              </div>
            </van-col>
          </van-row>
        </div>
        <!-- 法人 -->
        <template v-if="list.customerTypeName === '企业'">
          <div>
            <van-row>
              <van-col span="12">
                <div class="common-item">
                  <span>法人姓名：</span>
                  {{list.legalPerson}}
                </div>
              </van-col>
            </van-row>
          </div>
        </template>

        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>销售顾问：</span>
              {{list.salesAdvisorName}}
            </div>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>贷款金额：</span>
              {{list.loanMoney}}元
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>租金：</span>
              {{list.rent}}元
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>利息：</span>
              {{list.interest}}元
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>首付款：</span>
              {{list.firstPayment}}元
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>保证金：</span>
              {{list.bond}}元
            </div>
          </van-col>
          <van-col span="11" offset="1">
            <div class="common-item">
              <span>咨询服务费：</span>
              {{list.consultServiceFee}}元
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <div class="common-item">
              <span>签订状态：</span>
              {{list.signStatus | capitalize}}
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col>
            <router-link
              tag="div"
              class="common-smalltext"
              :to="{name: 'cardetails',query:{loanId:list.loanId}}"
              style="color: #1989fa"
            >
              查看车辆信息
              <van-icon name="arrow" />
            </router-link>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="20" offset="2">
        <van-panel title="需签订合同：">
          <van-row>
            <van-col span="24">
              <div v-for="(evi,index) in evidence" :key="index" class="van-cell">
                <div class="van-cell__title">
                  <span>{{evi.contractItemName}}</span>
                </div>
                <div class="van-cell__value">
                  <a :data-id="evi.contractItemId" @click="getContractFileDetail">查看</a>
                </div>
                <i class="van-icon van-icon-arrow van-cell__right-icon">
                  <!---->
                </i>
              </div>
              <van-checkbox v-model="checked">我已明确同意以上合同条款</van-checkbox>
            </van-col>
          </van-row>
          <van-row type="flex" justify="center">
            <van-col span="16">
              <van-button type="info" size="small" round block @click="sign">确认签订合同</van-button>
            </van-col>
          </van-row>
        </van-panel>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  Row,
  Col,
  Button,
  Panel,
  Toast,
  ImagePreview,
  Icon,
  Checkbox,
} from 'vant';
import $request from '@/lib/request';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Panel)
  .use(Icon)
  .use(Checkbox)
  .use(ImagePreview)
  .use(Toast);

@Component({
  name: 'SignContract',
  filters: {
    capitalize(value) {
      if (value === 0) {
        return '未签订';
      } else if (value === 1) {
        return '已签订';
      } else {
        return '';
      }
    },
  },
})
export default class SignContract extends Vue {
  public checked: boolean = false;
  public list = {};
  public evidence = [];
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
        // 获取合同信息
        this.getContractDeatilInfo();
      }
    });
  }
  // 点击签订合同的时候
  public sign() {
    this.$toast.loading({
      message: '签订中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    if (this.checked === true) {
      const data = {
        contractId: Number.parseInt(this.$route.query.contractId, 10),
      };
      const json = JSON.stringify(data);
      $request({
        url: `api/contract/applyContract`,
        method: 'post',
        data: json,
        headers: { 'Content-Type': 'application/json' },
      })
        .then((result) => {
          if (result.data.success === true) {
            this.$toast.success(result.data.msg);
            this.$router.replace({ name: 'mycontract' });
          } else {
            this.$toast.fail(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.fail(err);
        });
    } else {
      this.$toast.fail('请点击同意合同条款');
    }
  }
  // 获取合同的详细信息
  public getContractDeatilInfo() {
    this.$toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    const data = {
      contractId: parseInt(this.$route.query.contractId, 10),
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/contract/getContractDeatilInfo`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: json,
    })
      .then((result) => {
        this.list = result.data.map.contract;
        this.evidence = result.data.map.evidence;
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.fail(err);
      });
  }
  // 点击查看时显示
  public getContractFileDetail(event) {
    this.$toast.loading({
      message: '加载中...',
      mask: true,
      duration: 0,
      forbidClick: true,
    });
    const data = {
      contractItemId: Number.parseInt(event.target.dataset.id, 10),
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/contract/getContractFileDetail`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        this.$toast.clear();
        ImagePreview({
          images: result.data.map.imgList,
          closeOnPopstate: true,
          showIndicators: true,
        });
      })
      .catch((err) => {
        this.$toast.fail(err);
      });
  }

  private mounted() {
    this.getUserLegality();
  }
}
</script>

<style lang="scss" scoped>
.material {
  width: 100%;
  border-radius: 5px;

  box-shadow: 0 0 5px #c0c4cc;
}
.van-cell__title span {
  white-space: nowrap;
  font-size: 12px;

  color: #909399;
}
.van-button {
  margin: 20px 0;
  height: 36px;

  line-height: 35px;
}
.van-cell {
  margin: 10px 0;
}
.van-cell__value a {
  color: rgb(25, 137, 250);
}
.van-checkbox {
  margin: 20px 0;

  font-size: 12px;
}
</style>