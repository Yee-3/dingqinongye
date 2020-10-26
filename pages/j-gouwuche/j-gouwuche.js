// pages/j-gouwuche/j-gouwuche.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDel: false,
    num: 1,
    hideFlag: true,
    check_All: false,
    animationData: {},
    list: [{
        shopName: "报业大厦供销社",
        id: 1,
        children: [{
            name: "70%吡虫啉20g杀虫剂农药",
            id: 1,
            guige: "红色蓝色",
            num: '3',
            money: 666
          },
          {
            name: "70%吡虫啉20g杀虫剂农药3223",
            id: 2,
            guige: "农药产品",
            num: '4',
            money: 777
          }
        ]
      },
      {
        shopName: "汇金金融中心",
        id: 2,
        children: [{
            name: "70%吡虫啉20g杀虫剂农药经费和第三",
            id: 3,
            guige: "红色蓝色",
            num: '3',
            money: 666
          },
          {
            name: "70%吡虫啉20g杀虫剂农药322是懂法守法3",
            id: 4,
            guige: "农药产品",
            num: '4',
            money: 777
          }
        ]
      }
    ],
    money: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = this.data.list
    list.map(function (val, i) {
      val.children.map(function (vals, iis) {
        vals.checked = false
      })
    })
    this.setData({
      list: list
    })
  },
  // 大全选
  checkListAll: function (e) {
    var list = this.data.list,
      that = this,
      check_All = this.data.check_All
    this.setData({
      check_All: !check_All
    })
    console.log(e, this.data.check_All)
    list.map(function (val, i) {
      console.log(val)
      if (that.data.check_All) {
        val.checkeds = true
      } else {
        val.checkeds = false
      }
      that.checkAllOut()
    })
    this.setData({
      list: list
    })
    console.log(list)
  },
  // 全选
  checkAll: function (e) {
    var list = this.data.list,
      ii = e.currentTarget.dataset.index,
      lens = list.length,
      lensIndex = 0
    list.map(function (val, i) {
      if (ii == i) {
        val.checkeds = !val.checkeds
        val.children.map(function (v, ii) {
          v.checked = val.checkeds
        })
      }
      val.checkeds ? lensIndex++ : ''
    })
    if (lens == lensIndex) {
      this.setData({
        check_All: true
      })
    } else {
      this.setData({
        check_All: false
      })
    }
    this.setData({
      list: list
    })
    console.log(e, list)
  },
  // 单选
  checks: function (e) {
    console.log(e)
    var check = e.detail.value,
      i = e.currentTarget.dataset.idex,
      ii = e.currentTarget.dataset.index,
      list = this.data.list,
      that = this

    list[i].children[ii].checked = !list[i].children[ii].checked
    list.map(function (v, i) {
      var mone = e.currentTarget.dataset.money,
        num = e.currentTarget.dataset.num
      v.children.map(function (val, ii) {
        if (val.checked) {
          that.setData({
            money: mone * num
          })
        }
      })
    })
    this.setData({
      list: list
    })
    this.checkout(i)
  },
  // 检验是否全选
  checkout: function (index) {
    var list = this.data.list,
      len = this.data.list[index].children.length,
      lens = this.data.list.length,
      lenIndex = 0,
      lensIndex = 0,
      that = this
    list[index].children.map(function (val, i) {
      if (val.checked) {
        lenIndex++
      }
    })
    if (len == lenIndex) {
      list[index].checkeds = true
      list.map(function (v, ii) {
        if (v.checkeds) {
          lensIndex++
        }
      })
      if (lens == lensIndex) {
        that.setData({
          check_All: true
        })
      }
    } else {
      list[index].checkeds = false
      this.setData({
        check_All: false
      })
    }

    this.setData({
      list: list
    })
  },
  // 校验全选
  checkAllOut: function () {
    var list = this.data.list
    list.map(function (val, i) {
      val.children.map(function (va, ii) {
        va.checked = val.checkeds
      })

    })
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
  submit() {

  },
  // 减
  bindMinus: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      list = this.data.list,
      num = list[index].children[indexs].num
    console.log(num)
    if (num > 1) {
      list[index].children[indexs].num--
    } else {
      num = 1
      wx.showToast({
        title: '数量不能低于1',
        icon: 'none'
      })
    }
    this.setData({
      list: list
    })
  },
  // 修改
  bindManual: function (e) {
    var index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      list = this.data.list
      list[index].children[indexs].num=e.detail.value
    this.setData({
      list: list
    })
  },
  // 加
  bindPlus: function (e) {
    var index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      list = this.data.list
    list[index].children[indexs].num++
    this.setData({
      list: list
    })
  },
  delCar() {
    var del = this.data.isDel
    this.setData({
      isDel: !del
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