import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      title: '主页',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/user',
      name: 'user',
      title: '个人中心',
      component: () => import('@/views/user/user.vue')
    },
    {
      path: '/user/my/ticket',
      name: 'my-ticket',
      title: '我的门票',
      component: () => import('@/views/user/components/my-ticket.vue')
    },
    {
      path: '/user/my/hotel',
      name: 'my-hotel',
      title: '我的酒店',
      component: () => import('@/views/user/components/my-hotel.vue')
    },
    {
      path: '/user/my/coffee',
      name: 'my-coffee',
      title: '我的咖啡',
      component: () => import('@/views/user/components/my-coffee.vue')
    },
    {
      path: '/user/my/goods',
      name: 'my-goods',
      title: '我的特产',
      component: () => import('@/views/user/components/my-goods.vue')
    },
    {
      path: '/user/my/cart',
      name: 'my-cart',
      title: '我的购物车',
      component: () => import('@/views/user/components/my-cart.vue')
    },
    {
      path: '/ticket',
      name: 'ticket',
      title: '门票',
      component: () => import('@/views/ticket/ticket.vue')
    },
    {
      path: '/ticket/info/:id',
      name: 'ticket-info',
      title: '门票详情',
      component: () => import('@/views/ticket/components/ticket-info.vue')
    },
    {
      path: '/ticket/buy/:id/:sn',
      name: 'ticket-buy',
      title: '门票确认订单',
      component: () => import('@/views/ticket/components/ticket-buy.vue')
    },
    {
      path: '/ticket/order/:sn',
      name: 'ticket-order',
      title: '门票订单详情',
      component: () => import('@/views/ticket/components/ticket-order.vue')
    },
    {
      path: '/ticket/refund/:sn',
      name: 'ticket-refund',
      title: '退款详情',
      component: () => import('@/views/ticket/components/ticket-refund.vue')
    },
    {
      path: '/hotel',
      name: 'hotel',
      title: '酒店预定',
      component: () => import('@/views/hotel/hotel.vue')
    },
    {
      path: '/hotel/info/:id',
      name: 'hotel-info',
      title: '酒店详情',
      component: () => import('@/views/hotel/components/hotel-info.vue')
    },
    {
      path: '/hotel/room/:id',
      name: 'hotel-room',
      title: '酒店房间详情',
      component: () => import('@/views/hotel/components/hotel-room.vue')
    },
    {
      path: '/hotel/buy/:id',
      name: 'hotel-buy',
      title: '酒店购买',
      component: () => import('@/views/hotel/components/hotel-buy.vue')
    },
    {
      path: '/hotel/order/:sn',
      name: 'hotel-order',
      title: '酒店订单',
      component: () => import('@/views/hotel/components/hotel-order.vue')
    },
    {
      path: '/hotel/refund/:sn',
      name: 'hotel-refund',
      title: '酒店退款',
      component: () => import('@/views/hotel/components/hotel-refund.vue')
    },
    {
      path: '/goods',
      name: 'goods',
      title: '特产商城',
      component: () => import('@/views/goods/goods.vue')
    },
    {
      path: '/goods/info/:id',
      name: 'goods-info',
      title: '特产详情',
      component: () => import('@/views/goods/components/goods-info.vue')
    },
    {
      path: '/goods/buy/:id/:num',
      name: 'goods-buy',
      title: '订单确认',
      component: () => import('@/views/goods/components/goods-buy.vue')
    },
    {
      path: '/goods/order/:sn',
      name: 'goods-order',
      title: '特产订单',
      component: () => import('@/views/goods/components/goods-order.vue')
    },
    {
      path: '/goods/refund/:sn',
      name: 'goods-refund',
      title: '特产退款',
      component: () => import('@/views/goods/components/goods-refund.vue')
    },
    {
      path: '/examination',
      name: 'examination',
      title: '考试中心',
      component: () => import('@/views/examination/examination.vue')
    }
  ]
});
