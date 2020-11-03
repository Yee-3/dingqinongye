// pages/one-w-wode/one-w-wode.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    } else {
      app.http({
        url: '/robot/user/get-user-info',
        dengl: true,
        method: 'POST',
        data: {},
        success(res) {
          console.log(res)
          that.setData({
            content: res.data.data.memberDTO,
            isShow: false
          })
        }
      })
    }
  },
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
                    that.onLoad()
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
  // 关于我们
  aboutUs() {
    wx.navigateTo({
      url: '../one-v-guanyuwomen/one-v-guanyuwomen',
    })
  },
  // 我的资料
  myData() {
    wx.navigateTo({
      url: '../two-b-wodeziliao/two-b-wodeziliao?phone=' + this.data.content.phone,
    })
  },
  // 地址管理
  address() {
    wx.navigateTo({
      url: '../x-dizhiguanli/x-dizhiguanli',
    })
  },
  // 修改身份
  xgCard() {
    wx.navigateTo({
      url: '../two-c-xiugaishengf/two-c-xiugaishengf',
    })
  },
  userUs() {},
  // 机手订单
  operator(e) {
    wx.navigateTo({
      url: '../one-x-wodejishoudingd/one-x-wodejishoudingd?id=' + e.currentTarget.dataset.id,
    })
  },
  shopOrder(e) {
    console.log(e)
    wx.navigateTo({
      url: '../two-a-wodeshangchengjd-ywc/two-a-wodeshangchengjd-ywc?id='+e.currentTarget.dataset.id,
    })
  },
  newsIn(){
    wx.navigateTo({
      url: '../one-news/one-news',
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