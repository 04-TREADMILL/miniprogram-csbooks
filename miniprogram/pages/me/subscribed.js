// pages/me/subscribed.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:[],
    books:[],
    _openid:"",
  },


  readBook: function(e){
    // console.log(e.currentTarget.dataset);
    var bookname = e.currentTarget.dataset.bookname;
    var bookdesc = e.currentTarget.dataset.bookcontent;
    var bookimg  = e.currentTarget.dataset.bookimg;
    var bookid   = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url:"../detail/detail?title=" + bookname + '&con=' + bookdesc +'&img=' + bookimg + '&id=' + bookid
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var oooo  = wx.getStorageSync("openid")
    that.setData({//获取用户信息
      _openid: oooo
    })
    wx.cloud
        .callContainer({
          config: {
            env: "prod-8gt4mz04386985ef",
          },
          path: "/api/collectionGet",
          header: {
            "X-WX-SERVICE": "golang-6i3q",
          },
          method: "POST",
          data: {
            action: "user",
            hint: this.data._openid
          },
        })
        .then((resp) => {
          this.setData({
            books : resp.data.data
          })
          for(let i = 0; i < this.data.books.length; i++){
            var id = String(this.data.books[i].BookId)
            console.log(id);
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
                    action: "id",
                    hint: id,
                    },
                })
                .then((resp)=>{
                  console.log(resp.data.data)
                    var Con = this.data.collection;
                    Con.push(resp.data.data);
                    this.setData({
                      collection : Con
                    })
                    console.log(this.data.collection);
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        })
        .catch((e) => {
          
          console.log(e);
        });

      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})