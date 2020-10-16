// pages/one-news/one-news.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    loadingType: 0,
    newsList: [],
    delBtnWidth: 150,
    startX: '',
    isShow: false,
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = {
      limit: 10,
      page: this.data.currentPage
    }
    this.reword(data)
  },
  // 获取数据
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/user/get-my-msg-list',
      dengl: true,
      method: 'POST',
      data: data,
      dengl: true,
      success(res) {
        that.setData({
          newsList: res.data.data
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
  // 上拉加载
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
      url: '/user/get-my-msg-list',
      dengl: true,
      method: 'POST',
      data: data,
      dengl: true,
      success(res) {
        that.setData({
          newsList: that.data.newsList.concat(res.data.data)
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
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }

      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.newsList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        newsList: list
      });
    }
  },
  touchS: function (e) {
    console.log(e)
    this.setData({
      index: e.target.dataset
    })

    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.newsList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        newsList: list
      });
    }
  },
  delItem(e){
    console.log(e)
    app.http({
      url:'/user/delete-my-msg',
      dengl:true,
      method:'POST',
      data:{id:e.currentTarget.dataset.id},
      success(res){
        console.log(res)
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
    // this.setData({
    //   currentPage:1
    // })
    // var data={
    //   limit:10,
    //   page:this.data.currentPage
    // }
    // this.reword(data)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var data = {
      limit: 10,
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