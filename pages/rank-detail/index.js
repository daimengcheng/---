// pages/rank-detail/index.js
import {recommendStore} from '../../store/index'
import {getSongMenuDetail,getSongByID} from '../../service/audio'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    title:"更多歌曲",
    containerHeight:0,
    recommendSongs:[],
    songMenuList:[],//歌单中的歌曲列表
    showData:[],
    hasLoading:true,
    rankSongMenuDetail:{},
    detailInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中~',
    })
    const title= options.title
    const id = options.id
    this.setData({title:title})
    this.setData({id:id})
    // this.getHeight()
    // this.getRnakData(id)
    switch(this.data.title){
      case "歌曲推荐":
        // 获取推荐歌曲列表
        recommendStore.onState("recommendSongs",(res)=>{
          this.setData({showData:res})
          wx.hideLoading()
        })
        break;
      case "热门歌单":
        // 获取不同歌单的歌曲
        this.getData(id)
        break;
      case "推荐歌单":
        this.getData(id)
        break
      case "新歌榜":
        this.getRnakData(id)
        break;
      case "原创榜":
        this.getRnakData(id)
        break;
      case "飙升榜":
        this.getRnakData(id)
        break;
    }
  },
  // 获取不同歌单数据
  getData(id,start=0,end=20) {
    getSongMenuDetail(id).then(async (res)=>{
      this.setData({detailInfo:res.playlist})
      let trackIds = res.playlist.trackIds.slice(start,end)
      for(let i=0; i<trackIds.length; i++){
        const res = await getSongByID(trackIds[i].id)
        this.data.songMenuList.push(res.songs[0])
      }
      this.setData({showData:this.data.songMenuList})
      wx.hideLoading()
    })
  },

  // 获取榜单数据
  getRnakData(id,start=0,end=20){
    getSongMenuDetail(id).then(res=>{
      this.setData({detailInfo:res.playlist})
      this.setData({showData:this.data.showData.concat(res.playlist.tracks.slice(start,end))})
      wx.hideLoading()
    })
  },

  // 当页面上滑时
  onReachBottom(){
    wx.showLoading({
      title: '加载中~',
    })
    const title = this.data.title
    if(title === "热门歌单" || title === "推荐歌单"){
      this.getData(this.data.id,this.data.showData.length,this.data.showData.length+20)
    }else if(title === "原创榜" || title === "新歌榜" || title ==="飙升榜"){
      this.getRnakData(this.data.id,this.data.showData.length,this.data.showData.length+20)
    }
  },

  // 动态获取高度
  getHeight(){
    const quertSelector = wx.createSelectorQuery()
    // 查询当前播放窗口的高度
    quertSelector.select(".info-item-container").boundingClientRect()
    quertSelector.exec((res)=>{
      // 获取当前可用窗口的高度
      const windwoInfo = wx.getWindowInfo()
      // 动态设置内容展示区的高度, 进行滚动
      console.log(res)
      this.setData({containerHeight:windwoInfo.windowHeight - 214 -80})
    })
  },
  onUnload(options) {
    this.setData({showData:[]})
    // console.log(this.data.showData)
  }
})