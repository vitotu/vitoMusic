import config from './config';

export default function(url: string, data:Object, method:any="GET"):Promise<any>{
  return new Promise((resolve, reject) =>{
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find((item:string) => item.indexOf('MUSIC_U') !== -1):''
      },
      success:res => {
        if((<{islogin:boolean}>data).islogin){
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}