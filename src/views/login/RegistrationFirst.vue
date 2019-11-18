<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" @click-left="goback" left-arrow></van-nav-bar>
    <div class="registrationfirst">
      <van-cell-group>
        <van-field
          v-model="form.memberName"
          label="姓名："
          label-align="right"
          :error-message="nameError"
          placeholder="请输入真实姓名"
        />
        <van-field
          readonly
          clickable
          label="性别："
          label-align="right"
          :value="form.sexName"
          :error-message="genderError"
          placeholder="请选择性别"
          @click="showgenderPicker = true"
        />
        <van-popup v-model="showgenderPicker" position="bottom">
          <van-picker
            show-toolbar
            :default-index="2"
            :columns="options"
            @cancel="showgenderPicker = false;"
            @confirm="onConfirmgender"
            title="性别"
          />
        </van-popup>
        <van-field
          v-model.trim="form.nation"
          :error-message="nationalityError"
          label-align="right"
          label="民族："
          placeholder="请输入民族"
        />
        <van-field
          v-model.trim="form.idNumber"
          label="身份证号："
          label-align="right"
          :error-message="idcardError"
          placeholder="请输入身份证号"
        />
        <van-field
          readonly
          clickable
          label="出生日期："
          label-align="right"
          :value="form.birthday"
          :error-message="birthError"
          placeholder="请选择出生日期"
          @click="showbirthPicker = true"
        />
        <van-popup v-model="showbirthPicker" position="bottom">
          <van-datetime-picker
            type="date"
            v-model="currentData"
            :max-date="newDate"
            :min-date="minDate"
            @confirm="birthday"
            @cancel="showbirthPicker = false;"
            :formatter="formatter"
          />
        </van-popup>
        <van-field
          v-model.trim="form.address"
          :error-message="addressError"
          label="地址："
          label-align="right"
          placeholder="请输入地址"
        />
      </van-cell-group>
      <van-row>
        <van-checkbox v-model="OCR">OCR自动识别</van-checkbox>
      </van-row>
      <!-- 上传身份证照片 -->
      <van-row>
        <van-col :span="12">
          <div class="img-group">
            <img class="uploadimg" v-show="showImg1" :src="domain + idFrontPicPath" alt ref="img" />
            <van-icon class="img-icon" name="clear" v-show="showImg1" @click="delimg1" />
            <van-uploader :before-read="beforeRead1" :after-read="onRead1" v-show="upload1">
              <van-icon name="photograph" />
            </van-uploader>
          </div>
          <div style="text-align:center;font-size:12px;">身份证正面(个人信息)</div>
        </van-col>
        <van-col :span="12">
          <div class="img-group">
            <img class="uploadimg" v-show="showImg2" :src="domain+idBackPicPath" alt ref="img" />
            <van-icon class="img-icon" name="clear" v-show="showImg2" @click="delimg2()" />
            <van-uploader :before-read="beforeRead2" :after-read="onRead2" v-show="upload2">
              <van-icon name="photograph" />
            </van-uploader>
          </div>
          <div style="text-align:center;font-size:12px;">身份证反面(发证机关)</div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="16">
          <van-button
            class="submitBtn"
            block
            size="small"
            round
            type="info"
            @click="submitForm()"
          >下一步</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  Row,
  Col,
  Icon,
  Uploader,
  Field,
  Popup,
  Picker,
  DatetimePicker,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  NavBar,
  Button,
} from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(Field)
  .use(Picker)
  .use(Popup)
  .use(DatetimePicker)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Button)
  .use(Uploader);

// 表单提交的信息的接口定义
interface formInterface {
  domain: string;
  idFrontPicPath: string;
  idBackPicPath: string;
  memberName: string;
  sexName: string;
  sex: number;
  nation: string;
  birthday: string;
  idNumber: string;
  address: string;
}

import VueRouter from 'vue-router';
import validate from '@/lib/validate';
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $validate: validate;
  }
}

@Component({ name: 'RegistrationFirst' })
export default class RegistrationFirst extends Vue {
  public store: any = this.$store;
  public domain: '';
  public idFrontPicPath: ''; // 身份证正面
  public idBackPicPath: ''; // 身份证反面
  public form: formInterface = {
    domain: '',
    idFrontPicPath: '', // 身份证正面
    idBackPicPath: '', // 身份证反面
    memberName: '', // 姓名
    sexName: '', // 性别文字
    sex: 0, // 性别编号 0，1
    nation: '', // 民族
    birthday: '', // 生日
    idNumber: '', // 身份证号
    address: '', // 地址
  };
  public showgenderPicker = false;
  public showbirthPicker = false;
  public options = [
    { text: '男', key: 0 },
    { text: '女', key: 1 },
  ];
  public OCR = true;
  public dialogImageUrl = '';
  public dialogVisible = false;
  public showImg1 = false;
  public showImg2 = false;
  public upload1 = true;
  public upload2 = true;
  public newDate = new Date(); // 生日最大值
  public minDate = new Date(1919, 0, 1); // 生日最小值
  public currentData = new Date(1990, 0, 1);

