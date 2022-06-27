# 微信小程序 计算机书籍简介及推荐

## 小组成员

杨昊锦 201250013 首页、收藏相关

丁宇辰 201250012 后台

凌毓辰 201250007 数据获取

胡睿 201250026 分类页和书籍具体页面 文档介绍

马宇森 201870024 我的相关

## 功能简介

1. 首页展示推荐书籍
2. 分类页面
3. 书籍介绍页面，登陆后可以评论与收藏
4. 我的页面，可以查看收藏和评论

### 首页

![](https://s2.loli.net/2022/06/26/umV4TNYDSijc7FG.jpg)

我们选取了几本经典的计算机书籍进行滑动展示

### 分类

![img](https://s2.loli.net/2022/06/26/EKvcVQ79pw2TS4Z.jpg)

对上百本计算机学科的书进行分类，方便查询

![img](https://s2.loli.net/2022/06/26/jNHXDc1tVvxyTer.jpg)

点击一本书，即可查看介绍和评论

### 我的

![img](https://s2.loli.net/2022/06/26/1jL9rnaD25m8RJp.jpg)

主要包括了登录，收藏和查看评论功能

以及开发者的介绍

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

## 后台

使用微信云托管

- 控制台

https://cloud.weixin.qq.com/cloudrun/console

- 代码

https://github.com/VGalaxies/wxcloudrun-golang

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
