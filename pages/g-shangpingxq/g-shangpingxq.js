const app = getApp();
const createSharePic = require('../../utils/createSharePic');
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    checkbox: [],
    hideFlag: true,
    animationData: {},
    isPhone: false,
    num: 1,
    isBuy: false,
    goodsId: ''
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      goodsId: options.id
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
      })
    } else {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        isBuy: false
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
            console.log(res.tempFilePath);
            that.setData({
              sharePicUrl: res.tempFilePath,
            });
          },
        }, that);
      });
  }
})