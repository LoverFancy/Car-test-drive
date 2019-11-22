<template>
  <div class="contact-details">
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
        </van-row>
        <van-row>
          <van-col>
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
    <!-- 上传图片材料 -->
    <van-row>
      <van-col span="20" offset="2">
        <van-panel title="合同列表：">
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
            </van-col>
          </van-row>
        </van-panel>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="14">
        <van-button type="info" size="small" round block @click="back">返回</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request from '@/lib/request';
import { Row, Col, Panel, Button, ImagePreview, Toast, Icon } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Panel)
  .use(ImagePreview)
  .use(Toast)
  .use(Icon)
  .use(Button);

@Component({
  name: 'ContractDetails',
  filters: {
    capitalize(value: number) {
      if (value === 0) {
        return '未签订';
      } else if (value === 1) {
        return '已签订';
      }
    },
  },
})
export default class ContractDetails extends Vue {
  public list: any = {};
  public evidence: any = [];

  // 点击查看时显示
  public getContractFileDetail(event: any) {
    Toast.loading({
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
      .then((result: any) => {
        Toast.clear();
        ImagePreview({
          images: result.data.map.imgList,
          closeOnPopstate: true,
          showIndicators: true,
        });
      })
      .catch((err: any) => {
        Toast.fail(err);
      });
  }

  // 返回按钮
  public back() {
    this.$router.back();
  }

  // 获取合同的详细信息
  public getContractDeatilInfo() {
    Toast.loading({
      message: '数据加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    const data = {
      contractId: Number.parseInt(this.$route.query.contractId, 10),
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
        Toast.clear();
      })
      .catch((err) => {
        Toast.fail(err);
      });
  }

  private mounted() {
    this.getContractDeatilInfo(); // 获取合同的详细信息
  }
}
</script>

<style lang="scss" scoped>
.img-group {
  @include flex($justify: flex-start);
  flex-wrap: wrap;

  margin: 5px;
  border-bottom: 1px solid #dcdfe6;
}
.small-title {
  @include flex($align: center);

  margin: 10px 0;

  font-size: 14px;

  color: #303133;
}
.uploadimg {
  margin: 5px;
  border: 1px solid #e4e7ed;
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
.van-cell__title span {
  white-space: nowrap;
  font-size: 12px;

  color: #909399;
}
</style>