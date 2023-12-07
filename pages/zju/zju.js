// pages/zju/zju.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:23.098994,
    longitude:113.322520,
    markers:[{
      id:1,
      latitude:23.098994,
      longitude:113.322520,
      width:30,
      height:30,
      title:'腾讯大厦',
    }]
  },
  moveToLocation:function(event){
    console.log(event);
    let that = this;
    wx.getLocation(
      {
        type: 'wgs84',
        success(res){
          const latitude = res.latitude
          const longitude = res.longitude
          that.setData({
            latitude:latitude,
            longitude:longitude,
            markers:[{
              id:1,
              latitude:latitude,
              width:30,
              height:30,
              longitude:longitude,
              title:'当前位置',
            }]
          })
        }
      }
    )
  },
  moveBack: function(event){
    console.log(event);
    this.setData({
      latitude: 23.098994,
      longitude: 113.322520,
      markers: [{
        id: 1,
        latitude: 23.098994,
        longitude: 113.322520,
        width:30,
       height:30,
        title: '腾讯大厦',
      }]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

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
    const promise = new Promise(resolve =>{
      setTimeout(()=>{
        resolve({
          title: '转发'
        })
      },2000)
    })
    return {
      title: '转发',
      path: '/pages/zju/zju',
      promise
    }
  }
})