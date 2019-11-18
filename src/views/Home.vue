<template>
  <div class="home">
    <HomeSwiper />
    <Navigation />
    <Announcement />
    <Product />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSwiper from '@/components/home/HomeSwiper.vue';
import Navigation from '@/components/home/Navigation.vue';
import Announcement from '@/components/home/Announcement.vue';
import Product from '@/components/home/Product.vue';

import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'home',
  components: { HomeSwiper, Navigation, Announcement, Product }
})
export default class Home extends Vue {}
</script>
