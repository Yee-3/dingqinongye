// pages/y-xinjianshdz/y-xinjianshdz.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapVal: '',
    cityValue: '选择地址',
    cityList: ['山东省', '济南市', '槐荫区'],
    nameVal: '',
    phoneVal: '',
    chcekeds: false,
    id: '',
    isDel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.id) {
      this.setData({
        id: options.id,
        cityValue: options.map,
        mapVal: options.adress,
        cityList: options.map.toString().split(','),
        nameVal: options.name,
        phoneVal: options.phone,
        chcekeds: options.status == "Y" ? true : false
      })
    }
  },
  // 删除弹框
  delShow(){
    var del=this.data.isDel
    this.setData({
      isDel:!del
    })
  },
  // 地图
  getLocation(e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var location = res.address
        that.setData({
          mapVal: res.address
        })
      }
    })
  },
  // 选择省市区
  bindRegionChange: function (e) {
    this.setData({
      cityValue: e.detail.value,
      cityList: e.detail.value,
    })
  },
  // 获取手机号和收货人
  obtain(e) {
    var type = e.currentTarget.dataset.type,
      that = this
    if (type == 1) {
      that.setData({
        nameVal: e.detail.value
      })
    } else {
      that.setData({
        phoneVal: e.detail.value
      })
    }
  },
  getMap(e) {
    this.setData({
      mapVal: e.detail.value
    })
  },
  typeChange(e) {
    this.setData({
      chcekeds: e.detail.value
    })
  },
  submit() {
    var that = this
    if (!this.data.nameVal) {
      wx.showToast({
        title: '请输入收件人姓名',
        icon: 'none'
      })
    } else if (!app.checkPhone(this.data.phoneVal)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (!this.data.phoneVal) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (this.data.cityValue == '选择地址') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    } else if (!this.data.mapVal) {
      wx.showToast({
        title: '请输入或选择详细地址',
        icon: 'none'
      })
    } else {
      app.http({
        url: '/user/save-or-update-address',
        dengl: true,
        method: 'POST',
        header: true,
        data: JSON.stringify({
          address: that.data.mapVal,
          province: that.data.cityList[0],
          city: that.data.cityList[1],
          county: that.data.cityList[2],
          name: that.data.nameVal,
          phone: that.data.phoneVal,
          status: that.data.chcekeds == true ? 'Y' : 'N',
          id: that.data.id ? that.data.id : 0
        }),
        success(res) {
          if (res.data.code == 0) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.onLoad()
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    }
  },
  // 删除收货地址
  delete() {
    var that=this
    app.http({
      url: '/user/delete-address-info',
      dengl: true,
      method: 'POST',
      data: {
        addressId: this.data.id
      },
      success(res) {
        if (res.data.code == 0) {
         that.delShow()
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.onLoad()
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  // 
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