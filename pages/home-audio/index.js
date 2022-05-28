// pages/home-audio/index.js
import { recommendStore } from "../../store/index";

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
    swiperHeihgt:0,
    rankSongs:[],//推荐排行歌曲
    hotSongList:[],//热门歌单
    newSongRanking:[],//新歌榜
    hotSongRanking:[],//热门榜
    topSongRanking:[],//飙升榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await getHomeBanners()
    this.setData({banners:res.banners})

    // 获取推荐歌曲
    recommendStore.dispatch("getRecommendSong") 
    // this.setData({rankSongs:recommendStore.state.recommendSongs})
    // recommendStore.onState("recommendSongs",)
    recommendStore.onState("recommendSongs",(res)=>{
      if(!res) return
      this.setData({rankSongs:recommendStore.state.recommendSongs.slice(0,6)})
    })

    // 获取热门歌单
    recommendStore.dispatch("getHotSongMenuAction")
    recommendStore.onState("hotSongMenu",(res)=>{
      this.setData({hotSongList:res})
    })

    // 获取推荐歌单
    recommendStore.dispatch("getRecommendSongMenuAction")
    recommendStore.onState("recommendSongMenu",(res)=>{
      this.setData({recommendSongMenu:res})
    })

    // 获取榜单信息
    recommendStore.dispatch("getRankDetailAction")
    recommendStore.onState("topSongRanking",(res)=>{
      this.setData({topSongRanking:res})
    })
    recommendStore.onState("newSongRanking",(res)=>{
      this.setData({newSongRanking:res})
    })
    recommendStore.onState("hotSongRanking",(res)=>{
      this.setData({hotSongRanking:res})
    })
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