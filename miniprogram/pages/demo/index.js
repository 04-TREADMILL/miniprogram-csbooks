// pages/demo/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [1, 2, 3],
    obj: {
      a: 1,
      b: 2,
    },
    num: 114514,
    imgUrls: [
      "https://vgalaxies.github.io/img/cover/82542746_p0.jpg",
      "https://vgalaxies.github.io/img/cover/84349038_p0.png",
    ],
    html: "<div>hello</div>",
    radio: [
      { id: 1, value: "arch linux", name: "foo" },
      { id: 2, value: "ubuntu", name: "bar" },
    ],
    display: "",
    items: [
      {
        id: 0,
        name: "main",
        isActive: true,
      },
      {
        id: 1,
        name: "foo",
        isActive: false,
      },
      {
        id: 2,
        name: "bar",
        isActive: false,
      },
    ],
  },

  numHandler(e) {
    console.log(e.detail.value);
    this.setData({
      num: e.detail.value,
    });
  },

  btnHandler(e) {
    console.log(e.currentTarget.dataset);
    const data = e.currentTarget.dataset.op;
    console.log(data);
    this.setData({
      num: parseInt(this.data.num) + parseInt(data),
    });
  },

  radioHandler(e) {
    console.log(e.detail.value);
    let display = e.detail.value;
    this.setData({
      display,
    });
  },

  itemHandler(e) {
    console.log(e);
    const { index } = e.detail;
    console.log(index);

    const { items } = this.data;

    items.forEach((v, i) => {
      i == index ? (v.isActive = true) : (v.isActive = false);
    });

    this.setData({
      items,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
