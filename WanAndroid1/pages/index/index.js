//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerImages:[],
    pageNum:0,
    listData:[],
    isFirstRequest:true
  },
  //事件处理函数
  
  onLoad: function () {

     this.loadData()

  },

  loadData(){
     //获取首页banner数据
     wx.request({
      url: 'https://www.wanandroid.com/banner/json',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
       
        this.setData({
          bannerImages:result.data.data
        })
        console.log(this.data.bannerImages);
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    var responseList = [];
    //获取列表数据
    wx.request({
     url: "https://www.wanandroid.com/article/list/" + this.data.pageNum + "/json",
     data: {},
     header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        "cookie": wx.getStorageSync("sessionid")
     },
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
     success: (result)=>{
      this.data.isFirstRequest?responseList= result.data.data.datas : responseList = this.data.listData.concat(result.data.data.datas)
       console.log(responseList)
       this.setData({
         listData:responseList
       })
     },
     fail: ()=>{},
     complete: ()=>{
      wx.hideLoading();

      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
     }
   });
  },


  // 监听用户下拉动作
  onPullDownRefresh:function(){
    var that = this;
    wx.showNavigationBarLoading();
    console.log(11111)
    that.setData({
      pageNum:0,
      isFirstRequest:true
    })
    that.loadData()
  },

  //监听用户上拉触底事件

  onReachBottom:function() {
    var that = this;
    wx.showLoading({
      title:"加载中"
    })
    that.setData({
      pageNum:that.data.pageNum+1,
      isFirstRequest:false
    })
    that.loadData()
  },

//文章详情

  toIndexDetail:function (e) {
     console.log(e) 
     var link = e.currentTarget.dataset.link;
     wx.navigateTo({
       url: '../index/indexdetail/indexdetail?link='+link,

     });
  },

  //图片详情
  imgToDetail:function (e) {
    console.log(e)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../index/indexdetail/indexdetail?link='+ url
    })
  },

  //收藏文章
  onCollectionTap:function (e) {
    var that = this;
     var isLogin = wx.getStorageSync('wanAndroidName');
     if(isLogin=="" || isLogin == null){
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        wx.navigateTo({
          url:"../person/login/login"
        })
     }else{
        var collect = e.currentTarget.dataset.collect
        var id = e.currentTarget.dataset.id;
        var index = e.currentTarget.dataset.index;
        //取消收藏
        if(collect){
            wx.request({
              url: "https://www.wanandroid.com/lg/uncollect_originId/" + id + "/json",
              data: {},
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                "cookie": wx.getStorageSync("sessionid")
              },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: (result)=>{
                 
                  that.data.listData[index].collect = false
                  that.setData({
                    listData:that.data.listData
                  })
                  wx.showToast({
                    title:"取消收藏成功"
                  })
              },
              fail: ()=>{},
              complete: ()=>{}
            });
        }else{
          //点击收藏
          wx.request({
            url: "https://www.wanandroid.com/lg/collect/" + id + "/json",
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              "cookie": wx.getStorageSync("sessionid")
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
      
              that.data.listData[index].collect = true
              that.setData({
                  listData:that.data.listData
                })
                wx.showToast({
                  title:"收藏成功"
                })
                console.log(this.data.listData)
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
     }
  },
  onShow:function (params) {
    that.loadData()
  }
})
