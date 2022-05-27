import CzRequest from './request'

// 获取首页轮播图数据
export function getHomeBanners(){
  return CzRequest.get("/banner?type=1")
}