<template>
  <div>
    <van-nav-bar title="申请贷款" left-text="返回" @click-left="back" left-arrow></van-nav-bar>
    <div class="apply-third-container">
      <!-- 弹窗 性别 -->
      <van-popup v-model="isShowSex">
        <van-picker
          :show-toolbar="sexTool"
          :default-index="defaultIndex"
          title="请选择性别"
          :columns="sexColumns"
          @cancel="isShowSex = false"
          @confirm="onPickerSex"
        />
      </van-popup>
      <!-- 弹窗 证件类型 -->
      <van-popup v-model="isDocumentType">
        <van-picker
          :default-index="defaultIndex"
          show-toolbar
          title="请选择"
          :columns="Documentcolumns"
          @cancel="isDocumentType = false"
          @confirm="onPickerDocument"
        />
      </van-popup>
      <!-- 弹窗 婚姻状况 -->
      <van-popup v-model="isMarriage">
        <van-picker
          show-toolbar
          :default-index="defaultIndex"
          title="请选择"
          :columns="marriagecolumns"
          @cancel="isMarriage = false"
          @confirm="onPickerMarriage"
        />
      </van-popup>
      <!-- 弹窗 学历 -->
      <van-popup v-model="isDegree">
        <van-picker
          show-toolbar
          title="请选择"
          :default-index="defaultIndex"
          :columns="degreecolumns"
          @cancel="isDegree = false"
          @confirm="onPickerDegree"
        />
      </van-popup>

      <div class="apply-third-title">{{customerTitle}}</div>
      <van-cell-group>
        <van-field
          v-model="select.customerApplyName"
          disabled
          label="姓名："
          placeholder="请输入姓名"
          label-align="right"
          :error-message="customerNameError"
        />

        <van-field
          v-model="select.sexName"
          label="性别："
          placeholder="请选择性别"
          label-align="right"
          is-link
          :error-message="sexError"
          readonly
          @click-right-icon="isShowSex = true"
          @click="isShowSex = true"
        />

        <van-field
          v-model="select.customerApplyTel"
          type="tel"
          label="联系电话："
          placeholder="请输入联系电话"
          label-align="right"
          :error-message="customerTelError"
        />
        <van-field
          v-model="select.csuapplycardNumber"
          disabled
          label="证件号码："
          placeholder="请输入证件号码"
          label-align="right"
          :error-message="cardNumberError"
        />

        <van-field
          v-model="select.educationName"
          label="客户学历："
          placeholder="请选择客户学历"
          label-align="right"
          is-link
          :error-message="educationError"
          readonly
          @click-right-icon="isDegree = true"
          @click="isDegree = true"
        />

        <van-field
          v-model="select.customerApplyAddress"
          label="联系地址："
          placeholder="请输入联系地址"
          label-align="right"
          :disabled="customerAddress"
          :error-message="CustomerAddressError"
        />
      </van-cell-group>
      <div class="apply-third-title">客户婚姻信息</div>
      <van-cell-group>
        <van-field
          v-model="select.maritalStatusName"
          label="婚姻状况："
          placeholder="请选择婚姻状况"
          label-align="right"
          is-link
          :error-message="marriageError"
          readonly
          @click-right-icon="isMarriage = true"
          @click="isMarriage = true"
        />

        <van-field
          v-model="select.spouseTel"
          v-if="maritalStatus"
          label="联系电话："
          placeholder="请输入配偶联系电话"
          label-align="right"
          type="tel"
          :error-message="spouseTelError"
        />
        <van-field
          v-model="select.spouseCompanyTel"
          v-if="maritalStatus"
          label="公司电话："
          type="tel"
          placeholder="请输入配偶公司电话/座机"
          label-align="right"
          :error-message="spouseCompanyPhoneError"
        />
      </van-cell-group>

      <!-- 弹窗 房屋产权 -->
      <van-popup v-model="isPropertyRights">
        <van-picker
          show-toolbar
          :default-index="defaultIndex"
          title="请选择"
          :columns="propertyRightsColumns"
          @cancel="isPropertyRights = false"
          @confirm="onPickerPropertyRights"
        />
      </van-popup>
      <!-- 弹窗 房屋类型 -->
      <van-popup v-model="isHouseType">
        <van-picker
          show-toolbar
          :default-index="defaultIndex"
          title="请选择"
          :columns="propertyHouseType"
          @cancel="isHouseType = false"
          @confirm="onPickerHouseType"
        />
      </van-popup>
      <!-- 弹窗 收入来源 -->
      <van-popup v-model="isSourcesIncome">
        <van-picker
          show-toolbar
          :default-index="defaultIndex"
          title="请选择"
          :columns="sourcesIncome"
          @cancel="isSourcesIncome = false"
          @confirm="onPickerSourcesIncome"
        />
      </van-popup>

      <div class="apply-third-title">居住状况</div>
      <van-cell-group>
        <van-field
          v-model="select.housePropertyRightName"
          label="房屋产权："
          placeholder="请选择房屋产权"
          is-link
          label-align="right"
          :error-message="propertyRightsError"
          readonly
          @click-right-icon="isPropertyRights = true"
          @click="isPropertyRights = true"
        />

        <van-field
          v-model="select.houseTypeName"
          label="房屋类型："
          label-align="right"
          placeholder="请选择房屋类型"
          is-link
          :error-message="houseTypeError"
          readonly
          @click-right-icon="isHouseType = true"
          @click="isHouseType = true"
        />
      </van-cell-group>

      <div class="apply-third-title">经济状况</div>
      <van-cell-group>
        <van-field
          v-model="select.incomeSourceName"
          label="收入来源："
          label-align="right"
          placeholder="请选择收入来源"
          is-link
          :error-message="sourcesIncomeError"
          readonly
          @click-right-icon="isSourcesIncome = true"
          @click="isSourcesIncome = true"
        />
        <van-field
          v-model="select.yearIncome"
          label="家庭收入："
          placeholder="请输入家庭年收入(元)"
          label-align="right"
          type="number"
          :error-message="householdIncomeError"
        />
        <van-field
          v-model="select.monthRepayment"
          label="还款额(元)："
          placeholder="请输入家庭月还款额（贷款）"
          label-align="right"
          type="number"
          :error-message="repaymentsError"
        />
      </van-cell-group>
      <!-- 弹窗 单位类别 -->
      <van-popup v-model="isUnitCategory">
        <van-picker
          show-toolbar
          title="请选择"
          :default-index="defaultIndex"
          :columns="unitCategory"
          @cancel="isUnitCategory = false"
          @confirm="onPickerUnitCategory"
        />
      </van-popup>
      <!-- 弹窗 职务 -->
      <van-popup v-model="isDuties">
        <van-picker
          show-toolbar
          title="请选择"
          :default-index="defaultIndex"
          :columns="dutiesList"
          @cancel="isDuties = false"
          @confirm="onPickerDuties"
        />
      </van-popup>
      <div class="apply-third-title">工作状况</div>
      <van-cell-group>
        <van-field
          v-model="select.companyName"
          disabled
          label="单位名称："
          placeholder="请输入单位名称"
          label-align="right"
          :error-message="unitNameError"
        />
        <van-field
          v-model="select.monthIncome"
          label="月收入(元)："
          placeholder="请输入申请人现职月收入"
          label-align="right"
          type="number"
          :error-message="monthlyIncomeError"
        />
        <van-field
          v-model="select.companyAddress"
          label="单位地址："
          placeholder="请输入企业联系地址"
          label-align="right"
          :error-message="unitAddressError"
        />
        <van-field
          v-model="select.companyCategoryName"
          label="单位类别："
          placeholder="请选择单位类别"
          label-align="right"
          is-link
          :error-message="unitCategoryError"
          readonly
          @click-right-icon="isUnitCategory = true"
          @click="isUnitCategory = true"
        />
        <!-- <van-field
          v-model="select.profession"
          label="职业："
          placeholder="请输入职业"
          label-align="right"
          :error-message="occupationalError"
        />-->
        <!-- <van-field
          v-model="select.mainBusiness"
          label="主营业务："
          placeholder="请输入公司主营业务"
          label-align="right"
          :error-message="mainBusinessError"
        />-->
        <van-field
          v-model="select.workingLife"
          label="工作年限："
          placeholder="请输入工作年限"
          label-align="right"
          :error-message="yearsServiceError"
        />
        <van-field
          v-model="select.dutyName"
          label="职务："
          placeholder="请选择职务"
          label-align="right"
          is-link
          :error-message="dutiesError"
          readonly
          @click-right-icon="isDuties = true"
          @click="isDuties = true"
        />
        <van-field
          v-model="select.personnelTel"
          label="公司电话："
          type="tel"
          placeholder="请输入公司电话/座机"
          label-align="right"
          :error-message="personnelPhoneError"
        />
        <!-- <van-field
          v-model="select.deptTel"
          label="部门电话："
          placeholder="请输入部门电话/座机"
          label-align="right"
          :error-message="departmentPhoneError"
        />-->
      </van-cell-group>
      <!-- 弹窗 信用还款记录 -->
      <van-popup v-model="isCreditHistory">
        <van-picker
          show-toolbar
          ::default-index="defaultIndex"
          title="请选择"
          :columns="creditHistory"
          @cancel="isCreditHistory = false"
          @confirm="onPickerCreditHistory"
        />
      </van-popup>
      <!-- 弹窗 付费记录 -->
      <!-- <van-popup v-model="isPaidRecords">
        <van-picker
          show-toolbar
          :default-index="1"
          title="请选择"
          :columns="paidRecords"
          @cancel="isPaidRecords = false"
          @confirm="onPickerPaidRecords"
        />
      </van-popup>-->
      <!-- 弹窗 其他记录 -->
      <van-popup v-model="isOtherRecords">
        <van-picker
          show-toolbar
          :default-index="0"
          title="请选择"
          :columns="otherRecords"
          @cancel="isOtherRecords = false"
          @confirm="onPickerOtherRecords"
        />
      </van-popup>
      <div class="apply-third-title">信用状况</div>
      <van-cell-group>
        <van-field
          v-model="select.creditPaymentRecordName"
          label="信用记录："
          placeholder="请选择信用记录"
          label-align="right"
          is-link
          :error-message="creditHistoryError"
          readonly
          @click-right-icon="isCreditHistory = true"
          @click="isCreditHistory = true"
        />
        <!-- <van-field
          v-model="select.publicPaymentRecordName"
          label="付费记录："
          placeholder="请选择付费记录"
          label-align="right"
          is-link
          :error-message="paidRecordsError"
          readonly
          @click-right-icon="isPaidRecords = true"
          @click="isPaidRecords = true"
        />-->
        <van-field
          v-model="select.otherRecordName"
          label="其他记录："
          placeholder="请选择其他记录"
          label-align="right"
          is-link
          :error-message="otherRecordsError"
          readonly
          @click-right-icon="isOtherRecords = true"
          @click="isOtherRecords = true"
        />
      </van-cell-group>
      <div class="apply-third-title">其他联系人基本资料</div>
      <van-cell-group>
        <van-field
          v-model="select.otherName1"
          label="姓名："
          placeholder="请输入中文姓名"
          label-align="right"
          :error-message="otherContactNames1Error"
        />

        <van-field
          v-model="select.otherRelation1"
          label="关系："
          placeholder="请输入与申请人关系"
          label-align="right"
          :error-message="otherContactRelationship1Error"
        />

        <van-field
          v-model="select.otherAddress1"
          label="地址："
          placeholder="请输入联系地址"
          label-align="right"
          :error-message="otherContactAddr1Error"
        />

        <van-field
          v-model="select.otherTel1"
          label="电话："
          type="tel"
          placeholder="请输入联系电话"
          label-align="right"
          :error-message="otherContactPhone1Error"
        />
      </van-cell-group>
      <div class="apply-third-title">担保人一基本资料</div>
      <van-cell-group>
        <van-field
          v-model="select.guarantor"
          label="姓名："
          placeholder="请输入担保人姓名"
          label-align="right"
          disabled
          :error-message="guarantorNamesError"
        />

        <van-field
          v-model="select.guarantorRelation"
          label="关系："
          placeholder="请输入与申请人关系"
          label-align="right"
          :error-message="guarantorRelationshipError"
        />

        <van-field
          v-model="select.guarantorAddress"
          label="地址："
          placeholder="请输入联系地址"
          label-align="right"
          disabled
          :error-message="guarantorAddrError"
        />

        <van-field
          v-model="select.guarantorTel"
          label="电话："
          disabled
          placeholder="请输入联系电话"
          type="tel"
          label-align="right"
          :error-message="guarantorPhoneError"
        />
      </van-cell-group>
      <div class="apply-third-title">担保人二基本资料</div>
      <van-cell-group>
        <van-field
          v-model="select.guarantor2"
          label="姓名："
          placeholder="请输入担保人姓名"
          label-align="right"
          disabled
          :error-message="guarantorNamesError2"
        />

        <van-field
          v-model="select.guarantorRelation2"
          label="关系："
          placeholder="请输入与申请人关系"
          label-align="right"
          :error-message="guarantorRelationshipError2"
        />

        <van-field
          v-model="select.guarantorAddress2"
          label="地址："
          placeholder="请输入联系地址"
          label-align="right"
          disabled
          :error-message="guarantorAddrError2"
        />

        <van-field
          v-model="select.guarantorTel2"
          label="电话："
          disabled
          placeholder="请输入联系电话"
          type="tel"
          label-align="right"
          :error-message="guarantorPhoneError2"
        />
      </van-cell-group>
      <van-row type="flex" justify="space-around" style="margin-top:20px;">
        <van-col span="14">
          <van-button type="info" block size="small" round @click="complete">完成</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $validate from '@/lib/validate';
