<template>
  <div id='app'>
    <div class='top-cont'>
      <div
        :class="{'is-hide-top': !showTopTitle, 'is-show-top': showTopTitle}"
        class="info-cont">
        <div class='top-left' @click="() => $router.push('/home')">
          KaKa's blog
        </div>
      </div>
      <div class="titlte-cont">{{$route.name}}</div>
      <el-button class='full-screen-btn' type="text" @click="fullViewClick">{{ isFullScreeen ? `退出全屏` : `全屏`}}</el-button>
    </div>
    <div class='main-cont' :class="{'reset-height': !showTopTitle}">
      <left-memu
        :default-openeds='defaultOpeneds'
        :collapse="collapse"
        :route-list='routeList'
        :active-menu='activeMenu' />
      <div class='right-cont' ref="right-cont-ref">
        <el-button
          v-if="isShowBtn"
          class="control-btn"
          @click="() => collapse = !collapse">
          <i v-if="!collapse" class="el-icon-d-arrow-left"/>
          {{ collapse ? '展开' : '折叠' }}
          <i v-if="collapse" class="el-icon-d-arrow-right"/>
        </el-button>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'app',
  components: {
    'left-memu': () => import('components/LeftMenu')
  },
  data() {
    return {
      NODE_ENV: '',
      collapse: false,
      showTopTitle: true,
      isFullScreeen: false,
      isShowBtn: false
    }
  },
  computed: {
    activeMenu() {
      const fullPath = this.$route.fullPath
      return fullPath
    },
    routeList() {
      return this.$router.options.routes
    },
    defaultOpeneds() {
      const tempArr = []
      this.routeList.forEach(item => {
        if (item.name && item.children && item.children.length) {
          tempArr.push(item.name)
        }
      })
      return tempArr
    }
  },
  watch: {
    $route: function(route) {
      console.log('route.name: ', route.name);
      if (route.name === 'Home') return this.isShowBtn = false
      this.isShowBtn = true
    }
  },
  created() {
    this.NODE_ENV = process.env.NODE_ENV
  },
  mounted () {
    this.$refs['right-cont-ref'].addEventListener('scroll', this.pageScroll)
  },
  beforeDestroy () {
    this.$refs['right-cont-ref'].removeEventListener('scroll', this.pageScroll)
  },
  methods: {
    /**
     * 监听页面滚动事件
     */
    pageScroll () {
      const currentTop = this.$refs['right-cont-ref'].scrollTop || window.scrollY
      this.showTopTitle = currentTop < 100
    },
    async fullViewClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      await screenfull.toggle()
      this.isFullScreeen = screenfull.isFullscreen
    }
  }
}
</script>

<style lang='scss'>
.is-hide-top {
  margin-bottom: -56px;
  opacity: 0;
  transform: translateY(-56px);
  transition: all 1.2s !important;
}
.is-show-top {
  opacity: 1;
  transform: translateY(0);
  transition: all 1.2s !important;
}

html,
body {
  min-width: 800px;
  overflow: hidden;
  overflow-x: scroll;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
body {
  font-size: 14px;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .top-cont {
    height: 56px;
    padding: 0 10px;
    border-bottom: 1px solid #eaecef;
    overflow: hidden;
    position: relative;
    .info-cont {
      display: flex;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      .top-left {
        font-size: 20px;
        font-weight: 800;
        &:hover {
          cursor: pointer;
          color: #42b983;
        }
      }
    }
    .full-screen-btn {
      font-size: 14px;
      position: absolute;
      top: 8px;
      right: 10px;
    }
    .titlte-cont {
      height: 56px;
      line-height: 56px;
      font-size: 20px;
      font-weight: 800;
      text-align: center;
    }
  }
  .main-cont {
    display: flex;
    height: calc(100% - 56px - 1px);
    .right-cont {
      position: relative;
      width: 100%;
      padding: 20px;
      overflow: hidden;
      overflow-y: scroll;
      // background: #f4f5f5;
      .control-btn {
        position: sticky;
        top: 0;
        left: 0;
      }
    }
  }
  .reset-height {
    height: 100%;
  }
}
</style>
