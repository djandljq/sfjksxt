<style scoped lang="less">
  @import "./ticket-buy.less";
</style>

<template>
  <div class="ticket_buy">
    <!-- 顶部导航 -->
    <yd-navbar class="ticket_buy_title" title="订单确认">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-cell-group title="门票信息" class="ticket_buy_content">
      <yd-cell-item class="ticket_buy_content_title">
        <span slot="left">
          <div class="name">{{product.name}}</div>
          <div class="desc">{{product.desc}}</div>
        </span>
      </yd-cell-item>
      <yd-cell-item class="ticket_buy_content_date" arrow>
        <span slot="left">使用日期：</span>
        <yd-datetime class="format" slot="right"
                     v-model="use_date"
                     :yearFormat="yearFormat"
                     :month-format="monthFormat"
                     :day-format="dayFormat"
                     :start-date="start_date"
                     type="date">
        </yd-datetime>
      </yd-cell-item>
      <yd-cell-item class="ticket_buy_content_num">
        <span slot="left">购买数量</span>
        <span slot="right">
          <yd-spinner max="10" unit="1" v-model="product.quantity"></yd-spinner>
        </span>
      </yd-cell-item>
      <yd-cell-item class="ticket_buy_content_other">
        <span slot="left">门票</span>
        <span slot="right"><em>¥</em>{{product.price}}x{{product.quantity}}</span>
      </yd-cell-item>
      <yd-cell-item class="ticket_buy_content_tip">
        <span slot="left" class="desc">
          <p>购买后立即可用， 使用日期当日有效</p>
          <p>此产品在使用截止日期前可退款</p>
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="游客信息" class="ticket_buy_user">
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="user.name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" required v-model="user.mobile" max="20" placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group class="ticket_buy_submit">
      <yd-cell-item>
        <span class="price" slot="left">总价：<em>¥</em>{{pay_price}}</span>
        <span class="button" slot="right" @click="ticketSubmit">确认下单</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
import {
  orderCreate,
  productInfo
} from '../../../ifucloud/sdk';
const dateFormat = require('dateformat');
export default {
  name: 'ticket-buy',
  data () {
    return {
      image: '',
      product: {
        sn: '',
        sku: '',
        name: '',
        desc: '',
        price: '',
        app_id: null,
        quantity: 1,
        attributes: [
          {
            attr_type: '',
            attr_name: '',
            attr_value: ''
          }
        ]
      },
      week: '周一',
      start_date: '2017-05-11',
      use_date: '2017-05-11',
      yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
      monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
      dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
      create_order: false,
      pay_price: 0,
      openid: 0,
      user: {
        name: '',
        mobile: ''
      }
    };
  },
  methods: {
    init () {
      this.ticketInfo();
      this.todayFormat();
    },
    todayFormat () {
      let time = new Date();
      this.use_date = dateFormat(time, 'yyyy-mm-dd');
      this.start_date = dateFormat(time, 'yyyy-mm-dd');
      let week = dateFormat(time, 'ddd');
      switch (week) {
        case 'Sun': week = '周日'; break;
        case 'Mon': week = '周一'; break;
        case 'Tue': week = '周二'; break;
        case 'Wed': week = '周三'; break;
        case 'Thu': week = '周四'; break;
        case 'Fri': week = '周五'; break;
        case 'Sat': week = '周六'; break;
      }
      this.week = week;
    },
    ticketInfo () {
      let id = this.$route.params.id;
      let sn = this.$route.params.sn;
      productInfo(id).then(res => {
        let that = this;
        let {
          sku,
          name,
          price,
          prices,
          image,
          attributes,
          app_id
        } = res.data;
        this.image = image;
        this.product = {
          sn: sku,
          sku: sn,
          name: name,
          desc: '',
          price: price,
          app_id: app_id,
          attributes: attributes,
          quantity: 1
        };
        prices.forEach(price => {
          if (price.sn === sn) {
            that.product['name'] = price.name;
            that.product['desc'] = price.desc;
            that.product['price'] = price.number;
            that.pay_price = (parseFloat(this.product.price) * this.product.quantity).toFixed(2);
          }
        });
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    ticketSubmit () {
      let that = this;
      let user = JSON.parse(localStorage.user);
      user.attributes.forEach(attribute => {
        if (attribute.attr_type === 'openid') {
          that.openid = attribute.attr_value;
        }
      });
      if (!this.user.name || !this.user.mobile) {
        this.$dialog.toast({
          mes: '请输入姓名与手机号',
          timeout: 1500,
          icon: 'error'
        });
      } else {
        let users = [
          {
            user_type: 'buyer',
            user_form: 'customer',
            user_name: this.user.name,
            user_address: 'no',
            user_mobile: this.user.mobile
          },
          {
            user_type: 'seller',
            user_form: 'business',
            user_name: '独山旅游官方微信',
            user_address: '独山旅游',
            user_mobile: '1234567'
          }
        ];
        let products = [
          {
            product_type: 'normal',
            product_sku: this.product.sku,
            product_image: this.image,
            product_sn: this.product.sn,
            product_name: this.product.name,
            product_price: this.product.price,
            product_quantity: this.product.quantity
          }
        ];
        let attributes = [
          {
            attr_type: 'openid',
            attr_code: 'openid',
            attr_name: '微信openid',
            attr_value: this.openid
          },
          {
            attr_type: 'explain',
            attr_code: 'date',
            attr_name: '使用时间',
            attr_value: this.use_date + ' ' + this.week
          },
          {
            attr_type: 'explain',
            attr_code: 'pattern',
            attr_name: '入园方式',
            attr_value: '电子码快速入园'
          }
        ];
        this.product.attributes.forEach(attr => {
          if (attr.attr_type === 'explain') {
            switch (attr.attr_code) {
              case 'address':
                attributes.push({
                  attr_type: 'explain',
                  attr_code: 'address',
                  attr_name: '入园地址',
                  attr_value: attr.attr_value
                });
                break;
              case 'refund_rule':
                attributes.push({
                  attr_type: 'other',
                  attr_code: 'refund_rule',
                  attr_name: '退改规则',
                  attr_value: attr.attr_value
                });
                break;
            }
          }
        });
        attributes.push({
          attr_type: 'explain',
          attr_code: 'quantity',
          attr_name: '购买数量',
          attr_value: this.product.quantity
        });
        orderCreate({
          'type': 'ticket',
          'source': 'wechat',
          'pay_type': 'wechat',
          'state': 'unpaid',
          'image': this.image,
          'buyer_username': user.username,
          'seller_username': 'dsly',
          'title': this.product.name,
          'total_amount': this.pay_price,
          'pay_amount': this.pay_price,
          'discount_amount': 0,
          'products': products,
          'attributes': attributes,
          'users': users,
          'amounts': [],
          'discounts': [],
          'refunds': [],
          'remarks': [],
          'invoices': []
        }).then(res => {
          let { order_sn } = res.data;
          let argu = {sn: order_sn};
          that.$router.push({
            name: 'ticket-order',
            params: argu
          });
        }).catch(err => {
          this.$dialog.toast({
            mes: err,
            timeout: 1500,
            icon: 'error'
          });
        });
      }
    }
  },
  watch: {
    'product.quantity': function (num) {
      this.pay_price = (parseFloat(this.product.price) * num).toFixed(2);
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
