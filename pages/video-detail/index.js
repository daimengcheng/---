// pages/video-detail/index.js
import {getMVData,getMVAddress} from '../../service/video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0, //视频id
    mvData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = options.id
    this.setData({id:options.id})

    // 获取mv数据
    const mvData = await getMVData(id)
    console.log(mvData)
    // 获取mv播放地址
    const mvUrl = await getMVAddress(id)
    console.log(mvUrl)
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