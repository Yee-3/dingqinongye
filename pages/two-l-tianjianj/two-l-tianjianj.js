// pages/two-l-tianjianj/two-l-tianjianj.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.http({
      url: '/robot/user/get-my-machinery-type',
      dengl: true,
      data: '',
      method: 'POST',
      success(res) {
        console.log(res)
        that.setData({
          list:res.data.data
        })
      }

    })
  },
  njDetail(e) {
    console.log(e)
    var num=e.currentTarget.dataset.num
    if(num==0){
      wx.navigateTo({
        url: '../two-p-tianjiaxinnj/two-p-tianjiaxinnj?typeId='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name,
      })
    }else{
      wx.navigateTo({
        url: '../two-n-fenleiznj/two-n-fenleiznj?typeId='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name,
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