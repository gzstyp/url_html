/**
 * 联系
 * @作者 田应平
 * @创建时间 2019-07-05 0:15
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
;var thisPage = {
    url : {
        add : base_url + 'message/add',
    },
    addEvent : function(){
        $('#send_button').live("click",function(){
            var name = $('#name_text_box').val();
            var email = $('#email_text_box').val();
            var content = $('#question_text_area').val();
            if(name == null || name == ''){
                fwtai.alert("昵称不能为空");
                return false;
            }
            if(email == null || email == ''){
                fwtai.alert("请输入邮箱!");
                return false;
            }
            if(!fwtai.isEmail(email)){
                fwtai.alert("请输入有效的电子邮箱");
                return false;
            }
            if(content == null || content == ''){
                fwtai.alert("请输入内容再提交");
                return false;
            }
            var params = {
                "name" : name,
                "email" : email,
                "content" : content,
            };
            fwtai.ajaxGetHint(thisPage.url.add,'正在提交,请稍候……',params,function(data){
                if(data.code == 200){
                    fwtai.alert(data.msg);
                }else{
                    fwtai.alert(data.msg);
                }
            }, function(error){
                fwtai.alert("提交失败,原因为" + error);
            });
        });
    },
    init : function(){
        this.addEvent();
    },
    submit : function(){
    }
}
thisPage.init();