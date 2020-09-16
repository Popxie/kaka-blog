<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-05 17:37:50
--> 

<template>
  <div class='home-cont'>
    <h2>来自一个底层搬砖人员的日常笔记分享~</h2>
    <div class="img-cont">
      <img src="https://cdn.hhdd.com/frontend/as/i/552ef951-222e-5f01-bc08-ffb9a01bea48.gif" alt="">
      <img src="https://cdn.hhdd.com/frontend/as/i/cf44768b-9be0-5727-b69d-e238eb8ef6b6.jpg" alt="">
      <img src="https://cdn.hhdd.com/frontend/as/i/623baa05-15fa-5f97-8202-383e010b9c69.jpg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components:{},
    data() {
      return {
        NODE_ENV: '',
      }
    }
  }
</script>

<style lang="scss">
  .img-cont {
    position: absolute;
    width: 720px;
    height: 240px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    img {
      width: 240px;
      height: 240px;
    }
  }
</style>
