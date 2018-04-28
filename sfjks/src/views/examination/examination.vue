<style scoped lang="less">
  @import "./examination.less";
</style>

<template>
  <div class="examination">
    <div class="banner">
      <img src="@/assets/images/banner.png" />
    </div>
    <div class="examination_title">
        2018年3月份贵州省安顺市司法局第二阶段刑事与行政法律制度
    </div>
    <div class="identity">
      <p>姓名:&nbsp;&nbsp;<span>考试者</span></p>
      <p>总分:&nbsp;&nbsp;<span>100分</span></p>
      <p>考试时间:&nbsp;&nbsp;<span>90分钟</span></p>
    </div>
    <div class="open">
      <p>进入考试</p>
    </div>
       <!--完善个人资料弹框-->
    <div class="heidDiv" @click="popup" v-show="showFlag">
      <div class="heidDiv_perfect">
        <div class="heidDiv_perfect_imglogo">
          <img src="@/assets/images/icon_wsgrziliao.png" />
        </div>
        <div class="heidDiv_perfect_personal">完善个人资料</div>
        <div class="heidDiv_perfect_Prompt">
                              你好，为了考试后更方便查询成绩，建议你去个人中心完善资料
        </div>
        <div class="heidDiv_perfect_improve">去完善</div>
      </div>
    </div>
      <!--温馨提示弹框-->
    <div class="reminder heidDiv">
      <div class="reminder_inShow" v-for="(inTo, key) in reminder" :key="key">
        <div class="reminder_inShow_title">{{inTo.title}}</div>
        <div class="reminder_inShow_content">{{inTo.content}}</div>
        <div class="reminder_inShow_gitInto">
          <p class="reminder_inShow_gitInto_notToEnter">{{inTo.notToEnter}}</p>
          <p class="reminder_inShow_gitInto_enter">{{inTo.enter}}</p>
        </div>
      </div>
    </div>
    <yd-tabbar fixed>
      <yd-tabbar-item title="考试中心" link="examination" :active="tabActive == 'examination'" style="color:#04a7f3">
        <img src="@/assets/images/icon_kaoshizhongxin1.png" slot="icon" size="0.5rem" />
      </yd-tabbar-item>
      <yd-tabbar-item title="公告" link="#">
        <img src="@/assets/images/icon_gonggao2.png" slot="icon" size="0.44rem" />
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="#">
        <img src="@/assets/images/icon_gerenzhongxin.png" slot="icon" size="0.44rem" />
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'examination',
  data () {
    return {
      tabActive: 'examination',
      showFlag: false,
      reminder: [
        {
          title: '温馨提示',
          content: '你好，本次考试将有两次考试机会；总考试时间为90分钟，请问你是否做好准备进入考试！',
          notToEnter: '不进入',
          enter: '进入'
        }
      ]
    };
  },
  methods: {
    popup () {
      this.showFlag = !this.showFlag;
    }
  }
};
</script>
