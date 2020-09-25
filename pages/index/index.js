// pages/index/index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChange: false,
    isShow: false,
    carList: [],
    title1_index:1,
    title2_index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(!wx.getStorageSync('code')){
      this.setData({
        isChange:true
      })
     
    }
    if (this.data.isChange) {
      var that = this
      app.http({
        url: '/oauth/get-user-identity-list',
        method: 'POST',
        data: {},
        success(res) {
          console.log(res)
          that.setData({
            carList: res.data.data
          })
          console.log(that.data.carList)
        }
      })
    }
  },
  // 搜索
  focus() {
    wx.navigateTo({
      url: '../one-h-sousuo/one-h-sousuo',
    })
  },
  // 分类列表
  listIn() {
    wx.navigateTo({
      url: '../one-d-fenleilb/one-d-fenleilb',
    })
  },
  // 热门订单标题切换
  title_1(e){
    this.setData({
      title1_index:e.currentTarget.dataset.index,
      title2_index:1
    })
  },
  // 推荐二级标题切换
  title_2(e){
    this.setData({
      title2_index:e.currentTarget.dataset.index
    })
  },
  // 热门资讯更多
  moreIn(){
    wx.switchTab({
      url: '../one-q-zixun/one-q-zixun',
    })
  },
  // 资讯详情
  infoDetail(){
    wx.navigateTo({
      url: '../one-r-zixunxq/one-r-zixunxq',
    })
  },
  // 订单详情
  proDetail(){
    wx.navigateTo({
      url: '../one-e-daijiedxqy/one-e-daijiedxqy',
    })
  },
  chanConfirm() {
    var change = this.data.isChange
    // this.setData({
    //   isChange:false
    // })
  },
  // 登录
  bindGetUserInfo() {
    console.log( wx.getStorageSync('code'))
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
                success(res){
                 if(res.data.code==0){
                  wx.setStorageSync('Authorization', res.data.data.access_token)
                  wx.showToast({
                    title: '登录成功'
                  })
                   this.setData({
                     isShow:false
                   })
                 }else{
                   console.log(res)
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