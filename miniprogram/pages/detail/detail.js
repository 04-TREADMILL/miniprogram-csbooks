// pages/detail/detail.js
const app = getApp()
//原util，时间格式化函数
function formatNumber(n) {//
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = (date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
      title: "",
      content: "",
      Img:"",
      goods_id: 0,
      book_id: "",
      inputValue: null,
      _nickname: "",
      _openid:"",
      talks: [],
      talk: "",

  },

   /**
   * 点击收藏按钮
   * 1. 判断该商品是否存在于缓存数组中
   * 2. 已经存在  把该商品删除
   * 3. 没有存在  把该商品添加到收藏数组中  存入缓存中即可。
   */
  handleCollect() {

    
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

    // var openId = wx.getStorageSync("openid");
    // wx.cloud
    // .callContainer({
    //   config: {
    //     env: "prod-8gt4mz04386985ef",
    //   },
    //   path: "/api/loginGet",
    //   header: {
    //     "X-WX-SERVICE": "golang-6i3q",
    //   },
    //   method: "POST",
    //   data: {
    //     openid: openId,
    //   },
    // }).then(resp => {
    //   console.log(resp.data)
    // }).catch(e => {
    //   console.log(e)
    //   return
    // })
 


      this.setData({
          title: options.title,
          content: options.con,
          Img: options.img,
          book_id: options.id
      })
      wx.setNavigationBarTitle({
          title: this.data.title         //页面标题为路由参数
      })



      var oooo  = wx.getStorageSync("openid")
      var userinfo =  wx.getStorageSync("userinfo")
      var TIME = formatTime(new Date());
      this.setData({
        date: TIME,
      });
      var that = this;
      that.setData({//获取用户信息
        nickName:userinfo.nickName,
        avatarUrl:userinfo.avatarUrl,
        _openid: oooo
      })
      console.log(this.data);

    //留言显示，按照留言顺序，最新的在最上面

      wx.cloud
        .callContainer({
          config: {
            env: "prod-8gt4mz04386985ef",
          },
          path: "/api/commentGet",
          header: {
            "X-WX-SERVICE": "golang-6i3q",
          },
          method: "POST",
          data: {
            action: "book",
            hint: this.data.book_id
          },
        })
        .then((resp) => {
          console.log("获取评论")
          console.log(resp.data.data[0].Comment);
          var arr =resp.data.data;

          for(let i = arr.length - 1,j = 0 ; i>=0 ;i--,j++){
            console.log("Comment")
            console.log(arr[j])
            var talks = "talks[" + j + "]";
            this.setData({
              [talks]: arr[i],
            })
          }
          console.log(this.data.talks);

        })
        .catch((e) => {
          console.log(e);
        });
   

 


  },
  talkInput: function (e) {
  
  var that= this;
   that.setData({
      talk: e.detail.value
    });
  },
  submit: function (e) {//这个是评论上传函数，是需要点击事件触发的
    var that = this
    if (this.data.talk) {  //talk不为空的时候
      const db = wx.cloud.database()
      if(!that.data.avatarUrl){//判断是否获取到用户信息
        wx.showToast({
          title: '请先获取用户信息！',
          icon: "none"
        })
    wx.getUserProfile({//获得微信用户信息
      desc: '用于完善资料',
      success: function (res) {
        app.globalData.nickName = res.userInfo.nickName;
        app.globalData.avatarUrl = res.userInfo.avatarUrl;
}
     })
     that.setData({//获取用户信息
      nickName:app.globalData.nickName,
      avatarUrl:app.globalData.avatarUrl
    })
    }else{

      wx.cloud
        .callContainer({
          config: {
            env: "prod-8gt4mz04386985ef",
          },
          path: "/api/commentSet",
          header: {
            "X-WX-SERVICE": "golang-6i3q",
          },
          method: "POST",
          data: {
            userid: this.data._openid,
            bookid: this.data.book_id,
            comment: this.data.talk
          },
        })
        .then((resp) => {
          console.log("写入评论")
          console.log(resp);

          wx.cloud
          .callContainer({
            config: {
              env: "prod-8gt4mz04386985ef",
            },
            path: "/api/commentGet",
            header: {
              "X-WX-SERVICE": "golang-6i3q",
            },
            method: "POST",
            data: {
              action: "book",
              hint: this.data.book_id
            },
          })
          .then((resp) => {
            console.log("更新评论")
            console.log(resp.data.data[0].Comment);
            var arr =resp.data.data;
  
            for(let i = arr.length - 1,j = 0 ; i>=0 ;i--,j++){
              console.log("Comment")
              console.log(arr[j])
              var talks = "talks[" + j + "]";
              this.setData({
                [talks]: arr[i],
              })
            }
            console.log(this.data.talks);
  
          })
          .catch((e) => {
            console.log(e);
          });
     


        })
        .catch((e) => {
          console.log(e);
        })
    }}
    else {// talk为0，输入框未输入数据
      wx.showModal({
        title: '提示',
        content: '评论不能为空',
        showCancel: false,
        confirmText: '我知道了',
      })
    }
  }

})