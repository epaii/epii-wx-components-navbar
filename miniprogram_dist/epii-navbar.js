// conmon/components/navbar/epii-navbar.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    activeIndex:{
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) { 

        this.setData({
          
          sliderOffset: this.data.tabWidth * newVal
        });
      }
    },
    sliderOffset: {
      type: Number,
      value: 0
    },
    sliderLeft: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabWidth:0
  },
  ready: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          tabWidth: res.windowWidth / that.data.tabs.length
        });
      }
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function (e) {
      console.log(e.currentTarget);
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    }
  }
})
 