<style scoped lang="less">
  @import "./ticket-info.less";
</style>

<template>
  <yd-pullrefresh class="ticket_info" :callback="init" ref="pullTicketInfo">
    <!-- 顶部导航 -->
    <yd-navbar class="ticket_info_title" title="门票详情">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 轮播图片 -->
    <yd-slider class="ticket_info_banners" autoplay="3000">
      <yd-slider-item v-for="(image, key) in ticket.images" :key="key">
        <img :src="image.img_src">
      </yd-slider-item>
    </yd-slider>
    <!-- 简介内容 -->
    <yd-flexbox class="ticket_info_msg" direction="vertical">
      <yd-flexbox-item class="ticket_info_msg_title">
        <span>{{ticket.title}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item class="ticket_info_msg_about">
        <span>{{ticket.about}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item class="ticket_info_msg_price">
        <div class="ticket_info_msg_price_num"><em>¥</em>{{ticket.price}}<span>起</span></div>
        <div class="ticket_info_msg_price_sale">销量{{ticket.sale}}</div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 图文详情 -->
    <yd-flexbox class="ticket_info_item" direction="vertical">
      <div class="ticket_info_item_title">图文详情</div>
      <yd-flexbox-item v-for="(attr,  key) in ticket.attributes" :key="key" class="ticket_info_item_content">
        <div class="content">
          <span class="name">{{attr.attr_name}}：</span>
          <span class="value">{{attr.attr_value}}</span>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 门票 -->
    <yd-flexbox class="ticket_info_item" direction="vertical">
      <div class="ticket_info_item_title">门票</div>
      <yd-flexbox-item class="ticket_info_item_content">
        <yd-flexbox class="content prices" v-for="(price, key) in ticket.prices" :key="key">
          <div class="price_info">
            <div class="price_info_title">{{price.name}}</div>
            <div class="price_info_desc">{{price.desc}}</div>
            <div class="price_info_tags">
              <!--<yd-badge class="tag" v-for="(tag, k) in price.tags" :key="k" shape="square" type="hollow">{{tag}}</yd-badge>-->
              <span class="tag" v-for="(tag, k) in price.tags" :key="k">{{tag}}</span>
            </div>
          </div>
          <yd-flexbox-item class="price_active">
            <div class="price_active_num"><em>¥</em>{{price.number}}</div>
            <div class="price_active_button" @click="ticketBuy(price.sn)">立即购买</div>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 景区介绍 -->
    <yd-flexbox class="ticket_info_item" direction="vertical">
      <div class="ticket_info_item_title">景区介绍</div>
      <yd-flexbox-item class="ticket_info_item_content">
        <div class="content" v-html="ticket.desc"></div>
      </yd-flexbox-item>
    </yd-flexbox>
  </yd-pullrefresh>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
export default {
  name: 'ticket-info',
  data () {
    return {
      ticket: {
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
      this.ticketInfo();
    },
    ticketInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        this.ticket.id = data.id;
        this.ticket.title = data.name;
        this.ticket.price = data.price;
        this.ticket.sale = data.sell_num;
        this.ticket.desc = data.desc;
        this.ticket.images = data.images;
        this.ticket.prices = data.prices;
        this.ticket.attributes = [];
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'about') {
            this.ticket.about = attribute.attr_value;
          } else {
            this.ticket.attributes.push(attribute);
          }
        });
        this.$refs.pullTicketInfo.$emit('ydui.pullrefresh.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    ticketBuy (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = { id: id, sn: sn };
        this.$router.push({
          name: 'ticket-buy',
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
