<style scoped lang="less">
  @import "./user.less";
</style>

<template>
  <div class="user">
    <yd-flexbox direction="vertical">
      <div class="user_info">
        <div class="user_info_avatar">
          <img :src="user.avatar"/>
        </div>
        <div class="user_info_name">
          <span>{{user.nickname}}</span>
        </div>
      </div>
      <yd-flexbox-item class="user_content">
        <yd-cell-group title="购物车">
          <yd-cell-item arrow href="/user/my/cart" type="link">
            <yd-icon slot="icon" name="shopcart-outline" size=".42rem"></yd-icon>
            <span slot="left">我的购物车</span>
            <span slot="right">查看购物车</span>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="订单">
          <yd-cell-item arrow href="/user/my/ticket" type="link">
            <yd-icon slot="icon" name="qrscan" size=".42rem"></yd-icon>
            <span slot="left">我的门票</span>
            <span slot="right">查看</span>
          </yd-cell-item>
          <yd-cell-item arrow href="/user/my/hotel" type="link">
            <yd-icon slot="icon" name="discount" size=".42rem"></yd-icon>
            <span slot="left">我的酒店</span>
            <span slot="right">查看</span>
          </yd-cell-item>
          <yd-cell-item arrow href="/user/my/coffee" type="link">
            <yd-icon slot="icon" name="feedback" size=".42rem"></yd-icon>
            <span slot="left">我的咖啡</span>
            <span slot="right">查看</span>
          </yd-cell-item>
          <yd-cell-item arrow href="/user/my/goods" type="link">
            <yd-icon slot="icon" name="location" size=".42rem"></yd-icon>
            <span slot="left">我的特产</span>
            <span slot="right">查看</span>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="用户">
          <yd-cell-item>
            <yd-icon slot="icon" name="refresh" size=".42rem"></yd-icon>
            <span slot="left">缓存数据</span>
            <span slot="right" @click="cacheClear">点击清空</span>
          </yd-cell-item>
        </yd-cell-group>
      </yd-flexbox-item>
    </yd-flexbox>
    <yd-tabbar fixed class="home_tab">
      <yd-tabbar-item title="首页" :active="tabActive === 'home'" link="home">
        <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" :active="tabActive === 'user'" link="user">
        <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
import { wxUserLogin, customerUserInfo } from '../../ifucloud/sdk';
export default {
  name: 'user',
  data () {
    return {
      tabActive: 'user',
      user: {
        id: '',
        sex: '',
        type: '',
        email: '',
        avatar: '',
        username: '',
        nickname: '',
        telephone: '',
        attributes: ''
      }
    };
  },
  methods: {
    init () {
      this.loadUserInfo();
    },
    loadUserInfo () {
      if (!localStorage.user && !this.$route.query.token) {
        wxUserLogin();
      } else if (!localStorage.user && this.$route.query.token) {
        localStorage.oauthToken = this.$route.query.token;
        customerUserInfo().then(res => {
          let { data } = res;
          localStorage.user = JSON.stringify(data);
          this.user = JSON.parse(localStorage.user);
        }).catch(error => {
          this.$dialog.toast({
            mes: error,
            timeout: 1500,
            icon: 'error'
          });
        });
      } else {
        this.user = JSON.parse(localStorage.user);
      }
    },
    cacheClear () {
      this.$dialog.confirm({
        title: '清空全部缓存',
        mes: '缓存清除后需要从新授权登录！',
        opts: () => {
          let that = this;
          localStorage.clear();
          setTimeout(function () {
            that.$router.push({
              name: 'home'
            });
          }, 2000);
        }
      });
    }
  },
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>
