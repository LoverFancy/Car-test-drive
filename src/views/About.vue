<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <h1>{{child}}</h1>
    <h1>{{msg2}}</h1>
    <button @click="button">button</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import request from '@/lib/request';

@Component({})
export default class About extends Vue {
  // data
  public msg: string = 'about';
  public child: string = 'child';
  // mounted
  public mounted() {
    request({
      url: 'posts',
      data: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
      method: 'post',
    }).then((res) => {
      console.log(res);
    });
  }
  // methods
  public button() {
    this.msg = 'changeabout';
  }
  // watch
  @Watch('msg')
  public onChangeValue() {
    this.child = 'changechild';
  }
  // computed
  get msg2() {
    return this.msg + '2';
  }
}
</script>

<style lang="scss">
</style>