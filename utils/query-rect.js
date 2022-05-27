export default function queryRect(selectorName,){
  return new Promise((resolve)=>{
    const query = wx.createSelectorQuery()
    query.select(selectorName).boundingClientRect()
    query.exec((res)=>{
      resolve(res)
    })
  })
} 