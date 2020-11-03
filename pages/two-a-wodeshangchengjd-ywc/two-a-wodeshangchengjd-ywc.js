// pages/r-wodeshangcdd/r-wodeshangcdd.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIndex: 0,
    styHeight: '',
    wlShow: true,
    wlList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.id){
      this.setData({
        titleIndex: options.id
      })
    }
    // this.wlLoad()

  },
  toggleTitle(e) {
    this.setData({
      titleIndex: e.currentTarget.dataset.id
    })
  },
  // 订单详情
  orderDetail(e) {
    var that=this
    wx.navigateTo({
      url: '../two-d-daishouhddxq/two-d-daishouhddxq?index='+that.data.titleIndex,
    })
  },
  // 物流信息
  logistics() {
  
    this.wlLoad()
    var show = this.data.wlShow
    this.setData({
      wlShow: !show
    })
  },
  // 加载物流
  wlLoad() {
    var that=this
    app.http({
      url: '/api/shop/logistics-detail',
      dengl: true,
      method: 'GET',
      data: {
        logistics: '3104102516851'
      },
      success(res) {
        console.log(res.data.data.data)
        that.setData({
          wlList: res.data.data.data
        })
        let query = wx.createSelectorQuery();
        query.select('.item_R').boundingClientRect(rect => {
          console.log(rect)
          let height = rect.height * 750 / wx.getSystemInfoSync().windowWidth;
          that.setData({
            styHeight: height,
          })
        }).exec();
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