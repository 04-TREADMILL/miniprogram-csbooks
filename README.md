# 微信小程序 计算机书籍简介及推荐



## 基础

https://www.bilibili.com/video/BV1nE41117BQ



## TFM

https://developers.weixin.qq.com/miniprogram/dev/framework/

https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html



## 组件库

### lin-ui

https://github.com/TaleLin/lin-ui

调试基础库 `2.23.4`

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

- GORM

https://gorm.io/zh_CN/docs/

https://www.bilibili.com/video/BV1E64y1472a



### note

[Limitations of the GET method in HTTP - Dropbox](https://dropbox.tech/developers/limitations-of-the-get-method-in-http)



### 声明模型

```go
// 书籍模型
type BookModel struct {
	Id          int32
	Name        string `gorm:"unique"`
	CategoryId  int32
	Author      string
	Description string
	ImageLink   string
}

// 书籍分类模型
type CategoryModel struct {
	Id   int32
	Name string
}
```

图片资源存放在微信云托管对象存储

使用 ID 命名

默认尺寸为 `1000x1500`

```
$ convert -resize 1000x1500\! xxx.pdf\[0\] xxx.png
```



### API 约定

参考 https://github.com/VGalaxies/wxcloudrun-golang#readme



### 前端调用参考

```js
  get() {
    wx.cloud
      .callContainer({
        config: {
          env: "prod-8gt4mz04386985ef",
        },
        path: "/api/count",
        header: {
          "X-WX-SERVICE": "golang-6i3q",
        },
        method: "GET",
        data: {},
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
```
