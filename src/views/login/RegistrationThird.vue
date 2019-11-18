<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" @click-left="goback" left-arrow></van-nav-bar>
    <div>
      <div class="registration-third">
        <van-cell-group>
          <van-field
            v-model="ruleForm.mobile"
            label="手机号："
            type="tel"
            label-align="right"
            :error-message="telError"
            placeholder="请输入手机号"
            :readonly="readonly"
          />

          <van-field
            v-model="verification"
            :error-message="verificationError"
            type="tel"
            label="短信验证码："
            label-align="right"
            placeholder="请输入验证码"
          >
            <van-button
              slot="button"
              size="small"
              @click="sendMess"
              type="info"
              :disabled="sendMessDisble"
              :text="text"
            ></van-button>
          </van-field>

          <van-field
            v-model.trim="ruleForm.password"
            :error-message="passError"
            label="密码："
            placeholder="请输入密码"
            label-align="right"
            type="password"
          />
          <van-field
            v-model.trim="repass"
            :error-message="repassError"
            label="确认密码："
            placeholder="请重新输入密码"
            label-align="right"
            type="password"
          />
        </van-cell-group>
        <van-row>
          <van-col offset="1">
            <van-checkbox class="checked" v-model="agree">
              我已同意
              <router-link :to="{ path:'protocol' }">《注册协议》</router-link>条款
            </van-checkbox>
          </van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="16">
            <van-button
              class="submitBtn"
              block
              round
              size="small"
              type="info"
              @click="submit"
              :loading="submitLoading"
            >完成注册</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface formInterface {
  mobile: string;
  password: string;
}
import { Vue, Component } from 'vue-property-decorator';
import {
  Cell,
  CellGroup,
  NavBar,
  Row,
  Col,
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
} from 'vant';
Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Checkbox)
  .use(Field)
  .use(CheckboxGroup);

@Component({ name: 'RegistrationThird' })
export default class RegistrationThird extends Vue {
  public sendMessDisble: boolean = false;
  public agree: boolean = true; // 协议是否同意
  public submitLoading: boolean = false; // 提交按钮状态
  public text: string = '获取验证码';
  public verification: string = ''; // 短信验证码
  public reVerification: string = ''; // 返回的验证码
  public repass: string = ''; // 确认密码
  public readonly: boolean = false; // 是否禁用
  public ruleForm: formInterface = {
    mobile: '', // 手机号
    password: '', // 密码
  };
  public telError: string = ''; // 手机号提示
  public verificationError: string = ''; // 短信验证码提示
  public passError: string = ''; // 密码提示
  public repassError: string = ''; // 错误密码提示

  public submit() {
    this.submitLoading = true;
    this.$validate.Tel(this.ruleForm.mobile, (res) => {
      this.telError = res;
    });
    this.$validate.Pass(this.ruleForm.password, (res) => {
      this.passError = res;
    });
    this.$validate.Verification(this.verification, (res) => {
      this.verificationError = res;
    });
    if (this.verification != this.reVerification) {
      this.verificationError = '短信验证码不正确';
      this.$toast('短信验证码不正确');
    } else {
      this.verificationError = '';
    }
    if (this.repass === '') {
      this.repassError = '确认密码不能为空';
      this.submitLoading = false;
    } else if (this.repass !== this.ruleForm.password) {
      this.repassError = '两次密码输入不一致';
      this.submitLoading = false;
    } else {
      this.repassError = '';
    }
    if (this.agree === false) {
      this.submitLoading = false;
      this.$toast({
        message: '请同意相关条款',
        duration: 2000,
      });
    }
    if (
      this.telError ||
      this.passError ||
      this.verificationError ||
      this.passError ||
      this.repassError ||
      !this.agree
    ) {
      this.submitLoading = false;
      return;
    } else {
      // 获取授权信息
      //   this.$toast.loading({
      //     message: '获取授权中...',
      //     duration: 0,
      //     forbidClick: true,
      //   });
      //   this.$axios({
      //     url: `${this.$config.baseUrl}api/login/getWxUser`,
      //     method: 'post',
      //   })
      //     .then((result) => {
      //       this.ruleForm.openId = result.data.openId;
      //       this.ruleForm.headInco = result.data.headImgUrl;
      //       this.ruleForm.nickName = result.data.nickname;
      //       // 注册
      //       const json = JSON.stringify(this.ruleForm);
      //       this.$axios({
      //         method: 'post',
      //         url: `${this.$config.baseUrl}/api/user/userregist`,
      //         data: json,
      //         headers: { 'Content-Type': 'application/json' },
      //       })
      //         .then((result) => {
      //           if (result.data.success === true) {
      //             this.$store.commit('deleteRegistration');
      //             this.submitLoading = false;
      //             this.$toast.success(result.data.msg);
      //             this.$store.commit('readMesg', result.data.map.readMesg);
      //             this.$store.commit('loginStatus', result.data.map.memInfo);
      this.$router.replace({ name: 'home' });
      //           } else {
      //             this.submitLoading = false;
      //             this.$toast.fail(result.data.msg);
      //           }
      //         })
      //         .catch((err) => {
      //           this.submitLoading = false;
      //           this.$toast.fail(err);
      //         });
      //     })
      //     .catch((err) => {
      //       this.$toast.fail(err);
      //     });
    }
  }
}
</script>