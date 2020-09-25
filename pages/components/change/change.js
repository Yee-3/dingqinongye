// pages/components/change/change.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true,
      observer: "onShow"
    },
    content: {
      type: Array
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    code: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap(e) {
      console.log(e)
      this.setData({
        code: e.currentTarget.dataset.code,
      })
    },
    confirm() {
      wx.setStorageSync("code", this.data.code)
      if (this.data.code == 'robot') {
        this.setData({
          isShow:false
        })
      } else if (this.data.code == 'growers') {
        this.setData({
          isShow:false
        })
        wx.reLaunch({
          url: '/pages/a-index/a-index',
        })
      }
      
      this.triggerEvent("confirm");

    },
  },
  ready() {

  },

})