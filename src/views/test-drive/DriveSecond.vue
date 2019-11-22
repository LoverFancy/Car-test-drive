<template>
  <div>
    <van-nav-bar title="申请贷款" left-text="返回" @click-left="previou" left-arrow></van-nav-bar>
    <div class="drive-second">
      <!-- 申请贷款 （个人） -->
      <div class="drive-second-title">{{select.customerType | customerTypefilter}}</div>
      <van-cell-group>
        <!-- 名称 -->
        <van-field
          v-model="select.customerName"
          label-align="right"
          :label="name"
          placeholder="请输入名称"
          :error-message="usernameMessage"
        />
        <!-- 证件类型-->
        <van-field
          v-model="select.cardTypeName"
          label="证件类型："
          placeholder="请选择证件类型"
          label-align="right"
          is-link
          :error-message="cardTypeNameMessage"
          readonly
          @click-right-icon="isdocumentType = true"
          @click="isdocumentType = true"
        />
        <van-popup v-model="isdocumentType">
          <van-picker
            show-toolbar
            title="请选择"
            :columns="idcolumns"
            @cancel="isdocumentType = false"
            @confirm="onPickerCustomer"
          />
        </van-popup>
        <!-- 证件号码 -->
        <van-field
          v-model="select.cardNumber"
          label-align="right"
          label="证件号码："
          placeholder="请输入证件号码"
          :error-message="certificateMessage"
        />
        <!-- 证件地址： -->
        <van-field
          v-model="select.customerIdAddress"
          label-align="right"
          label="证件地址："
          placeholder="请输入证件地址"
          :error-message="customerIdAddressMessage"
        />
        <!-- 联系电话 -->
        <van-field
          v-model="select.customerTel"
          label-align="right"
          type="tel"
          label="联系电话："
          placeholder="请输入联系电话"
          :error-message="telMessage"
        />
        <!-- 联系地址 -->
        <van-field
          v-model="select.customerAddress"
          label-align="right"
          label="联系地址："
          placeholder="请输入联系地址"
          :error-message="addrMessage"
        />
      </van-cell-group>

      <template v-if="select.customerType === 1">
        <div>
          <!-- 单位名称 -->
          <van-field
            class="last-input"
            v-model="select.workUnit"
            label-align="right"
            label="单位名称："
            placeholder="请输入单位名称"
            :error-message="workMessage"
          />
        </div>
      </template>
      <!-- 申请贷款 (企业) -->
      <template v-else>
        <div>
          <div class="drive-second-title">法人信息</div>
          <!-- 法人信息 -->
          <van-field
            v-model="select.legalPerson"
            label-align="right"
            label="法人姓名："
            placeholder="请输入法人姓名"
            :error-message="legalPersonMessage"
          />
          <van-field
            v-model="select.lpIDNumber"
            label-align="right"
            label="身份证号："
            placeholder="请输入法人身份证号"
            :error-message="lpIDNumberMessage"
          />
        </div>
      </template>

      <div class="drive-second-title">担保人一信息</div>
      <van-cell-group>
        <!-- 担保人姓名 -->
        <van-field
          v-model="select.guarantorName"
          label-align="right"
          label="姓名："
          placeholder="请输入担保人姓名"
          :error-message="guarantorMessage"
        />
        <!-- 担保人身份证号 -->
        <van-field
          v-model="select.guarantorIDNumber"
          label-align="right"
          label="身份证号："
          placeholder="请输入担保人身份证号"
          :error-message="guarantorCardMessage"
        />
        <!-- 担保人证件地址 -->
        <van-field
          v-model="select.guarantorIdAddress"
          label-align="right"
          label="证件地址："
          placeholder="请输入担保人证件地址"
          :error-message="guarantorIdAddrMessage"
        />
        <!-- 担保人联系地址 -->
        <van-field
          v-model="select.guarantorAddress"
          label-align="right"
          label="联系地址："
          placeholder="请输入担保人联系地址"
          :error-message="guarantorAddrMessage"
        />
        <!-- 担保人电话 -->
        <van-field
          v-model="select.guarantorTel"
          label="联系电话："
          type="tel"
          placeholder="请输入联系电话"
          label-align="right"
          :error-message="guarantorPhoneError"
        />
      </van-cell-group>
      <!-- 担保人信息二 -->
      <div class="drive-second-title">担保人二信息</div>
      <van-cell-group>
        <!-- 担保人姓名 -->
        <van-field
          v-model="select.guarantorName2"
          label-align="right"
          label="姓名："
          placeholder="请输入担保人姓名"
          :error-message="guarantorMessage2"
        />
        <!-- 担保人身份证号 -->
        <van-field
          v-model="select.guarantorIDNumber2"
          label-align="right"
          label="身份证号："
          placeholder="请输入担保人身份证号"
          :error-message="guarantorCardMessage2"
        />
        <!-- 担保人证件地址 -->
        <van-field
          v-model="select.guarantorIdAddress2"
          label-align="right"
          label="证件地址："
          placeholder="请输入担保人证件地址"
          :error-message="guarantorIdAddrMessage2"
        />
        <!-- 担保人联系地址 -->
        <van-field
          v-model="select.guarantorAddress2"
          label-align="right"
          label="联系地址："
          placeholder="请输入担保人联系地址"
          :error-message="guarantorAddrMessage2"
        />
        <!-- 担保人电话 -->
        <van-field
          v-model="select.guarantorTel2"
          label="联系电话："
          type="tel"
          placeholder="请输入联系电话"
          label-align="right"
          :error-message="guarantorPhoneError2"
        />
      </van-cell-group>
      <!-- 需提交材料： -->
      <van-row class="drive-smalltext-box">
        <van-col span="22" offset="1">
          <span class="drive-smalltext">需提交材料：</span>
        </van-col>
      </van-row>
      <div class="material" v-for="(evidenceKey,index) in evidenceUrl" :key="index">
        <div class="small-title">
          <span class="small-title-text">{{index+1+ '、'}}{{evidenceKey.text}}</span>
        </div>
        <div class="img-group first-img-group">
          <!-- <template v-if="evidenceKey.domain"> -->
          <div v-for="(src,index) in evidenceKey.imgs" :key="index">
            <img
              class="uploadimg"
              :key="index"
              style="width:60px;height:60px"
              v-show="src"
              :src="evidenceKey.domain + src"
              alt
              ref="img"
              @click="watchPic(index,evidenceKey.num)"
            />
            <van-icon
              name="close"
              v-show="src"
              :key="index"
              @click="delimg(evidenceKey.num,index)"
            />
          </div>
          <!-- </template> -->

          <van-uploader multiple :name="evidenceKey.num" :after-read="onRead">
            <van-icon name="photograph" />
          </van-uploader>
        </div>
      </div>
      <!--  -->
      <van-row class="complete-button" type="flex" justify="center">
        <van-col span="14">
          <van-button type="info" block round size="small" @click="complete">下一步</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
