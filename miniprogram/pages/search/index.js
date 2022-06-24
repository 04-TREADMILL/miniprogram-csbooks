Page({

  /**
   * 页面的初始数据
   */
  data: {
    SearchList:[],
  },

  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      return;
    }
    this.queryRes(value);
  },

  queryRes(value){
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
          action: "fuzzy",
          hint: value,
          },
      })
      .then((resp)=>{
          this.setData({
            SearchList : resp.data.data
          })
      })
      .catch((e) => {
          console.log(e);
      });
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