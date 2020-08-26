/**
 * 登录
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;var thisPage = {
    url:{
        auth : base_url + 'account/auth',//账号登录
        login : base_url + 'account/emailLogin',//邮箱登录
        imageCode : base_url + 'imgCode',
    },
    addEvent : function(){
        //账号的刷新验证码
        $('#imgCode').live("click",function(){
            thisPage.accountRefreshCode();
        });
        //邮箱的刷新验证码
        $('#emailImgCode').live("click",function(){
            thisPage.emailRefreshCode();
        });
        //账号的提交按钮
        $('#send_button').live("click",function(){
            thisPage.submitAccount();
        });
        //邮箱的提交按钮
        $('#send_email').live("click",function(){
            thisPage.emailAccount();
        });
        //账号的重置按钮
        $('#reset_button').live("click",function(){
            thisPage.accountReset();
        });
        //账号的重置按钮
        $('#reset_email').live("click",function(){
            thisPage.emailReset();
        });
    },
    init : function(){
        $('#imgCode').attr('src',thisPage.url.imageCode);
        this.addEvent();
    },
    type : function(type){
        $('#type').val(type);
        if(type == 1){
            this.accountRefreshCode();
        }else if(type ==2){
            this.emailRefreshCode();
        }
    },
    /**账号时的刷新验证码*/
    accountRefreshCode : function(){
        fwtai.setDomValue('#code');
        fwtai.refreshCode('#imgCode',base_url + "imgCode?date=" + new Date().getTime());
    },
    /**邮箱时的刷新验证码*/
    emailRefreshCode : function(){
        fwtai.setDomValue('#emailCode');
        fwtai.refreshCode('#emailImgCode',base_url + "imgCode?date=" + new Date().getTime());
    },
    /**账号时的重置*/
    accountReset:function(){
        fwtai.setDomValue('#user_name');
        fwtai.setDomValue('#password');
        fwtai.setDomValue('#code');
        this.accountRefreshCode();
    },
    /**邮箱时的重置*/
    emailReset:function(){
        fwtai.setDomValue('#emailName');
        fwtai.setDomValue('#emailPwd');
        fwtai.setDomValue('#emailCode');
        this.emailRefreshCode();
    },
    submitAccount : function(){
        var _self = this;
        var name = fwtai.getDomValue('#user_name');
        var password = fwtai.getDomValue('#password');
        var code = fwtai.getDomValue('#code');
        if(name == null || name == ''){
            fwtai.closeEvent(199,"用户名不能为空!");
            return false;
        }
        if(password == null || password == ''){
            fwtai.closeEvent(199,"请输入登录密码!");
            return false;
        }
        if(code == null || code == ''){
            fwtai.closeEvent(199,"图形验证码不能为空!");
            return false;
        }
        var params = {
            'name':name,
            'password':password,
            'code':code,
        }
        this.request(params,1);
    },
    emailAccount : function(){
        var _self = this;
        var name = fwtai.getDomValue('#emailName');
        var password = fwtai.getDomValue('#emailPwd');
        var code = fwtai.getDomValue('#emailCode');
        if(name == null || name == ''){
            fwtai.closeEvent(199,"登录邮箱不能为空!");
            return false;
        }
        if(!fwtai.isEmail(name)){
            fwtai.closeEvent(199,"邮箱格式不正确!");
            return false;
        }
        if(password == null || password == ''){
            fwtai.closeEvent(199,"请输入登录密码!");
            return false;
        }
        if(code == null || code == ''){
            fwtai.closeEvent(199,"图形验证码不能为空!");
            return false;
        }
        var params = {
            'name':name,
            'password':password,
            'code':code,
        }
        this.request(params,2);
    },
    request : function(params,type){
        var _url = thisPage.url.auth;
        if(type==2){
            _url = thisPage.url.login;
        }
        fwtai.supportSession(function(){
            fwtai.ajaxGetHint(_url,'正在登录,请稍候……',params,function(data){
                if(data.code == 200){
                    //账号登录成功
                    if(type == 1){
                        fwtai.closeEvent(data.code,data.msg,function(){
                            window.location.href = 'service.html';
                        });
                    }else{
                        fwtai.closeEvent(data.code,data.msg,function(){
                            window.location.href = 'service.html';
                        });
                    }
                }else{
                    //账号登录失败
                    if(type == 1){
                        thisPage.accountRefreshCode();
                    }else{
                        thisPage.emailRefreshCode();
                    }
                    fwtai.closeEvent(data.code,data.msg);
                }
            }, function(error){
                fwtai.alert("连接服务器失败"+error);
            });
        });
    }
}
thisPage.init();