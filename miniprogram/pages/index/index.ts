// index.ts
// 获取应用实例
import request from '../../utils/request'
const app = getApp<IAppOption>()
interface recommend {
  picUrl:string,
  name:string,
  id:number,
}


Page({
  data: {
    bannerList:['/static/images/nvsheng.jpg'],
    recommendList:<Array<recommend>>[],
    topList:<Array<{name:string, tracks:{al:{picUrl:string}}[]}>>[]
  },
  // 事件处理函数
  bindViewTap() {

  },
  onLoad: async function (options) {
    let data:{banners:Array<{pic:string}>} = await request('/banner', {type:2});
    this.setData({
      bannerList:data.banners.map(item => item.pic),
    })
    let recommendData = await request('/personalized', {limit:10});
    this.setData({
      recommendList:(<{result:Array<recommend>}>recommendData).result
    })
    let index = 0;
    let resultArr = [];
    while (index < 5){
      let topListData = await request('/top/list', {idx:index++});
      let topListItem = {name:topListData.playlist.name, tracks:topListData.playlist.tracks.slice(0, 3)};
      console.info(topListItem)
      resultArr.push(topListItem);
      this.setData({
        topList:resultArr
      })
    }
    // console.info(topListData)
  },
  toRecommendSong(){
    // TODO
    wx.navigateTo({
      url: ''
    })
  },
  toOther(){
    // TODO
    wx.navigateTo({
      url:''
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
