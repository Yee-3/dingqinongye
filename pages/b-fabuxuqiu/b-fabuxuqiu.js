// pages/b-fabuxuqiu/b-fabuxuqiu.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.http({
      url: '/oauth/demand-type-list',
      dengl: false,
      data: {},
      method: 'POST',
      success(res) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data
        })
      }
    })
  },
  // 需求详情
  xqDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../c-fabuxuqiunr/c-fabuxuqiunr?id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.title,
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