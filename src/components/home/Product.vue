<template>
  <div class="product">
    <div class="product-title">
      <img src="@/assets/product-title.png" alt />
    </div>
    <div class="product-list">
      <router-link
        v-for="product in proInfo"
        :key="product.productId"
        :to="{name: 'productdetails',query:{ productId: product.productId }}"
        class="product-item"
      >
        <img :src="product.logo" alt />
      </router-link>

      <div v-if="proInfo.length%2 === 1" class="product-item">
        <img src="@/assets/product_07.png" alt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $request, { picUrl } from '@/lib/request';

@Component({ name: 'Product' })
export default class Product extends Vue {
  public proInfo: any = [];
  public getAllProInfo() {
    $request.get('api/products').then((result) => {
      this.proInfo = result.data.map.proInfo;
      this.proInfo.forEach((items: any) => {
        items.logo = picUrl + items.logo;
      });
    });
  }
  private mounted() {
    this.getAllProInfo();
  }
}
</script>

<style lang="scss" scoped>
.product-title {
  @extend .center-container-width;
  border-radius: 10px;
  margin-top: 10px;
}
.product-title img {
  width: 100%;
}
.product-list {
  @include flex($justify: space-between, $align: center);
  flex-wrap: wrap;

  width: 90%;
  margin: 5px auto 10px;
}
.product-item {
  margin-top: 10px;
  width: 49%;
  border-radius: 10px;
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
}
.product-item img {
  width: 100%;
  border-radius: 4px;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>