  public idcardError = ''; // 身份证错误提示
  public nameError = ''; // 真实姓名错误提示
  public genderError = ''; // 性别错误提示
  public nationalityError = ''; // 民族错误提示
  public birthError = ''; // 生日错误提示
  public addressError = ''; // 地址错误提示
  public birthday(value) {
    const datetime = new Date(value);
    this.form.birthday = `${datetime.getFullYear()}-${datetime.getMonth() +
      1}-${datetime.getDate()}`;
    this.showbirthPicker = false;
  }
  public formatter(type, value) {
    if (type === 'year') {
      return `${value}年`;
    } else if (type === 'month') {
      return `${value}月`;
    } else if (type === 'day') {
      return `${value}日`;
    }
    return value;
  }
  public beforeRead1() {
    this.$toast.loading({
      message: '载入中...',
      mask: true,
      duration: 0,
    });
    return true;
  }
  // 身份证图片上传
  public onRead1(file) {
    // this.$util.miniBase64(file.content, (res) => {
    //   // 如果OCR如果是true
    //   if (this.OCR === true) {
    //     this.$toast.loading({
    //       message: '识别中...',
    //       mask: true,
    //       duration: 0,
    //     });
    //     const json = {
    //       idFrontPicPath: res,
    //     };
    //     this.$axios({
    //       url: `${this.$config.baseUrl}api/user/getOcrInfo`,
    //       method: "post",
    //       data: json,
    //       headers: { "Content-Type": "application/json" }
    //     })
    //       .then(result => {
    //         if (result.data.map.idCard.errCode === 0) {
    //           this.form = {
    //             memberName: result.data.map.idCard.name, //姓名
    //             sexName: result.data.map.idCard.sexText, //性别文字
    //             sex: result.data.map.idCard.sex === 1 ? 0 : 1, //性别编号0，1
    //             nation: result.data.map.idCard.nationality, //民族
    //             birthday: result.data.map.idCard.birthText, //身份证号
    //             idNumber: result.data.map.idCard.num, //生日
    //             address: result.data.map.idCard.address, //地址
    //             idBackPicPath: this.idBackPicPath
    //           };
    //           // 上传到服务器，然后返回图片的地址
    //           let data = {
    //             flagId: "idFrontPicPath",
    //             image: res
    //           };
    //           this.$axios({
    //             url: `${this.$config.baseUrl}api/system/uploadTempFile`,
    //             method: "post",
    //             data: JSON.stringify(data),
    //             headers: { "Content-Type": "application/json" }
    //           })
    //             .then(result => {
    //               this.form.idFrontPicPath = result.data.filePath;
    //               this.idFrontPicPath = this.form.idFrontPicPath;
    //               this.form.domain = result.data.domain;
    //               this.domain = result.data.domain;
    //               this.showImg1 = true;
    //               this.upload1 = false;
    //               this.$toast.clear();
    //             })
    //             .catch(err => {
    //               this.$toast.fail(err);
    //             });
    //         } else {
    //           this.$toast.fail(result.data.map.idCard.errCodeText);
    //         }
    //       })
    //       .catch(err => {
    //         this.$toast.fail("OCR识别" + err);
    //       });
    //   } else {
    //     上传到服务器，然后返回图片的地址
    //     const data = {
    //       flagId: 'idFrontPicPath',
    //       image: res,
    //     };
    //     this.$toast.loading({
    //       message: '上传中...',
    //       mask: true,
    //       duration: 0,
    //     });
    //     this.$axios({
    //       url: `${this.$config.baseUrl}api/system/uploadTempFile`,
    //       method: 'post',
    //       data: JSON.stringify(data),
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //       .then((result) => {
    //         this.form.idFrontPicPath = result.data.filePath;
    //         this.idFrontPicPath = this.form.idFrontPicPath;
    //         this.form.domain = result.data.domain;
    //         this.domain = result.data.domain;
    //         this.showImg1 = true;
    //         this.upload1 = false;
    //         if (result.data.success) {
    //           this.$toast.success('上传成功');
    //         } else {
    //           this.$toast.clear();
    //         }
    //       })
    //       .catch((err) => {
    //         this.$toast.fail(err);
    //       });
    //   }
    // });
  }
  public beforeRead2() {
    this.$toast.loading({
      message: '载入中...',
      mask: true,
      duration: 0,
    });
    return true;
  }
  public onRead2(file) {
    // this.$toast.loading({
    //   message: '上传中...',
    //   mask: true,
    //   duration: 0,
    // });
    // this.$util.miniBase64(file.content, (res) => {
    //   // 上传到服务器，然后返回图片的地址
    //   const data = {
    //     flagId: 'idBackPicPath',
    //     image: res,
    //   };
    //   this.$axios({
    //     url: `${this.$config.baseUrl}api/system/uploadTempFile`,
    //     method: 'post',
    //     data: JSON.stringify(data),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //     .then((result) => {
    //       this.form.idBackPicPath = result.data.filePath;
    //       this.idBackPicPath = this.form.idBackPicPath;
    //       this.form.domain = result.data.domain;
    //       this.domain = result.data.domain;
    //       this.showImg2 = true;
    //       this.upload2 = false;
    //       if (result.data.success) {
    //         this.$toast.success('上传成功');
    //       } else {
    //         this.$toast.clear();
    //       }
    //     })
    //     .catch((err) => {
    //       this.$toast.fail(err);
    //     });
    // });
  }
  public delimg1() {
    this.upload1 = true;
    this.showImg1 = false;
    this.idFrontPicPath = null;
    this.form.idFrontPicPath = null;
  }
  public delimg2() {
    this.upload2 = true;
    this.showImg2 = false;
    this.idBackPicPath = null;
    this.form.idBackPicPath = null;
  }
  // 性别选择
  public onConfirmgender(value, index) {
    this.showgenderPicker = false;
    this.form.sexName = value.text;
    this.form.sex = value.key;
  }
  // 返回
  public goback(): void {
    this.$router.push({ name: 'start' });
    this.$store.commit('deleteRegistration');
  }
  public submitForm(): void {
    // 表单验证
    this.$validate.ID(this.form.idNumber, (res) => {
      this.idcardError = res;
    });
    this.$validate.RealName(this.form.memberName, (res) => {
      this.nameError = res;
    });
    this.$validate.Sex(this.form.sexName, (res) => {
      this.genderError = res;
    });
    this.$validate.Nationality(this.form.nation, (res) => {
      this.nationalityError = res;
    });
    this.$validate.Birth(this.form.birthday, (res) => {
      this.birthError = res;
    });
    this.$validate.Address(this.form.address, (res) => {
      this.addressError = res;
    });
    // if (this.idFrontPicPath == null || this.idBackPicPath == null) {
    //   this.$toast('请上传身份证');
    // }
    // if (
    //   this.idFrontPicPath &&
    //   this.idBackPicPath &&
    //   !this.idcardError &&
    //   !this.nameError &&
    //   !this.genderError &&
    //   !this.nationalityError &&
    //   !this.birthError &&
    //   !this.addressError
    // ) {
    //   this.$store.commit('changeRegistrationFirst', this.form);
    this.$router.push({ name: 'registrationsecond' });
    // } else {
    // }
  }
  public mounted() {
    this.form = this.$store.state.registration;
    this.idBackPicPath = this.$store.state.registration.idBackPicPath;
    this.form.idBackPicPath = this.$store.state.registration.idBackPicPath;

    this.form.idFrontPicPath = this.$store.state.registration.idFrontPicPath;
    this.idFrontPicPath = this.$store.state.registration.idFrontPicPath;
    this.domain = this.$store.state.registration.domain;
    if (this.form.idFrontPicPath) {
      this.showImg1 = true;
      this.upload1 = false;
    }
    if (this.form.idBackPicPath) {
      this.showImg2 = true;
      this.upload2 = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.registrationfirst {
  @extend .center-container-width;
  min-height: 90vh;
}
.van-uploader {
  @include flex($justify: center, $align: center);
  @extend .uploadimg;
}
.uploadimg {
  width: 100%;
  height: 30vw;
  border: 1px dashed #dcdfe6;
}
.img-icon {
  position: absolute;
  right: 0;

  font-size: 20px;
}
.img-group {
  position: relative;

  @include flex($justify: flex-start);
  flex-wrap: wrap;

  margin: 5px;
}
.first-img-group {
  border-bottom: 1px solid #dcdfe6;
}
div.van-checkbox {
  margin-left: 5px;

  line-height: 44px;
  font-size: 12px;
}
.submitBtn {
  margin-top: 20px;
}

/* 表单样式 */
.van-cell {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  width: 100%;
  height: 50px;

  text-align: center;

  color: #323233;
}
.van-button {
  height: 36px;
  line-height: 35px;
}

</style>