interface selectInterface {
  customerType: number; // 客户类型
  customerName: string; // 客户名称
  cardType: number; // 证件类型
  cardNumber: string; // 证件号码
  customerTel: string; // 客户联系电话
  customerAddress: string; // 客户联系地址
  customerIdAddress: string; // 证件地址
  legalPerson: string; // 法人姓名
  lpIDNumber: string; // 法人身份证号
  workUnit: string; // 工作单位
  guarantorName: string; // 担保人姓名
  guarantorIDNumber: string; // 担保人身份证号
  guarantorIdAddress: string; // 担保人证件地址
  guarantorAddress: string; // 担保人联系地址
  guarantorTel: string; // 担保人电话
  guarantorName2: string; // 担保人2姓名
  guarantorIDNumber2: string; // 担保人2身份证号
  guarantorIdAddress2: string; // 担保人2证件地址
  guarantorAddress2: string; // 担保人2联系地址
  guarantorTel2: string; // 担保人2电话
  cardTypeName: string; // 证件类型text
}
import $util from '@/lib/util'; // 导入图片压缩模块
import $validate from '@/lib/validate'; // 表单验证模块
import $request from '@/lib/request'; // 导入 axios
import { Vue, Component } from 'vue-property-decorator';
import {
  Row,
  Col,
  Button,
  Uploader,
  Icon,
  Cell,
  CellGroup,
  Field,
  NavBar,
  Toast,
  Picker,
  ImagePreview,
  Popup,
} from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Uploader)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(NavBar)
  .use(ImagePreview)
  .use(Popup)
  .use(Picker)
  .use(Toast);

