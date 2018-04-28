<style scoped lang="less">
  @import "./ticket.less";
</style>

<template>
  <yd-pullrefresh class="ticket" :callback="init" ref="pullTicketList">
    <yd-navbar class="ticket_title" title="门票">
      <div @click="$router.back()" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
      <yd-flexbox direction="vertical" class="ticket_list">
        <yd-infinitescroll :callback="loadList" ref="crollTicketList">
          <yd-flexbox-item slot="list" class="ticket_list_item" v-for="(item, key) in ticket" :key="key">
            <router-link :to="'/ticket/info/' + item.id">
              <img class="ticket_list_item_img" :src="item.images[0].img_src" :alt="item.name"/>
              <hr class="ticket_list_item_hr"/>
              <div class="ticket_list_item_info">
                <div class="ticket_list_item_info_desc">
                  <div class="ticket_list_item_info_desc_title">{{item.name}}</div>
                  <div class="ticket_list_item_info_desc_address">
                    <yd-icon size="0.25rem" color="#36CB9A" name="location"></yd-icon>
                    <span>{{item.address}}</span>
                  </div>
                </div>
                <div class="ticket_list_item_info_price">
                  <span><em>¥</em>{{item.price}}起</span>
                </div>
              </div>
            </router-link>
          </yd-flexbox-item>
          <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
        </yd-infinitescroll>
      </yd-flexbox>
  </yd-pullrefresh>
</template>

<script>
import { productList } from '../../ifucloud/sdk';
export default {
  name: 'ticket',
  data () {
    return {
      count_page: 1,
      total_pages: 1,
      ticket: []
    };
  },
  methods: {
    init () {
      this.getTicketListData(1);
    },
    loadList () {
      this.count_page++;
      this.loadTicketListData(this.count_page);
    },
    loadTicketListData (page) {
      productList(page, {type: 'ticket', sell_status: 1}).then(res => {
        let { data, meta } = res;
        let tickets = [];
        data.forEach((ticket) => {
          let attributes = ticket.attributes;
          let address = '';
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' &&
              attr.attr_code === 'address') {
              address = attr.attr_value;
            }
          });
          tickets.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            images: ticket.images,
            address: address
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.ticket = tickets;
        if (this.count_page >= this.total_pages) {
          this.$refs.crollTicketList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollTicketList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    getTicketListData (page) {
      productList(page, {type: 'ticket', sell_status: 1}).then(res => {
        let { data, meta } = res;
        let tickets = [];
        data.forEach((ticket) => {
          let attributes = ticket.attributes;
          let address = '';
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' &&
              attr.attr_code === 'address') {
              address = attr.attr_value;
            }
          });
          tickets.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            images: ticket.images,
            address: address
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.ticket = tickets;
        this.$refs.crollTicketList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullTicketList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollTicketList.$emit('ydui.infinitescroll.loadedDone');
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
