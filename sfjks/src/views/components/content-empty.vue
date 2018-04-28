<template>
  <div class="content_empty">
    <img class="empty_img" src="../../assets/images/empty.png" alt="暂无内容">
  </div>
</template>

<script>
export default {
  name: 'content-empty'
};
</script>

<style scoped>
  .content_empty {
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }
  .content_empty > .empty_img {
    height: 3.5rem;
    display: inline-block;
    vertical-align: middle;
  }
</style>
