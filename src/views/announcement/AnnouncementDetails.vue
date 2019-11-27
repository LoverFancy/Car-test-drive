<template>
  <div class="announcement-details">
    <van-cell-group class="box-card">
      <van-cell label-class="label" :title="title" size="large" :label="body" />
    </van-cell-group>
    <van-row type="flex" justify="end">
      <van-col>
        <time>{{time}}</time>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row, Col, CellGroup, Cell, Toast } from 'vant';
Vue.use(Row)
  .use(Col)
  .use(CellGroup)
  .use(Toast)
  .use(Cell);
import $request from '@/lib/request';
@Component({ name: 'AnnouncementDetails' })
export default class AnnouncementDetails extends Vue {
  public $route: any;
  public title: string = '';
  public body: string = '';
  public time: string = '';
  @Prop({
    type: String,
    required: true,
  })
  private noticeId: number = 0;

  // 加载页面数据
  public getInvoiceInfo() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
    });
    const data = {
      noticeId: parseInt(this.$route.params.noticeId, 10),
    };
    const json = JSON.stringify(data);
    $request({
      url: `api/noticelists`,
      method: 'post',
      data: json,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        this.title = res.data.map.notice.noticeTitle;
        this.body = res.data.map.notice.noticeContent;
        const date = new Date(res.data.map.notice.issueTime);
        this.time = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`;
        Toast.clear();
      })
      .catch((err) => {
        Toast.fail(err);
      });
  }

  private mounted() {
    this.getInvoiceInfo();
  }
}
</script>

<style lang="scss" scoped>
.announcement-details {
  width: 90%;
  margin: 10px auto;
}
time {
  font-size: 12px;
  color: darkgray;
}
.label {
  margin: 20px 0;
}
.van-button {
  height: 36px;
  line-height: 35px;
}
</style>