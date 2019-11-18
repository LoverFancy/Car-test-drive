<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" @click-left="backStart" left-arrow></van-nav-bar>
    <div class="login">
      <van-row type="flex" justify="center" align="center">
        <van-col class="userimg">
          <img src="../../assets/logo.png" alt />
        </van-col>
      </van-row>
      <van-field
        v-model="form.mobile"
        :error-message="telMessage"
        type="tel"
        error-message-align="center"
        input-align="center"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="form.password"
        :error-message="passwordMessage"
        error-message-align="center"
        type="password"
        input-align="center"
        placeholder="请输入密码"
      />

      <van-row style="width:100%" type="flex" justify="end" class="retrieve" align="center">
        <van-col>
          <router-link :to="{name: 'retrieve'}">
            忘记密码
            <van-icon name="arrow" />
          </router-link>
        </van-col>
      </van-row>

      <van-row style="width:100%" type="flex" justify="center">
        <van-col span="20">
          <van-button block type="info" round size="small" class="button" @click="login">登录</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Row, Col, Button, NavBar, Field, Icon } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(NavBar)
  .use(Icon)
  .use(Field);

@Component({ name: 'Login' })
export default class Login extends Vue {
  // 表单
  public form = {
    mobile: '',
    password: '',
  };
  //   表单提示
  public telMessage = '';
  public passwordMessage = '';
  public backStart() {
    this.$router.back();
  }
  public login() {}
}
</script>

<style lang="scss" scoped>
.login {
  @include flex($direction: column, $align: center);

  min-height: 90vh;
  width: 70%;
  margin: 50px auto;
}
.retrieve {
  margin: 10px 0;

  font-size: 12px;
  text-decoration: none;
}
/* 表单样式 */
.van-cell {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  width: 90%;
  margin: 0 5%;
  height: 50px;

  text-align: center;

  color: #909399;
}
.van-button {
  margin: 10px 0;
  height: 36px;
  line-height: 35px;
}
.van-icon-arrow {
  bottom: 2px;
  vertical-align: middle;
}
/* logo图片 */
.userimg {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 65px;
  height: 65px;

  color: #1989fa;
}
.userimg img {
  width: 100%;
}
</style>