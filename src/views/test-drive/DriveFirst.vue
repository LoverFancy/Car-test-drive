<template>
  <div class="drive-first">
    <van-nav-bar title="申请贷款" left-text="返回" @click-left="goback" left-arrow></van-nav-bar>
    <div class="drive-first-select">
      <!-- 金融产品 -->

      <van-field
        v-model="selectText.productName"
        label="金融产品："
        placeholder="请选择金融产品"
        label-align="right"
        :error-message="productNameError"
        is-link
        readonly
        @click-right-icon="product = true;"
        @click="product = true;"
      />

      <van-popup v-model="product">
        <van-picker
          show-toolbar
          :default-index="1"
          title="请选择"
          :columns="proType"
          @cancel="product = false;"
          @confirm="onPickerProduct"
        />
      </van-popup>
      <!-- 4s店 -->

      <van-field
        v-model="selectText.storeName"
        label="4s店："
        placeholder="请选择4s店"
        label-align="right"
        :error-message="s4StoreNameError"
        readonly
        is-link
        @click-right-icon="shop = true;"
        @click="shop = true;"
      />

      <van-popup v-model="shop">
        <van-picker
          show-toolbar
          :default-index="1"
          title="请选择"
          :columns="storeType"
          @cancel="shop = false;"
          @confirm="onPickerShop"
        />
      </van-popup>
      <!-- 销售顾问 -->

      <van-field
        v-model="selectText.salesAdvisorName"
        label="销售顾问："
        placeholder="请选择销售顾问"
        label-align="right"
        is-link
        :error-message="salesAdvisorNameError"
        readonly
        @click-right-icon="consultant = true;"
        @click="consultant = true;"
      />

      <van-popup v-model="consultant">
        <van-picker
          show-toolbar
          :default-index="2"
          title="请选择"
          :columns="salesAdvisorType"
          @cancel="consultant = false;"
          @confirm="onPickerConsultant"
        />
      </van-popup>
      <!-- 租赁方式 -->

      <van-field
        v-model="selectText.leaseModeName"
        label="租赁类型："
        placeholder="请选择租赁类型"
        label-align="right"
        is-link
        :error-message="leaseModeNameError"
        readonly
        @click-right-icon="leasing = true;"
        @click="leasing = true;"
      />

      <van-popup v-model="leasing">
        <van-picker
          :default-index="2"
          show-toolbar
          title="请选择"
          :columns="leaseModel"
          @cancel="leasing = false;"
          @confirm="onPickerLeasing"
        />
      </van-popup>
      <!-- 客户类型 -->

      <van-field
        v-model="selectText.customerTypeName"
        label="客户类型："
        placeholder="请选择客户类型"
        label-align="right"
        is-link
        :error-message="customerTypeNameError"
        readonly
        @click-right-icon="customer = true;"
        @click="customer = true;"
      />

      <van-popup v-model="customer">
        <van-picker
          :default-index="2"
          show-toolbar
          title="请选择"
          :columns="cusType"
          @cancel="customer = false;"
          @confirm="onPickerCustomer"
        />
      </van-popup>
      <!-- 租期 -->

      <van-field
        v-model="selectText.leaseTermName"
        label="租期："
        placeholder="请选择租期"
        label-align="right"
        is-link
        :error-message="leaseTermNameError"
        readonly
        @click-right-icon="deadline = true;"
        @click="deadline = true;"
      />
      <!-- 牌照情况 -->
      <van-field
        v-model="selectText.licensePlateName"
        label="牌照情况："
        placeholder="请选择牌照情况"
        label-align="right"
        is-link
        :error-message="licensePlateError"
        readonly
        @click-right-icon="paizhaoqingkuang = true;"
        @click="paizhaoqingkuang = true;"
      />
      <van-popup v-model="paizhaoqingkuang">
        <van-picker
          :default-index="2"
          show-toolbar
          title="请选择牌照情况"
          :columns="licensePlate"
          @cancel="paizhaoqingkuang = false;"
          @confirm="onPickerpaizhaoqingkuang"
        />
      </van-popup>
      <!-- 申请金额 -->
      <van-field
        v-model="selectText.applyMoney"
        type="number"
        label-align="right"
        label="申请金额："
        placeholder="请输入申请金额(元)"
        :error-message="applyMoneyError"
      />
    </div>
    <van-popup v-model="deadline">
      <van-picker
        :default-index="2"
        show-toolbar
        title="请选择租期"
        :columns="leaseTerm"
        @cancel="deadline = false;"
        @confirm="onPickerDeadline"
      />
    </van-popup>

    <!-- 是否会员本人办理 -->
    <van-row v-if="memberShow">
      <van-col offset="2">
        <van-checkbox class="drive-third-title" v-model="ismyself">会员本人办理</van-checkbox>
      </van-col>
    </van-row>
    <!--  -->
    <van-row type="flex" justify="center">
      <van-col span="12">
        <van-button
          class="common-button"
          type="info"
          size="small"
          round
          block
          @click="applyNext"
        >下一步</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
