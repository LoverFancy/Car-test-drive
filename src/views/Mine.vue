<template>
  <div class="mine">
    <van-nav-bar title="我的"></van-nav-bar>
    <header class="header">
      <van-row type="flex" justify="center" align="center">
        <van-col class="userimg">
          <img :src="logoImg" alt />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <p class="information">{{information.memberName}}</p>
      </van-row>
      <van-row type="flex" justify="center" align="center">
        <p class="information">{{information.address}}</p>
      </van-row>
    </header>
    <van-row v-for="(nav,key) in navs" :key="key" type="flex">
      <van-col class="nav-list" span="20" offset="2">
        <van-row
          @click.native="iconClick"
          :data-to="nav.name"
          type="flex"
          justify="space-between"
          align="center"
          style="width:100%"
        >
          <van-col>
            <van-row type="flex" justify="space-between" align="center">
              <van-icon
                :name="nav.icon"
                :color="nav.color"
                size="1.5em"
                @click.native="iconClick"
                :data-to="nav.name"
              />
              <van-col offset="2">
                <div class="nav-text" @click.native="iconClick" :data-to="nav.name">{{nav.title}}</div>
              </van-col>
            </van-row>
          </van-col>
          <van-icon name="arrow" @click.native="iconClick" :data-to="nav.name" />
        </van-row>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="16" offset="4">
        <van-button class="button" type="danger" @click="quit" size="small" block round>退出登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request from '@/lib/request';
import { State, Mutation } from 'vuex-class';
import { Row, Col, Icon, Button, NavBar, Toast } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Icon);

@Component({ name: 'Mine' })
export default class Mine extends Vue {
  public $router: any;
  public logoImg: string = require('../assets/logo.png');
  public information: any = {
    memberName: '姓名',
    address: '天津市河东区',
  };
  public navs: object[] = [
    {
      title: '我的试驾',
      icon: 'orders-o',
      to: { name: 'mydrive' },
      name: 'mydrive',
      color: '#1989fa',
    },
    {
      title: '我的合同',
      icon: 'notes-o',
      to: { name: 'mycontract' },
      name: 'mycontract',
      color: '#ed6a0c',
    },
    {
      title: '试驾指南',
      icon: 'search',
      to: { name: 'mycontract' },
      name: 'mycontract',
      color: '#07c160',
    },
  ];

  @Mutation('quitLogin') public mutationQuitLogin: any;
  @Mutation('deleteApplyLoan') public mutationDeleteApplyLoan: any;
  @State('loginSuccess') public stateLoginSuccess: any;

  //  methods
  public quit() {
    const obj = {};
    // this.$store.commit('quitLogin', obj);
    this.mutationQuitLogin(obj);
    // this.$store.commit('deleteApplyLoan'); // 删除贷款数据
    this.mutationDeleteApplyLoan();
    Toast.success('退出登录成功');
    this.$router.replace({ name: 'home' });
  }
  // 根据不同的值跳转不同的页面
  public iconClick(event: any) {
    this.$router.push({ name: `${event.target.dataset.to}` });
  }
  // 跳转设置页面
  public setting() {
    this.$router.push({ name: 'settings' });
  }
  public getUserLegality() {
    this.information = this.stateLoginSuccess;
    const data = {
      memberId: this.information.memberId,
    };
    $request({
      url: `api/user/userLegality`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    }).then((result) => {
      if (result.data.map.legality === 2 || result.data.map.legality === 1) {
        Toast.fail(result.data.msg);
        this.$router.replace({ name: 'home' });
        this.mutationQuitLogin();
      }
    });
  }
  private mounted() {
    this.getUserLegality();
  }
}
</script>

<style lang="scss" scoped>
.mine {
  color: #606266;
  min-height: 90vh;
}
.header {
  position: relative;

  width: 90%;
  margin: 0 auto 10px;
  padding: 5px;
  padding-top: 30px;
  border-radius: 10px;

  font-size: 12px;

  background-image: url('../assets/mine-background.png');
  background-repeat: no-repeat;
}
.userimg {
  @include flex($justify: center, $align: center);
  overflow: hidden;

  border-radius: 50%;
  color: #1989fa;

  width: 50px;
  height: 50px;
}
.userimg img {
  width: 100%;
}
.nav-text {
  font-size: 14px;
  line-height: 25px;
  white-space: nowrap;
}
.nav-list {
  flex-direction: row;
  border-bottom: 1px solid #f0f0f1;
  padding: 10px 0;
}
.information {
  color: #fff;
  margin: 10px 0;
}
.van-button {
  margin-top: 25px;
  height: 36px;
  line-height: 35px;
}
</style>