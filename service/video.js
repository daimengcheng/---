import CzRequest from './request'

export function getTopMvs(offset,limit=10){
  return CzRequest.get("/top/mv",{offset,limit})
}