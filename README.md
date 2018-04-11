# 公共小程序模版说明书

## package.json 文件说明
``` json
  "wepy": { // 在文件定义 aliasFields
    "module-a": false // false 代表 {}
    "module-b": "./src/config.js" // 库的路径
  },
```

## wepy.config.js 文件说明

``` js
const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {},
  resolve: {
    alias: { // 定义全局别名，引入全局公共组件或者第三方库
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy'], // 定义模块的别名，引入相关模块的库
    modules: ['node_modules']
  },
  compilers: { // 编译主要使用less, babel
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'] // 不使用promise的小程序API
  }
}

if (prod) {
  module.exports.plugins = {
    uglifyjs: { // 压缩js
      filter: /\.js$/,
      config: {}
    },
    imagemin: { // 压缩图片
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    autoprefixer: { // css 自动添加前缀
      filter: /\.(less)$/,
      config: { // 兼容的浏览器版本
        browsers: ['last 7 iOS versions, last 6 Android versions']
      }
    }
  }
}

```

## project.config.json 文件说明

``` json
{ // 配置小程序开发工具的功能
	"description": "template for a wepy.", // 设置项目的描述信息
	"setting": { // 小程序开发工具的设置
		"urlCheck": true, // 是否检测域名安全
		"es6": false, // 是否开启转译成es5
		"postcss": false, // 是否开启css自动补充前缀
		"minified": false, // 是否开启压缩
		"newFeature": true
	},
	"compileType": "miniprogram", // 小程序
	"appid": "touristappid", // 设置小程序的APPID
	"projectname": "tmp-project", // 项目的名称
	"miniprogramRoot": "./dist", // 小程序的代码路径
	"condition": {} // 自定义编译设置
}
 
```

## 项目目录结构

```
├── dist                   小程序运行代码目录（该目录由WePY的build指令自动编译生成，请不要直接修改该目录下的文件）
├── node_modules           
├── src                    代码编写的目录（该目录为使用WePY后的开发目录）
|   ├── assets             项目静态资源 （image, style...）
|   |   ├── image
|   |   ├── font
|   |   └── style
|   ├── service            业务数据
|   ├── mixins             wepy混合目录
|   ├── store              wepy&redux 代码目录
|   ├── components         WePY组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
|   |   ├── com_a.wpy      可复用的WePY组件a
|   |   └── com_b.wpy      可复用的WePY组件b
|   ├── pages              WePY页面目录（属于完整页面）
|   |   ├── index.wpy      index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
|   |   └── other.wpy      other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
|   └── app.wpy            小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
└── package.json           项目的package配置

```

## 小程序的配置信息

``` js
export const window = {
  navigationBarBackgroundColor: '#000000', // 导航栏背景颜色，如"#000000"
  navigationBarTextStyle: 'black', // 导航栏标题颜色，仅支持 black/white
  navigationBarTitleText: '小程序', // 导航栏标题文字内容
  backgroundColor: '#ffffff', // 窗口的背景色
  backgroundTextStyle: 'dark', // 下拉 loading 的样式，仅支持 dark/light
  enablePullDownRefresh: false, // 是否开启下拉刷新
  onReachBottomDistance: 50 // 页面上拉触底事件触发时距页面底部距离，单位为px
}

export const tabBar = {
  color: '', // tab 上的文字默认颜色
  selectedColor: '', // tab 上的文字选中时的颜色
  backgroundColor: '', // tab 的背景色
  borderStyle: '', // tabbar上边框的颜色， 仅支持 black/white
  position: '', // 可选值 bottom、top
  list: [
    // tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
    {
      pagePath: '', // 页面路径，必须在 pages 中先定义
      text: '', // tab 上按钮文字
      iconPath: '', // 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
      selectedIconPath: '' // 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
    }
  ]
}

export const networkTimeout = {
  request: 60000, // wx.request的超时时间，单位毫秒，默认为：60000
  connectSocket: 60000, // wx.connectSocket的超时时间，单位毫秒，默认为：60000
  uploadFile: 60000, // wx.uploadFile的超时时间，单位毫秒，默认为：60000
  downloadFile: 60000 // wx.downloadFile的超时时间，单位毫秒，默认为：60000
}

// 可以在开发者工具中开启 debug 模式，
// 在开发者工具的控制台面板，调试信息以 info 的形式给出，
// 其信息有Page的注册，页面路由，数据更新，事件触发 。 
// 可以帮助开发者快速定位一些常见的问题。
export const debug = false
```

## app.wpy
``` wepy
<style lang="less"></style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'

import { setStore } from 'wepy-redux'
import configStore from './store'

const store = configStore()
setStore(store)

export default class extends wepy.app {
  config = {
    pages: ['pages/index']
  }

  constructor() {
    super()
    this.use('requestfix')
    this.use('promisify')
  }
  /**
   * 前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；
   * 当再次进入微信或再次打开小程序，又会从后台进入前台。
   * 需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
   */
  // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch(options) { }

  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow(options) { }

  // 当小程序从前台进入后台，会触发 onHide
  onHide() { }

  // 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError(msg) { }

  // 当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
  onPageNotFound(e) { }
}
</script>

```

## index.wpy

``` wepy
<template>
  <view></view>
</template>

<script>
import wepy from 'wepy'
import { connect } from 'wepy-redux'

@connect({})

export default class Index extends wepy.page {
  config = {}
  components = {}

  data = {}

  methods = {}

  props = {}

  events = {}

  // 生命周期函数--监听页面加载
  onLoad(options) { }

  // 生命周期函数--监听页面初次渲染完成
  onReady() { }

  // 生命周期函数--监听页面显示
  onShow() { }

  // 生命周期函数--监听页面隐藏
  onHide() { }

  // 生命周期函数--监听页面卸载
  onUnload() { }

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() { }

  // 页面上拉触底事件的处理函数
  onReachBottom() { }

  // 用户点击右上角转发
  onShareAppMessage() { }

  // 页面滚动触发事件的处理函数
  onPageScroll() { }

  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap(item) { }
}
</script>

```
