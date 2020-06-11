<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-09 13:22:58
 * @LastEditTime: 2020-06-11 17:09:09
--> 

<template>
  <div class='left-menu-cont'>
    <el-menu
      :default-openeds='defaultOpeneds'
      :default-active='activeMenu'
      active-text-color='#00c58e'
      background-color='#ffffff'
      text-color='#304455'
      @close='handleClose'
      @open='handleOpen'
      router>
      <template v-for='(item, index) in routeList'>
        <!-- 一级菜单 -->
        <el-submenu
          v-if='item.name && item.children && item.children.length'
          :key='index'
          :index='item.name'>
          <template slot='title'>
            <i class='el-icon-location'></i>
            <span>{{item.name}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for='(sonItem, sonIndex) in item.children'>
            <el-menu-item-group :key='sonIndex'>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item
                :index='`${item.path}/${sonItem.path}`'>{{sonItem.name}}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    routeList: Array,
    defaultOpeneds: Array,
    activeMenu: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    }
  },
  created() {},
  methods: {
  
    handleOpen() {},
    handleClose() {},
  },
}
</script>

<style lang='scss'>
  .left-menu-cont {
    width: 250px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    border-right: 1px solid #eaecef;
    .el-menu {
      height: 100%;
      border: none;
    }
    // 超出内容显示三个点 ...
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      overflow:hidden;
      text-overflow: ellipsis;
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
  }
</style>