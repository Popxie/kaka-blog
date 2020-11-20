<template>
  <div class='home-cont'>
    <div class="hello">hello world~🙊</div>
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
    },
  }
</script>

<style lang="scss" scoped>
  .home-cont {
    height: 100%;
    .hello {
      display: flex;
      align-items:center; // 垂直方向
      justify-content:center; // 水平方向
      font-size: 25px;
      font-weight: 900;
      height: 100%;
    }
  }
</style>
