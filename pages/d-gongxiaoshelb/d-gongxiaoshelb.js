// pages/d-gongxiaoshelb/d-gongxiaoshelb.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentPage: 1,
    loadingType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    var that = this
    app.http({
      url: '/oauth/shop/get-store-shop-list',
      data: {
        limit: 1,
        page: that.data.currentPage
      },
      method: 'POST',
      dengl: false,
      success(res) {
        that.setData({
          list: res.data.data
        })
        console.log(res)
        if (res.data.data.length < 10) {
          that.setData({
            loadingType: 2
          })
          wx.showToast({
            title: '已加载全部数据',
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  gxsDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../e-gongxiaoshexq/e-gongxiaoshexq?shopId=' + e.currentTarget.dataset.id,
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
    var that = this
    this.setData({
      currentPage: that.data.currentPage + 1
    })
    if (this.data.loadingType != 0) {
      //loadingType!=0;直接返回
      return false;
    }
    this.setData({
      loadingType: 1
    })
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/oauth/shop/get-store-shop-list',
      dengl: false,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage
      },
      success(res) {
        that.setData({
          list: that.data.recomList.concat(res.data.rdata)
        })
        if (res.data.rdata.length <= 10) {
          that.setData({
            loadingType: 2
          })
          wx.hideNavigationBarLoading()
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})