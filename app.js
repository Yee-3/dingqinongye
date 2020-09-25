//app.js

App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("app.onLaunch");
    wx.reLaunch({
        url: '/pages/index/index',
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow : function(){
    console.log("app.onShow",this.globalData.code);
    // console.log('this.globalData.scence :' + this.globalData.scence);
    // 判断变量，选择跳转位置
    if (this.globalData.code == 'robot') {
      console.log('机手端')
      wx.redirectTo({
        url: '../../pages/index/index',
    })
    } else if (this.globalData.code == 'growers') {
      console.log('种植户')
      wx.reLaunch({
        url: '/pages/a-index/a-index',
      })
    }
    
  },
  onHide : function(){
    this.globalData.scence = 1;
    console.log("app.onHide");
    // console.log(this.globalData.scence);
  },
  globalData: {
    userInfo: null,
    code :wx.getStorageSync('code'),
    isShow:false,
    http(obj) {
      // var webUrl='http://192.168.100.144:8089'
      var webUrl = 'http://192.168.101.1:8889'
      if (obj.dengl) {
        if (wx.getStorageSync('Authorization')) {
          wx.request({
            url: webUrl + obj.url,
            data: obj.data,
            method: obj.method ? obj.method : 'GET',
            header: {
              'content-type': obj.header ? 'application/json' : 'application/x-www-form-urlencoded',
              // 'maijiToken': 'abc494548414c8d8abc14541abc84cc1',
              'Authorization': wx.getStorageSync('Authorization')
            },
            success: function (res) {
              if (res.data.code == 401) {
                wx.showToast({
                  title: '您未登录请登录后重试',
                  icon: 'none'
                })
                getApp().globalData.isShow=true
              }
              obj.success(res)
            }
          })
        } else {
          wx.showToast({
            title: '您未登录请登录后重试',
            icon: 'none'
          })
          getApp().globalData.isShow=true
        }
      } else {
        wx.request({
          url: webUrl + obj.url,
          data: obj.data,
          method: obj.method ? obj.method : 'GET',
          header: {
            'content-type': obj.header ? "application/json" : 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            obj.success(res)
          }
        })
      }
    },
  }
})