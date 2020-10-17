// pages/w-tijiaoziliao/w-tijiaoziliao.js
const app = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // img: '../img/f053.png',
    // imgs: '../img/f054.png',
     img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1602901116&di=9fedd0790079f03ed3be0cf3e512a26d&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',
     imgs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602911205304&di=b1080730b320068e241c6a594c29e9fb&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        if (type == 1) {
          that.setData({
            img: res.tempFilePaths
          })
        } else {
          that.setData({
            imgs: res.tempFilePaths
          })
        }

      }
    })
  },
  submit() {
    var index = this.data.tiIndex
      if(this.data.img=='../img/f053.png'||this.data.imgs=='../img/f054.png'){
        wx.showToast({
          title: '请上传完整身份信息',
          icon:'none'
        })
      }else{
        app.http({
          url: '/growers/user/identity-switching',
          dengl: true,
          data: {
            param1:  this.data.img,
            param2: this.data.imgs ,
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