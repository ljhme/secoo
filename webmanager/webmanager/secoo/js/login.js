/**
 * Created by Administrator on 2016/9/10.
 */
$(document).ready(function () {
    $(function () {
        //回车登录
        document.onkeydown = function (e) {
            e = e ? e : window.event;
            var keyCode = e.which ? e.which : e.keyCode;
            if (keyCode == 13) {  //回车
                loginAjax();
            }
        }
    });

    //获取地址栏传过来的id
    function UrlSearch() {
        var name, value;
        var str = location.href; //取得地址栏的url
        var num = str.indexOf("?");  //？ 的位置
        str = str.substr(num + 1); //取得所有参数  获取？后面的url内容。
        var arr = str.split("&"); //各个参数放到数组里  ["pid=1"]
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
        }
    }

    var loginIndex = new UrlSearch(); //实例化
    var loginId = loginIndex.id;  //商品Id
    //console.log(loginId);  //1或者2  1登录   2为注册
    if (loginId == 1) {
        $(".loginFrame").css("display", "block");
        $(".registFrame").css("display", "none");
        check();
        $(".submitBtn").click(function () {
            loginAjax();
        });
    } else {
        $(".loginFrame").css("display", "none");
        $(".registFrame").css("display", "block");
        check();
        $(".registBtn").click(function () {
            registerAjax();
        });
        /* $("#RuserName").focusin(function () {
         $(".num-promptBox").text("请输入您的手机号！").css("color","#8e8e8e");
         $(this).css({
         "border-color":"#8B0000",
         });
         });
         $("#RuserName").focusout(function () {
         if($(this).val()==null||$(this).val()==""){
         $(".num-promptBox").text("请输入用户名！").css("color","red");
         $(this).css("border-color","red");
         }else if((/^[1-3]\d{10}$/).test($("#RuserName").val())==false){
         /!*var reg1 = /^[1-3]\d{10}$/   //电话号码的验证  第一位是  1-3    总共11位
         var tel = "13342276550";
         var res1 = reg1.test(tel);
         console.log(res1);*!/
         $(".num-promptBox").text("请正确的手机号！").css("color","red");
         $(this).css("border-color","red");
         }
         })*/
    }
    function check() {
        var resTxtList = $(".resTxt");
        for (var i = 0; i < resTxtList.length; i++) {
            resTxtList[i].index = i;
            $(resTxtList[i]).focusin(function () {
                checkFocIn(this, this.index);
            });
            $(resTxtList[i]).focusout(function () {
                //console.log(this.index);
                //console.log(resTxtList[this.index].value);
                checkFocOut(this, this.index, resTxtList[this.index].value);
            });
        }


        function checkFocIn(tis, i) {    //获取焦点
            switch (i) {
                case 0:
                    $(".loginUsL").css("display", "none");
                    $(tis).css("border-color", "#f19108");
                    $(".picUser").css("background-position-x", "-19px");
                    $(".loginPromtTxt").css("display", "none");
                    break;
                case 1:
                    $(".loginPsL").css("display", "none");
                    $(tis).css("border-color", "#f19108");
                    $(".picPassWord").css("background-position-x", "-19px");
                    $(".loginPromtTxt").css("display", "none");
                    break;
                case 2:
                    $(".num-promptBox").text("请输入您的手机号！").css("color", "#8e8e8e");
                    $(tis).css({
                        "border-color": "#8B0000",
                    });
                    break;
                case 3:
                    $(".pas-promptBox").css("display", "none");
                    $(tis).css({
                        "border-color": "#8B0000",
                    });
                    break;
                case 4:
                    $(".ackpas-promptBox").css("display", "none");
                    $(tis).css({
                        "border-color": "#8B0000",
                    });
                    break;
                default:
                    break;
            }
        }

        var pas;

        function checkFocOut(tis, i, str) {   //失去焦点
            switch (i) {
                case 0:
                    if (!$("#userName").val()) {
                        $(".loginUsL").css("display", "block");
                    }
                    $(tis).css("border-color", "#dedede");
                    $(".picUser").css("background-position-x", "0");
                    break;
                case 1:
                    if (!$("#userPass").val()) {
                        $(".loginPsL").css("display", "block");
                    }
                    $(tis).css("border-color", "#dedede");
                    $(".picPassWord").css("background-position-x", "0");
                    break;
                case 2:
                    if (str == "" || str == null) {
                        $(".num-promptBox").text("请输入用户名！").css("color", "red");
                        $(tis).css("border-color", "red");
                    } else if ((/^[1-3]\d{10}$/).test(str) == false) {
                        /*var reg1 = /^[1-3]\d{10}$/   //电话号码的验证  第一位是  1-3    总共11位
                         var tel = "13342276550";
                         var res1 = reg1.test(tel);
                         console.log(res1);*/
                        $(".num-promptBox").text("请输入正确的手机号！").css("color", "red");
                        $(tis).css("border-color", "red");
                    } else {
                        //验证该用户是否已经存在
                        isExist();
                    }
                    break;
                case 3:
                    pas = str;
                    if (str == "" || str == null) {
                        $(".pas-promptBox").css("display", "block").text("请输入密码！").css("color", "red");
                        $(tis).css("border-color", "red");
                    } else if ((/^[a-z0-9_-]{6,18}$/).test(str) == false) {
                        $(".num-promptBox").css("display", "block").text("密码最少为6位，字母和数字组成！").css("color", "red");
                        $(tis).css("border-color", "red");
                    }
                    break;
                case 4:
                    //验证两次密码是否相等
                    pas = str;
                    var reg21 = new RegExp("^" + pas + "$");
                    if (str == "" || str == null) {
                        $(".ackpas-promptBox").css("display", "block").text("请输入确认密码！").css("color", "red");
                        $(tis).css("border-color", "red");
                    } else if (reg21.test(str) == false) {
                        $(".ackpas-promptBox").css("display", "block").text("两次密码不一致！").css("color", "red");
                        $(tis).css("border-color", "red");
                    }
                    break;
                default:
                    break;
            }
        }
    }


    // 登录
    function loginAjax() {
        var userName = $("#userName").val();  //用户名
        var password = $("#userPass").val();  //密码
        console.log(userName);
        console.log(password);
        if ($.trim(userName) == "") {
            $("#userName").focus();
            $(".loginPromtTxt").css("display", "block").text("请输入用户名");
            return;
        }
        if ($.trim(password) == "") {
            $("#userPass").focus();
            $(".loginPromtTxt").css("display", "block").text("请输入密码");
            return;
        }
        /*if ($.trim(randomCode) == "") {
         loginMsg("请输入验证码!");
         $("#randomCode").focus();
         return ;
         }*/
        /*var ajaxUrl = "../product/GetProductById_get";
         $.ajax({
         url:ajaxUrl,
         data : {      //通过商家编号获取信息并进行验证，然后登录
         id:userName,
         },
         success:function (returnData) {
         console.log(returnData);
         if(returnData=="null"){
         $(".loginPromtTxt").css("display","block").text("用户名或密码不正确！");
         return;
         }else{
         var jsonData = JSON.parse(returnData);
         var info = jsonData.Data;
         var infos = JSON.parse(info);
         console.log(infos);
         if((userName!=infos.id)||(password!=infos.price)){
         $(".loginPromtTxt").css("display","block").text("用户名或密码不正确！");
         return;
         }else{
         window.location.href="index.html?id="+userName;
         }
         }
         }
         });*/


        var ajaxUrl = "../user/login";
        $.ajax({
            url: ajaxUrl,
            data: {
                Name: userName,
                password: password,
            },
            success: function (returnData) {
                console.log(returnData);
                if (returnData == -1) {
                    $(".loginPromtTxt").css("display", "block").text("用户名或密码不正确！");
                    return;
                } else {
                    window.location.href = "index.html?id=" + userName;
                }
            },
            dataType: "json",
            type: "post"
        });
    }


    // 注册
    function registerAjax() {
        var userName = $("#RuserName").val();  //用户名
        var password = $("#RuserPass").val();  //密码
        var ackPassword = $("#Rack-userPass").val();  //密码
        console.log(userName);
        console.log(password);
        console.log(ackPassword);
        if ($.trim(userName) == "") {
            $("#userName").focus();
            $(".num-promptBox").text("请输入用户名！").css("color", "red");
            $("#userName").css("border-color", "red");
            return;
        }
        if ($.trim(password) == "") {
            $("#RuserPass").focus();
            $(".pas-promptBox").css("display", "block").text("请输入密码！").css("color", "red");
            $("#userPass").css("border-color", "red");
            return;
        }
        if ($.trim(ackPassword) == "") {
            $("#Rack-userPass").focus();
            $(".ackpas-promptBox").css("display", "block").text("两次密码不一致！").css("color", "red");
            $("#Rack-userPass").css("border-color", "red");
            return;
        }

        var ajaxUrl = "../user/registerGet";
        $.ajax({
            url: ajaxUrl,
            data: {
                Name: userName,
                password: password,
            },
            success: function (returnData) {
                console.log(returnData);
                if (returnData == -1) {
                    $(".loginPromtTxt").css("display", "block").text("用户名或密码格式不正确！");
                    return;
                } else {
                    window.location.href = "index.html?id=" + userName;
                }
            },
            dataType: "json",
            type: "get",
        });
    }


    // 判断用户是否存在
    function isExist() {
        var userName = $("#RuserName").val();  //用户名
        console.log(userName);
        var ajaxUrl = "../user/CheckUserName";
        $.ajax({
            url: ajaxUrl,
            data: {
                username: userName,
            },
            success: function (returnData) {
                console.log(returnData);
                if (returnData == 1) {
                    $("#userName").focus();
                    $(".num-promptBox").text("用户名已被注册！").css("color", "red");
                    $("#userName").css("border-color", "red");
                    return;
                }
            },
            dataType: "json",
            type: "post",
        });
    }


























});