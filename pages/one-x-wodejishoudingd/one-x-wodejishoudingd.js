// pages/one-x-wodejishoudingd/one-x-wodejishoudingd.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIndex: 1,
    currentPage: 1,
    loadingType: 0,
    phone:'',
    serviceList: [],
    isQx: false,
    quSty: false,
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
  id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   titleIndex: options.id
    // })
    var data = {
      status: this.data.titleIndex,
      limit: 10,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  toggleTitle(e) {
    this.setData({
      titleIndex: e.currentTarget.dataset.id,
      currentPage:1
    })
    var data = {
      status: this.data.titleIndex,
      limit: 10,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  xqDetail(e) {
    wx.navigateTo({
      url: '../two-e-daizuoyexq/two-e-daizuoyexq?id='+e.currentTarget.dataset.id+'&status='+this.data.titleIndex,
    })
  },
  // 打电话
  callPhone(e) {
    var show = this.data.isPhone
    this.setData({
      isPhone: !show,
      phone:e.currentTarget.dataset.phone
    })
  }, 
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
    this.setData({
      isPhone:false
    })
  },
  // 获取数据
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/robot/user/select-my-orders-list',
      dengl: false,
      method: 'POST',
      data: data,
      dengl: true,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            var time = val.workTime

            function format(x) {
              return x < 10 ? '0' + x : x
            }
            let d = new Date(time);
            val.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
            val.imgs = val.img.split(',')
          })
          console.log(res.data.data)
        }
        that.setData({
          serviceList: res.data.data
        })
        if (res.data.data.length < 10) {
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
  jiazai(data) {
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
      url: '/robot/user/select-my-orders-list',
      dengl: false,
      method: 'POST',
      data: data,
      dengl: true,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            var time = val.workTime

            function format(x) {
              return x < 10 ? '0' + x : x
            }
            let d = new Date(time);
            val.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
            val.imgs = val.img.split(',')
          })
        }
        that.setData({
          serviceList: that.data.serviceList.concat(res.data.data)
        })
        if (res.data.data.length < 10) {
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
  // 取消
  cancelDd(e) {
    var qx = this.data.isQx
    this.setData({
      isQx: !qx,
      id: e.currentTarget.dataset.id
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
        url: '/robot/user/cancel-publish-demand',
        dengl: true,
        data: {
          id: that.data.id,
          label: that.data.reason,
          directions: that.data.cause
        },
        method: 'POST',
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              isQx: false,
              cause: '',
              reason: ''
            })
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
    var hide = this.data.quSty,
      that = this
    this.setData({
      quSty: !hide,
      currentPage: 1
    })
    var data = {
     status: this.data.titleIndex,
      limit: 10,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  // 获取取消说明内容
  capValue(e) {
    this.setData({
      cause: e.detail.value
    })
  },
  radioChange(e) {
    console.log(e)
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
    var data = {
      limit: 10,
      status: this.data.titleIndex,
      page: this.data.currentPage + 1
    }
    this.jiazai(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})