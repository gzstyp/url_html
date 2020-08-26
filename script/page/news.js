/**
 * 资讯页面
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
var initial = true;
;var thisPage = {
    url:{
        list : base_url + 'news/getList',
    },
    addEvent : function(){
    },
    init : function(){
        this.getList(1);
    },
    getList : function(current){
        var _self = this;
        if (initial){
            initial = false;
            paginator.loadImgShow('#content','showNews');
            fwtai.ajaxGet(_self.url.list,{'current':current},function(data){
                //paginator.loadClose('showNews');
                if(data.code == 200){
                    _self.fillData(data);
                }else{
                    _self.exceptionHtml(data.msg);
                }
            },function(error){
                //paginator.loadClose('showNews');
                _self.exceptionHtml("连接服务器失败");
            });
        }else{
            paginator.pageBarShow();
            fwtai.ajaxGet(base_url + 'news/getList',{'current':current},function(data){
                //paginator.pageBarHide();
                if(data.code == 200){
                    _self.fillData(data);
                }else{
                    _self.exceptionHtml(data.msg);
                }
            },function(error){
                //paginator.pageBarHide();
                _self.exceptionHtml("连接服务器失败");
            });
        }
    },
    exceptionHtml:function(msg){
        var html = msg + paginator.emptyOrError();
        fwtai.htmlValue('content',html);
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
        pageBar += paginator.pageBarLoad(result,'thisPage.getList',true);/*这个是和第一次调用的方法名一致!!!*/
        fwtai.htmlValue('content',pageBar);
    },
}
thisPage.init();