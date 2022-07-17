// index.ts
// 获取应用实例
import request from '../../utils/request.ts'
const app = getApp<IAppOption>()

Page({
  data: {
    bannerList:['/static/images/nvsheng.jpg','/static/images/nvsheng.jpg','/static/images/logo.png'],
    recommendList:<Array<{picUrl:string, name:string}>>[],
    topList:<Array<{name:string, tracks:{al:{picUrl:string}}[]}>>[]
  },
  // 事件处理函数
  bindViewTap() {

  },
  onLoad: async function (options) {
    let bannerList:Array<{banners:Array<string>}> = await request('/banner', {type:2});
    this.setData({
      bannerList:bannerList.banners,
    })
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
