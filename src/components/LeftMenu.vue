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
            <!-- <i class='el-icon-location'></i> -->
            <span>{{item.name}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-if="item.children && item.children.length">
            <template v-for="(sonItem, sonIndex) in item.children">
              <!-- 有三级菜单 -->
              <el-submenu
                v-if="sonItem.children && sonItem.children.length"
                class="second-level-title"
                :key="sonIndex"
                :index="sonItem.name">
                <span slot="title">{{sonItem.name}}</span>
                <template v-for="(sonSonItem, sonSonIndex) in sonItem.children">
                  <el-menu-item
                    :index='`${item.path}/${sonItem.path}/${sonSonItem.path}`'
                    :key="sonSonIndex">{{sonSonItem.name}}</el-menu-item>
                </template>
              </el-submenu>
              <!-- 没有三级菜单 -->
              <el-menu-item
                v-else
                :key="sonIndex"
                :index='`${item.path}/${sonItem.path}`'>{{sonItem.name}}</el-menu-item>
            </template>
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
    padding-left: 30px !important;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-submenu__title {
    padding: 0 0 0 10px !important;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
  }
  .second-level-title {
    padding-left: 20px;
  }
</style>
