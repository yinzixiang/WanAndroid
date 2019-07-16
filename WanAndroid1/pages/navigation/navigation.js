const app = getApp();

//Page Object
Page({
    data: {
        navLeftItems:[],
        navRightItems:[],
        currentItem:0,
        title:'',
        textColorArr:[]
    },
    //options(Object)
    onLoad: function(options){


        wx.request({
            url: 'https://www.wanandroid.com/navi/json',
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                console.log(result.data.data)
                this.setData({
                    navLeftItems:result.data.data,
                    navRightItems:result.data.data[0].articles,
                    title:result.data.data[0].name
                })
                this.getColor();
            },
            fail: ()=>{},
            complete: ()=>{}
        });
        this.getColor();
    },

    changeItem:function(option) {
        
        var idx = option.currentTarget.dataset.index
        this.setData({
            navRightItems:this.data.navLeftItems[idx].articles,
            currentItem:option.currentTarget.dataset.index,
            title:this.data.navLeftItems[idx].name
        })
     
        this.getColor();
    },
    getColor:function () {
      var colorArr = []
      for(var i=0;i<this.data.navRightItems.length;i++){
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var rgb = "rgb(" + r + ',' + g + ',' + b + ")";
        if(rgb=="rgb(255,255,255)"){
            continue
        }else{
            colorArr.push(rgb)
        }
      }  
      this.setData({
          textColorArr : colorArr
      })
    },
    toDetail:function(option) {
        var link = option.currentTarget.dataset.link;
        wx.navigateTo({
            url:'../index/indexdetail/indexdetail?link=' + link
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

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});