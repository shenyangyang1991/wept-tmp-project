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