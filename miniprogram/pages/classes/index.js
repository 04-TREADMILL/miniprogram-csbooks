
Page({

  /**
   * 页面的初始数据
   */
  data: {
      titles: [{
          name: '原理'
      }, {
          name: '网络'
      }, {
          name: '思维'
      }, {
          name: 'shit'
      }, {
          name: '数学'
      }, {
          name: 'CS'
      }, {
          name: 'EE'
      }, {
          name: 'AI'
      }, ],
      num: 0,
      lists: [
          [{
              name: '编译原理',
              summary: '快点来看我'
          }, {
              name: '书名',
              summary: '简介简介',
              content: 'shit'
          }, {
              name: '书名',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名',
              summary: '简介'
          }, {
              name: '书名',
              summary: '简介'
          }, {
              name: '书名',
              summary: '简介'
          }, {
              name: '书名',
              summary: '简介'
          }, {
              name: '书名',
              summary: '简介'
          }],
          [{
              name: '书名1',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名2',
              summary: '简介'
          }],
          [{
              name: '书名1',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名2',
              summary: '简介'
          }],
          [{
              name: '书名1',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名2',
              summary: '简介'
          }],
          [{
              name: '书名1',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名2',
              summary: '简介'
          }],
          [{
              name: '书名1',
              summary: '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介'
          }, {
              name: '书名2',
              summary: '简介'
          }]
      ],
      types: []
  },
  changeList: function(e) {
      var n = e.currentTarget.dataset.index
      this.setData({
          num: n,
          types: this.data.lists[n]
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  readBook: function(e) {
    var bookname = e.currentTarget.dataset.bookname,
        bookcontent = e.currentTarget.dataset.bookcontent;     //获取传递的值
        wx.navigateTo({
        url: "../detail/detail?title=" + bookname + '&con=' + bookcontent//传递参数

      });
},


  onLoad: function(options) {
      this.setData({
          types: this.data.lists[0]
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})