$(function() {
	//回车登录
	document.onkeydown = function(e) {
		e = e ? e : window.event;
		var keyCode = e.which ? e.which : e.keyCode;
		if (keyCode == 13) {  //回车
			loginAjax();
		}
	}
	$("#vendorCode").focus();
});
// 获取验证码

// 登录
function loginAjax() {
	var userName = $("#userName").val();  //用户名
	var vendorCode = $("#vendorCode").val();  //商家编号
	var password = $("#password").val();  //密码
	var randomCode = $("#randomCode").val();  //验证码
	if ($.trim(vendorCode) == "") {
		loginMsg("请输入商家编号!");
		$("#vendorCode").focus();
		return ;
	}
	if ($.trim(userName) == "") {
		loginMsg("请输入用户名!");
		$("#userName").focus();
		return ;
	}

	if ($.trim(password) == "") {
		loginMsg("请输入登录密码!");
		$("#password").focus();
		return ;
	}
	/*if ($.trim(randomCode) == "") {
		loginMsg("请输入验证码!");
		$("#randomCode").focus();
		return ;
	}*/
	var ajaxUrl = "../product/GetProductById_get";
	$.ajax({
		url:ajaxUrl,
		data : {      //通过商家编号获取信息并进行验证，然后登录
			id:vendorCode,
		},
		success:function (returnData) {
			console.log(returnData);  //字符串
			if(returnData=="null"){
				loginMsg("编号不存在");
				return;
			}else{
				var jsonData = JSON.parse(returnData);
				var info = jsonData.Data;
				var infos = JSON.parse(info);
				//console.log(infos);
				if((userName!=infos.name)||(password!=infos.price)){
					loginMsg("用户名或密码错误！");
					return;
				}else{
					window.location.href="index.html";
				}
				/*else if("2"==ret){
					changeVImage('img');
					loginMsg("验证码错误！");
					$("#randomCode").val("").focus();
					return;
				}*/
			}
		}
	});


}
function loginMsg(msg){
	alert(msg);
}