const commonParams = {
  reuseExistingChunk: true,
  enforce: true
}

const splitChunksOptions = {
  chunks: 'all',
  cacheGroups: {
    vendors: {
      name: 'chunk-vendors',
      test: /[\\/]node_modules/,
      ...commonParams
    },
    elementUI: {
      name: 'chunk-elementui',
      test: /[\\/]node_modules[\\/]element-ui/,
      ...commonParams
    },
    corejs: {
      name: 'chunk-corejs',
      test: /[\\/]node_modules[\\/]core-js/,
      // priority: 8,
      ...commonParams
    },
    dayjs: {
      name: 'chunk-dayjs',
      test: /[\\/]node_modules[\\/]dayjs/,
      // priority: 8,
      ...commonParams
    },
    kada: {
      name: 'chunk-kada',
      test: /[\\/]node_modules[\\/]@kada/,
      // priority: 8,
      ...commonParams
    },
    vueTreeselect: {
      name: 'chunk-vue-treeselect',
      test: /[\\/]node_modules[\\/]@riophae[\\/]vue-treeselect/,
      // priority: 8,
      ...commonParams
    },
    jsencrypt: {
      name: 'chunk-jsencrypt',
      test: /[\\/]node_modules[\\/]jsencrypt/,
      // priority: 8,
      ...commonParams
    },
    iconSvg: {
      name: 'icons-chunk-svg',
      test: /[\\/]src[\\/]icons[\\/]/,
      ...commonParams
    },
    // contentManagement
    contentManagement: {
      name: 'contentManagement-chunk',
      test: /[\\/]src[\\/]views[\\/]contentManagement/,
      ...commonParams
    },
    interactionCourse: {
      name: 'contentManagement-chunk-interactionCourse',
      test: /[\\/]src[\\/]views[\\/]contentManagement[\\/]interactionCourse/,
      ...commonParams
    },
    classManage: {
      name: 'contentManagement-chunk-classManage',
      test: /[\\/]src[\\/]views[\\/]contentManagement[\\/]interactionCourse[\\/]classManage/,
      ...commonParams
    },
    course: {
      name: 'contentManagement-chunk-course',
      test: /[\\/]src[\\/]views[\\/]contentManagement[\\/]course/,
      ...commonParams
    },
    // appOperation
    appOperation: {
      name: 'appOperation-chunk',
      test: /[\\/]src[\\/]views[\\/]appOperation/,
      ...commonParams
    },
    componentConfiguration: {
      name: 'appOperation-chunk-componentConfiguration',
      test: /[\\/]src[\\/]views[\\/]appOperation[\\/]componentConfiguration/,
      ...commonParams
    },
    operationResource: {
      name: 'appOperation-chunk-operationResource',
      test: /[\\/]src[\\/]views[\\/]appOperation[\\/]operationResource/,
      ...commonParams
    },
    // system
    system: {
      name: 'views-chunk-system',
      test: /[\\/]src[\\/]views[\\/]system/,
      ...commonParams
    },
    // statistics
    statistics: {
      name: 'views-chunk-statistics',
      test: /[\\/]src[\\/]views[\\/]statistics/,
      ...commonParams
    }
  }
}

const cdnOptions = {
  externals: {
    vue: 'Vue',
    // vuex: 'Vuex',
    // 'vue-router': 'VueRouter',
    'element-ui': '/^(lement)$/i',
    echarts: 'echarts',
    lamejs: 'lamejs',
    'mavon-editor': 'MavonEditor'
  },
  css: [
    'https://cdn.hhdd.com/frontend/as/w/72785263-3368-519c-9f7b-fe3c015bb934.css' // element-ui@2.4.6.theme-chalk/index.css.css
  ],
  js: [
    'https://cdn.hhdd.com/frontend/as/w/65e0c79f-0d64-58a9-bd63-37e1a989e042.js', // vue@2.6.11 必须要先引入vue，否则element会报错
    'https://cdn.hhdd.com/frontend/as/w/8291b934-a03e-5ccf-99e4-a515aeaa3bb8.js', // element-ui@2.4.6.js
    'https://cdn.hhdd.com/frontend/as/w/dffefb87-af7c-58e0-970f-ef620dd30ec4.js', // echarts@4.1.0
    'https://cdn.hhdd.com/frontend/as/w/29473ef0-c345-5af3-a973-c8e3fd67bccf.js', // lamejs@1.2.0
    'https://cdn.hhdd.com/frontend/as/w/c034508c-0cd6-5653-8aa1-83426f6a2808.js' // mavon-editor@2.9.0
  ]
}

module.exports = { splitChunksOptions, cdnOptions }
