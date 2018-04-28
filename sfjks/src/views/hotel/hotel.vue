<style scoped lang="less">
  @import "./hotel.less";
</style>
<template>
  <yd-pullrefresh class="hotel" :callback="init" ref="pullHotelList">
    <yd-navbar class="hotel_title" title="酒店预订">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-infinitescroll :callback="loadList" ref="crollHotelList">
      <yd-list slot="list" theme="4" class="hotel_list">
        <yd-list-item v-for="(item, key) in hotel" :key="key" :href="'/hotel/info/' + item.id">
          <img slot="img" :src="item.image">
          <yd-list-other slot="other">
            <div>
              <ul>
                <li><span slot="title" class="left_head">{{item.name}}</span></li>
                <li>
                  <div class="hotel_location">
                    <yd-icon name="location" size="0.3rem"></yd-icon>
                    <span v-for="(attr1_item, key) in item.attributes" :key="key">
                  <span
                    v-for="(attr2_item, key) in attr1_item"
                    v-if="key=='attr_code' && attr2_item=='address'"
                    :key="key"
                  >
                    {{attr1_item.attr_value}}
                  </span>
                </span>
                  </div>
                </li>
                <li>
                  <span class="hotel_list_sale">{{item.sell_num}}+人消费</span>
                </li>
                <li>
                  <div class="hotel_target" v-for="(target, key) in item.tags" :key="key">{{target}}</div>
                </li>
              </ul>
            </div>
            <div class="hotel_list_price"><em>¥</em>&nbsp;{{item.price}}起</div>
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
  name: 'hotel',
  data () {
    return {
      count_page: 1,
      total_pages: 1,
      hotel: []
    };
  },
  methods: {
    init () {
      this.hotelList(1);
    },
    loadList () {
      this.count_page++;
      this.loadHotelList(this.count_page);
    },
    loadHotelList (page) {
      productList(page, {type: 'hotel', sell_status: 1}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.hotel = [...this.hotel, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollHotelList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollHotelList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    hotelList (page) {
      productList(page, {type: 'hotel', sell_status: 1}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.hotel = data;
        this.$refs.crollHotelList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullHotelList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollHotelList.$emit('ydui.infinitescroll.loadedDone');
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

<style scoped>

</style>
