import CzRequest from '../service/request'


// 获取热门搜索
export function getHotSearch(params) {
  return CzRequest.get("/search/hot")
}

// 根据关键词获取搜索建议
export function getSearchSuggestionByKeyWord(keywords,type="mobile"){
  return CzRequest.get("/search/suggest",{keywords,type})
}

// 根据搜索内容获取搜索结果
export function getSongListByKeywords(keywords,type=1,limit=30,offset=0){
  return CzRequest.get("/search",{keywords,type,limit,offset})
}