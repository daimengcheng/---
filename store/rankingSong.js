import {HYEventStore} from 'hy-event-store'
import {getHotRankSongs,getHotSongMenu} from '../service/audio'
const recommendStore = new HYEventStore({
  state:{
    recommendSongs:[],// 推荐歌曲
    hotSongMenu:[],// 热门歌单
  },
  actions:{
    getRecommendSong(ctx,payload){
      getHotRankSongs().then(res=>{
        ctx.recommendSongs = res.result
      })
    },
    getHotSongMenuAction(ctx,payload){
      getHotSongMenu(10).then(res=>{
        ctx.hotSongMenu = res.playlists
      })
    }
  }
})


export {
  recommendStore
}