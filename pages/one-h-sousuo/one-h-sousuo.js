// pages/one-h-sousuo/one-h-sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    keyVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
  },
  getKey(e) {
    this.setData({
      keyVal: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  searchIn() {
    if (this.data.type == 0) {
      wx.navigateTo({
        url: '../one-i-sousuojgy/one-i-sousuojgy?keyWords='+this.data.keyVal,
      })
    } else {
      wx.navigateTo({
        url: '../a-commoditySearch/a-commoditySearch?keyWords='+this.data.keyVal,
      })
    }

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