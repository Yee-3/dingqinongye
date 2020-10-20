const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    checkbox: []
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  shopCar(){
    wx.navigateTo({
      url: '../j-gouwuche/j-gouwuche',
    })
  },
  store(){
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
  }
})