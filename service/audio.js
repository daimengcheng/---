import CzRequest from './request'

// 获取首页轮播图数据
export function getHomeBanners(){
  return CzRequest.get("/banner?type=1")
}

// 获取热门歌曲排行榜
export function getHotRankSongs(){
  return CzRequest.get("/personalized/newsong")
}

// 获取歌单
export function getHotSongMenu(limit,cat="全部"){
  return CzRequest.get("/top/playlist",{cat,limit})
}

// 获取歌曲排行榜
export function getRankSongMenu(){
  return CzRequest.get("/toplist/detail")
}

// 获取歌单详情
export function getSongMenuDetail(id){
  return CzRequest.get("/playlist/detail",{id})
}

// 根据trackID获取歌曲
export function getSongByID(ids) {
  return CzRequest.get("/song/detail",{ids}) 
}
