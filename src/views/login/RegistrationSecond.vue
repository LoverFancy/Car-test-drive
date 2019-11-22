<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" @click-left="goback" left-arrow></van-nav-bar>
    <div class="registration-second">
      <!-- vant 图片上传组件 -->
      <van-row>
        <van-col span="20" offset="2" style="height: 200px;border:1px dashed #dcdfe6">
          <img style="width:100%;height: 200px;" :src="form.domain+form.selfHoldPicPath" alt />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col>
          <div class="common-smalltext">{{imgMessage}}</div>
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-around">
        <van-col span="8">
          <van-uploader :after-read="uploaded">
            <van-button block round size="small" type="info">拍照</van-button>
          </van-uploader>
        </van-col>
        <van-col span="8">
          <van-button block round type="info" size="small" @click="third">下一步</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
interface formInterface {
  domain: string;
  selfHoldPicPath: string;
}
import { Vue, Component } from 'vue-property-decorator';
import { Row, Col, NavBar, Uploader, Button } from 'vant';
import { State, Mutation, Action } from 'vuex-class';
import util from '@/lib/util';
Vue.use(Row)
  .use(Col)
  .use(NavBar)
  .use(Uploader)
  .use(Button);

@Component({ name: 'RegistrationSecond' })
export default class RegistrationSecond extends Vue {
  public imgMessage: string = '上传一张本人手持身份证的照片';
  public form: formInterface = {
    domain: '',
    selfHoldPicPath: '',
  };

  public third() {
    // if (this.form.selfHoldPicPath !== '') {
    this.$router.push({ name: 'registrationthird' });
    //   this.$store.commit('changeRegistrationSecond', this.form);
    // } else {
    //   this.$toast.fail('请上传一张本人手持身份证的照片');
    // }
  }
  public goback(): void {
    this.$router.push({ name: 'registrationfirst' });
    this.$store.commit('changeRegistrationSecond', this.form);
  }
  public uploaded(file, detail) {
    util.miniBase64(file.content, (res) => {
      // 上传到服务器，然后返回图片的地址
      const data = {
        flagId: 'selfHoldPicPath',
        image: res,
      };
      //   this.$axios({
      //     url: `${this.$config.baseUrl}api/system/uploadTempFile`,
      //     method: 'post',
      //     data: JSON.stringify(data),
      //     headers: { 'Content-Type': 'application/json' },
      //   })
      //     .then((result) => {
      //       if (result.data.status === true) {
      //         this.$toast.success('图片上传成功');
      //         this.form.selfHoldPicPath = result.data.filePath;
      //         this.$store.commit('changeRegistrationSecond', this.form);
      //       } else {
      //         this.$toast.fail('图片上传失败');
      //       }
      //     })
      //     .catch((err) => {
      //       this.$toast.fail(err);
      //     });
    });
  }
  private mounted(): void {
    this.form.domain = this.$store.state.registration.domain;
    this.form.selfHoldPicPath = this.$store.state.registration.selfHoldPicPath;
  }
}
</script>

<style lang="scss" scoped>
.registration-second {
  font-size: 12px;
  min-height: 90vh;
}
.van-checkbox__icon .van-icon {
  border: 1px solid #bfbdbd;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
.van-uploader {
  width: 100%;
}
.common-smalltext {
  margin-bottom: 10px;
}
</style>