<template>
  <div class="car">
    <van-nav-bar title="车辆"></van-nav-bar>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item title="车型" @click="sidebarClick" />
      <van-sidebar-item title="品牌" @click="sidebarClick" />
      <van-sidebar-item title="厂商" @click="sidebarClick" />
    </van-sidebar>
    <div class="sidebar-right">
      <div v-for="list in lists" :key="list.index" v-show="list.index === activeKey">
        <van-card
          v-for="product in list.products"
          :key="product.id"
          :num="product.num"
          :price="product.price"
          :desc="product.desc"
          :title="product.title"
          :thumb-link="{name: 'home'}"
          :thumb="product.thumb"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  Sidebar,
  SidebarItem,
  NavBar,
  Card,
  DropdownMenu,
  DropdownItem,
} from 'vant';
Vue.use(Sidebar)
  .use(SidebarItem)
  .use(Card)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(NavBar);

@Component({ name: 'Car' })
export default class Car extends Vue {
  public activeKey: number = 0;
  public value1: number = 0;
  public value2: string = 'a';
  public option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ];
  public option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ];
  public lists = [
    {
      index: 0,
      title: '0',
      products: [
        {
          id: 1,
          desc: '描述信息',
          title: '车型1',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
        },
        {
          id: 2,
          desc: '描述信息',
          title: '车型2',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
        },
      ],
    },
    {
      index: 1,
      title: '1',
      products: [
        {
          id: 1,
          desc: '描述信息',
          title: '品牌1',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
        },
        {
          id: 2,
          desc: '描述信息',
          title: '品牌2',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
        },
      ],
    },
  ];
  public sidebarClick(index: number) {}
}
</script>

<style lang="scss" scoped>
.van-sidebar {
  float: left;
}
.sidebar-right {
  margin-left: 85px;
}
</style>