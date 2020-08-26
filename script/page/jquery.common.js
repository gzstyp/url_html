/**
 * 引路者-短网址产品
 * @作者 田应平
 * @创建时间 2019-07-05 0:18
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;(function($){
    window.base_url = "http://192.168.1.106:81/";
    textTitle = "系统提示";
    textConfirm = "确定";
    textCancel = "取消";
    fwtai = {
        LoadingImg : 'loadingImg',
        /**提示框:fwtai.alert('欢迎光临');*/
        alert : function(msg){
            layer.alert(msg,{
                title: textTitle,
            });
        },
        /**对话框关闭事件,不管按确定按钮或右上角的按钮都会触发事件:fwtai.closeEvent(code,msg,function(){});*/
        closeEvent : function (code,msg,callBack){
            msg = (msg == null || msg == '')?"操作有误":msg;
            code = parseInt(code);
            var iconDir = 'images/icons/';
            var imagerUrl = iconDir+'warn.png';
            var content = '<div style="font-size:12px;"><img src='+imagerUrl+' style="vertical-align:middle;margin-right:3px;"/>'+msg+'</div>';
            switch(code){
                case 200:
                    msg = (msg == null || msg == '')?"操作成功":msg;
                    imagerUrl = iconDir+'success.png';
                    content = '<div style="font-size:12px;"><img src='+imagerUrl+' style="vertical-align:middle;margin-right:3px;"/>'+msg+'</div>';
                    break;
                case 204:
                    msg = (msg == null || msg == '')?'系统出现错误':msg;
                    imagerUrl = iconDir+'error.png';
                    content = '<div style="font-size:12px;"><img src='+imagerUrl+' style="vertical-align:middle;margin-right:3px;"/>'+msg+'</div>';
                    break;
                default:
                    break;
            }
            top.layer.alert(content,{
                title : textTitle,
                btn: ['确定'],
                area: 'auto',//'270px'
                cancel : callBack,
            },function(index){
                fwtai.layerClose(index);
                if(callBack != null && callBack != ''){
                    callBack();
                }
            });
        },
        /**确认操作,且带右上角关闭事件:fwtai.confirm(msg,function(){},function(){});*/
        confirm : function (msg,fnVerify,fnCancel){
            msg = (msg == null || msg == '')?"确定要操作吗?":msg;
            var iconDir = 'images/icons/';
            top.layer.confirm('<div style="color:red;font-size:12px;"><img src="'+iconDir+'help_icon.png" style="vertical-align:middle;margin-right:3px;"/>'+msg+'</div>',{
                title : textTitle,
                area: 'auto',
                btn : ['确定','取消'],
                cancel : fnCancel,
            },function(index){
                fwtai.layerClose(index);
                if(fnVerify){fnVerify();}
            },function(index){
                fwtai.layerClose(index);
                if(fnCancel){fnCancel();}
            });
        },
        /**提示正在操作：fwtai.loadAjax(msg);*/
        loadAjax: function(msg){
            msg = (msg == null || msg == '' || msg == undefined) ? '操作中,请稍候……' : msg;
            return top.layer.msg(msg, {icon: 16, time: -1, shade: [0.3, '#000'], area:"auto"});
        }, /**提示信息或弹出框的关闭：fwtai.layerClose(index);*/
        layerClose: function(index){
            top.layer.close(index);
        }, /**POST的ajax请求方式*/
        ajaxPost: function(uri, params, success, errorFn){
            $.ajax({
                type: "POST",
                url: uri,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {withCredentials: true},
                data: params, success: function(data){
                    if(success != null && success != ""){
                        success(data);
                    }
                }, error: function(error, err){
                    if(errorFn != null && errorFn != ""){
                        errorFn(error);
                    }
                },
            });
        }, /**GET的ajax请求方式*/
        ajaxGet: function(uri, params, success, errorFn){
            $.ajax({
                type: "GET",
                url: uri,
                dataType: "json",
                /*contentType: "application/x-www-form-urlencoded",//get请求是不需要???*/
                xhrFields: {withCredentials: true},
                data: params, success: function(data){
                    if(success != null && success != ""){
                        success(data);
                    }
                }, error: function(error, err){
                    if(errorFn != null && errorFn != ""){
                        errorFn(error);
                    }
                },
            });
        }, /**ajax的post用法:fwtai.ajaxPostHint(url,msg,params,fnSuccess,fnError);*/
        ajaxPostHint: function(url, msg, params, fnSuccess, fnError){
            var layuiIndex = fwtai.loadAjax(msg);
            $.ajax({
                url: url,
                type: "POST",
                data: params,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {withCredentials: true},
                success: function(res){
                    fwtai.layerClose(layuiIndex);
                    fnSuccess(res);
                }, error: function(response,err){
                    fwtai.layerClose(layuiIndex);
                    if(fnError != null && fnError != ''){
                        fnError(response.statusText);
                    }
                }
            });
        }, /**ajax的get用法:fwtai.ajaxGetHint(url,msg,params,fnSuccess,fnError);*/
        ajaxGetHint: function(url, msg, params, fnSuccess, fnError){
            var layuiIndex = fwtai.loadAjax(msg);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                contentType: 'text/plain',
                xhrFields: {withCredentials: true},
                data: params,
                success: function(res){
                    fwtai.layerClose(layuiIndex);
                    fnSuccess(res);
                }, error: function(response, err){
                    fwtai.layerClose(layuiIndex);
                    if(fnError != null && fnError != ''){
                        fnError(err);
                    }
                }
            });
        },
        ieCORSAjax : function(url,params){
            $.ajax({
                url : url,
                data : params,
                contentType: 'text/plain',
                type: 'POST',
                dataType: 'json'
            }).done(function(data) {
                alert(data);
                //console.log(data.name.last);
            });
        },
        /** 将form表单转为json对象:winFn.formField(form);返回的是{}格式,强烈推荐使用!
         * 用法: var params = fwtai.formField('#formRegister');
         * fwtai.ajaxPostHint(base_url + "user/register?",'操作中,请稍候……',params,function(data){});
         */
        formField: function(formId){
            var kv = $(formId).serializeArray();
            var json = {};
            $.each(kv, function(i, v){
                json[v.name] = v.value;
            });
            return json;
        }, /**获取form表单参数,用于参数前必须带:fwtai.formParams(form);返回的是带&的字符串;推荐使用!*/
        formParams: function(form){
            return $(form).serialize();
        },
        /**用JS获取地址栏参数的方法[采用正则表达式获取地址栏参数],用法:fwtai.getParamURI('id');*/
        getParamURI : function(key){
            var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);//search,查询?后面的参数,并匹配正则
            if(r!=null)return unescape(r[2]);return "";
        },
        /**用JS获取地址栏参数的方法[采用正则表达式获取地址栏参数],用法:fwtai.getParamURL('id');*/
        getParamURL : function(key){
            var url = document.location.toString();
            var arrObj = url.split("?");
            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;
                for (var i = 0; i < arrPara.length; i++){
                    arr = arrPara[i].split("=");
                    if (arr != null && arr[0] == key){
                        return arr[1];
                    }
                }
                return "";
            }else{
                return "";
            }
        },
        /**用法:fwtai.viewImage('#image_yinlz_com','585px');*/
        viewImage : function(domId,width){
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: width,
                shadeClose: true,
                content: $(domId),
            });
        },
        newDetails : function(kid){
            window.location.href= 'info.html?kid='+kid;
        },
        /**验证是否为email格式:fwtai.isEmail(value);*/
        isEmail : function(value){
            if (/^([\w\.\-])+\@\w+(\.[a-zA-Z]+)+$/.test(value))return true;
            return false;
        },
        /*用法: fwtai.htmlValue('content',html);*/
        htmlValue : function(domId,html){
            var content = document.getElementById(domId);
            content.innerHTML = html;
            //content.appendChild(html);// chrome | Firefox浏览器
            content.outerHTML = content.outerHTML;//兼容IE8
        },
        /**赋值:fwtai.setDomValue(dom,value);*/
        setDomValue : function(dom,value){
            try{
                if (value == null || value == '' || value == undefined){
                    $(dom).val('');
                    $(dom).textbox('setValue','');
                } else {
                    $(dom).val(value);
                    $(dom).textbox('setValue',value);
                }
            }catch(e){}
        },
        /**获取值:fwtai.getDomValue(dom);*/
        getDomValue : function(dom){
            if($(dom).val() == '_')return null;
            return $.trim($(dom).val());
        },
        /**刷新验证码:fwtai.refreshCode(domImage,url);*/
        refreshCode : function(domImage,url){
            $(domImage).attr("src",url+Math.random());
        },
        supportSession : function(callBack){
            var _self = this;
            _self.ajaxGet(base_url + 'account/support',{},function(data){
                if(data.code == 200){
                    callBack();
                }else{
                    _self.closeEvent(data.code,data.msg);
                }
            },function(){
                _self.alert("连接服务器失败");
            });
        },
    };
})(jQuery);