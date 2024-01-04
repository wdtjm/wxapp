// pages/broad.js

import fetchData from "../../datas/broad.js";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer:null,
    poster:null,
    dataSource:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const broad = await fetchData();

    console.log("broad",broad);
    this.setData({
      dataSource:broad,
      poster:'https://y.qq.com/music/common/upload/t_music_radio/4492404.png?max_age=2592000'
    });
    console.log("songList",this.data.dataSource);
    
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

  }
})