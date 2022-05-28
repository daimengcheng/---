// pages/video-detail/index.js
import {getMVData,getMVAddress,getRelativeMvs} from '../../service/video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0, //视频id
    mvData:{},
    mvUrl:"",
    relativeVideos:[],
    containerHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({id:options.id})

    // 获取mv数据
    getMVData(id).then((res)=>{
      this.setData({mvData:res.data})
    })
    // 获取mv播放地址
    getMVAddress(id).then(res=>{
      this.setData({mvUrl:res.data.url})
    })

    // 获取相关视频信息
    getRelativeMvs(id).then(res=>{
      this.setData({relativeVideos:res.data})
    })

    const quertSelector = wx.createSelectorQuery()
    // 查询当前播放窗口的高度
    quertSelector.select(".video").boundingClientRect()
    quertSelector.exec((res)=>{
      // 获取当前可用窗口的高度
      const windwoInfo = wx.getWindowInfo()
      // 动态设置内容展示区的高度, 进行滚动
      this.setData({containerHeight:windwoInfo.windowHeight - res[0].height})
    })
  },
})