@Component({
  name: 'DriveSecond',
  filters: {
    customerTypefilter(value) {
      if (value === 1) {
        return '个人客户信息';
      } else {
        return '企业客户信息';
      }
    },
  },
})
export default class DriveSecond extends Vue {
  public select: selectInterface = {
    // 共用
    customerType: 2, // 客户类型
    customerName: '', // 客户名称
    cardType: 1, // 证件类型
    cardNumber: '', // 证件号码
    customerTel: '', // 客户联系电话
    customerAddress: '', // 客户联系地址
    customerIdAddress: '', // 证件地址
    legalPerson: '', // 法人姓名
    lpIDNumber: '', // 法人身份证号
    workUnit: '', // 工作单位
    guarantorName: '', // 担保人姓名
    guarantorIDNumber: '', // 担保人身份证号
    guarantorIdAddress: '', // 担保人证件地址
    guarantorAddress: '', // 担保人联系地址
    guarantorTel: '', // 担保人电话
    guarantorName2: '', // 担保人2姓名
    guarantorIDNumber2: '', // 担保人2身份证号
    guarantorIdAddress2: '', // 担保人2证件地址
    guarantorAddress2: '', // 担保人2联系地址
    guarantorTel2: '', // 担保人2电话

    cardTypeName: '', // 证件类型text
  };
  public name: string = '';
  public showImg: boolean = true;
  public showImg2: boolean = true;
  public isdocumentType: boolean = false; // 身份证号选项卡是否显示
  public isenterprisedocumentType: boolean = false; // 营业执照选项卡是否显示
  public idcolumns: object[] = [
    { text: '身份证', key: 1 },
    { text: '营业执照', key: 2 },
  ];
  public evidenceUrl: any[] = []; // 图片的地址
  public usernameMessage: string = ''; // 用户名错误
  public cardTypeNameMessage: string = ''; // 证件类型错误
  public certificateMessage: string = ''; // 证件号码错误
  public legalPersonMessage: string = ''; // 法人姓名错误
  public lpIDNumberMessage: string = ''; // 法人身份证号错误
  public telMessage: string = ''; // 电话号码错误
  public addrMessage: string = ''; // 地址错误
  public customerIdAddressMessage: string = ''; // 证件地址错误
  public workMessage: string = ''; // 工作单位

  public guarantorMessage: string = ''; // 担保人姓名错误
  public guarantorCardMessage: string = ''; // 担保人身份证号错误
  public guarantorIdAddrMessage: string = ''; // 担保人证件地址错误
  public guarantorAddrMessage: string = ''; // 担保人地址错误
  public guarantorPhoneError: string = ''; // 担保人电话