interface selectTextInterface {
  productName: string;
  productId: string;
  storeName: string;
  storeId: string;
  customerTypeName: string;
  customerTypeId: string;
  leaseTermName: string;
  leaseTermId: string;
  leaseModeName: string;
  leaseModeId: string;
  salesAdvisorName: string;
  salesAdvisorId: string;
  licensePlateName: string;
  licensePlateId: string;
  applyMoney: string;
}
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import $request from '@/lib/request';
import $validate from '@/lib/validate';
import {
  Row,
  Col,
  Button,
  Toast,
  Picker,
  Field,
  Checkbox,
  CheckboxGroup,
  Popup,
  NavBar,
} from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Toast)
  .use(Picker)
  .use(Field)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Popup)
  .use(NavBar);

@Component({ name: 'DriveFirst' })
export default class DriveFirst extends Vue {
  public ismyself: boolean = true; // 是否会员本人办理
  public selectText: selectTextInterface = {
    productName: '',
    productId: '',

    storeName: '',
    storeId: '',

    customerTypeName: '',
    customerTypeId: '',

    leaseTermName: '',
    leaseTermId: '',

    leaseModeName: '',
    leaseModeId: '',

    salesAdvisorName: '',
    salesAdvisorId: '',

    licensePlateName: '',
    licensePlateId: '',

    applyMoney: '',
  };
  // 产品列表
  public evidenceUrl: object[] = []; // 第二部需要提交的材料地址
  public proType: object[] = []; // 金融产品
  public storeType: object[] = []; // 4s店
  public cusType: object[] = []; // 客户类型
  public leaseTerm: object[] = []; // 租期
  public leaseModel: object[] = []; // 租赁类型
  public salesAdvisorType: object[] = []; // 销售顾问
  public licensePlate: object[] = []; // 牌照状况
  // 显示隐藏
  public memberShow: boolean = true; // 会员本人办理复选框
  public product: boolean = false;
  public shop: boolean = false;
  public customer: boolean = false;
  public deadline: boolean = false;
  public leasing: boolean = false;
  public consultant: boolean = false;
  public paizhaoqingkuang: boolean = false;
  // 错误提示
  public productNameError: string = '';
  public s4StoreNameError: string = '';
  public customerTypeNameError: string = '';
  public leaseTermNameError: string = '';
  public leaseModeNameError: string = '';
  public salesAdvisorNameError: string = '';
  public licensePlateError: string = '';
  public applyMoneyError: string = '';

