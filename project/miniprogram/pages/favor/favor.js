import fetchData from"../../datas/songList.js";

// pages/favor/favor.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorlist:[],
    dataSource:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // ...
    const temp = await fetchData();
    console.log("temp of songList:",temp)
    console.log("temp.data[0].songList:",temp.data[0].songList)
    const songList = temp.data[0];
    console.log("songList",songList);
      console.log("favorlist1",this.data.favorlist);
    this.setData({
      favorlist:app.globalData.favorMusics,
    })
    console.log("favormusics:",app.globalData.favorMusics);
    console.log("favorlist2",this.data.favorlist);
    const db = wx.cloud.database({
        env: 'project-9gtqtarndcb0d90b'
    });

    let list = [];

    (async () => {
        for (var i = 0; i < this.data.favorlist.counterIds.length; i++) {
            const res = await db.collection("music_favor").where({
                _id: this.data.favorlist.counterIds[i]
            }).get();

            console.log('res.data[0]', res.data[0]);
            list.push(res.data[0]);
        }

        console.log('list:', list);

        let updatedDataSource = [];

        for (var i = 1; i < list.length; i++) {
            let songData = {}; // Create an object to store song data

            switch (list[i].singer) {
                case "周杰伦":
                    songData = { ...songList.zhouJieLun[list[i].sid - 1], singer: list[i].singer };
                    break;
                case "李荣浩":
                    songData = { ...songList.liRongHao[list[i].sid - 1], singer: list[i].singer };
                    break;
                case "许嵩":
                    songData = { ...songList.xuSong[list[i].sid - 1], singer: list[i].singer };
                    break;
                default:
                    // Handle other cases if needed
                    break;
            }

            updatedDataSource.push(songData);
        }

        this.setData({
            dataSource: updatedDataSource
        });

        console.log("dataSource-1", this.data.dataSource);
    })();
},
  // onLoad(options) {
  //   console.log("favorlist1",this.data.favorlist);
  //   this.setData({
  //     favorlist:app.globalData.favorMusics,
  //   })
  //   console.log("favormusics:",app.globalData.favorMusics);
  //   console.log("favorlist2",this.data.favorlist);

  //   const db = wx.cloud.database({
  //     env:'project-9gtqtarndcb0d90b'
  //   })
  //   let list=[]
  //   for(var i=1;i<this.data.favorlist.counterIds.length;i++){
  //    db.collection("music_favor").where({
  //       _id:this.data.favorlist.counterIds[i]
  //     }).get({
  //       success(res){
  //         console.log('res.data[0]',res.data[0])
  //         list[i-1]=res.data[0]
  //       }
  //     })   
  //   }
  //   console.log('list:',list)
  //   this.setData({
  //     dataSource:list
  //   })
  //   console.log("dataSource",this.data.dataSource);
  //   console.log("dataSource-0",this.data.dataSource[1]);
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})