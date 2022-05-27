// pages/home-audio/index.js
import {getHomeBanners} from '../../service/audio'
import queryRect from '../../utils/query-rect'
import {throttle,debounce} from '../../utils/Throttle'
// const throttleQueryRect = throttle(queryRect)
const debounceQueryRect = debounce(queryRect)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],//首页轮播图数据
    swiperHeihgt:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getHomeBanners()
    this.setData({banners:res.banners})
  },

  // 点击页面跳转搜索页面
  toSearchDetail(){
    wx.navigateTo({
      url: '/pages/search-detail/index',
    })
  },

  // 当图片加载完成时的回调
  handleImageBindLoad(){
    // queryRect(".image").then(res=>{this.setData({swiperHeihgt:res[0].height})})
    // 使用节流优化性能
    // throttleQueryRect(".image").then(res=>{this.setData({swiperHeihgt:res[0].height})})
    // 使用防抖优化性能
    debounceQueryRect(".image").then(res=>{this.setData({swiperHeihgt:res[0].height})})
  }
})