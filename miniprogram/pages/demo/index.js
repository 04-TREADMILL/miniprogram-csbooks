// pages/demo/index.js
Page({
  data: {
    showList: [true, false, false]
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
});