// components/songItem/songItem.js
var app=getApp();
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
    favor: false,
  },
  pageLifetimes:{
    show:function(){
      let states = app.globalData.favorMusics;
      let index = this.properties.item.id;
      this.setData({
        favor: states.musics[index],
        counterId: states.conterIds[index],
      })
    }
  },
  /**
   * 组件的方法列表
   */


  methods: {
    ready:function(){
      console.log("songItem",this.properties.item,this.properties.singer);
    },
    handleClick:function(){
      var musicPlayer = app.globalData.musicPlayer;
      console.log(musicPlayer);

      //更新全局播放器变量的数据
      app.globalData.playState = 1;
      app.globalData.musicPic = this.properties.item.poster;
      app.globalData.musicName = this.properties.item.name;
      app.globalData.musicUrl = this.properties.item.src;
      app.globalData.artistName = this.properties.singer;
      
    //同步当前页播放器的数据
      musicPlayer.setData({
        playState: app.globalData.playState,
        musicPic: app.globalData.musicPic,
        musicName: app.globalData.musicName,
        musicUrl: app.globalData.musicUrl,
        artistName: app.globalData.artistName
      })  
      
      //数据更新完毕，切换歌曲
      musicPlayer.change();
    },
    handleFavor: function(){
      this.setData({
        favor: !this.data.favor
      })
      console.log("handleFavor",this.data.favor)
      if(this.data.favor){
        this.favorMusic();
      }else{
        this.disfavorMusic();
      }
    },
    favorMusic:function(){
      const db = wx.cloud.database({
        env:'project-9gtqtarndcb0d90b'
      });
      db.collection('music_favor').add({
        data:{
          sid:this.properties.item.id,
          singer:this.properties.singer,
          favor:true
        },
        success: res=>{
          this.setData({
            counterId:res._id,
            count:1
          })
          wx.showToast({
            title:'已收藏',
          })
          console.log('[数据库][新增记录] 成功，记录1 _id ',res._id)
          console.log('songItem->this.properties.item',this.properties.item)
          app.globalData.favorMusics.musics[this.properties.item.id] = true
          console.log('counterId:',this.data.counterId)
          app.globalData.favorMusics.counterIds[this.properties.item.id] = this.data.counterId
          console.log("globalData:")
          console.log("globalData",app.globalData.favorMusics)
        },

        fail: err =>{
          wx.showToast({
            icon:'none',
            title:'新增记录失败'
          })
          console.error('[数据库][新增记录] 失败 ： ',err)
        }
      })
    },
    disfavorMusic:function(){
      if(this.data.counterId){
        const db = wx.cloud.database({
          env:'project-9gtqtarndcb0d90b'
        })
        db.collection('music_favor').doc(this.data.counterId).remove({
          success:res=>{
            wx.showToast({
              title:'已取消收藏',
            })
            this.setData({
              counterId:'',
              count:null,
            })
            app.globalData.favorMusics.musics[this.properties.item.id] = false
            app.globalData.favorMusics.counterIds[this.properties.item.id] = null
          },
          fail:err=>{
            wx.showToast({
              icon:'none',
              title:'删除失败',
            })
            console.error('[数据库][删除记录] 失败 ',err)
          }
        })
      }else{
        wx.showToast({
          title:'无counterId，该歌曲还未收藏',
        })
      }
    }
  }
})