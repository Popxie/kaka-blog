<template>
  <div id='app'>
    <div class='top-cont' :class="{'is-hide-top': !showTopTitle, 'is-show-top': showTopTitle}">
      <div class='top-left' @click="() => $router.push('/home')">
        KaKa's blog
      </div>
      <div class='top-right'>
        <el-button @click="fullViewClick">全屏</el-button>
      </div>
    </div>
    <div class='main-cont' :class="{'reset-height': !showTopTitle}">
      <left-memu
        :default-openeds='defaultOpeneds'
        :collapse="collapse"
        :route-list='routeList'
        :active-menu='activeMenu' />
      <div class='right-cont' ref="right-cont-ref">
        <el-button class="control-btn" @click="() => collapse = !collapse">{{ collapse ? '展开' : '折叠'}}</el-button>
        <router-view></router-view>
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
      showTopTitle: true
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
  created() {
    this.NODE_ENV = process.env.NODE_ENV
  },
  mounted () {
    console.log('dom:', this.$refs['test'])
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
    fullViewClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style lang='scss'>
.is-hide-top {
  margin-bottom: -56px;
  transform: translateY(-56px);
  transition: all 1s !important;
}
.is-show-top {
  transform: translateY(0);
  transition: all 1s !important;
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
    height: 36px;
    line-height: 36px;
    padding: 10px;
    border-bottom: 1px solid #eaecef;
    display: flex;
    justify-content: space-between;
    transition: opacity .5s;
    .top-left {
      font-size: 20px;
      font-weight: 800;
      &:hover {
        cursor: pointer;
        color: #42b983;
      }
    }
    .top-right {
      font-size: 14px;
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
        top: 0px;
        left: 20px;
        height: 40px;
      }
    }
  }
  .reset-height {
    height: 100%;
  }
}
</style>
