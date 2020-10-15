// pages/one-e-daijiedxqy/one-e-daijiedxqy.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    status:'',
    phone:'',
    cont:{},
    isWork:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      status:options.status
    })
    var data = {
      id: options.id
    }
    this.loading(data)
  },
  // 一进页面就加载
  loading(data) {
    var that = this
    app.http({
      url: '/user/get-demand-detail',
      dengl: true,
      data: data,
      method: 'POST',
      success(res) {
        console.log(res)
        var time = res.data.data.workTime
        function format(x) {
          return x < 10 ? '0' + x : x
        }
        let d = new Date(time);
        res.data.data.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
        res.data.data.imgs = res.data.data.img.split(',')
        that.setData({
          cont: res.data.data,
          phone: res.data.data.phone,
          status: res.data.data.status
        })
      }
    })
  },
  // 开始作业
  tanchuang: function () {
    var that = this
    app.http({
      url: '/robot/user/demand-operational',
      method: 'POST',
      dengl: true,
      data: {
        id: this.data.id,
        type: 2
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            isWork:true
          })
          // var data = {
          //   id: that.data.id
          // }
          // that.loading(data)
        } else {
          wx.showToast({
            title: '操作失败',
            icon:'none'
          })
        }
      }
    })

  },
 // 打电话
 callPhone(e) {
  var show = this.data.isPhone,
    that = this
  this.setData({
    isPhone: !show
  })
  console.log(this.data.status)
  if (this.data.status !=1) {
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
  } else {
   this.setData({
     phone:that.data.cont.phone
   })
  }
},
makeCall() {
  wx.makePhoneCall({
    phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
  })
  this.setData({
    isPhone:false
  })
},
  
  // 取消
  cancelDd(e) {
    var qx = this.data.isQx
    this.setData({
      isQx: !qx,
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      titleIndex: that.data.status,
      currentPage: 1
    })
    var data = {
      status: that.data.status,
      limit: 10,
      page: prevPage.data.currentPage
    }
    prevPage.reword(data)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})