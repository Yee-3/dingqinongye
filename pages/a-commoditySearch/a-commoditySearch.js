// pages/a-commoditySearch/a-commoditySearch.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIndex: 0,
    isType: false,
    loadingType: 0,
    currentPage:1,
    itemsList: [],
    keyWord: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this
    console.log(options)
      this.setData({
        keyWord: options.keyWords?options.keyWords:''
      })
   
    var data = {
      limit: 10,
      page: this.data.currentPage,
      keywords: options.keyWords
    }
    this.itemList(data)
  },
  titleToggle(e) {
    var that = this,
      type = this.data.isType
    this.setData({
      titleIndex: e.currentTarget.dataset.index,
      currentPage: 1,
    })
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        isType: false
      })
      var data = {
        limit: 10,
        page: that.data.currentPage,
        keywords: that.data.keyWord
      }
      this.itemList(data)
    } else if (e.currentTarget.dataset.index == 1) {
      this.setData({
        isType: false
      })
      var data = {
        limit: 10,
        page: that.data.currentPage,
        keywords: that.data.keyWord,
        salesSort: 2
      }
      this.itemList(data)
    } else {
      this.setData({
        isType: !type
      })
      var data = {
        limit: 10,
        page: that.data.currentPage,
        keywords: that.data.keyWord,
        priceSort: this.data.isType ? 1 : 2
      }
      this.itemList(data)
    }
   
  },
  // 商品分类获取数据
  itemList(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/shop/mall-goods-filter-list',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        console.log(res)
        that.setData({
          itemsList: res.data.data.goodsList
        })
        if (res.data.data.goodsList.length < 10) {
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
  // 上拉加载
  itemListMore(data) {
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
      url: '/shop/mall-goods-filter-list',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        that.setData({
          itemsList: that.data.itemsList.concat(res.data.data.goodsList)
        })
        if (res.data.data.goodsList.length < 10) {
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
    var that=this
    if (this.data.titleIndex == 0) {
      var data = {
        limit: 10,
        page: that.data.currentPage+1,
        keywords: that.data.keyWord
      }
      this.itemListMore(data)
    } else if (this.data.titleIndex == 1) {
      var data = {
        limit: 10,
        page: that.data.currentPage+1,
        keywords: that.data.keyWord,
        salesSort: 2
      }
      this.itemListMore(data)
    } else {
      var data = {
        limit: 10,
        page: that.data.currentPage+1,
        keywords: that.data.keyWord,
        priceSort: this.data.isType ? 1 : 2
      }
      this.itemListMore(data)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})