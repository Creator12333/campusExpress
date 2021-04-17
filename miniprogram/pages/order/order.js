const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Express:[],
    openid:''
  },
  robOrder(res) {
    wx.showLoading({
      title: '处理中',
    })
    let that = this;
    let id = res.currentTarget.dataset.id;
    if(wx.getStorageSync('login') !== true) {
      wx.showToast({
        title: '请先前往个人中心授权个人信息',
        icon:'none'
      })
    }else {
      wx.cloud.callFunction({
        name:'updateExpressStatus',
        data:{
          id:id,
          status:'已接单',
          openid:that.data.openid
        },
        success(res) {
          console.log(res);
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '抢单成功',
              })
              that.onLoad();
            },
          })

        }
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('Express').get({
      success(res) {
        console.log(res);
        that.setData({
          Express:res.data
        })
        wx.cloud.callFunction({
          name:'login',
          success(res){
            that.setData({
              openid:res.result.openid
            })
            console.log(that.data.openid);
          }
        })
      }
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
    this.onLoad();
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