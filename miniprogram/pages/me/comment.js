// pages/me/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: 0,
    book_comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取userid
    var userID = wx.getStorageSync('openid');
    console.log(userID);
    this.setData({
      userID: userID,
    });

    //通过userid获取评论信息
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
          action: "user",
          hint: ""+userID,
        },
      })
      .then((resp) => {
        var t = resp.data.data;
        console.log(t);
        this.setData({
          number_of_book_comments: t.length,
          book_comments: t
        });
      })
      .catch((e) => {
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
  onShow() {

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