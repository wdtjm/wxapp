// components/musicPlayer/musicPlayer.js
var app=getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    song:{
      type:Object,
      value:{}
    }
  },
play:function(){
  app.globalData.audio.play();
  app.globalData.playState = 1;
},
pause:function (){
  app.globalData.audio.pause();
  app.globalData.playState = 0;
},
  /**
   * 组件的初始数据
   */
  data: {
    playState:1,
    musicPic:app.globalData.musicPic,
    musicName: app.globalData.musicName,
    artistName:app.globalData.artistName,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMusic:function(){
      console.log(app.globalData);
      switch(this.data.playState){
        case 0:
          this.setData({
            playState:1
          });
          this.play();
          break;
        case 1:
          this.setData({
            playState:0
          });
          this.pause();
          break;
      }
    }
  }
})