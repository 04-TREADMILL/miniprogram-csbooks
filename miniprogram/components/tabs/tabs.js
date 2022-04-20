// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tabHandler(e) {
      const { index } = e.currentTarget.dataset;
      console.log(index);

      this.triggerEvent("itemChange", {index});
    },
  },
});
