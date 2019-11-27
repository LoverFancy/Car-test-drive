<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <h1>{{child}}</h1>
    <h1>{{msg2}}</h1>
    <p>{{readMesg}}</p>
    <button @click="button">button</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import request from '@/lib/request';

@Component
export default class About extends Vue {
  // computed
  get msg2() {
    return this.msg + '2';
  }
  // data
  public msg: string = 'about';
  public child: string = 'child';
  @State('readMesg') public readMesg: any;
  @Mutation('readMesgMutation') public readMesgMutation: any;

  // mounted
  public mounted() {
    request({
      url: 'api/banners',
      data: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
      method: 'get',
    }).then((res) => {
      console.log(res);
    });
  }
  // methods
  public button() {
    this.msg = 'changeabout';
    this.readMesgMutation(2);
  }
  // watch
  @Watch('msg')
  public onChangeValue() {
    this.child = 'changechild';
  }
}
</script>

<style lang="scss">
</style>