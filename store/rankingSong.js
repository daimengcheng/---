import {HYEventStore} from 'hy-event-store'
import {
  getHotRankSongs,getHotSongMenu,getRankSongMenu,getSongMenuDetail,getSongByID
} from '../service/audio'
const recommendStore = new HYEventStore({
  state:{
    recommendSongs:[],// 推荐歌曲
    hotSongMenu:[],// 热门歌单 
    recommendSongMenu:[],//推荐歌单
    newSongRanking:[],//新歌榜
    hotSongRanking:[],//热门榜
    topSongRanking:[],//飙升榜
    songMenuList:[],//歌单列表
    trackIds:[],
    rankSongMenuDetail:{}
  },
  actions:{
    // 获取推荐歌曲
    getRecommendSong(ctx,payload){
      getHotRankSongs().then(res=>{
        ctx.recommendSongs = res.result
      })
    },
    // 获取热门歌单
    getHotSongMenuAction(ctx,payload){
      getHotSongMenu(6).then(res=>{
        ctx.hotSongMenu = res.playlists
      })
    },
    // 获取推荐榜单
    getRecommendSongMenuAction(ctx,payload){
      getHotSongMenu(6,"华语").then(res=>{
        ctx.recommendSongMenu = res.playlists
        // console.log(res)
      })
    },
    // 获取榜单详情
    getRankDetailAction(ctx,payload){
      getRankSongMenu().then(res=>{
        ctx.topSongRanking = res.list[0]
        ctx.newSongRanking = res.list[1]
        ctx.hotSongRanking = res.list[2]
      })
    },
    // 获取歌单详情
    // getSongMenuListAction(ctx,payload){
    //   ctx.songMenuList = []
    //   getSongMenuDetail(payload.id).then(res=>{
    //     ctx.trackIds = res.playlist.trackIds.slice(0,10)
    //     ctx.trackIds.forEach(item=>{
    //       getSongByID(item.id).then(res=>{
    //         ctx.songMenuList.push(res.songs[0])
    //       })
    //     })
    //   })
    // },
    // 获取榜单详情数据
    getRankMenuDetail(ctx,payload){
      getSongMenuDetail(payload).then(res=>{
        ctx.rankSongMenu = res.playlist
        console.log(res.playlist)
      })
    }
  }
})


export {
  recommendStore
}