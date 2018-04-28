<style scoped lang="less">
  @import "./goods.less";
</style>

<template>
  <yd-pullrefresh class="goods" :callback="init" ref="pullGoodsList">
    <yd-navbar class="goods_title" title="特产商城">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-infinitescroll :callback="loadList" ref="crollGoodsList">
      <yd-list slot="list" theme="1" class="goods_list">
        <yd-list-item v-for="(item, key) in goods" :key="key" :href="'/goods/info/' + item.id">
          <img slot="img" :src="item.image">
          <span slot="title" class="left_head">{{item.name}}</span>
          <yd-list-other slot="other">
            <div>
              <span class="goods_list_price"><em>¥</em>{{item.price}}</span>
            </div>
            <div class="goods_list_sale">销量 {{item.sell_num}}</div>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
    </yd-infinitescroll>
  </yd-pullrefresh>
</template>

<script>
import { productList } from '../../ifucloud/sdk';
export default {
  name: 'goods',
  data () {
    return {
      count_page: 1,
      goods: []
    };
  },
  methods: {
    init () {
      this.goodsList(1);
    },
    loadList () {
      this.count_page++;
      this.loadGoodsList(this.count_page);
    },
    loadGoodsList (page) {
      productList(page, {type: 'goods', sell_status: 1}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goods = [...this.goods, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollGoodsList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollGoodsList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    goodsList (page) {
      productList(page, {type: 'goods', sell_status: 1}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goods = data;
        this.$refs.crollGoodsList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullGoodsList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollGoodsList.$emit('ydui.infinitescroll.loadedDone');
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
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
