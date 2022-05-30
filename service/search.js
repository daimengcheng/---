import CzRequest from '../service/request'


// 获取热门搜索
export function getHotSearch(params) {
  return CzRequest.get("/search/hot")
}

// 根据关键词获取搜索建议
export function getSearchSuggestionByKeyWord(keywords,type="mobile"){
  return CzRequest.get("/search/suggest",{keywords,type})
}