// pages/search-detail/index.js
import { getHotSearch,getSearchSuggestionByKeyWord } from '../../service/search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots:[],//热门搜索记录
    searchSuggestions:[],//搜索建议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    // 获取热门搜索
    this.getHotSeach()

  },

  // 获取热门搜索
  getHotSeach(){
    getHotSearch().then(res=>{
      this.setData({hots:res.result.hots})
    })
  },

  // 根据输入的关键词,获取搜索建议
  getSearchSuggestions(keywords){
    getSearchSuggestionByKeyWord(keywords).then(res=>{
      this.setData({searchSuggestions:res.result.allMatch})
    })
  },

  // 点击搜索框输入时调用
  handlechange(e){
    if(!e.detail){
      this.setData({searchSuggestions:[]})
    }else{
      this.getSearchSuggestions(e.detail)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
})