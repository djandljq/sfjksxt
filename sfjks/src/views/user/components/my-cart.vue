<style scoped lang="less">
  @import "my-cart.less";
</style>

<template>
  <div class="my_cart">
    <yd-navbar class="my_cart_title" title="我的购物车">
      <div @click="$router.push({name: 'user'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <div v-if="cartList.length > 0">
      <yd-list theme="4" class="my_cart_list">
        <yd-list-item class="my_cart_list_item" v-for="(cart, key) in cartList" :key="key">
          <img class="my_cart_list_item_img" slot="img" :src="cart.image">
          <span class="my_cart_list_item_title" slot="title">{{cart.title}}</span>
          <yd-list-other slot="other">
            <div class="my_cart_list_item_info">
              <div class="my_cart_list_item_info_price"><em>¥</em>{{cart.product_price}}x{{cart.quantity}}</div>
            </div>
            <yd-checkbox v-model="cart_select[key]" shape="circle">选择</yd-checkbox>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
      <yd-cell-group class="my_cart_submit">
        <yd-cell-item>
          <span class="price" slot="left">实付款：<em>¥</em>{{pay_price}}元</span>
          <span class="button" slot="right" @click="cartBuySubmit">立即支付</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <content-empty v-if="cartList.length <= 0"></content-empty>
  </div>
</template>

<script>
import contentEmpty from '../../components/content-empty';
export default {
  name: 'my-cart',
  components: {
    contentEmpty
  },
  data () {
    return {
      pay_price: 0,
      cart_select: [],
      cartList: []
    };
  },
  methods: {
    init () {
      this.userCartList();
    },
    userCartList () {
      let user = JSON.parse(localStorage.user);
      this.cartList = user.carts ? user.carts : [];
      this.cartList.forEach(() => {
        this.cart_select.push(false);
      });
    },
    cartBuySubmit () {

    }
  },
  watch: {
    'cart_select': function (select) {
      let that = this;
      let carts = this.cartList;
      that.pay_price = 0;
      select.forEach((value, key) => {
        if (value === true) {
          that.pay_price += parseFloat(carts[key].amount);
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
