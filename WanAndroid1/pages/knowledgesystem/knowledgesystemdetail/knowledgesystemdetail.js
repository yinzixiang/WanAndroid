const app = getApp()

//Page Object
Page({
    data: {
        knowledgesystemTabItem:[],
        knowledgesystemItemList:[],
        height:100,
        currentTab:0,
        navScrollLeft:0,
    },
    //options(Object)
    onLoad: function(options){
        this.setData({
            knowledgesystemTabItem:app.globalData.knowledgeSystemdetailData
        })
        console.log(app.globalData.knowledgeSystemdetailData)
        // for (var index in app.globalData.knowledgeSystemdetailData) {
        var firstId = app.globalData.knowledgeSystemdetailData[0].id;
        console.log(" firstId ==   " + firstId);
        //   }

        wx.request({
            url: 'https://www.wanandroid.com/article/list/0/json?cid='+ firstId,
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                console.log(result.data.data.datas)
                this.setData({
                    knowledgesystemItemList:result.data.data.datas,
                    height:130*(result['data']['data']['datas'].length)
                })
                console.log(this.data.knowledgesystemItemList)
            },
            fail: ()=>{},
            complete: ()=>{}
        });
       
    },
    switchTab:function (options) {
        console.log(options)
        var cur = options.currentTarget.dataset.current;
        var cid = options.currentTarget.dataset.cid;

        
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
            currentTab: cur
            })
        }               
        this.setData({
            firstId:cid,
        
        })
        console.log(this.data.currenTab)
        wx.request({
            url: 'https://www.wanandroid.com/article/list/0/json?cid='+ this.data.firstId,
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                console.log(result.data.data.datas)
                this.setData({
                    knowledgesystemItemList:result.data.data.datas,
                    height:120*(result['data']['data']['datas'].length),
                    currenTab:cur
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },
    itemListToDetail:function (options) {
        console.log(options)
        wx.navigateTo({
            url:"../../index/indexdetail/indexdetail?link="+options.currentTarget.dataset.link
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