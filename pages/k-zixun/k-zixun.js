// pages/k-zixun/k-zixun.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    currentPage: 1,
    loadingType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      data = {
        limit: 10,
        page: this.data.currentPage
      }
    this.reword(data)
  },
  newsDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../one-r-zixunxq/one-r-zixunxq?id=' + e.currentTarget.dataset.id,
    })
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/oauth/system/get-news-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            val.time = val.createTime.substring(0, 10)
          })
        }
        that.setData({
          newsList: res.data.data
        })

        if (res.data.data.length < 10) {
          that.setData({
            loadingType: 2
          })
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  jiazai(data) {
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
    app.http({
      url: '/oauth/system/get-news-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            val.time = val.createTime.substring(0, 10)
          })
        }
        that.setData({
          newsList: that.data.newsList.concat(res.data.data)
        })
        if (res.data.data.length < 10) {
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
  // 详情
  infoDetail() {
    wx.navigateTo({
      url: '../one-r-zixunxq/one-r-zixunxq?id=' + e.currentTarget.dataset.id,
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
    var that = this
    var data = {
      limit: 10,
      page: that.data.currentPage + 1
    }
    this.jiazai(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})