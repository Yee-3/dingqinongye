// const app = getApp();
const app = getApp().globalData;
const createSharePic = require('../../utils/createSharePic');
Page({
  data: {
    CustomBar: app.CustomBar,
    checkbox: [],
    hideFlag: true,
    animationData: {},
    isPhone: false,
    num: 1,
    isBuy: false,
    goodsId: '',
    cont: {},
    isShow: false,
    priceList: {},
    togIndex: '',
    scr_height: '',
    selectedCon: {},
    isTypes: ''
  },
  onLoad(options) {
    var that = this
    this.setData({
      goodsId: options.id
    })
    var that = this
    if (!wx.getStorageSync('Authorization')) {
      setTimeout(function () {
        that.setData({
          isShow: true
        })
      }, 500)
    } else {
      this.loading()

    }

  },
  loading() {
    var that = this
    app.http({
      url: '/shop/mall-goods-detail',
      data: {
        goods_id: that.data.goodsId
      },
      method: 'GET',
      dengl: true,
      success(res) {
        var arr = []
        var list = res.data.data.specs
        for (let i in list) {
          var obj = {}
          obj.name = i
          obj.value = list[i]
          obj.type = false
          obj.value.map(function (val, ii) {
            val.status = false
          })
          arr.push(obj)
        }
        res.data.data.specs = arr
        res.data.data.detail.imgs = res.data.data.detail.goodsLogo.split(',')
        that.setData({
          cont: res.data.data,
          priceList: res.data.data.spec_price,
          isShow: false
        })
        let query = wx.createSelectorQuery();
        query.select('#get_height').boundingClientRect(rect => {
          let clientHeight = rect.height;
          let clientWidth = rect.width;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio * 2;
          that.setData({
            scr_height: height
          })
        }).exec();
      }
    })
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
                    that.loading()
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
  // 减
  bindMinus: function () {
    var num = this.data.num
    if (num > 1) {
      num--
    } else {
      num = 1
      wx.showToast({
        title: '数量不能低于1',
        icon: 'none'
      })
    }
    this.setData({
      num: num
    })
  },
  // 修改
  bindManual: function (e) {
    this.setData({
      num: e.datail.value
    })
  },
  // 加
  bindPlus: function () {
    var num = this.data.num
    num++
    this.setData({
      num: num
    })
  },
  // 客服
  customerSer() {
    var show = this.data.isPhone
    this.setData({
      isPhone: !show
    })
  },
  // 切换
  toggle(e) {
    var list = this.data.cont,
      index = e.currentTarget.dataset.ide,
      ii = e.currentTarget.dataset.index,
      that = this
    list.specs[index].value.map(function (val, i) {
      if (ii == i) {
        val.status = !val.status
        if (val.status) {
          list.specs[index].type = true
        } else {
          list.specs[index].type = false
        }
      } else {
        val.status = false
      }
    })
    var arr = [],
      chara = ''
    list.specs.map(function (val, i) {
      val.value.map(function (v, ii) {
        if (v.status) {
          arr.push(v.itemId)
        }
      })
      arr = arr.sort(function (a, b) {
        return a - b
      })
      chara = arr.join('_')
    })
    for (let key in list.spec_price) {
      if (chara == key) {
        that.setData({
          selectedCon: list.spec_price[key]
        })
      }
    }
    list.specs.map(function (val, i) {
      if (!val.type) {
        that.setData({
          selectedCon: {}
        })
      }
    })
    this.setData({
      cont: list
    })
  },
  submit() {
    if (this.data.isBuy) {
      this.hideModal()
      wx.navigateTo({
        url: '../h-tijiaodingdan/h-tijiaodingdan',
      })
    }
  },
  showModal(e) {
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        isBuy: true,
        modalName: e.currentTarget.dataset.target,
        isTypes: e.currentTarget.dataset.type
      })
    } else if (e.currentTarget.dataset.type == 2) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        isBuy: false,
        isTypes: e.currentTarget.dataset.type
      })
    } else {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        isBuy: true,
        isTypes: e.currentTarget.dataset.type
      })
    }
  },
  addCart() {
    var list = this.data.cont.specs,
      cot = this.data.selectedCon,
      that = this
    if (!cot.goodsId) {
      list.map(function (val, i) {
        if (!val.type) {
          wx.showToast({
            title: '请选择' + val.name + '分类',
            icon: 'none'
          })
        }
      })
    } else {
      app.http({
        url: '/shop/mall-add-cart',
        dengl: true,
        method: 'POST',
        header: true,
        data: JSON.stringify({
          cartAttr: [{
            goodsNum: that.data.num,
            specKey: cot.key
          }],
          goodsId: cot.goodsId
        }),
        success(res) {
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '添加成功',
            })
             that.hideModal()
          }else{
            wx.showToast({
              title: '添加失败',
              icon:'none'
            })
          }
        }
      })
    }   
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  shopCar() {
    wx.navigateTo({
      url: '../j-gouwuche/j-gouwuche',
    })
  },
  store() {
    wx.navigateTo({
      url: '../one-k-gongxiaosxqy/one-k-gongxiaosxqy',
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },
  // 显示遮罩层
  showModal1: function () {
    var that = this;
    this.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间
      timingFunction: 'ease', //动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn(); //调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },
  hideModal1: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown(); //调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220) //先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  // 分享
  onShareAppMessage: function () {
    var that = this
    createSharePic.createSharePicUrl(this,
      'https://img2018.cnblogs.com/blog/735803/201901/735803-20190118174652016-1046321986.png',
      '名字',
      '对加沙',
      '发射点发生', () => {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          x: 0,
          y: 0,
          width: 250,
          height: 200,
          success(res) {
            that.setData({
              sharePicUrl: res.tempFilePath,
            });
          },
        }, that);
      });
  }
})