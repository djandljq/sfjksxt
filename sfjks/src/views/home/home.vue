<style scoped lang="less">
  @import "./home.less";
</style>

<template>
  <div class="home">
    <div class="home_logo">
      <img src="@/assets/images/guohui.png" />
    </div>
    <p>安顺市司法局学法考试系统</p>
    <div class="main">
      <div class="land">
        <div class="land_landImg">
          <img src="../../assets/images/danwei.png" />
        </div>
        |<input type="text" name="name" id="name" v-model="deptname" placeholder="请选择单位"/>
        <img src="@/assets/images/icon_xialafuhao.png" class="xiala" @click="company"/>
      </div>
      <div class="land" >
        <div class="land_landImg">
          <img src="../../assets/images/head-icon.png"/>
        </div>
        |<input type="text" name="name"  v-model="username" placeholder="请输入真实姓名"/>
      </div>
      <ul class="company" v-show="showCompany">
        <li v-for="(item, key) in list" :key="key" @click="obtain">{{item.company}}</li>
      </ul>
      <div class="land landSubmit" @click="getUser">
        <input type="submit" value="进入系统" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showCompany: false,
      obtainCompany: false,
      posts: '',
      deptname: '',
      username: '',
      list: [
        {company: '安顺市司法局'},
        {company: '恰同学少年科技有限公司'},
        {company: '安顺市检查院'}
      ]
    };
  },
  methods: {
    company () {
      this.showCompany = !this.showCompany;
    },
    getUser () {
      let postData = this.$qs.stringify({
        deptname: this.deptname,
        username: this.username
      });
      this.$axios({
        method: 'post',
        url: 'http://ks.gysky.net/index/Login/loginSubmit',
        data: postData
      }).then(res => {
        let { data } = res;
        if (data.code === 0) {
          self.location = '/examination';
          localStorage.username = this.username;
        } else if (data.code === -1) {
          alert('单位或姓名错误');
          this.deptname = '';
          this.username = '';
        }
      })
        .catch(error => {
        });
    },
    obtain (e) {
      this.showCompany = false;
      let value = e.target.innerHTML;
      this.deptname = value;
    }
  }
};
</script>
