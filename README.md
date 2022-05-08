# 微信小程序 计算机书籍简介及推荐



## 基础

https://www.bilibili.com/video/BV1nE41117BQ



## TFM

https://developers.weixin.qq.com/miniprogram/dev/framework/

https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html



## 组件库

### lin-ui

https://github.com/TaleLin/lin-ui

使用**最新**的调试基础库

**在 miniprogram 文件夹下**

```
$ npm init -y
$ npm install lin-ui
```

然后在 IDE 中构建 npm



### ColorUI

http://docs.xzeu.com/#/



## 用例描述

### 主页

首页推送



### 分类

分类

搜索栏



### 我的

收藏

历史记录



### 后端

书籍数据

用户数据

评论系统



### 数据收集

https://dms.cloud.tencent.com/#/login

- 用户名 root
- 密码 XpPdc6rG



## 后台

使用微信云托管

- 控制台

https://cloud.weixin.qq.com/cloudrun/console

- 代码

https://github.com/VGalaxies/wxcloudrun-golang



### API 约定

参考 https://github.com/VGalaxies/wxcloudrun-golang#readme



### 前端调用参考

```js
getBook() {
wx.cloud
  .callContainer({
    config: {
      env: "prod-8gt4mz04386985ef",
    },
    path: "/api/book",
    header: {
      "X-WX-SERVICE": "golang-6i3q",
    },
    method: "POST",
    data: {
      action: "exact",
      hint: "深入理解计算机系统",
    },
  })
  .then((resp) => {
    console.log(resp);
  })
  .catch((e) => {
    console.log(e);
  });
}
```
