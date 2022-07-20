// pages/video/video.ts
import request from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[],
    videoId:'',
    videoUpdateTime: new Array<any>(),
    isTriggered:false
  },
  onPullDownRefresh(){
    console.log('page pull down refresh');
  },
  onReachBottom(){
    console.log('page reach bottom');
  },
  onShareAppMessage({from}){
    console.log(from);
    if(from === 'button'){
      return {
        title: 'from button share',
        page:'./pages/video/video',
        imageUrl: '/static/images/nvsheng.jpg'
      }
    }else {
      return {
        title: 'from menu share',
        page:'./pages/video/video',
        imageUrl: '/static/images/nvsheng.jpg'
      }
    }
  },
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  },
  handleToLower(){
    console.info('scroll-view up to top');
    // TODO:udpate videoList
    // let newVideoList = [] // post videoList
    // let videoList = this.data.videoList;
    // videoList.push(...newVideoList);
    // this.setData({videoList});
  },
  handleRefresher(){
    console.info('scroll-view pull to refresh');
    
  },
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list',{});
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),navId:videoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId);
  },
  async getVideoList(navId: string){
    if(!navId) return;
    let videoListData = await request('/video/group', {id:navId});
    wx.hideLoading();
    let index = 0;
    let videoList = videoListData.datas.map((item:{id:number}) => {
      item.id = index++;
      return item;
    })
    this.setData({videoList, isTriggered:false});
  },
  changeNav(event:any){
    let navId = event.currentTarget.id;
    this.setData({navId:String(Number(navId) >>> 0), videoList:[]})
    wx.showLoading({title:'loading'});
    this.getVideoList(this.data.navId);
  },
  handlePaly(event:any){
    let vid = event.currentTarget.id;
    this.setData({videoId:vid});
    let videoContext = wx.createVideoContext(vid);
    let {videoUpdateTime} = this.data;
    let videoItem:any = videoUpdateTime.find((item:{vid:string}) => item.vid === vid);
    if(videoItem) videoContext.seek(videoItem.currentTime);
    videoContext.play();
  },
  handleTimeUpate(event:any){
    let videoTimeObj = { vid:event.currentTarget.id, currentTime:event.detail.currentTime};
    let videoUpdateTime:any[] = this.data.videoUpdateTime;
    let videoItem:any = videoUpdateTime.find((item:{vid:string}) => item.vid === videoTimeObj.vid);
    if(videoItem) videoItem.currentTime = event.detail.currentTime
    else videoUpdateTime.push(videoTimeObj);
    this.setData({videoUpdateTime})
  },
  handleEnded(event:any){
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
    this.setData({videoUpdateTime})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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