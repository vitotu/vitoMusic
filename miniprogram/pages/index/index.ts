// index.ts
// 获取应用实例
import request from '../../utils/request'
const app = getApp<IAppOption>()
const topListConfig = [
  {id:'3779629', name:'新歌榜'},
  {id:'3778678', name:'热歌榜'},
  {id:'2884035', name:'原创榜'},
  {id:'19723756', name:'飙升榜'},
  {id:'10520166', name:'电音榜'}
]
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
      let topListData = await request('/playlist/track/all', {id:topListConfig[index].id, limit:10, offset:1});
      let topListItem = {name:topListConfig[index].name, tracks:topListData.songs.slice(0, 3)};
      resultArr.push(topListItem);
      this.setData({
        topList:resultArr
      })
      index++;
    }
  },
  toRecommendSong(){
    // TODO
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong'
    })
  },
  toOther(){
    // TODO
    wx.navigateTo({
      url:'/otherPackage/pages/other/other'
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
