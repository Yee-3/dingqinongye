// pages/components/denglu/denglu.js
const app = getApp().globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true,
      observer: "onShow"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
