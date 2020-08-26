/**
 * 分页条
 * 作者: 田应平
 * QQ: 444141300
 * 站点: http://www.fwtai.com
 * 日期: 2019年7月6日 11:36:23
*/
;var paginator = {
    LoadingImg : 'loadingImg',
    loadImgShow:function(domPosition,value){
        var self = this;
        var img = document.createElement('img');
        var id = $('#'+value).attr("id");
        if(id && id != ''){
            $('#'+value).empty().remove();
        }
        img.setAttribute('id',value);
        img.setAttribute('src','script/paginator/loading.gif');
        img.style.marginTop = ($(domPosition).height()/2) +'px';
        img.style.marginLeft = ($(domPosition).width()/2) +'px';
        $(domPosition).append(img);
        $(value).fadeIn();
    },
    loadClose:function(value){
        $('#'+value).empty().remove();
        $('#'+value).fadeOut();
    },
    emptyOrError:function(){
        var page = "<div class=\"pagingToolbar\" style='margin-left:86px;'>";
        page += "<label>共有<span>0</span>条</label>";
        page += "<label>,当前页:<span>0/0</span></label>";
        page += "<ol class=\"fanYe\">";
        page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>第一页</a></li>";
        page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>上一页</a></li>";
        page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>下一页</a></li>";
        page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>最后页</a></li>";
        page += "</ol>";
        page += "<div class=\"clear\"></div>";
        page += "</div>";
        return page;
    },
    pageBarLoad:function(result,method,display){//当display有值时或为true时分页条有等待提示
        var self = this;
        var page = "<div class=\"pagingToolbar\" style='margin-left:86px;'>";
        page += "<label>共有<span>"+result.total+"</span>条</label>";
        page += "<label>,当前页:<span>"+result.current+"/"+result.totalPage+"</span></label>";
        page += "<ol class=\"fanYe\">";
        if (display){
            page += "<li><div style=\"width:16px;height:16px;padding-top:7px;position:relative;\"><img id=\""+paginator.LoadingImg+"\" style=\"position:absolute;display:none;\" src='script/paginator/loading.gif'/></div></li>";
        }
        if (result.totalPage == 0){
            return self.emptyOrError();
        }
        if(result.current == 1){
            page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>第一页</a></li>";
            page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>上一页</a></li>";
        }else{
            page += "<li><a href=\"javascript:"+method+"(1);\" class=\"available\">第一页</a></li>";
            page += "<li><a href=\"javascript:"+method+"("+(result.current-1)+");\" class=\"available\">上一页</a></li>";
        }
        if(result.current == result.totalPage){
            page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>下一页</a></li>";
            page += "<li><a href=\"javascript:;\" class=\"disabled\" style='cursor:not-allowed;'>最后页</a></li>";
        }else{
            page += "<li><a href=\"javascript:"+method+"("+(result.current+1)+");\" class=\"available\">下一页</a></li>";
            page += "<li><a href=\"javascript:"+method+"("+(result.totalPage)+");\" class=\"available\">最后页</a></li>";
        }
        page += "</ol>";
        page += "<div class=\"clear\"></div>";
        page += "</div>";
        return page;
    },
    pageBarShow:function(){
        $('#'+paginator.LoadingImg).css({"display":"block"});
    },
    pageBarHide:function(){
        $('#'+paginator.LoadingImg).css({"display":"none"});
    },
}