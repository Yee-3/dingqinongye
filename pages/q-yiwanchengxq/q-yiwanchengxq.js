// pages/q-yiwanchengxq/q-yiwanchengxq.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont: {},
    id: '',
    titleIndex: '',
    isPhone: false,
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id,
      titleIndex: options.status
    })
    app.http({
      url: '/user/get-demand-detail',
      data: {
        id: options.id
      },
      method: 'POST',
      dengl: true,
      success(res) {
        var time = res.data.data.workTime

        function format(x) {
          return x < 10 ? '0' + x : x
        }
        let d = new Date(time);
        res.data.data.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
        res.data.data.imgs = res.data.data.img.split(',')
        that.setData({
          cont: res.data.data
        })
      }
    })
  },
 // 打电话
 callPhone() {
  var that = this,
    show = this.data.isPhone
  if (!this.data.isPhone) {
    app.http({
      url: '/oauth/system/get-consumer-hot-line',
      dengl: true,
      method: 'POST',
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          phone: res.data.data.phone,
        })
      }
    })
  }
  this.setData({
    isPhone: !show
  })
},
makeCall() {
  wx.makePhoneCall({
    phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
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