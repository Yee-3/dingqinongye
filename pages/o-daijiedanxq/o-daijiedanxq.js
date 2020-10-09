// pages/o-daijiedanxq/o-daijiedanxq.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        value: '0',
        name: '没看清楚内容',
      },
      {
        value: '1',
        name: '机器坏了'
      },
      {
        value: '2',
        name: '时间待确定'
      },
      {
        value: '3',
        name: '对方不需要'
      },
      {
        value: '4',
        name: '赶不上时间'
      },
      {
        value: '5',
        name: '其他原因'
      },
    ],
    reason: '',
    cause: '',
    isQx:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 取消
  cancelDd(){
    var qx=this.data.isQx
    this.setData({
      isQx:!qx
    })
  },
  // 提交取消时间
  submit() {
    app.http({
      url: '/growers/user/cancel-publish-demand',
      dengl: true,
      data: {
        // id:
      },
      method: 'POST',
      success(res) {
        console.log(res)
      }
    })
  },
  // 获取取消说明内容
  capValue(e) {
    this.setData({
      cause: e.detail.value
    })
  },
  radioChange(e) {
    this.setData({
      reason: e.detail.value
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