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
