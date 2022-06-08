Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.checkSession({
      success: res => {

        // get userinfo
        var userInfo
        try {
          userInfo = wx.getStorageSync("userinfo")
        } catch (e) {
          console.log(e)
          return
        }

        //set userinfo
        this.setData({
          userInfo: userInfo,
          hasUserInfo: true
        })
      },
      fail: res => {
        this.setData({
          userInfo: {},
          hasUserInfo: false
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

  upload() {
    wx.checkSession({
      success: res => {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("valid")
        console.log(res)

        // get openid
        var openId
        try {
          openId = wx.getStorageSync("openid")
        } catch (e) {
          console.log(e)
          return
        }

        // get userinfo
        const {
          userInfo
        } = this.data.userInfo

        console.log(userInfo)

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
              openid: openId,
              nickname: userInfo.nickName,
              avatar: userInfo.avatarUrl
            },
          }).then(resp => {
            console.log(resp)
            if (resp.data.code != 0) {
              console.log(resp.data.errorMsg)
              return
            } else {
              this.setData({
                hasUserInfo: true
              })
            }
          }).catch(e => {
            console.log(e)
            return
          })
      },

      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        console.log("invalid")
        console.log(res)

        this.setData({
          userInfo: {},
          hasUserInfo: false,
          hasSessionKey: false
        })

        //to do
        return
      }
    })
  },

  login() {
    wx.login({
      success: res => {
        console.log(res)

        // POST /api/loginInit
        // get openid
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
                } catch (e) {
                  console.log(e)
                  return
                }

                // get userinfo
                // 提示用户上传
                wx.showModal({
                  title: '温馨提示',
                  content: '亲，授权微信登录后才能正常使用小程序功能',
                  success: res => {
                    if (res.confirm) {
                      wx.getUserProfile({
                        desc: '获取你的昵称、头像、地区及性别',
                        success: res => {
                          console.log(res)

                          //save userinfo
                          this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                          })

                          // save userinfo for onLoad
                          try {
                            wx.setStorageSync("userinfo", res.userInfo)
                          } catch (e) {
                            console.log(e)
                            return
                          }
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
})