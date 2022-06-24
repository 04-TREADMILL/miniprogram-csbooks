// pages/me/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: 0,
    comments: [],
    book_comments: [],
    length: 0,
    comment_temp: [],
    temp: ""
  },

  count(o) {
    var n = 0;
    for (var i in o) {
      n++;
    }
    return n;
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
          hint: "" + userID,
        },
      })
      .then((resp) => {
        var t = resp.data.data;
        console.log(t);
        this.setData({
          comments: t,
          length: t.length
        });
        //通过bookid获取书籍具体信息
        this.getbook_comments();
      })
      .catch((e) => {
      });


  },

  //通过bookid获取书籍具体信息
  getbook_comments() {
    console.log("Position 1");
    console.log("Position 2");
    console.log("length now is");
    console.log(this.length);
    for (var j = 0; j < this.length; j++) {
      console.log("Position 3");
      var BookId = this.comments[j].BookId;
      var Comment = this.comments[j].Comment;
      this.setData({
        temp: Comment
      })
      var ID = this.comments[j].ID;
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
            hint: BookId,
          },
        })
        .then((resp) => {
          console.log(resp);
          this.setData({
            comment_temp: resp.data.data,
          })
          var book_comment;
          book_comment = resp.data.data;
          book_comment.Comment = Comment;
          book_comment.ID = ID;
          book_comment.BookId = BookId;
          this.setData({
            book_comments: resp.data.data,
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    console.log("Position end");
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