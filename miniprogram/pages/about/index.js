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
      success(res) {
        console.log(res)
        if (res.code) {
          wx.cloud
            .callContainer({
              config: {
                env: "prod-8gt4mz04386985ef",
              },
              path: "/api/onLogin",
              header: {
                "X-WX-SERVICE": "golang-6i3q",
              },
              method: "POST",
              data: {
                code: res.code
              },
            })
            .then((resp) => {
              console.log(resp);

              try {
                wx.setStorageSync("3rd_session", resp.data.data);
              } catch (e) {
                console.log(e);
              }

              try {
                var value = wx.getStorageSync("3rd_session")
                if (value) {
                  console.log(value);
                }
              } catch (e) {
                console.log(e);
              }

              wx.showModal({
                title: '温馨提示',
                content: '亲，授权微信登录后才能正常使用小程序功能',
                success: (res) => {
                  console.log(res);
                  if (res.confirm) {
                    wx.getUserProfile({
                      desc: '获取你的昵称、头像、地区及性别',
                      success: res => {
                        console.log(res);
                        _this.setData({
                          userInfo: res.userInfo,
                          hasUserInfo: true
                        })
                      },
                      fail: res => {
                        console.log(res);
                        wx.showToast({
                          title: '🤨',
                          icon: 'error',
                          duration: 2000
                        });
                      }
                    })
                  } else if (res.cancel) {
                    wx.showToast({
                      title: '🤨',
                      icon: 'error',
                      duration: 2000
                    });
                  }
                }
              })
            })

            .catch((e) => {
              console.log(e);
            });
        } else {
          console.log('res.code fails: ' + res.errMsg)
        }
      },
      fail(res) {
        console.log('wx.login fails: ' + res);
      }
    })
  },
})