  // 返回
  public goback(): void {
    this.$toast.clear();
    if (this.$store.state.isLoanEdit === true) {
      this.$store.commit('loanEditno');
      this.$router.replace({ name: 'myloan' });
    } else {
      this.$router.back();
      this.$store.commit('ismyself', this.ismyself);
    }
  }
  // 选择产品
  public onPickerProduct(value, index) {
    this.$toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    this.selectText.productName = value.text;
    this.selectText.productId = value.key;
    const productKey = {
      productId: this.selectText.productId,
    };
    const data = JSON.stringify(productKey);
    // $request({
    //   url: `api/system/getProductInfo`,
    //   method: 'post',
    //   data,
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((result) => {
    //     // 根据选择的产品类型显示不同的上传类别
    //     this.evidenceUrl = result.data.map.evidence;
    //     this.$toast.clear();
    //   })
    //   .catch((err) => {
    //     this.$toast.fail(err);
    //   });
    this.product = false;
  }
  // 选择4s店
  public onPickerShop(value) {
    this.$toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    this.selectText.storeName = value.text;
    this.selectText.storeId = value.key;
    const key = {
      storeId: value.key,
    };
    const data = JSON.stringify(key);
    // $request({
    //   url: `api/system/getSalesAdvisorByS4id`,
    //   method: 'post',
    //   data,
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((result) => {
    //     // 根据不同的4s店显示不同的销售顾问
    //     if (result.data.map.salesAdvisorType) {
    //       this.salesAdvisorType = [...result.data.map.salesAdvisorType];
    //       console.log(this.salesAdvisorType);
    //       this.selectText.salesAdvisorName = '';
    //       this.selectText.salesAdvisorId = '';
    //       this.$toast.clear();
    //       this.shop = false;
    //     } else {
    //       this.salesAdvisorType = [];
    //       this.selectText.salesAdvisorName = '';
    //       this.selectText.salesAdvisorId = '';
    //       this.$toast('未设置销售顾问');
    //       this.shop = false;
    //     }
    //   })
    //   .catch((err) => {
    //     this.$toast.fail(err);
    //   });
  }
  // 选择销售顾问
  public onPickerConsultant(value, index) {
    this.selectText.salesAdvisorName = value.text;
    this.selectText.salesAdvisorId = value.key;
    this.consultant = false;
  }
  // 选择租赁方式
  public onPickerLeasing(value, index) {
    this.selectText.leaseModeName = value.text;
    this.selectText.leaseModeId = value.key;
    this.leasing = false;
  }
  // 选择顾客类型
  public onPickerCustomer(value, index) {
    this.selectText.customerTypeName = value.text;
    this.selectText.customerTypeId = value.key;
    if (this.selectText.customerTypeName === '企业') {
      // 企业
      this.ismyself = false;
      this.memberShow = false;
    } else {
      this.ismyself = true;
      this.memberShow = true;
    }
    this.customer = false;
  }
  // 选择租期
  public onPickerDeadline(value, index) {
    this.selectText.leaseTermName = value.text;
    this.selectText.leaseTermId = value.key;
    this.deadline = false;
  }
  // 选择牌照情况
  public onPickerpaizhaoqingkuang(value, index) {
    this.selectText.licensePlateName = value.text;
    this.selectText.licensePlateId = value.key;
    this.paizhaoqingkuang = false;
  }
  // 申请贷款下一步
  public applyNext() {
    this.$validate.IsNull(this.selectText.productName, (res) => {
      this.productNameError = res;
    });
    this.$validate.IsNull(this.selectText.storeName, (res) => {
      this.s4StoreNameError = res;
    });
    this.$validate.IsNull(this.selectText.customerTypeName, (res) => {
      this.customerTypeNameError = res;
    });
    this.$validate.IsNull(this.selectText.leaseTermName, (res) => {
      this.leaseTermNameError = res;
    });
    this.$validate.IsNull(this.selectText.leaseModeName, (res) => {
      this.leaseModeNameError = res;
    });
    this.$validate.IsNull(this.selectText.salesAdvisorName, (res) => {
      this.salesAdvisorNameError = res;
    });
    this.$validate.IsNull(this.selectText.licensePlateName, (res) => {
      this.licensePlateError = res;
    });
    this.$validate.IsNull(this.selectText.applyMoney, (res) => {
      this.applyMoneyError = res;
    });
    if (
      this.productNameError !== '' ||
      this.s4StoreNameError !== '' ||
      this.customerTypeNameError !== '' ||
      this.leaseTermNameError !== '' ||
      this.leaseModeNameError !== '' ||
      this.salesAdvisorNameError !== '' ||
      this.licensePlateError !== '' ||
      this.applyMoneyError !== ''
    ) {
      this.$toast('表单填写不正确!');
      return false;
    } else {
      this.$store.commit('changeApplyFirst', this.selectText);
      this.$store.commit('ismyself', this.ismyself);
      this.$store.commit('setEvidence', this.evidenceUrl);
      this.$router.push({ name: 'drivesecond' });
    }
  }
  public getPageParam() {
    this.selectText = this.$store.state.applyLoan1;
    this.evidenceUrl = this.$store.state.evidence;
    // 加载数据
    this.$toast.loading({
      duration: 0,
      message: '表单加载中...',
      mask: true,
      forbidClick: true,
    });
    // 获取表单选项
    // $request({
    //   url: `api/system/getPageParam`,
    //   method: 'get',
    // })
    //   .then((result) => {
    //     this.proType = result.data.map.proType;
    //     this.storeType = result.data.map.storeType;
    //     this.cusType = result.data.map.cusType;
    //     this.leaseTerm = result.data.map.leaseTerm;
    //     this.leaseModel = result.data.map.leaseModel;
    //     this.licensePlate = result.data.map.licensePlate;
    //     this.$toast.clear();
    //     if (this.selectText.storeId) {
    //       this.$toast.loading({
    //         duration: 0,
    //         message: '表单加载中...',
    //         mask: true,
    //         forbidClick: true,
    //       });
    //       const key = {
    //         storeId: this.selectText.storeId,
    //       };
    //       const data = JSON.stringify(key);
    //       $request({
    //         url: `api/system/getSalesAdvisorByS4id`,
    //         method: 'post',
    //         data,
    //         headers: { 'Content-Type': 'application/json' },
    //       })
    //         .then((result) => {
    //           // 根据不同的4s店显示不同的销售顾问
    //           if (result.data.map.salesAdvisorType) {
    //             this.salesAdvisorType = [...result.data.map.salesAdvisorType];
    //             this.$toast.clear();
    //           } else {
    //             this.salesAdvisorType = [];
    //             this.selectText.salesAdvisorName = '';
    //             this.selectText.salesAdvisorId = '';
    //             this.$toast.clear();
    //           }
    //         })
    //         .catch((err) => {
    //           this.$toast.fail(err);
    //         });
    //     }
    //   })
    //   .catch((err) => {
    //     this.$toast.fail(err);
    //   });
  }
  public mounted() {
    const data = {
      memberId: this.$store.state.loginSuccess.memberId,
    };
    // $request({
    //   url: `api/user/userLegality`,
    //   method: 'post',
    //   data,
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((result) => {
    //   if (result.data.map.legality === 2 || result.data.map.legality === 1) {
    //     this.$toast.fail(result.data.msg);
    //     this.$router.replace({ name: 'home' });
    //     this.$store.commit('quitLogin');
    //   } else {
    //     this.getPageParam();
    //     if (this.selectText.customerTypeName === '企业') {
    //       this.ismyself = false;
    //       this.memberShow = false;
    //     } else {
    //       this.ismyself = this.$store.state.applyLoan1.ismyself;
    //       this.memberShow = true;
    //     }
    //     if (this.$store.state.isLoanEdit) {
    //       this.memberShow = false;
    //     }
    //   }
    // });
  }
}
</script>

<style lang="scss" scoped>
.drive-first-select {
  @include flex($direction: column);

  width: 90%;
  margin: 10px auto 0;

  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}
.drive-first-select-div {
  display: flex;
  justify-content: flex-start;

  width: 100%;
}
.firstspan {
  display: block;

  width: 25%;
  height: 50px;

  text-align: right;
  line-height: 50px;
  font-size: 14px;

  color: #606266;
}
.secondspan {
  display: block;

  margin-left: 20px;
  line-height: 50px;

  font-size: 12px;

  color: #909399;
}
.next-btn {
  width: 100%;
  margin-top: 20px;

  letter-spacing: 2px;

  background-color: #2d67ef;
  color: #fbffff;
}
.van-popup {
  width: 100%;

  transform: translate3d(-50%, -100%, 0);
  top: 100%;
}
.van-picker-column ul {
  transform: translate3d(0px, 10px, 0px);
}
.van-checkbox {
  display: flex;
  align-items: center;
  height: 44px;
}

.van-cell-group {
  border-radius: 5px;
}
.van-cell {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  width: 100%;
  height: 50px;

  text-align: center;

  color: #323233;
}
.drive-third-title {
  margin: 5px 10px;

  font-size: 14px;

  color: #606266;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>