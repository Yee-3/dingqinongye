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
    title2_index:0,
    lists:[],
    currentPage: 1,
    loadingType: 0,
    contList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
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
    // 首页信息
    app.http({
      url:'/oauth/robot/index-robot-info',
      dengl:false,
      method:'POST',
      data:{},
      success(res){
        console.log(res)
        if(res.data.data.newsHotList){
          var arr=res.data.data.newsHotList
          arr.map(function(val,i){
            val.createTime=val.createTime.substring(0,10)
          })
        }
        that.setData({
          lists:res.data.data
        })
      }
    })
    // 首页订单推荐
    var data={
      status:this.data.title2_index,
      limit:5,
      page:this.data.currentPage
    }
    this.reword(data)
  },
  // 获取数据
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/oauth/robot/index-get-hot-demand-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            var time = val.workTime

            function format(x) {
              return x < 10 ? '0' + x : x
            }
            let d = new Date(time);
            val.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
            val.imgs = val.img.split(',')
          })
          console.log(res.data.data)
        }
        that.setData({
          contList: res.data.data
        })
        if (res.data.data.length < 5) {
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
      url: '/oauth/robot/index-get-hot-demand-list',
      dengl: false,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.data.length > 0) {
          var arr = res.data.data
          arr.map(function (val, i) {
            var time = val.workTime

            function format(x) {
              return x < 10 ? '0' + x : x
            }
            let d = new Date(time);
            val.valTime = d.getFullYear() + '.' + format((d.getMonth() + 1)) + '.' + format((d.getDate()))
            val.imgs = val.img.split(',')
          })
        }
        that.setData({
          contList: that.data.contList.concat(res.data.data)
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
  scroll(e) {
    // console.log(e)
  },
  // 搜索
  focus() {
    wx.navigateTo({
      url: '../one-h-sousuo/one-h-sousuo',
    })
  },
  gxsList(){
    wx.navigateTo({
      url: '../one-j-gongxiaoslb/one-j-gongxiaoslb',
    })
  },
  // 分类列表
  listIn(e) {
    wx.navigateTo({
      url: '../one-d-fenleilb/one-d-fenleilb?id='+e.currentTarget.dataset.id,
    })
  },
  // 热门订单标题切换
  title_1(e){
    this.setData({
      title1_index:e.currentTarget.dataset.index,
      title2_index:0,
      currentPage:1
    })
    if(e.currentTarget.dataset.index==1){
      var data={
        status:0,
        limit:5,
        page:this.data.currentPage
      }
      this.reword(data)
    }
  },
  // 推荐二级标题切换
  title_2(e){
    var that=this
    this.setData({
      title2_index:e.currentTarget.dataset.index,
      currentPage:1
    })
    if(this.data.title1_index==1){
      var data={
        status:this.data.title2_index,
        limit:5,
        page:this.data.currentPage
      }
      this.reword(data)
    }
    
  },
  // 热门资讯更多
  moreIn(){
    wx.switchTab({
      url: '../one-q-zixun/one-q-zixun',
    })
  },
  // 资讯详情
  infoDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../one-r-zixunxq/one-r-zixunxq?id='+e.currentTarget.dataset.id,
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
    var that = this
    var data = {
      limit: 10,
      status: this.data.title2_index,
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