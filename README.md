# 数据治理

## 项目结构

├─ public ------- 项目静态资源目录（与打包无关）   
├─ src ---------- 项目代码目录  
│   ├─ api -------------- 项目api目录，用来放与api相关的文件     
│   ├─ assets ----------- 项目静态资源目录  
│   │    └─ images ------------- 图片资源目录，用来存放图片  
│   ├─ assets ----------- 项目静态资源目录    
│   │     └─ images ------------ 图片资源目录，用来存放图片  
│   ├─ components ------- 公共组件库模块，只放全局使用的组件
│   ├─ router ----------- 路由模块，用来存放路由文件  
│   ├─ store  ----------- 状态管理模块，用来存放状态管理文件  
│   ├─ utils ------------ 工具类模块，用来存放工具类文件  
│   ├─ views ------------ 视图控制器模块，用来存放控制器文件  
│   │   └─ index --------------- 首页功能模块，用来存放与首页有关的文件，其他功能模块安装此规则创建  
│   ├─ App ---- 应用入口文件  
│   │   
│   └─ main.js ---------- 应用 初始化文件    
├─ babel.config.js ------ 配置文件，添加了vant的相关配置   
│    
└─ vue.config.js ------ webpacke打包的位置文件  
## Project setup  
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
