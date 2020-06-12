<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-05 17:37:50
 * @LastEditTime: 2020-06-12 18:03:07
--> 

<template>
  <div class='home-cont'>
    <div class="title-style">欢迎来到kaka的主页~</div>
    <div class="wrapper">
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
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
    },
    computed: {},
    methods: {
    
    },
    created() {
      
    }
  }
</script>

<style lang='scss' scoped>
  .title-style {
    font-size: 20px;
  }
  .wrapper div {
    height: 50px;
  }
  .box1 {
    width: 300px;
    background-color: coral;
  }
  .box2 {
    width: 600px;
    background-color: skyblue;
  }
  .box3 {
    width: 1150px;
    background-color: palegreen;
  }
</style>