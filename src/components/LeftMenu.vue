<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-09 13:22:58
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

<style lang="scss">
  .left-menu-cont {
    width: 250px;
    min-width: 250px;
    height: 100%;
    overflow: auto;
  }
  .el-menu {
    height: 100%;
  }
  .el-submenu .el-menu-item {
    width: 215px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    overflow:hidden;
    text-overflow: ellipsis;
    padding-right: 0 !important;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-submenu__title {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
</style>
