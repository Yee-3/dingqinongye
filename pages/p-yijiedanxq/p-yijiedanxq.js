// pages/p-yijiedanxq/p-yijiedanxq.js
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
    isQx: false,
    cont: {},
    id: '',
    titleIndex: '',
    quSty: false,
    isPhone: false,
    phone: '',
    isCon: false
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
          cont: res.data.data,
          phone: res.data.data.phone
        })
      }
    })
  },
  // 打电话
  callPhone() {
    var show = this.data.isPhone
    this.setData({
      isPhone: !show
    })
  },
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
  },
  // 取消
  cancelDd() {
    var qx = this.data.isQx
    this.setData({
      isQx: !qx
    })
  },
  // 提交取消事件
  submit() {
    var that = this
    if (!this.data.reason) {
      wx.showToast({
        title: '请选择原因',
        icon: 'none'
      })
    } else if (!this.data.cause) {
      wx.showToast({
        title: '请输入取消说明',
        icon: 'none'
      })
    } else {
      app.http({
        url: '/growers/user/cancel-publish-demand',
        dengl: true,
        data: {
          id: that.data.id,
          directions: that.data.cause,
          label: that.data.reason
        },
        method: 'POST',
        success(res) {
          if (res.data.code == 0) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.setData({
              currentPage: 1,
              titleIndex: that.data.titleIndex
            })
            var data = {
              limit: 10,
              ordersStatus: that.data.titleIndex,
              page: prevPage.data.currentPage
            }
            prevPage.reword(data)
            that.cancelDd()
            setTimeout(function () {
              that.setData({
                quSty: true
              })
            }, 500)

          }
        }
      })
    }

  },
  confirmQ() {
    wx.navigateBack({
      delta: 1,
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
  concairmDd() {
    var show = this.data.isCon
    this.setData({
      isCon: !show
    })
  },
  conConfirm() {
    var that = this
    this.concairmDd()
    app.http({
      url: '/growers/user/demand-confirm-complete',
      dengl: true,
      method: 'POST',
      data: {
        id: that.data.id
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
            currentPage: 1,
            titleIndex: that.data.titleIndex
          })
          var data = {
            limit: 10,
            ordersStatus: that.data.titleIndex,
            page: prevPage.data.currentPage
          }
          prevPage.reword(data)
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none'
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