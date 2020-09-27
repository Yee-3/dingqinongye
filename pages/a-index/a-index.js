// pages/a-index/a-index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIndex: 1,
    content:{},
    width:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        let windowWidth = (res.windowWidth * (750 / res.windowWidth));
       that.setData({
         width:(windowWidth-694)/2+'rpx'
       })
    }})
    app.http({
      url: '/oauth/index-growers-info',
      dengl: false,
      data: {},
      method: 'POST',
      success(res) {
        if(res.data.data.newsHotList){
          var arr=res.data.data.newsHotList
          arr.map(function(val,i){
            val.createTime=val.createTime.substring(0,10)
          })
        }
        that.setData({
          content:res.data.data
        })
      }
    })
    
  },
  // 热门农资切换
  titleFocus(e) {
    this.setData({
      titleIndex: e.currentTarget.dataset.index
    })
  },
  // 搜索页
  focusIn(){
    wx.navigateTo({
      url: '../one-h-sousuo/one-h-sousuo',
    })
  },
  // 更多
  moreIn(){
    wx.reLaunch({
      url: '../k-zixun/k-zixun',
    })
  },
  // 发布需求
  release(){
    wx.navigateTo({
      url: '../b-fabuxuqiu/b-fabuxuqiu',
    })
  },
  // 优质供销社
  gxsIn(){
    wx.navigateTo({
      url: '../d-gongxiaoshelb/d-gongxiaoshelb',
    })
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
    wx.hideHomeButton({
      success: function () {},
      fail: function () {},
      complete: function () {},
    });
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