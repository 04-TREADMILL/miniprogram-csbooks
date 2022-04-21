Page({
  data: {
    showList: [true, false, false],
  },

  changeTabs(e) {
    const { currentIndex } = e.detail;
    console.log(currentIndex);
    const { showList } = this.data;

    showList.forEach((_, i, arr) => {
      i == currentIndex ? (arr[i] = true) : (arr[i] = false);
    });

    console.log(showList);

    this.setData({
      showList,
    });
  },

  add() {
    wx.cloud.callContainer({
      config: {
        env: "prod-8gt4mz04386985ef",
      },
      path: "/api/count",
      header: {
        "X-WX-SERVICE": "golang-6i3q",
      },
      method: "POST",
      data: {
        action: "inc",
      },
    });
  },

  clear() {
    wx.cloud.callContainer({
      config: {
        env: "prod-8gt4mz04386985ef",
      },
      path: "/api/count",
      header: {
        "X-WX-SERVICE": "golang-6i3q",
      },
      method: "POST",
      data: {
        action: "clear",
      },
    });
  },
});
