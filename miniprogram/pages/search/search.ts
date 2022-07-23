// pages/search/search.ts
import request from '../../utils/request';
let isSend = false;
interface searchItem {

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent: '', // placeholder的内容
    hotList: [], // 热搜榜数据
    searchContent: '', // 用户输入的表单项数据
    searchList: <searchItem>[], // 关键字模糊匹配的数据
    historyList: <string[]>[], // 搜索历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  async getInitData(){
    let placeholderData = await request('/search/default', {});
    let hotListData = await request('/search/hot/detail', {});
    this.setData({
      placeholderContent:placeholderData.data.showKeyword,
      hotList:hotListData.data
    })
  },
  getSearchHistory(){
    let historyList = wx.getStorageSync('searchHistory');
    if(historyList) this.setData({historyList})
  },
  handleInputChange(event:any){
    this.setData({searchContent:event.detail.value.trim()});
    if(isSend) return;
    isSend = true;
    this.getSearchList();
    setTimeout(() => isSend = false, 300);
  },
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({searchList:[]});
      return;
    }
    let {searchContent, historyList} = this.data;
    let searchListData = await request('/search',{keywords:searchContent, limit:10});
    this.setData({searchList:searchListData.result.songs});
    if(historyList.indexOf(searchContent) !== -1) historyList.splice(historyList.indexOf(searchContent), 1);
    historyList.unshift(searchContent);
    this.setData({historyList});
    wx.setStorageSync('searchHistory', historyList);
  },
  clearSearchContent(){
    this.setData({searchContent:'', searchList:[]});
  },
  deleteSearchHistory(){
    wx.showModal({
      content:"are you sure delete?",
      success: (res) => {
        if(res.confirm) {
          this.setData({historyList:[]});
          wx.removeStorageSync('searchHistory');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})