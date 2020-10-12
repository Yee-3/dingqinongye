// pages/two-p-tianjiaxinnj/two-p-tianjiaxinnj.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeId: '',
    list: [],
    isShow: false,
    brandId: '',
    brandValue: '请选择',
    listTwo: [],
    isTwo: false,
    modelId: '',
    modelName: '请选择',
    numValue: '',
    img: '../img/f057.png',
    isDel:false,
    delShow:true,
    id:'',
    ty:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.select = this.selectComponent("#select");
    console.log(options)
    if (options) {
      this.setData({
        typeId: options.typeId,
        name: options.name
      })
    }
    if(options.id){
      this.setData({
        delShow:true,
        img:options.img,
        id:options.id,
        brandValue:options.bVal,
        modelName:options.mVal,
        modelId:options.mId,
        brandId:options.bId,
        numValue:options.num
      })
      this.select.setData({
        id:options.bId
      })
    }else{
      this.setData({
        delShow:false
      })
    }
    if(options.ty){
      this.setData({
        ty:options.ty
      })
    }
    var that = this
    app.http({
      url: '/robot/user/get-all-brand-list',
      dengl: true,
      data: '',
      method: 'POST',
      success(res) {
        console.log(res)
        that.setData({
          list: res.data.data,
        })
      }
    })

  },
  brandShow() {
    var show = this.data.isShow
    this.setData({
      isShow: !show
    })
  },
  checked(e) {
    console.log(e)
    this.brandShow()
    this.setData({
      brandId: e.detail.id,
      brandValue: e.detail.value
    })
  },
  modelCheck(e) {
    console.log(e)
    var show = this.data.isTwo
    this.setData({
      isTwo: !show,
      modelId: e.currentTarget.dataset.id,
      modelName: e.detail.value,
    })
  },
  modelShow() {
    if (!this.data.brandId) {
      wx.showToast({
        title: '请先选择农机品牌！',
        icon: 'none'
      })
    } else {
      var show = this.data.isTwo,
        that = this
      this.setData({
        isTwo: !show
      })
      if (this.data.isTwo) {
        app.http({
          url: '/robot/user/get-model-list-by-brandId',
          dengl: true,
          data: {
            brandId: that.data.brandId
          },
          method: 'POST',
          success(res) {
            console.log(res)
            that.setData({
              listTwo: res.data.data
            })
          }

        })
      }
    }


  },
  getValue(e) {
    console.log(e)
    this.setData({
      numValue: e.detail.value
    })
  },
  // 上传图片
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
        that.setData({
          img: res.tempFilePaths
        })
      }
    })
  },
  submit() {
    var that = this
    if (!this.data.brandId) {
      wx.showToast({
        title: '请选择农机品牌',
        icon: 'none'
      })
    } else if (!this.data.modelId) {
      wx.showToast({
        title: '请选择农机类型',
        icon: 'none'
      })
    } else if (!this.data.numValue) {
      wx.showToast({
        title: '输入农机数量',
        icon: 'none'
      })
    } else {
      app.http({
        url: '/robot/user/save-my-machinery',
        dengl: true,
        data: {
          brandId: that.data.brandId,
          img: that.data.img,
          modelId: that.data.modelId,
          num: that.data.numValue,
          typeId: that.data.typeId,
          id: that.data.id ? that.data.id : ''
        },
        method: 'POST',
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            var pages = getCurrentPages(); //获取页面栈
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //调用上一个页面的onShow方法
            if(that.data.id){
              var page = pages[pages.length - 3];
              prePage.setData({
                typeId:that.data.typeId
              })
              page.onLoad()
            }
            if(that.data.ty){
              var page = pages[pages.length - 3];
              prePage.setData({
                typeId:that.data.typeId
              })
              page.onLoad()
            }
            prePage.onLoad()
            wx.navigateBack({
              delta: 1,
            })
          }
        }

      })
    }

  },
  // 删除
  delete(e){
    var del=this.data.isDel
    this.setData({
      isDel:!del
    })
  },
  confirmDel(){
    var that=this
    app.http({
      url:'/robot/user/delete-my-machinery',
      data:{id:that.data.id},
      method:'POST',
      dengl:true,
      success(res){
        console.log(res)
        if(res.data.code==0){
           var pages = getCurrentPages(); //获取页面栈
            var prePage = pages[pages.length - 2];
            var page = pages[pages.length - 3];
            prePage.setData({
              typeId:that.data.typeId
            })
            page.onLoad()
            prePage.onLoad()
            wx.navigateBack({
              delta: 1,
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