import $request from '@/lib/request';
import {
  Row,
  Col,
  Button,
  Field,
  Cell,
  CellGroup,
  Picker,
  Popup,
  NavBar,
  Toast,
} from 'vant';

Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Popup)
  .use(NavBar)
  .use(Toast);

@Component({ name: 'DriveThird' })
export default class DriveThird extends Vue {
  public defaultIndex: number = 2; // picker的默认选项
  public customerTitle: string = ''; // 标题信息
  // 提示信息
  public customerNameError: string = '';
  public sexError: string = '';
  public customerTelError: string = '';
  public cardTypeError: string = '';
  public cardNumberError: string = '';
  public CustomerAddressError: string = '';
  public marriageError: string = '';
  public educationError: string = '';
  public spouseTelError: string = '';
  public propertyRightsError: string = '';
  public houseTypeError: string = '';
  public sourcesIncomeError: string = '';
  public householdIncomeError: string = '';
  public repaymentsError: string = '';
  public unitNameError: string = '';
  public monthlyIncomeError: string = '';
  public unitAddressError: string = '';
  public unitCategoryError: string = '';
  public occupationalError: string = '';
  public mainBusinessError: string = '';
  public yearsServiceError: string = '';
  public dutiesError: string = '';
  public personnelPhoneError: string = '';
  public departmentPhoneError: string = '';
  public spouseCompanyPhoneError: string = '';
  public creditHistoryError: string = '';
  public paidRecordsError: string = '';
  public otherRecordsError: string = '';
  public otherContactNames1Error: string = '';
  public otherContactRelationship1Error: string = '';
  public otherContactAddr1Error: string = '';
  public otherContactPhone1Error: string = '';

