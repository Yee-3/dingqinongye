const order = ['demo1', 'demo2', 'demo3']
const app = getApp().globalData;
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  data: {
    toView: 'green',
    id: '202009012671',
    cateId: '',
    titleIndex: 0,
    titleList: [],
    currentPage: 1,
    loadingType: 0,
    contList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var that = this
    // if (options) {
    //   this.setData({
    //     id: options.id
    //   })
    // }
    // 获取顶部标题列表
    app.http({
      url: '/oauth/robot/get-tree-child-list',
      dengl: false,
      method: 'POST',
      data: {
        // id: options.id
        id: this.data.id
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          titleList: res.data.data,
          cateId: res.data.data[0].id
        })
        // 获取二级内容列表
        var data = {
          cateId: res.data.data[0].id,
          limit: 10,
          page: that.data.currentPage
        }
        that.reword(data)
      }
    })

  },
  // 详情
  detailIn() {
    wx.navigateTo({
      url: '../one-e-daijiedxqy/one-e-daijiedxqy',
    })
  },
  // 标题切换
  toggleIndex(e) {
    console.log(e)
    this.setData({
      titleIndex: e.currentTarget.dataset.index,
      cateId: e.currentTarget.dataset.id,
      currentPage: 1
    })
    var data = {
      cateId: e.currentTarget.dataset.id,
      limit: 10,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  // 获取数据
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/oauth/robot/get-order-list-by-cateId',
      dengl: false,
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
            val.imgs = val.img.split(',')
          })
          console.log(res.data.data)
        }
        that.setData({
          contList: res.data.data
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
      url: '/oauth/robot/get-order-list-by-cateId',
      dengl: false,
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
            val.imgs = val.img.split(',')
          })
        }
        that.setData({
          contList: that.data.contList.concat(res.data.data)
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
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    // console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var data = {
      limit: 10,
      cateId: this.data.cateId,
      page: this.data.currentPage + 1
    }
    this.jiazai(data)
  },
})