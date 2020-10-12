// pages/two-n-fenleiznj/two-n-fenleiznj.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeId: '',
    typeName:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if (options) {
      this.setData({
        typeId: options.typeId,
        typeName:options.name
      })
    }
    app.http({
      url:'/robot/user/get-my-machinery-list',
      data:{
        typeId:that.data.typeId
      },
      method:'POST',
      dengl:true,
      success(res){
        that.setData({
          list:res.data.data
        })
        
      }
    })
  },
  addNj() {
    wx.navigateTo({
      url: '../two-p-tianjiaxinnj/two-p-tianjiaxinnj?typeId=' + this.data.typeId+'&name='+this.data.typeName+'&ty='+1,
    })
  },
  njDetail(e) {
    wx.navigateTo({
      url: '../two-p-tianjiaxinnj/two-p-tianjiaxinnj?typeId=' + this.data.typeId+'&bId='+e.currentTarget.dataset.bid+'&mId='+e.currentTarget.dataset.mid+'&id='+e.currentTarget.dataset.id+'&name='+this.data.typeName+'&img='+e.currentTarget.dataset.img+'&mVal='+e.currentTarget.dataset.mval+'&bVal='+e.currentTarget.dataset.bval+'&num='+e.currentTarget.dataset.num,
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