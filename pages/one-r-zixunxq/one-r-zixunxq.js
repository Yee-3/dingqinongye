// pages/one-r-zixunxq/one-r-zixunxq.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    newsId: '',
    currentPage: 1,
    loadingType: 0,
    comList: [],
    pingValue: '',
    isShow: false,
    typeFocus: false,
    comId: '',
    resId: '',
    plder: '说一说你的看法吧~',
    type:'',
    hidde:true,
    index:'',
    // ty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      newsId: options.id
    })
    app.http({
      url: '/oauth/system/get-news-detail',
      dengl: false,
      method: 'POST',
      data: {
        newsId: options.id
      },
      success(res) {
        res.data.data.time = res.data.data.createTime.substring(0, 10)
        that.setData({
          content: res.data.data
        })
      }
    })
    var data = {
      limit: 10,
      newsId: that.data.newsId,
      page: that.data.currentPage
    }
    this.reword(data)
  },
  bindGetUserInfo(){
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
  showList(e){
    console.log(e)
    this.setData({
      hidde:false,
      index:e.currentTarget.ty,
      ty:(e.currentTarget.index>1)?true:false
    })
  },
  fbVal(e) {
    this.setData({
      pingValue: e.detail.value
    })
  },
  focusTy(e) {
    var that = this
    this.setData({
      typeFocus: true,
      comId: e.currentTarget.dataset.comid,
      resId: e.currentTarget.dataset.resid,
      plder: '@ ' + e.currentTarget.dataset.name + ':',
      type: e.currentTarget.dataset.type
    })
  },
  focus() {
    this.setData({
      plder: '说一说你的看法吧~'
    })
  },
  submit() {
    var that = this
    if (!wx.getStorageSync('Authorization')) {
      that.setData({
        isShow: true
      })
    } else {
      var url = that.data.comId ? '/system/save-news-comm-reply-info' : '/system/save-news-comm-info'
      var data = that.data.comId ? {
        commId: that.data.comId,
        replyContent: that.data.pingValue,
        respondent: that.data.resId
      } : {
        content: that.data.pingValue,
        newsId: that.data.newsId
      }
      app.http({
        url: url,
        dengl: true,
        method: 'POST',
        data: data,
        success(res) {
          if (res.data.code == 0) {
            that.setData({
              pingValue: '',
              currentPage: 1,
              comId: '',
              resId: ''
            })
            var data = {
              limit: 10,
              newsId: that.data.newsId,
              page: that.data.currentPage
            }
            that.reword(data)
            wx.showToast({
              title: '发表成功',
            })

          }
        }
      })
    }

  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/oauth/system/get-news-comm-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            val.time = val.createTime.substring(0, 10)
            if (val.newsReplyDTOList.length > 0) {
              var arrs = val.newsReplyDTOList
              arrs.map(function (va, ind) {
                va.cTime = va.createTime.substring(0, 10)
              })
            }
          })
        }
        that.setData({
          comList: res.data.data
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
      url: '/oauth/system/get-news-comm-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            val.time = val.createTime.substring(0, 10)
          })
        }
        that.setData({
          comList: that.data.comList.concat(res.data.data)
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
      newsId: this.data.newsId,
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