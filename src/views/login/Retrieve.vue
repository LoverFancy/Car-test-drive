<template>
  <div class="retrieve">
    <van-field
      v-model="mobile"
      :error-message="telError"
      label="手机号："
      type="tel"
      :readonly="telDisable"
      label-align="right"
      placeholder="请输入手机号"
    />

    <van-field
      v-model="verification"
      label="验证码："
      label-align="right"
      type="tel"
      placeholder="请输入验证码"
    >
      <van-button
        slot="button"
        size="small"
        type="info"
        :text="btnText"
        @click="SendMessage"
        :disabled="disable"
      ></van-button>
    </van-field>
    <van-field
      label-align="right"
      v-model="password"
      :error-message="passwordError"
      label="新密码："
      type="password"
      placeholder="请输入新密码"
    />
    <van-field
      v-model="repassword"
      label-align="right"
      :error-message="repassError"
      label="确认密码："
      type="password"
      placeholder="请输入确认密码"
    />

    <van-row style="width:100%" type="flex" justify="center">
      <van-col span="16">
        <van-button type="info" block size="small" round @click="Submit">提交</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
interface dataInterface {
  newPassword: string;
  telNum: string;
}
import { Vue, Component } from 'vue-property-decorator';
import $validate from '@/lib/validate';
import $request from '@/lib/request';
import { Field, Row, Col, Button, Toast } from 'vant';
Vue.use(Field)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Toast);

@Component({ name: 'Retrieve' })
export default class Retrieve extends Vue {
  public mobile: string = ''; // 手机号
  public verification: string = ''; // 短信验证码
  public reVerification: string = ''; // 记录验证码
  public password: string = ''; // 密码
  public repassword: string = ''; // 确认密码

  public btnText: string = '获取验证码';
  public disable: boolean = false; // 按钮是否禁用
  public telDisable: boolean = false; // 手机号输入框

  public telError: string = ''; // 手机号提示文字
  public verficationError: string = ''; // 短信验证码提示文字
  public passwordError: string = ''; // 密码提示文字
  public repassError: string = ''; // 确认密码提示文字

  public Submit() {
    $validate.Tel(this.mobile, (result) => {
      this.telError = result;
    });
    $validate.Verification(this.verification, (result) => {
      this.verficationError = result;
      if (result !== '') {
        this.$toast(result);
      } else if (this.verification !== this.reVerification) {
        this.telError = '验证码不正确或已失效';
        this.$toast('验证码不正确或已失效');
      } else {
        this.telError = '';
      }
    });
    $validate.Pass(this.password, (result) => {
      this.passwordError = result;
    });
    $validate.Pass(this.repassword, (result) => {
      this.repassError = result;
    });
    if (this.password !== this.repassword) {
      this.passwordError = this.repassError = '两次输入密码不相同';
    } else {
      this.passwordError = this.repassError = '';
    }
    if (
      this.telError === '' &&
      this.verficationError === '' &&
      this.passwordError === '' &&
      this.repassError === ''
    ) {
      this.$toast.loading({
        mask: true,
        forbidClick: true,
        message: '修改中...',
        duration: 0,
      });
      // 通过手机号和新密码，找回密码，相当于修改密码
      const data: dataInterface = {
        newPassword: this.password, // 新密码
        telNum: this.mobile, // 设置类型是找回密码
      };

      const json = JSON.stringify(data);
      // $request({
      //   url: `api/user/forgetPass`,
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   data: json,
      // })
      //   .then((result) => {
      //     if (result.success === true) {
      //       this.$toast.success('密码修改成功');
      this.$router.replace({ name: 'login' });
      //     } else {
      //       this.$toast.fail('密码修改失败');
      //     }
      //   })
      //   .catch((err) => {
      //     this.$toast.fail('系统异常');
      //   });
    }
  }

  // 发送验证码
  private SendMessage() {
    // 判断填写的手机号是否正确
    $validate.Tel(this.mobile, (res) => {
      this.telError = res;
    });
    if (this.telError === '') {
      this.disable = true;
      const data = {
        telNum: this.mobile,
        type: 3,
      };
      const json = JSON.stringify(data);
      // $request({
      //   url: `api/system/sendSMS`,
      //   method: 'post',
      //   data: json,
      //   headers: { 'Content-Type': 'application/json' },
      // })
      //   .then((result) => {
      //     if (result.data.success === true) {
      //       this.reVerification = result.data.map.yzm; // 将请求会来的短信验证码赋值
      //       this.btnText = '已发送';
      //       this.telDisable = true; // 设置手机号输入框为只读
      //       let time = 60;
      //       const Countdown = setInterval(() => {
      //         this.btnText = `${(time -= 1)}s`;
      //         if (time === 0) {
      //           clearInterval(Countdown);
      //           this.disable = false;
      //           this.btnText = '获取验证码';
      //         }
      //       }, 1000);
      //     } else {
      //       this.disable = false;
      //       this.$toast('发送失败，请重试');
      //     }
      //   })
      //   .catch((err) => {
      //     this.$toast.fail(err);
      //     this.disable = false;
      //   });
    } else {
      this.$toast.fail('请检查手机号是否填写正确');
    }
  }
}
</script>

<style lang="scss" scoped>
.retrieve {
  @include flex($direction: column);
  @extend .center-container-width;

  min-height: 90vh;
}

/* 表单样式 */
.van-cell {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  padding-right: 0;
  width: 100%;
  height: 50px;

  text-align: center;
  color: #323233;
}
.van-button {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 36px;

  line-height: 35px;
}
</style>