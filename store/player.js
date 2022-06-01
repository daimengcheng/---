import {HYEventStore} from 'hy-event-store'
import {getSongDetailBySongId} from '../service/player'
const playerStore = new HYEventStore({
  state:{
    songDetail:{}
  },
  actions:{
    // 获取歌曲详情
    getSongDetailAaction(ctx,payload){
      getSongDetailBySongId(payload.id).then(res=>{
        ctx.songDetail = res.songs[0]
      })
    }
  }
})

export default playerStore