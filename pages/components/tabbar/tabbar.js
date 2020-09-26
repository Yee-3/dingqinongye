Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbar:{},
    curRoute:'pages/a-index/a-index',
      list: [
        {
          pagePath: "pages/a-index/a-index",
          text: "首页",
          iconPath: "../../img/d_1.png",
          selectedIconPath: "../../img/d_11.png"
        },
        {
          pagePath: "pages/f-shangcheng/f-shangcheng",
          text: "商城",
          iconPath: "../../img/d_2.png",
          selectedIconPath: "../../img/d_22.png"
        },
        {
          pagePath: "pages/k-zixun/k-zixun",
          text: "资讯",
          iconPath: "../../img/d_3.png",
          selectedIconPath: "../../img/d_33.png"
        },
        {
          pagePath: "pages/m-wode/m-wode",
          text: "我的",
          iconPath: "../../img/d_4.png",
          selectedIconPath: "../../img/d_44.png"
        }
      ]
  },

  attached(){
    let pages = getCurrentPages();
    this.data.curRoute = pages[pages.length-1].route;
    this.setData(this.data)

  },
  /**
   * 组件的方法列表
   */
  methods: {
    redirectTo(e){
      let taburl = e.currentTarget.dataset.taburl;
      if(taburl == this.data.curRoute) return
      wx.redirectTo({
        url:"/"+taburl
      })
      this.triggerEvent("toggle");
    },
  }
})