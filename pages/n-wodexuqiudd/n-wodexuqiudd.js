// pages/n-wodexuqiudd/n-wodexuqiudd.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIndex: '0',
    currentPage: 1,
    loadingType: 0,
    list: [],
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
    isQx: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleIndex: options.id
    })
    var data = {
      limit: 10,
      ordersStatus: options.id,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  // 标题切换
  titleTog(e) {
    this.setData({
      titleIndex: e.currentTarget.dataset.index,
      currentPage: 1
    })
    var data = {
      limit: 10,
      ordersStatus: e.currentTarget.dataset.index,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  // 订单详情
  detailIn(e) {
    console.log(e)
    if (this.data.titleIndex == 0) {
      wx.navigateTo({
        url: '../o-daijiedanxq/o-daijiedanxq?id='+e.currentTarget.dataset.id,
      })
    } else if (this.data.titleIndex == 1) {
      wx.navigateTo({
        url: '../p-yijiedanxq/p-yijiedanxq?id='+e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../q-yiwanchengxq/q-yiwanchengxq?id='+e.currentTarget.dataset.id,
      })
    }

  },
  // 获取数据
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/growers/user/get-publish-demand-list',
      dengl: true,
      method: 'POST',
      data: data,
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
          })
        }
        that.setData({
          list: res.data.data
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
      url: '/growers/user/get-publish-demand-list',
      dengl: true,
      method: 'POST',
      data: data,
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
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
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
  cancelDd() {
    var qx = this.data.isQx
    this.setData({
      isQx: !qx
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
    var that = this
    var data = {
      limit: 10,
      ordersStatus: this.data.titleIndex,
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