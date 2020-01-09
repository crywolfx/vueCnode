# vuecnode

> Vue实现cnode社区官方api提供的所有功能。



<br /> 

## 项目预览  

- 在线预览  [点我~](http://www.wxink.xyz/project/cnode)

- 截图预览  

 

![alt](http://orbmbw2o7.bkt.clouddn.com/image/blog//20170617/TUmnifjrFkSswrkp5Xwt.gif) 

  ![alt](http://orbmbw2o7.bkt.clouddn.com/image/blog//20170617/1Nt7bJhgeJExe0LrCj8l.gif)

![alt](http://orbmbw2o7.bkt.clouddn.com/image/blog//20170617/SOwmdrOUKeZFHCjQRYxa.gif)

![alt](http://orbmbw2o7.bkt.clouddn.com/image/blog//20170617/lxYjuRd9JlOOxozbtEvT.gif)

![alt](http://orbmbw2o7.bkt.clouddn.com/image/blog//20170617/J74pp1VABaMhpR_pIlWD.gif)

<br />  

## 技术栈  

- vue2.0

- vue-router

- vuex

- axios

- sass(其实就用了样式嵌套)     

<br />  

## 结构图
```
其实一开始没有设计好，应该组件和页面分开的
|-- src                              // 源码目录  
|   |-- api                          // 封装所有api链接
|   |-- assets                      
|       |-- css                      // 全局通用css
|       |-- js                       // 全局通用js
|       |-- svg                      // svg小图标  
|   |-- components                   // 公共组件 
|       |-- aside                    // 主页侧边栏
|       |-- about                    // 关于
|       |-- comment                  // 评论界面  
|       |-- content
|           |-- index.vue            // 主页
|           |-- listBlock.vue        // 主页列表块组件  
|       |-- footer                   // 底部导航栏公共组件  
|       |-- toast                    // toast组件  
|       |-- topic                    // 文章详情组件  
|       |--  user
|           |-- collect.vue          // 用户收藏
|           |-- header.vue           // 用户界面header组件
|           |-- login.vue            // 登录界面
|           |-- messgae.vue          // 消息界面
|           |-- personal.vue         // 用户详情主界面
|           |-- post.vue             // 用户发表文章界面
|           |-- replies.vue          // 用户评论界面
|           | -- topics.vue          // 用户发表文章和参与文章公共界面
|   |-- router                       // 路由
|   |-- store                        // vuex
|   |-- app.vue                      // 页面入口文件  
|   |-- main.js  
```      
<br />  

## 项目源码

- [cnode~如果你喜欢的话就点个star吧~~~](https://github.com/crywolfx/vueCnode)
<br />  
## Build Setup

``` bash

# install dependencies

npm install


# serve with hot reload at localhost:8080

npm run dev


# build for production with minification

npm run build


```

---------- 

<br />  

