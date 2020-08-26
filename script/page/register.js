/**
 * 注册
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;var thisPage = {
    /*总结: 访问的url如果没有参数即占位符的直接写成属性,如有参数则写成方法,方便传参数*/
    url:{
        signup : base_url + 'account/regSignup',
        addEmail : base_url + 'account/regEmail',
        exposer : function(key){
            return base_url + 'user/'+key+'/del';
        },
        execution : function(key,mkd5){
            return base_url + 'user/'+key+'/'+mkd5+'/edit';
        },
        imageCode : base_url + 'imgCode',
    },
    addEvent : function(){
        //账号注册时验证码刷新
        $('#imgCode').live("click",function(){
            thisPage.codeRefresh();
        });
        //邮箱注册时验证码刷新
        $('#email_imgCode').live("click",function(){
            thisPage.emailRefresh();
        });
        //账号注册时的提交
        $('#send_button').live("click",function(){
            thisPage.submitAccount();
        });
        //邮箱注册时的提交
        $('#email_send').live("click",function(){
            thisPage.submitEmail();
        });
        //账号注册时重置
        $('#reset_button').live("click",function(){
            thisPage.reset();
        });
        //邮箱注册时重置
        $('#email_reset').live("click",function(){
            thisPage.resetEmail();
        });
    },
    init : function(){
        $('#imgCode').attr('src',thisPage.url.imageCode);
        this.addEvent();
    },
    type : function(type){
        $('#type').val(type);
        if(type == 1){
            thisPage.codeRefresh();
        }else if(type ==2){
            thisPage.emailRefresh();
        }
    },
    /**账号注册时刷新验证码*/
    codeRefresh : function(){
        fwtai.setDomValue('#code');
        fwtai.refreshCode('#imgCode',base_url + "imgCode?date=" + new Date().getTime());
    },
    /**邮箱注册时刷新验证码*/
    emailRefresh : function(){
        fwtai.setDomValue('#email_code');
        fwtai.refreshCode('#email_imgCode',base_url + "imgCode?date=" + new Date().getTime());
    },
    /**账号时重置*/
    reset:function(){
        fwtai.setDomValue('#user_name');
        fwtai.setDomValue('#password');
        fwtai.setDomValue('#verify');
        fwtai.setDomValue('#code');
        this.codeRefresh();
    },
    /**邮箱时重置*/
    resetEmail:function(){
        fwtai.setDomValue('#email_user');
        fwtai.setDomValue('#email_pwd');
        fwtai.setDomValue('#email_verify');
        fwtai.setDomValue('#email_code');
        this.emailRefresh();
    },
    submitAccount : function(){
        var _self = this;
        var name = fwtai.getDomValue('#user_name');
        var password = fwtai.getDomValue('#password');
        var verify = fwtai.getDomValue('#verify');
        var code = fwtai.getDomValue('#code');
        if(name == null || name == ''){
            fwtai.closeEvent(199,"用户名不能为空!");
            return false;
        }
        if(password == null || password == ''){
            fwtai.closeEvent(199,"请输入登录密码!");
            return false;
        }
        if(verify == null || verify == ''){
            fwtai.closeEvent(199,"请输入确认密码!");
            return false;
        }
        if(password != verify){
            fwtai.closeEvent(199,"输入的两次密码不一致!");
            return false;
        }
        if(code == null || code == ''){
            fwtai.closeEvent(199,"图形验证码不能为空!");
            return false;
        }
        var params = {
            'name':name,
            'password':password,
            'verify':verify,
            'code':code,
        };
        this.request(params,1);
    },
    submitEmail : function(){
        var name = fwtai.getDomValue('#email_user');
        var password = fwtai.getDomValue('#email_pwd');
        var verify = fwtai.getDomValue('#email_verify');
        var code = fwtai.getDomValue('#email_code');
        if(name == null || name == ''){
            fwtai.closeEvent(199,"邮箱账号不能为空!");
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
        if(verify == null || verify == ''){
            fwtai.closeEvent(199,"请输入确认密码!");
            return false;
        }
        if(password != verify){
            fwtai.closeEvent(199,"输入的两次密码不一致!");
            return false;
        }
        if(code == null || code == ''){
            fwtai.closeEvent(199,"图形验证码不能为空!");
            return false;
        }
        var params = {
            'name':name,
            'password':password,
            'verify':verify,
            'code':code,
        };
        this.request(params,2);
    },
    request : function(params,type){
        fwtai.supportSession(function(){
            var _url = thisPage.url.signup;
            if(type==2){
                _url = thisPage.url.addEmail;
            }
            fwtai.ajaxGetHint(_url,'正在注册,请稍候……',params,function(data){
                if(data.code == 200){
                    //账号注册成功
                    if(type == 1){
                        fwtai.closeEvent(data.code,data.msg,function(){
                            window.location.href = 'login.html';
                        });
                    }else{
                        //邮箱注册成功
                        fwtai.closeEvent(data.code,data.msg,function(){
                            window.location.href = 'login.html';
                        });
                    }
                }else{
                    if(type == 1){
                        thisPage.codeRefresh();
                    }else{
                        thisPage.emailRefresh();
                    }
                    fwtai.closeEvent(data.code,data.msg);
                }
            }, function(error){
                fwtai.alert("连接服务器失败,"+error);
            });
        });
    },

}
thisPage.init();