// pages/one-l-shangcheng/one-l-shangcheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: '',
    itemIndex: 0,
    rightHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        that.setData({
          scrollTop: height  + 'rpx',
          rightHeight:(height-70)+ 'rpx',
        });
        console.log(height)
      }
    })
  },
  addColor(e) {
    console.log(e)
    this.setData({
      itemIndex: e.currentTarget.dataset.index
    })
  },
  detailIn(){
    wx.navigateTo({
      url: '../g-shangpingxq/g-shangpingxq',
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