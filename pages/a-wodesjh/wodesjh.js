// pages/two-i-wodeshoujh/two-i-wodeshoujh.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneValue: '',
    yanValue: '',
    isYan: false,
    currentTime: 61,
    text: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  code() {
    var that = this,
      currentTime = this.data.currentTime

    if (!app.checkPhone(this.data.phoneValue)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
    } else if (this.data.isYan) {
      wx.showToast({
        title: '已发送，请耐心等待',
        icon: 'none'
      })
    } else {
      app.http({
        url: '/oauth/send-sms-code',
        dengl: true,
        data: {
          phone: that.data.phoneValue
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '短信验证码已发送',
              icon: 'none',
              duration: 500
            });
            var interval = setInterval(function () {
              currentTime--; //每执行一次让倒计时秒数减一
              that.setData({
                text: currentTime + 's后重发', //按钮文字变成倒计时对应秒数
                isYan: true
              })
              //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  text: '获取验证码',
                  currentTime: 61,
                  isYan: false,
                  color: '#929fff'
                })
              }
            }, 1000);
          }
        }
      })
    }
  },
  blur(e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },
  yanZM(e) {
    this.setData({
      yanValue: e.detail.value
    })
  },
  // 保存
  submit() {
    var that = this
    if (!this.data.yanValue) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    } else {
      app.http({
        url: '/user/update-phone',
        dengl: true,
        method: 'POST',
        data: {
          phone: that.data.phoneValue,
          smsCode: that.data.yanValue
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '绑定成功',
            })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.onLoad()
            wx.navigateBack({
              delta: 1,
            })
          } else {
            wx.showToast({
              title: '验证码错误',
            })
          }
        }
      })
    }

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