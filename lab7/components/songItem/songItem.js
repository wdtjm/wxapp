// components/songItem/songItem.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    singer:{
      type:String,
      value:{}
    }
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
    ready:function(){
      console.log(this.properties.item,this.properties.singer);
    },
  }
})