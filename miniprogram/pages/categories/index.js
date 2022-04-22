// pages/categories/index.js

Page({

  /**
   * 页面的初始数据
   */

  data: {
    //一级
    cateItems: [{
        cate_id: 1,
        cate_name: '计算机思维',
        //二级
        children: [{
            child_id: 1,
            name: '猜你喜欢',
            //三级
            son: [{
                son_id: 1,
                name: '数学之美',
                image: ''
              },
              {
                son_id: 2,
                name: '程序员的数学',
                image: ''
              },
              {
                son_id: 3,
                name: '编码',
                image: ''
              },
            ]
          },
          {
            child_id: 2,
            name: '猜你不喜欢',
            son: [{
                son_id: 1,
                name: 'balabla',
                image: ''
              },
              {
                son_id: 2,
                name: 'balabla1',
                image: ''
              },
              {
                son_id: 3,
                name: 'balabl2',
                image: ''
              },
            ]
          },
          {
            child_id: 3,
            name: '不知道喜不喜欢',
            son: [{
              son_id: 1,
              name: 'balabla2',
              image: ''
            }, ]
          },
        ]
      },
      {
        cate_id: 2,
        cate_name: '计算机基础',
        children: [{
            child_id: 1,
            name: '操作系统',
            son: [{
                son_id: 1,
                name: '操作系统',
                image: ''
              },
              {
                son_id: 2,
                name: 'CSAPP',
                image: ''
              },
              {
                son_id: 3,
                name: '自己动手写OS',
                image: ''
              },
              {
                son_id: 4,
                name: 'OS真象还原',
                image: ''
              },
            ]
          },
          {
            child_id: 2,
            name: '计算机网络',
            son: [{
                son_id: 1,
                name: '网络是怎么连接的',
                image: ''
              },
              {
                son_id: 2,
                name: '计算机网络',
                image: ''
              },
              {
                son_id: 3,
                name: '图解HTTP',
                image: ''
              },

            ]
          },
          {
            child_id: 3,
            name: '编译原理',
            son: [{
                son_id: 1,
                name: '编译器设计',
                image: ''
              },
              {
                son_id: 2,
                name: '编译原理',
                image: ''
              },
            ]
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: '编程语言学习'
      },
      {
        cate_id: 4,
        cate_name: 'class4'
      },
      {
        cate_id: 5,
        cate_name: 'class5'
      }
    ],
    curNav: 1,
    curIndex: 0,
  },

  switchRightTab: function (e) {
    let id = e.target.dataset.id,
      index = e.target.dataset.index;
    this.setData({
      curNav: id,
      curIndex: index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})