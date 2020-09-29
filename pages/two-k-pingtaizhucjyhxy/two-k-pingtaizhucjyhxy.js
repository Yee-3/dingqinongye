// pages/two-k-pingtaizhucjyhxy/two-k-pingtaizhucjyhxy.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.http({
      url: '/oauth/system/get-protocol',
      dengl: false,
      method: 'POST',
      data: {},
      success(res) {
        that.setData({
          con: res.data.data
        })
        wx.setNavigationBarTitle({
          title: res.data.data.title    // 其他页面传过来的标题名
      })

      }
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