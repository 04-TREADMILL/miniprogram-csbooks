// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        SwiperList:[],
        QuiryBookName:["现代操作系统", "计算机图形学", "C和指针","Head First Java"],
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
    onLoad: function (options) {
        
        for(var count = 0; count < 4; count++){
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
                hint: this.data.QuiryBookName[count],
                },
            })
            .then((resp)=>{
                var Datas = resp.data.data;
                var Con = this.data.SwiperList;
                Con.push(Datas);
                this.setData({
                SwiperList: Con
                })
            })
            .catch((e) => {
                console.log(e);
            });
        }
        console.log(this.data.SwiperList);
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