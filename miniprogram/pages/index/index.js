Page({
  data: {
    showList: [true, false, false],
  },

  changeTabs(e) {
    const {
      currentIndex
    } = e.detail;
    console.log(currentIndex);
    const {
      showList
    } = this.data;

    showList.forEach((_, i, arr) => {
      i == currentIndex ? (arr[i] = true) : (arr[i] = false);
    });

    console.log(showList);

    this.setData({
      showList,
    });
  },

  getBook() {
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
          action: "exact",
          hint: "深入理解计算机系统",
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});