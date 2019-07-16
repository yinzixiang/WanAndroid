const app = getApp();

//Page Object
Page({
    data: {
        personName:'',
        isLoginRegister:true,
    },
    //options(Object)
    onLoad: function(options){
       if(wx.getStorageSync('wanAndroidName')!="" || wx.getStorageSync('wanAndroidName')!=null){
            this.setData({
                isLoginRegister:false,
                personName:wx.getStorageSync('wanAndroidName')
            })
       }
    },
    toLogin:function (e) {
        wx.navigateTo({
            url:'../person/login/login'
        })
    },

    toRegister:function (e) {
        wx.navigateTo({
            url:'../person/register/register'
        })
    },

    //我的收藏
    myCollection:function (e) {
        wx.navigateTo({
            url:'../person/myCollection/myCollection'
        })
    },

    exitLogin:function (e) {
       wx.request({
           url: 'https://www.wanandroid.com/user/logout/json',
           data: {},
           header: {'content-type':'application/json'},
           method: 'GET',
           dataType: 'json',
           responseType: 'text',
           success: (result)=>{
               console.log(result)
               if(result.data.errorCode==0){
                wx.setStorageSync("userId", ""),
                wx.setStorageSync("wanAndroidName", "");
                wx.setStorageSync("sessionid", "");
                    this.setData({
                        isLoginRegister:true
                    })
               }
           },
           fail: ()=>{},
           complete: ()=>{}
       });
    },

    onReady: function(){
        
    },

    onShow: function(){
        this.setData({
            isLoginRegister:wx.getStorageSync('wanAndroidName')==""?true:false,
            personName:wx.getStorageSync('wanAndroidName')
        })
        console.log("-------------")
        console.log(app.globalData.isLoginRegister)
        console.log(app.globalData.userName)
    
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});