  public guarantorMessage2: string = ''; // 担保人姓名错误
  public guarantorCardMessage2: string = ''; // 担保人身份证号错误
  public guarantorIdAddrMessage2: string = ''; // 担保人证件地址错误
  public guarantorAddrMessage2: string = ''; // 担保人地址错误
  public guarantorPhoneError2: string = ''; // 担保人电话
  //   初始化数据
  public initState() {
    // 如果是点击编辑过来的
    if (this.$store.state.isLoanEdit === true) {
      this.select = this.$store.state.applyLoan2;
      this.select.guarantorTel = this.$store.state.applyLoan2.guarantorTel;
      this.select.customerIdAddress = this.$store.state.applyLoan1.customerIdAddress;
      if (!this.select.guarantorTel) {
        this.select.guarantorName = this.$store.state.applyLoan1.guarantorName;
        this.select.guarantorTel = this.$store.state.applyLoan1.guarantorTel;
        this.select.guarantorAddress = this.$store.state.applyLoan1.guarantorAddress;
        this.select.guarantorIDNumber = this.$store.state.applyLoan1.guarantorIDNumber;
        this.select.guarantorIdAddress = this.$store.state.applyLoan1.guarantorIdAddress;

        this.select.guarantorName2 = this.$store.state.applyLoan1.guarantorName2;
        this.select.guarantorTel2 = this.$store.state.applyLoan1.guarantorTel2;
        this.select.guarantorAddress2 = this.$store.state.applyLoan1.guarantorAddress2;
        this.select.guarantorIDNumber2 = this.$store.state.applyLoan1.guarantorIDNumber2;
        this.select.guarantorIdAddress2 = this.$store.state.applyLoan1.guarantorIdAddress2;
      }
      this.evidenceUrl = this.$store.state.evidence;
      if (this.select.cardType === 1) {
        this.select.cardTypeName = '身份证';
      } else if (this.select.cardType === 2) {
        this.select.cardTypeName = '营业执照';
      }
      if (this.select.customerType == 1) {
        this.name = '客户姓名：';
      } else {
        this.name = '企业名称：';
      }
    } else {
      // 如果不是点击编辑过来的
      this.select = this.$store.state.applyLoan2;
      this.evidenceUrl = this.$store.state.evidence;
      // 如果是会员本人办理   会从会员信息中提取信息
      if (this.$store.state.applyLoan1.ismyself === true) {
        this.select.cardTypeName = '身份证';
        this.select.cardType = 1;
        const loginSuccess = this.$store.state.loginSuccess;
        this.select.customerName = loginSuccess.memberName;
        this.select.cardNumber = loginSuccess.idNumber;
        this.select.customerTel = loginSuccess.mobile;
        this.select.customerType = this.$store.state.applyLoan1.customerTypeId;
        if (this.$store.state.applyLoan1.customerTypeId == 1) {
          this.name = '客户姓名：';
        } else {
          this.name = '企业名称：';
        }
      } else {
        // 如果不是本人办理，需要自己填写
        this.select.customerType = this.$store.state.applyLoan1.customerTypeId;
        if (this.$store.state.applyLoan1.customerTypeId == 1) {
          this.name = '客户姓名：';
        } else {
          this.name = '企业名称：';
          this.select.cardTypeName = '营业执照';
          this.select.cardType = 2;
        }
      }
    }
  }
  // 证件类型 身份证
  public onPickerCustomer(value) {
    this.select.cardTypeName = value.text;
    this.select.cardType = value.key;
    this.isdocumentType = false;
  }
  // 图片上传
  public onRead(file, name) {
    this.$toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    const num = parseFloat(name.name); // 将字符串转换为数字格式
    $util.miniBase64(file.content, (res) => {
      // 上传到服务器，然后返回图片的地址
      const data = {
        flagId: name.name,
        image: res,
      };
      //   $request({
      //     url: `api/system/uploadTempFile`,
      //     method: 'post',
      //     data: JSON.stringify(data),
      //     headers: { 'Content-Type': 'application/json' },
      //   })
      //     .then((result) => {
      //       this.evidenceUrl[num].imgs.push(result.data.filePath);
      //       this.evidenceUrl[num].domain = result.data.domain;
      //       this.$toast.clear();
      //     })
      //     .catch((err) => {
      //       this.$toast.fail(err);
      //     });
    });
  }
  // 图片预览
  public watchPic(key, index) {
    const imagepreviews = [];
    this.evidenceUrl[index].imgs.forEach((element, key) => {
      imagepreviews.push(
        this.evidenceUrl[index].domain + this.evidenceUrl[index].imgs[key],
      );
    });
    ImagePreview({
      images: imagepreviews,
      startPosition: key,
      closeOnPopstate: true,
      showIndicators: true,
    });
  }
  // 上一步
  public previou() {
    this.$router.back();
    this.$store.commit('previouSecond', this.select);
    this.$store.commit('setEvidence', this.evidenceUrl);
  }
  // 删除图片
  public delimg(key, index) {
    this.evidenceUrl[key].imgs.splice(index, 1);
    if (this.evidenceUrl[key].imgs.length === 0) {
      delete this.evidenceUrl[key].domain;
    }
    this.$store.commit('setEvidence', this.evidenceUrl);
  }
  //   个人申请
  public personalApplication() {
    $validate.ID(this.select.cardNumber, (res) => {
      this.certificateMessage = res;
    });
    $validate.Work(this.select.workUnit, (res) => {
      this.workMessage = res;
    });
    if (
      this.usernameMessage !== '' ||
      this.cardTypeNameMessage !== '' ||
      this.certificateMessage !== '' ||
      this.telMessage !== '' ||
      this.addrMessage !== '' ||
      this.workMessage !== '' ||
      this.guarantorMessage !== '' ||
      this.guarantorCardMessage !== '' ||
      this.guarantorAddrMessage !== '' ||
      this.guarantorIdAddrMessage !== '' ||
      this.guarantorPhoneError !== '' ||
      this.guarantorMessage2 !== '' ||
      this.guarantorCardMessage2 !== '' ||
      this.guarantorAddrMessage2 !== '' ||
      this.guarantorIdAddrMessage2 !== '' ||
      this.guarantorPhoneError2 !== ''
    ) {
      this.$toast('表单填写不正确!');
      return;
    } else {
      this.$store.commit('setEvidence', this.evidenceUrl);
      this.$store.commit('changeApplySecond', this.select);
      this.$router.push({ name: 'applythird' });
    }
  }
  // 企业申请
  public bussinessApplication() {
    $validate.BusinessLicense(this.select.cardNumber, (res) => {
      this.certificateMessage = res;
    });
    $validate.RealName(this.select.legalPerson, (res) => {
      this.legalPersonMessage = res;
    });
    $validate.ID(this.select.lpIDNumber, (res) => {
      this.lpIDNumberMessage = res;
    });
    if (
      this.usernameMessage !== '' ||
      this.certificateMessage !== '' ||
      this.cardTypeNameMessage !== '' ||
      this.legalPersonMessage !== '' ||
      this.lpIDNumberMessage !== '' ||
      this.guarantorCardMessage !== '' ||
      this.telMessage !== '' ||
      this.addrMessage !== '' ||
      this.workMessage !== '' ||
      this.guarantorMessage !== '' ||
      this.guarantorCardMessage !== '' ||
      this.guarantorAddrMessage !== '' ||
      this.guarantorIdAddrMessage !== '' ||
      this.guarantorPhoneError !== '' ||
      this.guarantorMessage2 !== '' ||
      this.guarantorCardMessage2 !== '' ||
      this.guarantorAddrMessage2 !== '' ||
      this.guarantorIdAddrMessage2 !== '' ||
      this.guarantorPhoneError2 !== ''
    ) {
      this.$toast('表单填写不正确!');
      return;
    } else {
      this.$store.commit('setEvidence', this.evidenceUrl);
      this.$store.commit('changeApplySecond', this.select);
      this.$router.push({ name: 'applythird' });
    }
  }
  // 完成按钮, 进行身份验证
  public complete() {
    $validate.IsNull(this.select.customerName, (res) => {
      this.usernameMessage = res;
    });
    $validate.IsNull(this.select.cardTypeName, (res) => {
      this.cardTypeNameMessage = res;
    });
    $validate.Tel(this.select.customerTel, (res) => {
      this.telMessage = res;
    });
    $validate.Address(this.select.customerAddress, (res) => {
      this.addrMessage = res;
    });
    $validate.Address(this.select.customerIdAddress, (res) => {
      this.customerIdAddressMessage = res;
    });
    this.guarantorMessage = '';
    this.guarantorPhoneError = '';
    this.guarantorAddrMessage = '';
    this.guarantorIdAddrMessage = '';
    this.guarantorCardMessage = '';
    this.guarantorMessage2 = '';
    this.guarantorPhoneError2 = '';
    this.guarantorAddrMessage2 = '';
    this.guarantorIdAddrMessage2 = '';
    this.guarantorCardMessage2 = '';

    if (
      this.select.guarantorName ||
      this.select.guarantorTel ||
      this.select.guarantorAddress ||
      this.select.guarantorIdAddress ||
      this.select.guarantorIDNumber
    ) {
      if (!this.select.guarantorName) {
        this.guarantorMessage = '此项不能为空';
      }
      if (!this.select.guarantorTel) {
        this.guarantorPhoneError = '此项不能为空';
      }
      if (!this.select.guarantorAddress) {
        this.guarantorAddrMessage = '此项不能为空';
      }
      if (!this.select.guarantorIdAddress) {
        this.guarantorIdAddrMessage = '此项不能为空';
      }
      if (!this.select.guarantorIDNumber) {
        this.guarantorCardMessage = '此项不能为空';
      }
    }
    if (
      this.select.guarantorName2 ||
      this.select.guarantorTel2 ||
      this.select.guarantorAddress2 ||
      this.select.guarantorIdAddress2 ||
      this.select.guarantorIDNumber2
    ) {
      if (!this.select.guarantorName) {
        this.guarantorMessage = '请先填写此项';
      }
      if (!this.select.guarantorTel) {
        this.guarantorPhoneError = '请先填写此项';
      }
      if (!this.select.guarantorAddress) {
        this.guarantorAddrMessage = '请先填写此项';
      }
      if (!this.select.guarantorIdAddress) {
        this.guarantorIdAddrMessage = '请先填写此项';
      }
      if (!this.select.guarantorIDNumber) {
        this.guarantorCardMessage = '请先填写此项';
      }
      //
      if (!this.select.guarantorName2) {
        this.guarantorMessage2 = '此项不能为空';
      }
      if (!this.select.guarantorTel2) {
        this.guarantorPhoneError2 = '此项不能为空';
      }
      if (!this.select.guarantorAddress2) {
        this.guarantorAddrMessage2 = '此项不能为空';
      }
      if (!this.select.guarantorIdAddress2) {
        this.guarantorIdAddrMessage2 = '此项不能为空';
      }
      if (!this.select.guarantorIDNumber2) {
        this.guarantorCardMessage2 = '此项不能为空';
      }
    }
    if (this.select.guarantorIDNumber) {
      $validate.ID(this.select.guarantorIDNumber, (res) => {
        this.guarantorCardMessage = res;
      });
    }
    if (this.select.guarantorIDNumber2) {
      $validate.ID(this.select.guarantorIDNumber2, (res) => {
        this.guarantorCardMessage2 = res;
      });
    }
    if (this.$store.state.applyLoan1.customerTypeName === '个人') {
      this.personalApplication();
    } else {
      this.bussinessApplication();
    }
  }
  // 生命周期 mounted 挂载
  private mounted(): void {
    this.initState();
  }
}
</script>

