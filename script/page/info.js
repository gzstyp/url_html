/**
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;var thisPage = {
    url:{
        get : function(kid){
            return base_url + 'news/get/' + kid;
        }
    },
    addEvent : function(){
    },
    init : function(){
        this.initDom();
    },
    initDom : function(){
        var _this = this;
        var kid = fwtai.getParamURI('kid');
        fwtai.ajaxGet(thisPage.url.get(kid),{},function(data){
            if(data.code == 200){
                _this.writeDom(data.map)
            }else{
                fwtai.alert(data.msg);
                _this.exceptionHtml(data.msg);

            }
        },function(error){
            fwtai.alert(error);
        })
    },
    writeDom : function(map){
        var html = "<div class='blog-post'>";
        html += "<h1><a href='javascript:;'>"+map.TITLE+"</a></h1>";
        html += "<div class='double-hr'></div>";
        html += map.DETAILS;
        html += "</div>";
        fwtai.htmlValue('content',html);
    },
    exceptionHtml : function(msg){
        fwtai.htmlValue('content',msg);
    }
}
thisPage.init();