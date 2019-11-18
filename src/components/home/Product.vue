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

@Component({ name: 'Product' })
export default class Product extends Vue {
  public proInfo: object[] = [
    {
      productId: 1,
      productName: '组合贷款产品',
      categoryId: 1,
      categoryName: '金融产品',
      productPrice: null,
      logo: 'http://rz.htkrtech.com/static/img/2019/08/201908051606550614.png',
    },
    {
      productId: 2,
      productName: '组合贷款产品',
      categoryId: 2,
      categoryName: '金融产品',
      productPrice: null,
      logo: 'http://rz.htkrtech.com/static/img/2019/08/201908051606550614.png',
    },
    {
      productId: 3,
      productName: '组合贷款产品',
      categoryId: 3,
      categoryName: '金融产品',
      productPrice: null,
      logo: 'http://rz.htkrtech.com/static/img/2019/08/201908051606550614.png',
    },
  ];
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
