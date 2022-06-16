const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    wx.checkSession({
      success: res => {

        // assume success -> has userinfo and openid
        var userInfo
        var openid
        try {
          userInfo = wx.getStorageSync("userinfo")
          app.globalData.nickName = userInfo.nickName
          app.globalData.avatarUrl = userInfo.avatarUrl
          openid = wx.getStorageSync("openid")
          app.globalData.openid = openid
        } catch (e) {
          console.log(e)
          return
        }

        // set userInfo, hasUserInfo
        _this.setData({
          userInfo: userInfo,
          hasUserInfo: true,
        })
      },

      fail: res => {
        // set userInfo, hasUserInfo
        _this.setData({
          userInfo: {},
          hasUserInfo: false,
        })
      }
    })
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

  },


  login() {
    var _this = this
    wx.login({
      success: res => {
        console.log(res)

        // POST /api/loginInit
        if (res.code) {
          wx.cloud
            .callContainer({
              config: {
                env: "prod-8gt4mz04386985ef",
              },
              path: "/api/loginInit",
              header: {
                "X-WX-SERVICE": "golang-6i3q",
              },
              method: "POST",
              data: {
                code: res.code
              },
            }).then(resp => {
              console.log(resp)

              if (resp.data.code == 0) {
                // store openid
                try {
                  wx.setStorageSync("openid", resp.data.data)
                  app.globalData.openid = resp.data.data;
                } catch (e) {
                  console.log(e)
                  return
                }

                // get userInfo
                wx.showModal({
                  title: '温馨提示',
                  content: '亲，授权微信登录后才能正常使用小程序功能',
                  success: res => {
                    if (res.confirm) {
                      wx.getUserProfile({
                        desc: '获取你的昵称、头像、地区及性别',
                        success: res => {
                          console.log(res)

                          _this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true,
                          })

                          // store userInfo
                          try {
                            wx.setStorageSync("userinfo", res.userInfo)
                            app.globalData.nickName = res.userInfo.nickName;
                            app.globalData.avatarUrl = res.userInfo.avatarUrl;
                          } catch (e) {
                            console.log(e)
                            return
                          }

                          // POST /api/loginSet
                          wx.cloud
                            .callContainer({
                              config: {
                                env: "prod-8gt4mz04386985ef",
                              },
                              path: "/api/loginSet",
                              header: {
                                "X-WX-SERVICE": "golang-6i3q",
                              },
                              method: "POST",
                              data: {
                                openid: app.globalData.openid,
                                nickname: app.globalData.nickName,
                                avatar: app.globalData.avatarUrl
                              },
                            }).then(resp => {
                              console.log(resp)

                              if (resp.data.code != 0) {
                                console.log(resp.data.errorMsg)
                                return
                              } else {
                                _this.setData({
                                  hasUserInfo: true
                                })
                              }
                            }).catch(e => {
                              console.log(e)
                              return
                            })

                        },
                        fail: res => {
                          console.log(res)
                          wx.showToast({
                            title: '🤨',
                            icon: 'error',
                            duration: 2000
                          })
                        }
                      })
                    } else if (res.cancel) {
                      wx.showToast({
                        title: '🤨',
                        icon: 'error',
                        duration: 2000
                      })
                    }
                  },
                  fail: res => {
                    _this.setData({
                      hasUserInfo: false,
                    })
                  }
                })
              } else {
                console.log(resp.data.errorMsg)
              }
            }).catch(e => {
              console.log(e)
            })
        } else {
          console.log(res.errMsg)
        }
      },

      fail: res => {
        console.log(res)
      }
    })
  },

  click_comment() {
    wx.navigateTo({
      url: '/pages/me/comment',
    })
  },

  click_about() {
    wx.navigateTo({
      url: '/pages/me/about',
    })
  },

  click_subscribed() {
    wx.navigateTo({
      url: '/pages/me/subscribed',
    })
  }
})