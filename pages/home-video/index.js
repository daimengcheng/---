// pages/home-vedio/index.js
import {getTopMvs} from '../../service/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs:[],
    hasMore:true, // 判断是否还有数据请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getTopMvHandler(0)
  },

  // 用于发送请求
  async getTopMvHandler(offset){
    if(!this.data.hasMore) return "" 
    const res = await getTopMvs(offset)
    if(res.data){
      if(offset === 0){
        this.setData({topMvs:res.data})
      }else{
        this.setData({topMvs:this.data.topMvs.concat(res.data)})
      }
      this.setData({hasMore:res.hasMore})
      wx.stopPullDownRefresh()
    }
  },

  // 封装点击事件的函数
  playVideoHandler(event){
    // 获取当前视频的id
    const id = event.currentTarget.dataset.item.id
    
    // 页面跳转
    wx.navigateTo({
      url: '/pages/video-detail/index?id='+id,
    })
  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    this.getTopMvHandler(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */ 
  onReachBottom:function () {
    this.getTopMvHandler(this.data.topMvs.length+10)
  },
})