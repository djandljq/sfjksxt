<style scoped lang="less">
  @import "./coffee-info.less";
</style>

<template>
  <yd-pullrefresh class="coffee_info" :callback="init" ref="pullCoffeeInfo">
    <!-- 顶部导航 -->
    <yd-navbar class="coffee_info_title" title="咖啡详情">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 轮播图片 -->
    <yd-slider class="coffee_info_banners" autoplay="3000">
      <yd-slider-item v-for="(image, key) in coffee.images" :key="key">
        <img :src="image.img_src">
      </yd-slider-item>
    </yd-slider>
    <!-- 咖啡标题 -->
    <yd-flexbox class="coffee_info_msg" direction="vertical">
      <yd-flexbox-item class="coffee_info_msg_title">
        <span>{{coffee.title}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item class="coffee_info_msg_price">
        <span><em>¥</em>{{coffee.price}}</span>
        <div class="coffee_info_msg_price_sale">
          <span>销量{{coffee.sale}}</span>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 图文详情 -->
    <yd-flexbox class="coffee_info_desc" direction="vertical">
      <div class="coffee_info_desc_title">图文详情</div>
      <yd-flexbox-item class="coffee_info_desc_content">
        <div class="content" v-html="coffee.desc"></div>
      </yd-flexbox-item>
    </yd-flexbox>
    <div class="coffee_info_helper"></div>
    <yd-cell-group class="coffee_info_submit">
      <yd-cell-item>
        <span class="price" slot="left">单价：<em>¥</em>{{coffee.price}}元</span>
        <span class="button" slot="right" @click="coffeeBuySubmit">立即预订</span>
      </yd-cell-item>
    </yd-cell-group>
  </yd-pullrefresh>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
export default {
  name: 'coffee-info',
  data () {
    return {
      coffee: {
        title: '',
        about: '',
        price: 0.0,
        sale: 0,
        desc: '',
        images: [
          {
            img_src: defaultImg
          }
        ],
        attributes: [],
        prices: []
      }
    };
  },
  methods: {
    init () {
      this.coffeeInfo();
    },
    coffeeInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        this.coffee.id = data.id;
        this.coffee.title = data.name;
        this.coffee.price = data.price;
        this.coffee.sale = data.sell_num;
        this.coffee.desc = data.desc;
        this.coffee.images = data.images;
        this.coffee.prices = data.prices;
        this.coffee.attributes = [];
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'about') {
            this.coffee.about = attribute.attr_value;
          } else {
            this.coffee.attributes.push(attribute);
          }
        });
        this.$refs.pullCoffeeInfo.$emit('ydui.pullrefresh.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeBuySubmit (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = { id: id };
        this.$router.push({
          name: 'coffee-buy',
          params: argu
        });
      } else {
        this.$dialog.toast({
          mes: '商品信息错误',
          timeout: 1500,
          icon: 'error'
        });
      }
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
