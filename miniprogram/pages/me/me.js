const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    login:false
  },
  jiedan(res) {
    wx.navigateTo({
      url: '../myOrder/myOrder?openid='+this.data.openid,
    })
  },
  fabu(res) {
    wx.navigateTo({
      url: '../myPublish/myPublish?openid='+this.data.openid,
    })
  },
  fankui(res) {
    wx.navigateTo({
      url: '../feedBack/feedBack',
    })
  },
  getUserProfile(){
    var that = this;
    var avatarUrl = '';
    var nickName = '';
    wx.getUserProfile({
      desc:'test',
      success(res) {
        console.log(res);
        avatarUrl = res.userInfo.avatarUrl;
        nickName = res.userInfo.nickName;
        wx.setStorageSync('login', true);
        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
        wx.setStorageSync('nickName',res.userInfo.nickName);
        that.setData({
          login:true,
          avatarUrl:avatarUrl,
          nickName:nickName
        })
        wx.showToast({
           title: '授权成功',
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = [];
    wx.showLoading({
      title: '加载中',
    })
     var login = wx.getStorageSync('login');
     var that = this;
     console.log(login);
     if(login == true){
        that.setData({
          avatarUrl:wx.getStorageSync('avatarUrl'),
          nickName:wx.getStorageSync('nickName'),
          login:true
        })
     }
     that.setData({
       login:login
     })
     wx.hideLoading({
       success: (res) => {
         wx.cloud.callFunction({
           name:'login',
           success(res){
             that.setData({
               openid:res.result.openid
             })
             console.log(that.data.openid);
           }
         })
       },
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})