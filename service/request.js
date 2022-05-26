
const BASE_URL = "http://123.207.32.32:9001"

class CzRequest{
  request(url,method,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: BASE_URL+url,
        method:method,
        data:data,
        success:function(res){
          resolve(res.data)
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  }
  get(url,data){
    return this.request(url,"GET",data)
  }
  post(url,data){
    return this.request(url,"POST",data)
  }
}

const request = new CzRequest()

export default request