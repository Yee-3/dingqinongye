// pages/v-xiugaishengf/v-xiugaishengf.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toggle() {
    app.http({
      url: '/user/get-my-member-material-status',
      dengl: true,
      method: 'POST',
      data: {},
      success(res) {
        console.log(res)
        if (res.data.data.memberMaterial.status == 1) {
          wx.setStorageSync('Authorization', res.data.data.access_token)
         wx.reLaunch({
           url: '../index/index',
         })
        }else if(res.data.data.memberMaterial.status == 0){
          wx.showToast({
            title: '信息审核中！',
            icon:'none'
          })
        }else if(res.data.data.memberMaterial.status == 2){
          wx.navigateTo({
            url: '../w-tijiaoziliao/w-tijiaoziliao',
          })
        }
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