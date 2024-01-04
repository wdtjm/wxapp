// app.js
import DEFAULT_MUSIC from './config/index';
App({
  onLaunch() {
    if(!wx.cloud){
      console.error('请使用2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'project-9gtqtarndcb0d90b',
        traceUser:true,
      })
    }
    // // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.globalData.audio.src = DEFAULT_MUSIC.DEFAULT_MUSIC.musicUrl;
    this.getFavorMusics();
  },
  getFavorMusics:function(){
    console.log("getFavorMusics")
    const db = wx.cloud.database({
      env:'project-9gtqtarndcb0d90b'
    })
    db.collection('music_favor').field({
      sid:true,
      _id:true,
    }).get({
      success:res=>{
        let musics = new Array(res.data.length + 1);
        let counterIds = new Array(res.data.length + 1);

        res.data.forEach(function(item,index){
          musics[item.sid] = true
          counterIds[item.sid] = item._id
        });
        console.log('musics,counterIds:',musics,counterIds);
        this.globalData.favorMusics = {
          musics : musics,
          counterIds:counterIds
        };
        console.log("app launch favormusics:",this.globalData.favorMusics);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title:'查询记录失败'
        })
        console.error('[数据库][查询记录] 失败 ： ',err)
      }
    })
  },
  globalData: {
    userInfo: null,
    audio:wx.createInnerAudioContext(),
    playState:DEFAULT_MUSIC.DEFAULT_MUSIC.playState,
    musicPic:DEFAULT_MUSIC.DEFAULT_MUSIC.musicPic,
    musicName:DEFAULT_MUSIC.DEFAULT_MUSIC.musicName,
    musicUrl:DEFAULT_MUSIC.DEFAULT_MUSIC.musicUrl,
    artistName:DEFAULT_MUSIC.DEFAULT_MUSIC.artistName,
    musicPlayer:null,
    favorMusics:{},
  }
})
