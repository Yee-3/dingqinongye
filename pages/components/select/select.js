// pages/components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    title: {
      type: String,
      value: '农机品牌'
    },
    isShow: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
    id: '',
    indexs:'x'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel() {
      this.triggerEvent("cancel");
    },
    radioChange(e) {
      console.log(e)
      var that = this
      this.setData({
        id: e.currentTarget.dataset.id,
        value: e.detail.value,
        indexs:e.currentTarget.dataset.index,
      })
      this.triggerEvent("checked", {
        id: that.data.id,
        value: that.data.value,
        
      });
    }
  }
})