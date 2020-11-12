const app = getApp().globalData;
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
    list: [],
    money: 0,
    isShow: false,
    currentPage: 1,
    loadingType: 0,
    cont: {},
    scr_height: '',
    selectedCon: {},
    sKeyId: ''
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
    } else {
      var data = {
        page: that.data.currentPage,
        page_num: 10
      }
      this.load(data)
      that.setData({
        isShow: false
      })
    }

  },
  addCarts(data) {
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
          if (res.data.code == 0) {
            that.hideModal()
            that.setData({
              currentPage: 1
            })
            var data = {
              page: that.data.currentPage,
              page_num: 10
            }
            that.load(data)
          } else {
            wx.showToast({
              title: '添加失败',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  // 修改购物车数字
  alterCart(data) {
    app.http({
      url: '/shop/mall-update-cart-num',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.code == 0) {} else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      }
    })
  },
  // 加载
  // 获取数据
  load(data) {
    var that = this
    wx.showNavigationBarLoading()
    app.http({
      url: '/shop/mall-cart-list',
      dengl: true,
      method: 'GET',
      data: data,
      success(res) {
        // 店铺
        if (res.data.data.length > 0) {
          res.data.data.map(function (val, i) {
            // 店铺商品
            var arrs = []
            var arr = val.cartMap[val.shopId]
            arr.map(function (vals, iis) {
              var nu = vals.specList
              nu.map(function (item, index) {
                var obj = {}
                obj.goodsId = vals.goodsId
                obj.goodsLogo = vals.goodsLogo
                obj.goodsName = vals.goodsName
                obj.goodsSn = vals.goodsSn
                obj.shopId = vals.shopId
                obj.addCart = item
                obj.checked = false
                arrs.push(obj)
              })
            })
            val.carts = arrs
          })
        }
        that.setData({
          list: res.data.data,
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
  loading(data) {
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
      url: '/shop/mall-cart-list',
      dengl: true,
      method: 'GET',
      data: data,
      success(res) {
        // 店铺
        if (res.data.data.length > 0) {
          res.data.data.map(function (val, i) {
            // 店铺商品
            var arrs = []
            var arr = val.cartMap[val.shopId]
            arr.map(function (vals, iis) {
              var nu = vals.specList
              nu.map(function (item, index) {
                var obj = {}
                obj.goodsId = vals.goodsId
                obj.goodsLogo = vals.goodsLogo
                obj.goodsName = vals.goodsName
                obj.goodsSn = vals.goodsSn
                obj.shopId = vals.shopId
                obj.addCart = item
                obj.checked = false
                arrs.push(obj)
              })
            })
            val.carts = arrs
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
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
  // 大全选
  checkListAll: function (e) {
    var list = this.data.list,
      that = this,
      check_All = this.data.check_All
    this.setData({
      check_All: !check_All
    })
    list.map(function (val, i) {
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
    this.count_price()
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
        val.carts.map(function (v, ii) {
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
    this.count_price()
  },
  // 单选
  checks: function (e) {
    var check = e.detail.value,
      i = e.currentTarget.dataset.idex,
      ii = e.currentTarget.dataset.index,
      list = this.data.list,
      that = this
    list[i].carts[ii].checked = !list[i].carts[ii].checked
    // 计算数字
    this.setData({
      list: list
    })
    this.checkout(i)
    this.count_price()
  },
  // 计算金额
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    list.map(function (val, i) {
      for (let j = 0; j < val.carts.length; j++) {
        if (val.carts[j].checked) {
          // 所有价格加起来 count_money
          total += val.carts[j].addCart.goodsNum * val.carts[j].addCart.goodsPrice;
        }
      }
    })
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      money: total
    });
  },

  // 检验是否全选
  checkout: function (index) {
    var list = this.data.list,
      len = this.data.list[index].carts.length,
      lens = this.data.list.length,
      lenIndex = 0,
      lensIndex = 0,
      that = this
    list[index].carts.map(function (val, i) {
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
      val.carts.map(function (va, ii) {
        va.checked = val.checkeds
      })

    })
  },
  showModal(e) {
    var that = this
    var types = e.currentTarget.dataset.type.split('_')
    console.log(types)
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
    app.http({
      url: '/shop/mall-goods-detail',
      method: 'GET',
      data: {
        goods_id: e.currentTarget.dataset.id
      },
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
            console.log(val, types)
            types.map(function (item, index) {
              if (val.itemId == item) {
                val.status = true
                obj.type = true
              }
            })
          })
          arr.push(obj)
        }
        res.data.data.specs = arr
        var specsList = res.data.data.spec_price
        for (let key in specsList) {
          if (e.currentTarget.dataset.type == key) {
            that.setData({
              selectedCon: specsList[key]
            })
          }
        }
        that.setData({
          cont: res.data.data,
        })
      }
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
        list.specs[index].type = val.status
        // if (val.status) {
        //   list.specs[index].type = true
        // } else {
        //   list.specs[index].type = false
        // }
      } else {
        val.status = false
      }
    })
    var arr = [],
      chara = ''
    list.specs.map(function (val, i) {
      val.value.map(function (v, ii) {
        console.log(val, v)
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
      if (key == chara) {
        that.setData({
          selectedCon: list.spec_price[key]
        })
      }
    }
    console.log(this.data.selectedCon)
    list.specs.map(function (val, i) {
      console.log(val, 867)
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
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  submit() {
    this.addCarts()
  },
  // 减
  bindMinus: function (e) {
    var index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      list = this.data.list,
      num = list[index].carts[indexs].addCart.goodsNum,
      that = this
    if (num > 1) {
      list[index].carts[indexs].addCart.goodsNum--
      var data = {
        num: e.currentTarget.dataset.num - 1,
        cartId: e.currentTarget.dataset.id
      }
      that.alterCart(data)
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
    list[index].carts[indexs].addCart.goodsNum = e.detail.value
    var data = {
      num: e.detail.value,
      cartId: e.currentTarget.dataset.id
    }
    this.alterCart(data)
    this.setData({
      list: list
    })
  },
  // 加
  bindPlus: function (e) {
    var index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      list = this.data.list
    list[index].carts[indexs].addCart.goodsNum++
    var data = {
      num: e.currentTarget.dataset.num + 1,
      cartId: e.currentTarget.dataset.id
    }
    this.alterCart(data)
    this.setData({
      list: list
    })
  },
  delCar(e) {
    var del = this.data.isDel
    this.setData({
      isDel: !del,
      sKeyId: e.currentTarget.dataset.id
    })
  },
  confirmT() {
    var that = this
    app.http({
      url: '/shop/mall-cart-del',
      data: {
        specKeyId: this.data.sKeyId
      },
      method: 'GET',
      dengl: true,
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            isDel: false
          })
          that.setData({
            currentPage: 1
          })
          var data = {
            page: that.data.currentPage,
            page_num: 10
          }
          that.load(data)
        }
      }
    })
    // this.delCar()
  },
  // 取消删除
  delCancel() {
    this.setData({
      isDel: false
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
    var data = {
      page: this.data.currentPage + 1,
      page_num: 10
    }
    this.loading(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})