const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password:'',
    comfirmPw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  inputUserName:function (e) {
    this.setData({
      username:e.detail.value
    })
 },
 inputPassword:function (e) {
   this.setData({
    password:e.detail.value
   })
 },
 confirmPassword:function (e) {
  this.setData({
    comfirmPw:e.detail.value
  })
},
register:function (params) {
  var  un = this.data.username;
  var pw = this.data.password;
  var repw = this.data.comfirmPw;
   wx.request({
     url: 'https://www.wanandroid.com/user/register',
     data: {
      username:un,
      password: pw,
      repassword:repw
     },
     header: {'content-type': 'application/x-www-form-urlencoded'},
     method: 'POST',
     dataType: 'json',
     responseType: 'text',
     success: (result)=>{
       console.log(result)
       var msg = result.data.errorMsg;
       var errCode = result.data.errorCode;
       if(errCode == 0){
        app.globalData.isLoginRegister=false;
        app.globalData.userName=this.data.username;
        app.globalData.userPassWord=this.data.password;
        wx.showModal({
          title: '提示',
          content: '注册成功，是否自动登录',
          success (res) {
            if (res.confirm) {
              wx.setStorageSync("userId", result.data.data.id),
              wx.setStorageSync("wanAndroidName", result.data.data.username);
              wx.setStorageSync("sessionid", result.header['Set-Cookie']);
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              app.globalData.isLoginRegister=true;
            }
          }
        })
       
       }else{
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 1000,
          mask: true
        })
       }
     },
     fail: ()=>{},
     complete: ()=>{}
   });
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