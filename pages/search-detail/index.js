// pages/search-detail/index.js
import { getHotSearch,getSearchSuggestionByKeyWord,getSongListByKeywords } from '../../service/search'
import {debounce,throttle} from '../../utils/Throttle';

const debounceGetSearchSuggestionByKeyWord = debounce(getSearchSuggestionByKeyWord)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots:[],//热门搜索记录
    searchSuggestions:[],//搜索建议
    keywords:'',
    songList:[],//歌曲列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    // 加载框
    wx.showLoading()

    // 获取热门搜索
    this.getHotSeach()
  },

  // 获取热门搜索
  getHotSeach(){
    getHotSearch().then(res=>{
      this.setData({hots:res.result.hots})
      wx.hideLoading()
    })
  },

  // 根据输入的关键词,获取搜索建议
  getSearchSuggestions(keywords){
    debounceGetSearchSuggestionByKeyWord(keywords).then(res=>{
      this.setData({searchSuggestions:res.result.allMatch})
      wx.hideLoading()
    })
  },

  // 点击搜索框输入时调用
  handlechange(e){
    wx.showLoading()
    this.setData({keywords:e.detail})

    if(!this.data.keywords.length){
      this.setData({keywords:e.detail})
      this.setData({searchSuggestions:[]})
    }
    this.getSearchSuggestions(e.detail)
  },

  // 获取音乐列表
  handleSuggesttionTap(e){
    wx.showLoading()
    getSongListByKeywords(e.currentTarget.dataset.keyword).then(res=>{
      this.setData({songList:res.result.songs})
      wx.hideLoading()
    })
  },

  // 处理搜索框获取焦点时的回调
  handleFocus(e) {
    // 清空搜索结果
    if(this.data.songList.length) this.setData({songList:[]})
  },

  // 处理热门搜索的事件
  handleTagTap(e){
    wx.showLoading()
    getSongListByKeywords(e.currentTarget.dataset.first).then(res=>{
      this.setData({songList:res.result.songs})
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
})