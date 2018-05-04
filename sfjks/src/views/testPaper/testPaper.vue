<style scoped lang="less">
  @import "./testPaper.less";
</style>

<template>
  <div class="testPaper">
    <div class="dataTime">
      <p>开始作答时间：<span id="newData">{{dateTime}}</span></p>
      <p>交卷时间：<span id="targetTime">{{targetTime}}</span></p>
      <p>离交卷时间还有：<i id="count_down">{{count}}</i></p>
    </div>
    <ul class="topic">
      <li v-for="(item, key) in quest_list" :key="key">
        <div class="subject"><i>1、</i><span>{{item.question_content}}</span></div>
        <yd-checkbox-group v-model="checkbox6">
          <yd-checkbox val="A" shape="circle" color='#04aaf8'>A. {{item.question_answer_a}}</yd-checkbox><br>
          <yd-checkbox val="B" shape="circle">B. {{item.question_answer_b}}</yd-checkbox><br>
          <yd-checkbox val="C" shape="circle">C. {{item.question_answer_c}}</yd-checkbox><br>
          <yd-checkbox val="D" shape="circle">D. {{item.question_answer_d}}</yd-checkbox>
        </yd-checkbox-group>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'testPaper',
  data () {
    return {
      count_page: 1,
      total_pages: 1,
      titleNumber: [],
      checkbox6: ['1'],
      question_content: '',
      question_answer_a: '',
      question_answer_b: '',
      question_answer_c: '',
      question_answer_d: '',
      count: '',
      dateTime: '',
      targetTime: '',
      quest_list: []
    };
  },
  mounted () {
    this.forNunber();
    this.formatDate();
    this.countDown();
    this.questions();
  },
  methods: {
    forNunber () {
      for (let i = 1; i < 101; i++) {
        this.titleNumber = i;
      }
    },
    questions () {
      this.$axios({
        method: 'get',
        url: 'http://ks.gysky.net/index/api/getBank'
      }).then(res => {
      	this.quest_list = res.data.data.question_list;
      });
    },
    formatDate () {
      let timer = new Date();
      let starTime = timer;
      let a = timer.getTime() + 90 * 60 * 1000;
      let endTime = new Date(a);
      this.dateTime = this.formGetTime(starTime);
      this.targetTime = this.formGetTime(endTime);
    },
    formGetTime (now) {
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      month < 10 ? month = '0' + month : month;
      date < 10 ? date = '0' + date : date;
      hour < 10 ? hour = '0' + hour : hour;
      minute < 10 ? minute = '0' + minute : minute;
      second < 10 ? second = '0' + second : second;
      return year + '-' + month + '-' + date + '  ' + hour + ':' + minute + ':' + second;
    },
    countDown () {
      let time = 90 * 60;
      let clerTime = setInterval(() => {
        time--;
        let m = Math.floor(time / 60);
        let s = time - m * 60;
        m < 10 ? m = '0' + m : m;
        s < 10 ? s = '0' + s : s;
      if(m == 0 && s == 0) {
        	clearInterval(clerTime);
        }
        this.count = m + '分' + s + '秒';
      }, 1000);
    }
  }
};
</script>
