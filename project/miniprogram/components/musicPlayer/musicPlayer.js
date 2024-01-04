// components/musicPlayer/musicPlayer.js
var app=getApp()

Component({
//组件所在页面的生命周期函数
pageLifetimes: {
  //由第一页进入到第二页时同步播放器的状态
  show: function () {
    this.updateData();
  },
  ready: function(){},
},
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
    playState:app.globalData.playState,
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
    },
    change: function(){
      //切换歌曲
      app.globalData.audio.src = app.globalData.musicUrl;
      app.globalData.playState = 1;
      this.setData({
        playState: 1
      });
      app.globalData.audio.play();
    },
    updateData:function(){
      this.setData({
        musicPic: app.globalData.musicPic,
        musicName: app.globalData.musicName,
        musicUrl: app.globalData.musicUrl,
        artistName: app.globalData.artistName,
        playState: app.globalData.playState
      });
      console.log(this.data.musicName);
    },
  }
})