<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
</style>
