<template>
  <div class="product-details">
    <van-panel class="panel">
      <van-row>
        <van-col span="24">
          <img :src="info.logo" class="image" alt />
        </van-col>
      </van-row>
      <div class="pro-info" v-html="info.promotional"></div>
    </van-panel>
    <div class="fixed">
      <van-row type="flex" align="center" class="button">
        <van-col span="14" offset="5">
          <van-button type="info" size="small" round block @click="applyLoan">申请贷款</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request from '@/lib/request';
import { Row, Col, Button, Panel, Toast } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Toast)
  .use(Panel);

@Component({ name: 'ProductDetails' })
export default class ProductDetails extends Vue {
  public productId: string = '';
  public info = {};

  public getProDetailInfo() {
    this.$toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    const data = {
      productId: Number.parseInt(this.productId, 10),
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/system/getProDetailInfo`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        this.info = result.data.map.proInfo;
        this.$store.commit('changePageTitle', (this.info as any).productName);
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.fail(err);
      });
  }
  public applyLoan() {
    this.$router.push({ name: 'applyfirst', params: { title: '申请贷款' } });
  }
  // mounted 声明周期
  private mounted() {
    this.productId = this.$route.query.productId;
    this.getProDetailInfo();
  }
}
</script>

<style lang="scss" scoped>
.product-details {
  width: 90%;
  margin: 0 auto 50px;
}
.pro-info {
  max-width: 100%;
}
.image {
  width: 100%;
}
.button {
  height: 50px;
}
.fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;

  width: 100%;
  height: 50px;

  background-color: #fff;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>