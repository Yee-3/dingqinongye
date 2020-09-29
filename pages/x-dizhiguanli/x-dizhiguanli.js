// pages/x-dizhiguanli/x-dizhiguanli.js
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
    var that = this
    app.http({
      url: '/user/get-address-list',
      dengl: true,
      method: 'POST',
      data: '',
      success(res) {
        that.setData({
          list: res.data.data
        })
      },
    })
  },
  build(e) {
    if (e.currentTarget.dataset.id) {
      
      wx.navigateTo({
        url: '../y-xinjianshdz/y-xinjianshdz?id=' + e.currentTarget.dataset.id +'&adress='+e.currentTarget.dataset.adress+'&name='+e.currentTarget.dataset.name+'&phone='+e.currentTarget.dataset.phone+'&map='+e.currentTarget.dataset.map+'&status='+e.currentTarget.dataset.status,
      })
    } else {
      wx.navigateTo({
        url: '../y-xinjianshdz/y-xinjianshdz',
      })
    }
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