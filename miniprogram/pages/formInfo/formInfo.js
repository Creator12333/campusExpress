const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    picker:['大件','中件','小件'],
    ExpressAddress:'',
    ExpressTime:'',
    ExpressFromAddress:'',
    ExpressCode:'',
    ExpressMoney:'',
    ExpressQQ:'',
    ExpressPhone:''
  },
  ExpressReceiveAddress(res) {
    this.setData({
      ExpressAddress:res.detail.value
    })
  },
  ExpressTime(res) {
    this.setData({
      ExpressTime:res.detail.value
    })
  },
  ExpressFromAddress(res) {
    this.setData({
      ExpressFromAddress:res.detail.value
    })
  },
  ExpressCode(res) {
    this.setData({
      ExpressCode:res.detail.value
    })
  },
  ExpressMoney(res) {
    this.setData({
      ExpressMoney:res.detail.value
    })
  },
  ExpressQQ(res) {
    this.setData({
      ExpressQQ:res.detail.value
    })
  },
  ExpressPhone(res) {
    this.setData({
      ExpressPhone:res.detail.value
    })
  },
  PickerChangeExpress(res) {
    console.log(this.data.picker[res.detail.value]);
    this.setData({
      index:res.detail.value
    })
  },
  ExpressSubmit(res) {
    var that = this;
    if(that.data.ExpressAddress == '' || that.data.ExpressTime == '' || that.data.ExpressFromAddress == '' || that.data.ExpressCode == '' || that.data.ExpressMoney == '' || that.data.ExpressQQ == '' || that.data.ExpressPhone == '') {
      wx.showToast({
        title: '请完整填写信息',
        icon:'none'
      })
    }else if(wx.getStorageSync('login') !== true) {
      wx.showToast({
        title: '请前往个人中心授权个人信息',
        icon:'none'
      })
    }else {
      db.collection('Express').add({
        data:{
          ExpressLeiXing:that.data.picker[that.data.index],
          ExpressReceiveAddress:that.data.ExpressAddress,
          ExpressReceiveTime:that.data.ExpressTime,
          ExpressFromAddress:that.data.ExpressFromAddress,
          ExpressCode:that.data.ExpressCode,
          ExpressMoney:that.data.ExpressMoney,
          ExpressQQ:that.data.ExpressQQ,
          ExpressPhone:that.data.ExpressPhone,
          status:'新发布',
          ExpressAvatarUrl:wx.getStorageSync('avatarUrl'),
          ExpressNickName:wx.getStorageSync('nickName')
        },
        success(res) {
          console.log('上传成功');
          wx.showToast({
            title: '发布成功',
          })
          that.setData({
            index:0,
            ExpressAddress:'',
            ExpressTime:'',
            ExpressFromAddress:'',
            ExpressCode:'',
            ExpressMoney:'',
            ExpressQQ:'',
            ExpressPhone:''
          })
        },
        fail(res) {
          console.log('上传失败',res);
          wx.showToast({
            title: '上传失败',
          })
          that.setData({
            index:0,
            ExpressAddress:'',
            ExpressTime:'',
            ExpressFromAddress:'',
            ExpressCode:'',
            ExpressMoney:'',
            ExpressQQ:'',
            ExpressPhone:''
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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