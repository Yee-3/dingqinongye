// pages/components/denglu/denglu.js
const app = getApp().globalData;
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
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
// 登录
bindGetUserInfo() {
  this.triggerEvent("GetInfo");
},
  }
})
