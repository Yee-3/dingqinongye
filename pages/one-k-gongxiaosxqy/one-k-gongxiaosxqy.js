// pages/one-k-gongxiaosxqy/one-k-gongxiaosxqy.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId:1,
    shopName:'',
    currentPage: 1,
    currentPage_Two: 1,
    loadingType: 0,
    loadingType1: 0,
    classifyList: [],
    commodityList:[],
    titleIndex:0,
    cateId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.shopId)
    if(options.shopId){
      this.setData({
        shopId:options.shopId,
        shopName:options.name
      })
    }
     // 获取商品分类
     var data={
      limit:10,
      page:this.data.currentPage
    }
    this.itemList(data) 
  },
  detail(e) {
    wx.navigateTo({
      url: '../g-shangpingxq/g-shangpingxq?id='+e.currentTarget.dataset.id,
    })
  },
  // 切换
  toggleTitle(e) {
    var that=this
    this.setData({
      titleIndex: e.currentTarget.dataset.index,
      cateId:e.currentTarget.dataset.id,
      currentPage_Two:1
    })
    var data1={
      limit:10,
      page:that.data.currentPage_Two,
      cateId:e.currentTarget.dataset.id,
      keywords:that.data.keyword?that.data.keyword:'',
      shopId:that.data.shopId
    }
    this.getList(data1)
  },
   // 商品分类获取数据
   itemList(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/shop/mall-lists',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        that.setData({
          classifyList:  res.data.data.cateList,
          cateId:res.data.data.cateList[0].id
        })
        var data1={
          limit:10,
          page:that.data.currentPage_Two,
          cateId:that.data.cateId,
          keywords:that.data.keyword?that.data.keyword:'',
          shopId:that.data.shopId
        }
        that.getList(data1)
        if ( res.data.data.cateList.length < 10) {
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
      url: '/shop/mall-lists',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        that.setData({
          classifyList: that.data.classifyList.concat( res.data.data.cateList)
        })
        if ( res.data.data.cateList.length < 10) {
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
  scrollButton_One(e){
    var data={
      limit:10,
      page:this.data.currentPage+1
    }
    this.itemListMore(data)
  },
  // 获取商品列表
  getList(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/shop/mall-goods-list',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        if (res.data.data.goodsList.length > 0) {
          var arr = res.data.data.goodsList
          arr.map(function (val, i) {
            val.imgs = val.goodsLogo.split(',')
          })
        }
        that.setData({
          commodityList:  res.data.data.goodsList
        })
        if ( res.data.data.goodsList.length <10) {
          that.setData({
            loadingType1: 2
          })
        } else {
          that.setData({
            loadingType1: 0
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  }, 
  // 上拉加载
  getMoreList(data) {
    var that = this
    this.setData({
      currentPage_Two: that.data.currentPage_Two + 1
    })
    if (this.data.loadingType1 != 0) {
      //loadingType!=0;直接返回
      return false;
    }
    this.setData({
      loadingType1: 1
    })
    wx.showNavigationBarLoading()
    app.http({
      url: '/shop/mall-goods-list',
      dengl: false,
      method: 'GET',
      data: data,
      success(res) {
        if (res.data.data.goodsList.length > 0) {
          var arr = res.data.data.goodsList
          arr.map(function (val, i) {
            val.imgs = val.goodsLogo.split(',')
          })
        }
        that.setData({
          commodityList: that.data.commodityList.concat( res.data.data.goodsList)
        })
        if ( res.data.data.goodsList.length <10) {
          that.setData({
            loadingType1: 2
          })
          wx.hideNavigationBarLoading()
        } else {
          that.setData({
            loadingType1: 0
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
    var data1={
      limit:10,
      page:that.data.currentPage_Two+1,
      cateId:e.currentTarget.dataset.id,
      keywords:that.data.keyword?that.data.keyword:'',
      shopId:that.data.shopId
    }
    this.getMoreList(data1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})