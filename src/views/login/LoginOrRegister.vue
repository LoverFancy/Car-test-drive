<template>
  <div class="login-or-register">
    <van-nav-bar left-text="首页" @click-left="backHome" left-arrow></van-nav-bar>
    <div class="start">
      <van-row type="flex" justify="center">
        <div class="userimg">
          <img src="../../assets/logo.png" alt />
        </div>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="16">
          <van-button type="info" block round @click="login">登录</van-button>
        </van-col>
      </van-row>

      <van-row type="flex" justify="center">
        <van-col span="16">
          <van-button type="info" block plain round @click="RegistrationFirst">注册</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Row, Col, NavBar, Button } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(NavBar)
  .use(Button);

import VueRouter from 'vue-router';
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
  }
}

@Component({ name: 'LoginOrRegister' })
export default class LoginOrRegister extends Vue {
  //   @Prop() private msg!: string;
  public backHome() {
    this.$router.replace({ name: 'home' });
  }
  public login() {
    this.$router.push({ name: 'login' });
  }
  public RegistrationFirst() {
    this.$router.push({ name: 'registrationfirst' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.start {
  min-height: 90vh;
}
.userimg {
  @include flex($justify: center, $align: center);

  width: 65px;
  height: 65px;
  margin-top: 50px;
  border-radius: 50%;
  font-size: 30px;
  color: #999;
}
.userimg img {
  width: 100%;
}
.van-button {
  margin-top: 20px;
  height: 36px;
  line-height: 35px;
}
</style>
