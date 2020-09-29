// pages/one-v-guanyuwomen/one-v-guanyuwomen.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    app.http({
      url: '/oauth/system/get-consumer-hot-line',
      dengl: true,
      method: 'POST',
      data: {},
      success(res) {
       console.log(res)
       that.setData({
         phone:res.data.data.phone
       })
      }
    })
  },
  aboutUs(){
    wx.navigateTo({
      url: '../two-f-guanyudqny/two-f-guanyudqny',
    })
  },
xieyi(){
  wx.navigateTo({
    url: '../two-k-pingtaizhucjyhxy/two-k-pingtaizhucjyhxy',
  })
},
// 拨打电话
callPhone(){
  wx.makePhoneCall({
    phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
  })
  wx.navigateTo({
    url: '../dai',
  })
},
phoneShow(){
  var show=this.data.isShow
  this.setData({
    isShow:!show
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