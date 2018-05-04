<template>
  <div class="notice" style="display:none;">
    <div class="notice_book">
      <img src="../../assets/images/icon_wukaostubiao.png" />
    </div>
    <p>你好，暂无考试，考试时间可以请看公告或者等到通知</p>
  </div>
</template>

<script>
export default {
  name: 'content-empty'
};
</script>

<style scoped>
.notice{
    width: 100%;
    height: 92%;
    background: #fff;
      &_book{
        width: 3.52rem;
        height: 2.13rem;
        margin: 1.28rem auto 0.53rem;
          img{
              width: 100%;
              display: block;
          }
      }
    p{
      width: 80%;
      line-height: 0.48rem;
      margin: 0 auto;
      font-size: 0.32rem;
      font-weight: bold;
      color: #666666;
    }
}
</style>
