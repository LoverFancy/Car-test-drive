<template>
  <div class="protocol" v-html="text"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import $request from '@/lib/request';
import { Toast } from 'vant';
Vue.use(Toast);
@Component({ name: 'Protocol' })
export default class Protocol extends Vue {
  public text: string = '';
  public async protocol() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      forbidClick: true,
    });
    try {
      const result = await $request('api/system/getSingDeal');
      if (result.data.success) {
        this.text = result.data.map.singDeal;
        Toast.clear();
      } else {
        Toast.fail(result.data.msg);
      }
    } catch (err) {
      Toast.fail(err);
    }
  }
  private mounted() {
    this.protocol();
  }
}
</script>

<style lang="scss" scoped>
.protocol {
  @extend .center-container-width;
  min-height: 100vh;
}
</style>