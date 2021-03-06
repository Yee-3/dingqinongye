// pages/c-fabuxuqiunr/c-fabuxuqiunr.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    dateValue: '年-月-日',
    cityValue: '省/市/区',
    cityList: ['山东省', '济南市', '槐荫区'],
    imgList: [],
    mjVal: '',
    numVal: '',
    monVal: '',
    disVal: '',
    phonVal: '',
    nameVal: '',
    dayVal: '',
    typeVal: '',
    cateId: '',
    adressVal: '',
    typeIndex: 'x',
    typeShow: false,
    check: false,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    }
    if (options.id) {
      this.setData({
        cateId: options.id,
        title: options.title
      })
    }

  },
  // 登录
  bindGetUserInfo() {
    var that = this
    wx.login({
      success(res) {
        var code = res.code
        wx.getUserInfo({
          success(resp) {
            if (code) {
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
                success(res) {
                  if (res.data.code == 0) {
                    wx.setStorageSync('Authorization', res.data.data.access_token)
                    wx.showToast({
                      title: '登录成功'
                    })
                    that.setData({
                      isShow: false
                    })
                    that.onLoad()
                  } else {
                    wx.showToast({
                      title: '登录失败'
                    })
                  }
                }
              })
            }
          },
          fail: function (err) {}
        })
      }

    })
  },
  // 输入框事件
  addValueTap(e) {
    var type = e.currentTarget.dataset.type,
      that = this
    if (type == 1) {
      this.setData({
        nameVal: e.detail.value
      })
    } else if (type == 2) {
      this.setData({
        mjVal: e.detail.value
      })
    } else if (type == 3) {
      this.setData({
        numVal: e.detail.value
      })
    } else if (type == 4) {
      this.setData({
        monVal: e.detail.value
      })
    } else if (type == 5) {
      this.setData({
        dayVal: e.detail.value
      })
    } else if (type == 6) {
      this.setData({
        disVal: e.detail.value
      })
    } else if (type == 7) {
      this.setData({
        phonVal: e.detail.value
      })
    } else {
      this.setData({
        adressVal: e.detail.value
      })
    }
  },
  // 提交
  submit() {
    var that = this
    if (!this.data.nameVal) {
      wx.showToast({
        title: '请输入联系人姓名',
        icon: "none"
      })
    } else if (this.data.dateValue == "年-月-日") {
      wx.showToast({
        title: '请选择干活日期',
        icon: "none"
      })
    } else if (!this.data.mjVal) {
      wx.showToast({
        title: '请输入土地面积',
        icon: "none"
      })
    } else if (!this.data.numVal) {
      wx.showToast({
        title: '请输入农机台数',
        icon: "none"
      })
    } else if (!this.data.monVal) {
      wx.showToast({
        title: '请输入作业价格',
        icon: "none"
      })
    } else if (!this.data.dayVal) {
      wx.showToast({
        title: '请输入作业周期',
        icon: "none"
      })
    } else if (this.data.cityValue == '省/市/区') {
      wx.showToast({
        title: '请选择地理位置',
        icon: "none"
      })
    } else if (!this.data.adressVal) {
      wx.showToast({
        title: '请输入详细地址',
        icon: "none"
      })
    } else if (!this.data.disVal) {
      wx.showToast({
        title: '请说明地块情况',
        icon: "none"
      })
    } else if (!app.checkPhone(this.data.phonVal)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
    } else if (!this.data.imgList.length > 0) {
      wx.showToast({
        title: '请上传土地图片',
        icon: "none"
      })
    } else if (this.data.typeIndex == 'x') {
      wx.showToast({
        title: '请选择结款方式',
        icon: "none"
      })
    } else if (!this.data.check) {
      wx.showToast({
        title: '请勾选服务协议',
        icon: "none"
      })
    } else {
      app.http({
        url: '/growers/publish-demand-info',
        dengl: true,
        method: 'POST',
        header: true,
        data: JSON.stringify({
          address: that.data.adressVal,
          cateId: that.data.cateId,
          description: that.data.disVal,
          farmPrice: that.data.monVal,
          img: that.data.imgList.join(),
          landArea: that.data.mjVal,
          machinesNum: that.data.numVal,
          name: that.data.nameVal,
          payMethod: that.data.typeIndex,
          phone: that.data.phonVal,
          workCycle: that.data.dayVal,
          workTime: that.data.dateValue,
          province: that.data.cityList[0],
          city: that.data.cityList[1],
          county: that.data.cityList[2],
          title: that.data.title,
          id: that.data.id ? that.data.id : 0
        }),
        success(res) {
          if (res.data.code == 0) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.onLoad()
            wx.showToast({
              title: '发布成功！',
              duration: 1000,
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              })
            },1000)
              
            
          }
        }
      })
    }


  },
  // 选择协议
  redio() {
    var check = this.data.check
    this.setData({
      check: !check
    })
  },
  // 选择结款方式
  typeTap(e) {
    this.setData({
      typeIndex: e.currentTarget.dataset.index
    })
  },
  // 结款方式确认
  typeConfirm() {
    var show = this.data.typeShow
    var i = this.data.typeIndex,
      that = this
    this.setData({
      typeShow: !show
    })
    if (i == 0) {
      that.setData({
        typeVal: '完活完结'
      })
    } else if (i == 1) {
      that.setData({
        typeVal: '种植户结款'
      })
    }
  },
  // 选择日期
  bindDateChange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  // 选择省市区
  bindRegionChange: function (e) {
    this.setData({
      cityValue: e.detail.value,
      cityList: e.detail.value,
    })
  },
  // 选择图片
  changeImage(e) {
    var that = this
    var imgbox = this.data.imgList
    var picid = e.currentTarget.dataset.pic
    var n = 9
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox == 9) {
      n = 1
    }
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths)
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgList: imgbox
        })
      }
    })
  },
  // 删除图片
  imgDelete: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgList;
    imgbox.splice(index, 1)
    that.setData({
      imgList: imgbox
    });
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