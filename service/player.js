import CzRequest from './request'

// 根据音乐id获取歌曲详情
export function getSongDetailBySongId(ids){
  return CzRequest.get("/song/detail",{ids})
}