<style lang="scss" scoped>
.drive-second {
  width: 90%;
  margin: 0 auto;
}
.drive-second-title {
  margin: 5px 10px;
  width: 90%;

  font-size: 14px;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  color: #606266;
}
.drive-smalltext {
  font-size: 12px;
  color: #f56c6c;
}
/* 客户名称Input */
.van-cell {
  align-items: center;

  width: 100%;
  height: 50px;

  text-align: center;

  color: #323233;
}
.van-cell-group {
  border-bottom: 1px solid #e4e7ed;
}
/* 客户类型 */
.drive-first-select-div {
  @include flex($align: center);

  border-bottom: 1px solid #e4e7ed;
  width: 90%;
  height: 50px;
  margin: 0 auto;
  padding: 10px 15px;
  box-sizing: border-box;
}
.secondspan {
  display: block;

  margin-left: 0;
  height: 24px;

  font-size: 14px;
  line-height: 24px;
  white-space: nowrap;

  color: #969799;
}
.icon {
  line-height: 24px;
  display: block;
}
/* 最后一个input */
.last-input {
  border-bottom: 0;
}
/* upLoad上传图片 */
.material {
  width: 100%;
}
.van-uploader {
  @include flex($justify: center, $align: center);

  width: 60px;
  height: 60px;
  margin: 5px 5px 10px;
  border: 1px dashed #dcdfe6;

  background-color: #dcdfe6;
}
.img-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin: 5px;
  border-bottom: 1px solid #dcdfe6;
}
.small-title {
  display: flex;
  align-items: center;

  padding: 10px 10px 0;

  font-size: 14px;

  color: #909399;
}
.uploadimg {
  margin: 5px;
}
/* 弹窗 */
.van-popup {
  width: 100%;
  top: 100%;
  transform: translate3d(-50%, -100%, 0);
}
.apply-smalltext-box {
  margin: 8px 0;
}
.small-title-text {
  text-indent: 0.5em;
  color: #606266;
}
.complete-button {
  margin: 20px 0;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>