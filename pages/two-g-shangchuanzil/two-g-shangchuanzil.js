// pages/two-g-shangchuanzil/two-g-shangchuanzil.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiIndex: 0,
    img: '../img/f053.png',
    // img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1602901116&di=9fedd0790079f03ed3be0cf3e512a26d&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',
    imgs: '../img/f054.png',
    // imgs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602911205304&di=b1080730b320068e241c6a594c29e9fb&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg',
    name: '',
    hzImg: '../img/f055.png',
    // hzImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602911205304&di=b1080730b320068e241c6a594c29e9fb&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg',
    nameValue: '提交审核',
    imgValue: '提交审核',
    imgType: '',
    valueType: '',
    access_token: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.http({
      url: '/user/get-my-member-material-status',
      dengl: true,
      method: 'POST',
      data: {},
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          if (res.data.data.memberMaterial.status == 1) {
            if (res.data.data.memberMaterial.cardImg1) {
              that.setData({
                img: res.data.data.memberMaterial.cardImg1,
                imgs: res.data.data.memberMaterial.cardImg2,
                imgValue: '切换身份',
                imgType: 1,
                access_token: res.data.data.access_token,
                code: res.data.data.userInfo.currentIdentity
              })
            } 
            if (res.data.data.memberMaterial.licenseName) {
              that.setData({
                hzImg: res.data.data.memberMaterial.licenseImg,
                name: res.data.data.memberMaterial.licenseName,
                nameValue: '切换身份',
                valueType: 1,
                access_token: res.data.data.access_token,
                code: res.data.data.userInfo.currentIdentity
              })
            }
          } else if (res.data.data.memberMaterial.status == 0) {
            if (res.data.data.memberMaterial.cardImg1) {
              that.setData({
                img: res.data.data.memberMaterial.cardImg1,
                imgs: res.data.data.memberMaterial.cardImg2,
                imgValue: '审核中',
                imgType: 0
              })
            } 
            if (res.data.data.memberMaterial.licenseName) {
              that.setData({
                hzImg: res.data.data.memberMaterial.licenseImg,
                name: res.data.data.memberMaterial.licenseName,
                nameValue: '审核中',
                valueType: 0
              })
            }
          } else if (res.data.data.memberMaterial.status == 2) {
            if (res.data.data.memberMaterial.cardImg1) {
              that.setData({
                img: res.data.data.memberMaterial.cardImg1,
                imgs: res.data.data.memberMaterial.cardImg2,
                imgValue: '审核失败',
                imgType: 2
              })
            }
             if (res.data.data.memberMaterial.licenseName) {
              that.setData({
                hzImg: res.data.data.memberMaterial.licenseImg,
                name: res.data.data.memberMaterial.licenseName,
                nameValue: '审核失败',
                valueType: 2
              })
            }
          }
        }
      }

    })
  },
  toggle(e) {
    console.log(e)
    this.setData({
      tiIndex: e.currentTarget.dataset.index
    })

  },
  uploadImg(e) {
    console.log(e)
    var that = this
    var type = e.currentTarget.dataset.ty
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        if (that.data.tiIndex == 0) {
          that.setData({
            imgValue: '提交审核'
          })
          if (type == 1) {
            that.setData({
              img: res.tempFilePaths
            })
          } else {
            that.setData({
              imgs: res.tempFilePaths
            })
          }
        } else {
          that.setData({
            hzImg: res.tempFilePaths,
            nameValue: '提交审核'
          })
        }

      }
    })
  },
  reInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  submit() {
    var index = this.data.tiIndex,
      that = this
    if (index == 1) {
      if (that.data.nameValue == '提交审核') {
        if (this.data.hzImg == '../img/f055.png') {
          wx.showToast({
            title: '请上传营业执照',
            icon: 'none'
          })
        } else if (!this.data.name) {
          wx.showToast({
            title: '请输入营业执照名称',
            icon: 'none'
          })
        } else {
          app.http({
            url: '/robot/user/identity-switching',
            dengl: true,
            data: {
              param1: this.data.name,
              param2: this.data.hzImg,
              type: index
            },
            method: 'POST',
            success(res) {
              console.log(res)
              wx.navigateBack({
                delta: 2,
              })
            }
          })
        }
      } else if (that.data.nameValue == '切换身份') {
        wx.setStorageSync('Authorization', that.data.access_token)
        wx.setStorageSync('code', that.data.code)
        wx.reLaunch({
          url: '../a-index/a-index',
        })
      } else {
        return
      }
    } else {
      if (that.data.imgValue == '提交审核') {
        if (this.data.img == '../img/f053.png' || this.data.imgs == '../img/f054.png') {
          wx.showToast({
            title: '请上传完整身份信息',
            icon: 'none'
          })
        } else {
          app.http({
            url: '/robot/user/identity-switching',
            dengl: true,
            data: {
              param1: this.data.img,
              param2: this.data.imgs,
              type: index
            },
            method: 'POST',
            success(res) {
              console.log(res)
              wx.navigateBack({
                delta: 2,
              })
            }
          })
        }
      }else if (that.data.imgValue == '切换身份') {
        wx.setStorageSync('Authorization', that.data.access_token)
        wx.setStorageSync('code', that.data.code)
        wx.reLaunch({
          url: '../a-index/a-index',
        })
      } else {
        return
      }

    }

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