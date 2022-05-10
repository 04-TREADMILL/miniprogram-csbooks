// pages/Test/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      num: 0,
      Length_of_cate: 0,
      Categories:[],// ID + CategoryID
      types: [],
      Content: [],// ID + Name + Description + Author
      Lists:[],
      //All details
    },
  
  changeList: function(e){
    var n = e.currentTarget.dataset.index;
    this.setData({
      num: n,
      types: this.data.Content[n]
    })
  },
  
  readBook: function(e){
    var bookName = e.currentTarget.dataset.bookName,
        bookDesc = e.currentTarget.dataset.bookContent;
        wx.navigateTo({
          url:"../detail/detail?title=" + bookName + '&con=' + bookDesc
        });
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
  
    onLoad(options) {

      wx.cloud
      .callContainer({
        config: {
          env: "prod-8gt4mz04386985ef",
        },
        path: "/api/category",
        header: {
          "X-WX-SERVICE": "golang-6i3q",
        },
        method: "POST",
        data: {
          action: "all",
          hint: "",
        },
      })
      .then((resp) => {
        var t = resp.data.data;
        this.setData({
          Length_of_cate: t.length,
          Categories: t
        });
      })
      .catch((e) => {
      });
  
      for(var p=0;p<12;p++) 
      {       
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
                  action: "category",
                  hint: ""+p
                },
              })
              .then((resp) => {
                var Datas = resp.data.data;
                var temp  = this.data.Lists;
                temp.push(Datas);
                this.setData({Lists:temp})
                
                var Con = this.data.Content;
                Con.push(Datas);
                this.setData({
                  Content: Con
                })
                // console.log(Con);          
              })
              .catch((e) => {
                console.log(e);
              });
      }
              // console.log("this.data");
              // console.log(this.data);
        
          console.log(this.data);
  },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.setData({
            types: this.data.Content[0]
          });
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
  
    }
  })