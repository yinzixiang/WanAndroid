const app = getApp();

//Page Object
Page({
    data: {
        listData:[],
        pageNum : 0,
        isFirstRequest : true,
    },

    
    //options(Object)
    onLoad: function(options){
       this.loadData()
    },  

    loadData(){
        var that = this;
        wx.request({
            url: "https://www.wanandroid.com/lg/collect/list/" + this.data.pageNum + "/json",
            data: {},
            header: {
                'content-type':'application/x-www-form-urlencoded',
                "cookie":wx.getStorageSync('sessionid'),
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                console.log(result)
                var responseList = [];
                that.data.isFirstRequest ? responseList = result.data.data.datas : responseList = that.data.listData.concat(result.data.data.datas)
                that.setData({
                  listData: responseList,
                })
                console.log(this.data.listData)
            },
            fail: ()=>{},
            complete: ()=>{}
        });  
    },
    toIndexDetail:function (e) {
        console.log(e)
        var link = e.currentTarget.dataset.link;
        wx.navigateTo({
            url:"../../index/indexdetail/indexdetail?link="+link
        })
    },
    onReady: function(){
        
    },
    onShow: function(){
        
    },
    onHide: function(){
        
    },
    onUnload: function(){
 
    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){
        var that = this
     wx.showLoading({
          title: "加载中",
      });  
      console.log(33333333333)
      that.setData({
         pageNum:that.data.pageNum+1,
         isFirstRequest:false,
      })
      that.loadData();
      wx.hideLoading();
    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});