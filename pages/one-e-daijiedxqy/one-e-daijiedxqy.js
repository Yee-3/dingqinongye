// pages/one-e-daijiedxqy/one-e-daijiedxqy.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: 'display:none',
    isShow: false,
    cont: {},
    isPhone: false,
    phone: '',
    status: '',
    hideFlag: true,
    animationData: {},
    cateId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.id) {
      this.setData({
        id: options.id,
        status: options.status,
        cateId:options.cateId
      })
    }
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    } else {
      var data = {
        id: options.id
      }
      this.loading(data)
    }

  },
  zuzhi() {},
  // 显示遮罩层
  showModal: function () {
    var that = this;
    console.log(2341234)
    this.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间
      timingFunction: 'ease', //动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn(); //调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown(); //调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220) //先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  share() {},
  // 登录
  bindGetUserInfo() {
    var that = this
    wx.login({
      success(res) {
        console.log(res)
        var code = res.code
        wx.getUserInfo({
          success(resp) {
            if (code) {
              console.log(resp)
              wx.setStorageSync('users', {
                'nickName': resp.userInfo.nickName,
                'avatarUrl': resp.userInfo.avatarUrl
              })
              app.http({
                url: '/oauth/wx-auth-save',
                method: 'POST',
                dengl: false,
                header: true,
                data: JSON.stringify({
                  code: code,
                  encryptedData: resp.encryptedData,
                  iv: resp.iv,
                  identityCode: wx.getStorageSync('code')
                }),
                success(res) {
                  if (res.data.code == 0) {
                    wx.setStorageSync('Authorization', res.data.data.access_token)
                    wx.showToast({
                      title: '登录成功'
                    })
                    that.setData({
                      isShow: false
                    })
                    var data = {
                      id: that.data.id
                    }
                    that.loading(data)
                  } else {
                    wx.showToast({
                      title: '登录失败'
                    })
                  }
                }
              })
            }
            console.log(resp)
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }

    })
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
  // 打电话
  callPhone() {
    var show = this.data.isPhone,
      that = this
    this.setData({
      isPhone: !show
    })
    console.log(this.data.status)
    if (this.data.status != 0) {
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
      return
    }
  },
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
  },

  tanchuang: function () {
    var that = this
    app.http({
      url: '/robot/user/demand-operational',
      method: 'POST',
      dengl: true,
      data: {
        id: this.data.id,
        type: 1
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '接单成功',
          })
          var data = {
            id: that.data.id
          }
          that.loading(data)
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
            cateId:that.data.cateId,
            currentPage:1
          })
          var data = {
            cateId: that.data.cateId,
            limit: 10,
            page: prevPage.data.currentPage
          }
          prevPage.reword(data)
        } else {
          that.setData({
            style: 'display:block'
          })
        }
      }
    })

  },
  confirmT() {
    var that = this
    wx.navigateTo({
      url: '../two-b-wodeziliao/two-b-wodeziliao'
    })
    setTimeout(function () {
      that.quxiao()
    }, 500)
  },
  quxiao: function () {
    this.setData({
      style: 'display:none'
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