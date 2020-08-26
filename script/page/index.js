/**
 * index首页
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;var thisPage = {
    url:{
        indexShow : base_url + 'news/indexShow',
    },
    addEvent : function(){
    },
    init : function(){
        this.indexShow();
    },
    indexShow : function(){
        var _this = this;
        fwtai.ajaxGet(thisPage.url.indexShow,{},function(data){
            if(data.code == 200){
                _this.fillData(data);
            }else{
                _this.exceptionHtml(data.msg);
            }
        },function(error){
            _this.exceptionHtml("连接服务器失败");
        });
    },
    exceptionHtml:function(msg){
        fwtai.htmlValue('content',msg);
    },
    fillData:function(result){
        var pageBar = "";
        $.each(result.listData,function(index,data){
            pageBar += "<div class='blog-post'>";
            pageBar += "<h4><a href='javascript:;'>"+data.TITLE+"</a></h4>";
            pageBar += "<div class='double-hr'></div>";
            pageBar += "<div class='post-info'>";
            pageBar += "<ul>";
            pageBar += "<li><a href='javascript:;'>"+data.ADD_TIME+"</a></li>";
            pageBar += "<li class='post-info-categories'>浏览量<a href='javascript:;' style='margin-left:8px;'>"+data.BROWSE+"</a></li>";
            pageBar += "</div>";
            pageBar += "<a href='javascript:;' onclick='fwtai.newDetails("+data.KID+")'><img src='"+(($.trim(data.IMAGE)=='')?("images/post_img.jpg"):(data.IMAGE))+"' alt='' class='shadow-frame' width='580' height='250'/></a>";
            pageBar += "<p>"+data.SUMMARY+"<a href='javascript:;' onclick='fwtai.newDetails("+data.KID+")' class='read-more'>查看详情...</a></p>";
            pageBar += "</div>";
        });
        fwtai.htmlValue('content',pageBar);
    },
}
thisPage.init();