  public otherContactNames2Error: string = '';
  public otherContactRelationship2Error: string = '';
  public otherContactAddr2Error: string = '';
  public otherContactPhone2Error: string = '';

  public guarantorNamesError: string = '';
  public guarantorRelationshipError: string = '';
  public guarantorAddrError: string = '';
  public guarantorPhoneError: string = '';

  public guarantorNamesError2: string = '';
  public guarantorRelationshipError2: string = '';
  public guarantorAddrError2: string = '';
  public guarantorPhoneError2: string = '';

  public maritalStatus: boolean = true; // 配偶相关表单是否显示
  // 提交信息
  public select: any = {
    sex: '', // 性别
    sexName: '', // 性别 text
    maritalStatusName: '', // 婚姻状况text
    maritalStatusId: '', // 婚姻状况
    spouseTel: '', // 配偶联系方式
    customerApplyTel: '', // 联系电话
    educationName: '', // 学历text
    educationId: '', // 学历
    housePropertyRightName: '', // 房屋产权text
    housePropertyRightId: '', // 房屋产权
    houseTypeName: '', // 房屋类型text
    houseTypeId: '', // 房屋类型
    incomeSourceName: '', // 收入来源text
    incomeSourceId: '', // 收入来源
    yearIncome: '', // 家庭年收入
    monthRepayment: '', // 家庭月还款额
    companyName: '', // 单位名称
    monthIncome: '', // 申请人现职月收入
    companyAddress: '', // 单位地址
    companyCategoryName: '', // 单位类别text
    companyCategoryId: '', // 单位类别
    profession: '职业', // 职业
    mainBusiness: '主营业务', // 公司主营业务
    workingLife: '', // 工作年限
    dutyName: '', // 职务text
    dutyId: '', // 职务
    personnelTel: '', // 公司电话
    deptTel: '16666666666', // 公司部门电话
    spouseCompanyTel: '', // 配偶公司电话/地址
    creditPaymentRecordName: '', // 信用还款记录text
    creditPaymentRecordId: '', // 信用还款记录
    publicPaymentRecordName: '付费记录', // 付费记录text
    publicPaymentRecordId: 11, // 付费记录
    otherRecordName: '', // 其他记录text
    otherRecordId: '', // 其他记录
    otherName1: '', // 其他联系人姓名1
    otherRelation1: '', // 与申请人关系1
    otherAddress1: '', // 其他联系人地址1
    otherTel1: '', // 其他联系人电话1
    guarantor: '', // 担保人姓名
    guarantorRelation: '', // 担保人与申请人关系
    guarantorAddress: '', // 担保人地址
    guarantorTel: '', // 担保人电话

    guarantor2: '', // 担保人姓名
    guarantorRelation2: '', // 担保人与申请人关系
    guarantorAddress2: '', // 担保人地址
    guarantorTel2: '', // 担保人电话

    customerApplyName: '', // 客户姓名
    cusapplycardType: '', // 证件类型text
    cusapplycardTypeId: '', // 证件类型
    csuapplycardNumber: '', // 证件号码
    customerApplyAddress: '', // 客户地址
  };
  // 弹出框是否显示
  public isShowSex: boolean = false;
  public isDocumentType: boolean = false;
  public isMarriage: boolean = false;
  public isDegree: boolean = false;
  public isPropertyRights: boolean = false;
  public isHouseType: boolean = false;
  public isSourcesIncome: boolean = false;
  public isUnitCategory: boolean = false;
  public isDuties: boolean = false;
  public isCreditHistory: boolean = false;
  public isPaidRecords: boolean = false;
  public isOtherRecords: boolean = false;
  // 性别选择是否显示顶部栏
  public sexTool: boolean = true;
  // 客户联系地址是否禁用
  public customerAddress: boolean = false;
  // 性别选项
  public sexColumns: object[] = [
    { text: '男', key: 0 },
    { text: '女', key: 1 },
  ];
  // 证件类型选项
  public Documentcolumns: object[] = [
    { text: '营业执照', key: 2 },
    { text: '身份证', key: 1 },
  ];
  // 婚姻状况选项
  public marriagecolumns = [];
  // 学历选项
  public degreecolumns = [];
  // 房屋产权选项
  public propertyRightsColumns = [];
  // 房屋类型选项
  public propertyHouseType = [];
  // 主要收入来源选项
  public sourcesIncome = [];
  // 单位类别
  public unitCategory = [];
  // 职务
  public dutiesList = [];
  // 信用还款记录
  public creditHistory = [];
  // 付费记录
  public paidRecords = [];
  // 其他记录
  public otherRecords = [];

