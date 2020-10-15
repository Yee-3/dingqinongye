// pages/two-g-shangchuanzil/two-g-shangchuanzil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiIndex: 0,
    img: '../img/f053.png',
    imgs: '../img/f054.png',
    hzImg: '../img/f055.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toggle(e) {
    console.log(e)
    this.setData({
      tiIndex: e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.index==0){
      this.setData({
        hzImg: '../img/f055.png'
      })
    }else{
      this.setData({
        img: '../img/f053.png',
        imgs: '../img/f054.png',
      })
    }
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
            hzImg: res.tempFilePaths
          })
        }

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})