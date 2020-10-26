// pages/h-tijiaodingdan/h-tijiaodingdan.js
const app = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isFirst: false,
    list:[],
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.http({
      url: '/user/get-address-list',
      dengl: true,
      method: 'POST',
      data: '',
      success(res) {
        console.log(res)
        if(res.data.data.length>0){
          var arr=res.data.data
          arr.map(function(val,i){
            if(val.status=='Y'){
              that.setData({
                index:i
              })
            }
          })
          that.setData({
            list: res.data.data,
            isFirst:true
          })
        }
       
      },
    })
  },
  loading(){
    var that=this
    app.http({
      url: '/user/get-address-list',
      dengl: true,
      method: 'POST',
      data: '',
      success(res) {
        console.log(res)
        if(res.data.data.length>0){
          that.setData({
            list: res.data.data,
            isFirst:true
          })
        }
       
      },
    })
  },
  addAddress: function () {
    wx.navigateTo({
      url: '../x-dizhiguanli/x-dizhiguanli?type=1',
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