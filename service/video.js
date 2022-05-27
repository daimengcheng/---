import CzRequest from './request'

// 获取视频列表
export function getTopMvs(offset,limit=10){
  return CzRequest.get("/top/mv",{offset,limit})
} 

// 获取mv数据
export function getMVData(id){
  return CzRequest.get("/mv/detail",{"mvid":id})
}

// 获取mv地址
export function getMVAddress(id){
  return CzRequest.get("/mv/url",{"id":id})
}

// 获取相关视频
export function getRelativeMvs(id){
  return CzRequest.get("/related/allvideo",{"id":id})
}