  //   方法------------------------------------------------------------

  // 性别选项弹出框
  public onPickerSex(value) {
    this.select.sexName = value.text;
    this.select.sex = value.key;
    this.isShowSex = false;
  }
  // 证件类型弹出框
  public onPickerDocument(value) {
    this.select.cusapplycardType = value.text;
    this.select.cusapplycardTypeId = value.key;
    this.isDocumentType = false;
  }
  // 婚姻状况弹出框
  public onPickerMarriage(value) {
    this.select.maritalStatusName = value.text;
    if (this.select.maritalStatusName == '未婚') {
      this.maritalStatus = false;
    } else {
      this.maritalStatus = true;
    }
    this.select.maritalStatusId = value.key;
    this.isMarriage = false;
  }
  // 学历弹出框
  public onPickerDegree(value) {
    this.select.educationName = value.text;
    this.select.educationId = value.key;
    this.isDegree = false;
  }
  // 房屋产权弹出框
  public onPickerPropertyRights(value) {
    this.select.housePropertyRightName = value.text;
    this.select.housePropertyRightId = value.key;
    this.isPropertyRights = false;
  }
  // 房屋类型弹出框
  public onPickerHouseType(value) {
    this.select.houseTypeName = value.text;
    this.select.houseTypeId = value.key;
    this.isHouseType = false;
  }
  // 主要收入来源
  public onPickerSourcesIncome(value) {
    this.select.incomeSourceName = value.text;
    this.select.incomeSourceId = value.key;
    this.isSourcesIncome = false;
  }
  // 单位类别
  public onPickerUnitCategory(value) {
    this.select.companyCategoryName = value.text;
    this.select.companyCategoryId = value.key;
    this.isUnitCategory = false;
  }
  // 职务
  public onPickerDuties(value) {
    this.select.dutyName = value.text;
    this.select.dutyId = value.key;
    this.isDuties = false;
  }
  // 信用还款记录
  public onPickerCreditHistory(value) {
    this.select.creditPaymentRecordName = value.text;
    this.select.creditPaymentRecordId = value.key;
    this.isCreditHistory = false;
  }
  // 其他记录
  public onPickerOtherRecords(value) {
    this.select.otherRecordName = value.text;
    this.select.otherRecordId = value.key;
    this.isOtherRecords = false;
  }
  // 返回
  public back() {
    this.$router.back();
    this.$store.commit('changeApplyThird', this.select);
  }
  // 编辑提交
  public editSubmission() {
    this.$toast.loading({
      message: '提交中...',
      mask: true,
      duration: 0,
      forbidClick: true,
    });
    // 将所有表单数据赋值给data
    const applyloan1 = this.$store.state.applyLoan1;
    applyloan1.applyMoney = Number.parseInt(
      this.$store.state.applyLoan1.applyMoney,
      10,
    );
    const applyloan2 = this.$store.state.applyLoan2;
    const applyloan3 = this.select;
    const data = { ...applyloan3, ...applyloan1, ...applyloan2 };
    data.agentId = this.$store.state.loginSuccess.memberId;
    data.evidence = this.$store.state.evidence;
    data.applyId = this.$store.state.applyLoan3.applyId;
    const json = JSON.stringify(data);
    $request({
      url: `${this.$config.baseUrl}api/loan/upApplyLoanInfo`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        if (result.data.success) {
          this.$store.commit('deleteApplyLoan');
          this.$store.commit('loanEditno');
          this.$toast.success(result.data.msg);
          // 删除 申请贷款数据
          this.$router.replace({ name: 'home' });
        } else {
          this.$toast.fail(result.data.msg);
        }
      })
      .catch((err) => {
        this.$toast.fail('系统异常' + err);
      });
  }
  // 非编辑提交
  public notEditSubmission() {
    this.$toast.loading({
      message: '提交中...',
      mask: true,
      duration: 0,
      forbidClick: true,
    });
    // 将所有表单数据赋值给data
    const applyloan1 = this.$store.state.applyLoan1;
    applyloan1.applyMoney = Number.parseInt(
      this.$store.state.applyLoan1.applyMoney,
      10,
    );
    const applyloan2 = this.$store.state.applyLoan2;
    const applyloan3 = this.select;
    const data = { ...applyloan3, ...applyloan1, ...applyloan2 };
    data.evidence = this.$store.state.evidence;
    data.agentId = this.$store.state.loginSuccess.memberId;
    const json = JSON.stringify(data);
    $request({
      url: `${this.$config.baseUrl}api/loan/applyLoan`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        if (result.data.success === true) {
          this.$store.commit('deleteApplyLoan');
          this.$store.commit('loanEditno');
          this.$toast.success(result.data.msg);
          // 删除 申请贷款数据
          this.$router.replace({ name: 'home' });
        } else {
          this.$toast.fail(result.data.msg);
        }
      })
      .catch((err) => {
        this.$toast.fail('系统异常' + err);
      });
  }
  // 点击完成
  public complete() {
    $validate.RealName(this.select.customerApplyName, (res) => {
      this.customerNameError = res;
    });
    $validate.Sex(this.select.sexName, (res) => {
      this.sexError = res;
    });
    $validate.Tel(this.select.customerApplyTel, (res) => {
      this.customerTelError = res;
    });
    $validate.IsNull(this.select.csuapplycardNumber, (res) => {
      this.cardNumberError = res;
    });
    $validate.Address(this.select.customerApplyAddress, (res) => {
      this.CustomerAddressError = res;
    });
    $validate.IsNull(this.select.maritalStatusName, (res) => {
      this.marriageError = res;
    });
    $validate.IsNull(this.select.educationName, (res) => {
      this.educationError = res;
    });
    $validate.IsNull(this.select.housePropertyRightName, (res) => {
      this.propertyRightsError = res;
    });
    $validate.IsNull(this.select.houseTypeName, (res) => {
      this.houseTypeError = res;
    });
    $validate.IsNull(this.select.incomeSourceName, (res) => {
      this.sourcesIncomeError = res;
    });
    $validate.IsNull(this.select.yearIncome, (res) => {
      this.householdIncomeError = res;
    });
    $validate.IsNull(this.select.monthRepayment, (res) => {
      this.repaymentsError = res;
    });
    $validate.IsNull(this.select.companyName, (res) => {
      this.unitNameError = res;
    });
    $validate.IsNull(this.select.monthIncome, (res) => {
      this.monthlyIncomeError = res;
    });
    $validate.IsNull(this.select.companyAddress, (res) => {
      this.unitAddressError = res;
    });
    $validate.IsNull(this.select.companyCategoryName, (res) => {
      this.unitCategoryError = res;
    });
    $validate.IsNull(this.select.workingLife, (res) => {
      this.yearsServiceError = res;
    });
    $validate.IsNull(this.select.dutyName, (res) => {
      this.dutiesError = res;
    });
    $validate.Landline(this.select.personnelTel, (res) => {
      this.personnelPhoneError = res;
    });
    $validate.IsNull(this.select.creditPaymentRecordName, (res) => {
      this.creditHistoryError = res;
    });
    $validate.IsNull(this.select.otherRecordName, (res) => {
      this.otherRecordsError = res;
    });
    $validate.RealName(this.select.otherName1, (res) => {
      this.otherContactNames1Error = res;
    });
    $validate.IsNull(this.select.otherRelation1, (res) => {
      this.otherContactRelationship1Error = res;
    });
    $validate.IsNull(this.select.otherAddress1, (res) => {
      this.otherContactAddr1Error = res;
    });
    $validate.Tel(this.select.otherTel1, (res) => {
      this.otherContactPhone1Error = res;
    });
    if (this.select.guarantor) {
      $validate.IsNull(this.select.guarantorRelation, (res) => {
        this.guarantorRelationshipError = res;
      });
    }
    if (this.select.guarantor2) {
      $validate.IsNull(this.select.guarantorRelation2, (res) => {
        this.guarantorRelationshipError2 = res;
      });
    }
    if (
      !this.customerNameError &&
      !this.sexError &&
      !this.customerTelError &&
      !this.cardNumberError &&
      !this.CustomerAddressError &&
      !this.marriageError &&
      !this.educationError &&
      !this.spouseTelError &&
      !this.propertyRightsError &&
      !this.houseTypeError &&
      !this.sourcesIncomeError &&
      !this.householdIncomeError &&
      !this.repaymentsError &&
      !this.unitNameError &&
      !this.monthlyIncomeError &&
      !this.unitAddressError &&
      !this.unitCategoryError &&
      !this.occupationalError &&
      !this.mainBusinessError &&
      !this.yearsServiceError &&
      !this.dutiesError &&
      !this.personnelPhoneError &&
      !this.departmentPhoneError &&
      !this.spouseCompanyPhoneError &&
      !this.creditHistoryError &&
      !this.paidRecordsError &&
      !this.otherRecordsError &&
      !this.otherContactNames1Error &&
      !this.otherContactRelationship1Error &&
      !this.otherContactAddr1Error &&
      !this.otherContactPhone1Error &&
      !this.otherContactNames2Error &&
      !this.otherContactRelationship2Error &&
      !this.otherContactAddr2Error &&
      !this.otherContactPhone2Error &&
      !this.guarantorNamesError &&
      !this.guarantorRelationshipError &&
      !this.guarantorAddrError &&
      !this.guarantorPhoneError &&
      !this.guarantorNamesError2 &&
      !this.guarantorRelationshipError2 &&
      !this.guarantorAddrError2 &&
      !this.guarantorPhoneError2
    ) {
      if (this.$store.state.isLoanEdit === true) {
        // console.log("编辑提交");
        this.editSubmission();
      } else {
        // console.log("非编辑提交");
        this.notEditSubmission();
      }
    } else {
      this.$toast('表单填写不正确!');
    }
  }
  //   挂载时初始化数据 ----------------------------------------------
  public initState() {
    this.$toast.loading({
      mask: true,
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    if (this.$store.state.applyLoan1.customerTypeId === 1) {
      this.customerTitle = '客户个人信息';
    } else {
      this.customerTitle = '企业法人信息';
    }
    $request({
      url: `api/system/getThreePageParam`,
      method: 'get',
    })
      .then((result) => {
        // 设置选项列表
        this.marriagecolumns = result.data.map.maritalStatus;
        this.degreecolumns = result.data.map.education;
        this.propertyRightsColumns = result.data.map.housePropertyRight;
        this.propertyHouseType = result.data.map.houseType;
        this.sourcesIncome = result.data.map.incomeSource;
        this.unitCategory = result.data.map.companyCategory;
        this.dutiesList = result.data.map.duty;
        this.creditHistory = result.data.map.creditPaymentRecord;
        this.paidRecords = result.data.map.ggsw;
        this.otherRecords = result.data.map.qt;
        // 编辑所显示的数据
        if (this.$store.state.isLoanEdit === true) {
          // console.log("编辑办理");
          this.select = this.$store.state.applyLoan3;
          // 如果是个人从第二页带过来的信息
          if (this.$store.state.applyLoan1.customerTypeId === 1) {
            this.select.customerApplyName = this.$store.state.applyLoan2.customerName;
            this.select.customerApplyTel = this.$store.state.applyLoan2.customerTel;
            this.select.csuapplycardNumber = this.$store.state.applyLoan2.cardNumber;
            this.select.customerApplyAddress = this.$store.state.applyLoan2.customerAddress;
            this.select.companyName = this.$store.state.applyLoan2.workUnit;

            this.select.guarantor = this.$store.state.applyLoan2.guarantorName;
            this.select.guarantorIDNumber = this.$store.state.applyLoan2.guarantorIDNumber;
            this.select.guarantorAddress = this.$store.state.applyLoan2.guarantorAddress;
            this.select.guarantorTel = this.$store.state.applyLoan2.guarantorTel;

            this.select.guarantor2 = this.$store.state.applyLoan2.guarantorName2;
            this.select.guarantorIDNumber2 = this.$store.state.applyLoan2.guarantorIDNumber2;
            this.select.guarantorAddress2 = this.$store.state.applyLoan2.guarantorAddress2;
            this.select.guarantorTel2 = this.$store.state.applyLoan2.guarantorTel2;
          } else {
            this.select.customerApplyName = this.$store.state.applyLoan2.legalPerson;
            this.select.csuapplycardNumber = this.$store.state.applyLoan2.lpIDNumber;
            this.select.companyName = this.$store.state.applyLoan2.customerName;

            this.select.guarantor = this.$store.state.applyLoan2.guarantorName;
            this.select.guarantorIDNumber = this.$store.state.applyLoan2.guarantorIDNumber;
            this.select.guarantorAddress = this.$store.state.applyLoan2.guarantorAddress;
            this.select.guarantorTel = this.$store.state.applyLoan2.guarantorTel;

            this.select.guarantor2 = this.$store.state.applyLoan2.guarantorName2;
            this.select.guarantorIDNumber2 = this.$store.state.applyLoan2.guarantorIDNumber2;
            this.select.guarantorAddress2 = this.$store.state.applyLoan2.guarantorAddress2;
            this.select.guarantorTel2 = this.$store.state.applyLoan2.guarantorTel2;
          }
          if (this.$store.state.applyLoan3) {
            if (this.$store.state.applyLoan3.sex === 0) {
              this.select.sexName = '男';
            } else if (this.$store.state.applyLoan3.sex === 1) {
              this.select.sexName = '女';
            }
          }

          const func = (columns, selectKey) => {
            const data = columns.filter((item) => {
              return item.key == selectKey;
            });
            return data[0].text;
          };
          // 婚姻状况
          this.select.maritalStatusName = func(
            this.marriagecolumns,
            this.select.maritalStatusId,
          );
          // 学历
          this.select.educationName = func(
            this.degreecolumns,
            this.select.educationId,
          );
          // 房屋产权
          this.select.housePropertyRightName = func(
            this.propertyRightsColumns,
            this.select.housePropertyRightId,
          );
          // 房屋类型
          this.select.houseTypeName = func(
            this.propertyHouseType,
            this.select.houseTypeId,
          );
          // 收入来源
          this.select.incomeSourceName = func(
            this.sourcesIncome,
            this.select.incomeSourceId,
          );
          // 单位类别
          this.select.companyCategoryName = func(
            this.unitCategory,
            this.select.companyCategoryId,
          );
          // 职务
          this.select.dutyName = func(this.dutiesList, this.select.dutyId);
          // 信用还款记录
          this.select.creditPaymentRecordName = func(
            this.creditHistory,
            this.select.creditPaymentRecordId,
          );
          // 其他记录
          this.select.otherRecordName = func(
            this.otherRecords,
            this.select.otherRecordId,
          );
          this.$toast.clear();
        } else {
          // 如果是个人办理
          if (this.$store.state.applyLoan1.customerTypeId === 1) {
            if (this.$store.state.applyLoan1.ismyself) {
              (this.sexColumns = [{ text: '该选项不可更改', key: 0 }]),
                (this.sexTool = false);
            }
            this.customerAddress = true;
            console.log('个人办理 非编辑 ');
            this.select = this.$store.state.applyLoan3;
            this.select.customerApplyName = this.$store.state.applyLoan2.customerName;
            this.select.customerApplyTel = this.$store.state.applyLoan2.customerTel;
            this.select.cusapplycardType = this.$store.state.applyLoan2.cardTypeName;
            this.select.csuapplycardNumber = this.$store.state.applyLoan2.cardNumber;
            this.select.customerApplyAddress = this.$store.state.applyLoan2.customerAddress;
            this.select.companyName = this.$store.state.applyLoan2.workUnit;
            this.select.cusapplycardTypeId = this.$store.state.applyLoan2.cardType;
            this.select.guarantor = this.$store.state.applyLoan2.guarantorName;
            this.select.guarantorIDNumber = this.$store.state.applyLoan2.guarantorIDNumber;
            this.select.guarantorAddress = this.$store.state.applyLoan2.guarantorAddress;
            this.select.guarantorTel = this.$store.state.applyLoan2.guarantorTel;

            this.select.guarantor2 = this.$store.state.applyLoan2.guarantorName2;
            this.select.guarantorIDNumber2 = this.$store.state.applyLoan2.guarantorIDNumber2;
            this.select.guarantorAddress2 = this.$store.state.applyLoan2.guarantorAddress2;
            this.select.guarantorTel2 = this.$store.state.applyLoan2.guarantorTel2;
            const loginSuccess = this.$store.state.loginSuccess;
            // 设置性别
            this.select.sex = loginSuccess.sex;
            if (this.select.sex === 0) {
              this.select.sexName = '男';
            } else if (this.select.sex === 1) {
              this.select.sexName = '女';
            }
          } else {
            this.select = this.$store.state.applyLoan3;
            this.select.customerApplyName = this.$store.state.applyLoan2.legalPerson;
            this.select.csuapplycardNumber = this.$store.state.applyLoan2.lpIDNumber;
            this.select.companyAddress = this.$store.state.applyLoan2.customerAddress;
            this.select.companyName = this.$store.state.applyLoan2.customerName;
            this.select.guarantor = this.$store.state.applyLoan2.guarantorName;
            this.select.guarantorIDNumber = this.$store.state.applyLoan2.guarantorIDNumber;
            this.select.guarantorAddress = this.$store.state.applyLoan2.guarantorAddress;
            this.select.guarantorTel = this.$store.state.applyLoan2.guarantorTel;

            this.select.guarantor2 = this.$store.state.applyLoan2.guarantorName2;
            this.select.guarantorIDNumber2 = this.$store.state.applyLoan2.guarantorIDNumber2;
            this.select.guarantorAddress2 = this.$store.state.applyLoan2.guarantorAddress2;
            this.select.guarantorTel2 = this.$store.state.applyLoan2.guarantorTel2;
            console.log('企业办理 非编辑');
          }
          Toast.clear();
        }
      })
      .catch((err) => {
        Toast.fail('系统异常' + err);
      });
  }
  private mounted() {
    this.initState();
  }
}
</script>

<style lang="scss" scoped>
.apply-third-container {
  width: 90%;
  margin: 0 auto;
}
/* 标题样式 */
.apply-third-title {
  margin: 5px 10px;
  width: 90%;
  text-align: center;
  font-size: 14px;
  color: #606266;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/* 表单样式 */

.van-cell-group {
  border-bottom: 1px solid #e4e7ed;
}
.van-cell {
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;

  width: 100%;
  height: 50px;

  text-align: center;

  color: #323233;
}
/* 弹出框样式 */
.van-popup {
  width: 100%;
  top: 100%;
  transform: translate3d(-50%, -100%, 0);
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>