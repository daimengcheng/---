import CzRequest from './request'

// 获取首页轮播图数据
export function getHomeBanners(){
  return CzRequest.get("/banner?type=1")
}

// 获取热门歌曲排行榜
export function getHotRankSongs(){
  return CzRequest.get("/personalized/newsong")
}

// 获取热门歌单
export function getHotSongMenu(limit){
  return CzRequest.get("/top/playlist",{limit})
}