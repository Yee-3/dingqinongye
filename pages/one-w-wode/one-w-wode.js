// pages/one-w-wode/one-w-wode.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    content:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    } else {
      app.http({
        url: '/robot/user/get-user-info',
        dengl:true,
        method:'POST',
        data:{},
        success(res){
          console.log(res)
          that.setData({
            content:res.data.data.memberDTO
          })
        }
      })
    }
  },
  // 关于我们
  aboutUs() {
    wx.navigateTo({
      url: '../one-v-guanyuwomen/one-v-guanyuwomen',
    })
  },
  // 我的资料
  myData(){
    wx.navigateTo({
      url: '../two-b-wodeziliao/two-b-wodeziliao?phone='+this.data.content.phone,
    })
  },
  // 地址管理
  address(){
    wx.navigateTo({
      url: '../x-dizhiguanli/x-dizhiguanli',
    })
  },
  // 修改身份
  xgCard(){
    wx.navigateTo({
      url: '../two-c-xiugaishengf/two-c-xiugaishengf',
    })
  },
  userUs(){},
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