//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  //重力监听
  isShow: false,
  onShow: function () {
    var that = this;
    this.isShow = true;
    wx.onAccelerometerChange(function (e) {
      if(!that.isShow){
        return
      }
      console.log(e.x)
      console.log(e.y)
      console.log(e.z)
      if (e.x > 1 && e.y > 1) {
        wx.showToast({
          title: '摇一摇成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //发送
  sendmes: function(sen){
    wx.request({
      url: 'https://senf80l5.qcloud.la/Welcome/sendtest',
      data: {
         x: '1' ,
         y: '2'
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  onHide: function(){
    this.isShow = false;
  }

})
