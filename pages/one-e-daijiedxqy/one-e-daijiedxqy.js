// pages/one-e-daijiedxqy/one-e-daijiedxqy.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: 'display:none',
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    } 
    app.http({
      url: '/user/get-demand-detail'
    })
  },

  tanchuang: function () {
    this.setData({
      style: 'display:block'
    })
  },

  quxiao: function () {
    this.setData({
      style: 'display:none'
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