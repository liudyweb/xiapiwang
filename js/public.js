//	
if(localStorage.getItem("loin")){
	$('#onregister').hide();
	$('#outregister').show();
	var cookarr=JSON.parse(cookieObj.get("datas"))
	var count=0;
	for(var i=0;i<cookarr.length;i++){
		count++;
	}
	$('.cart_pcount').html(count);
}
//退出登录	
$('#outregister').click(function(){
	console.log(1)
	localStorage.removeItem("loin")
	$(this).hide();
	$('#onregister').show();
})
//注册
$('#onlogin').click(function(){
	$('#login').show();
	$('body').css("overflow","hidden");
})
//隐藏
$('#login').click(function(e){
	var e=e||window.event;
	var x2=e.pageX;
	var ex=$("#login>.login").offset().left;
	if(x2<ex||x2>(ex+$("#login>.login").width())){
		$('#login').hide();
	}
	$('body').css("overflow","");
})
//切换登录
$("#login .login_loginbtn").click(function(){
	$('#register').show();
	$('#login').hide();
})
//正则
var loginjudgearr=["無效的手機號碼","驗證碼不正确","使用者帳號須在5-30個字元,只能輸入字母、數字","密碼長度需為8-16個字母，並且包含一個大寫字母和一個小寫字母。","輸入的密碼不同","驗證碼不正确"];
$.each($(".login .inp_judge"), function(index,ele) {
	$(this).html(loginjudgearr[index]);
});

var loginreg0=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
$('.login_content input:eq(0)').blur(function(){
	if(loginreg0.test($(this).val())){
		$(this).css({"border":""});
		$(this).parent().next().hide();
	}else{
		$(this).css({"border":"1px solid red"})
		$(this).parent().next().show();
	}
})
var loginreg1=/\d{6}/;
$('.login_content input:eq(1)').blur(function(){})
var loginreg2=/\w{5,30}/;
$('.login_content input:eq(2)').blur(function(){
	if(loginreg2.test($(this).val())){
		$(this).css({"border":""});
		$(this).parent().next().hide();
	}else{
		$(this).css({"border":"1px solid red"})
		$(this).parent().next().show();
	}
})
$('.login_content input:eq(3)').blur(function(){
	var vv=$(this).val();
	if(/[0-9a-zA-Z]{8,16}/g.test(vv)&&/[0-9]+/g.test(vv)&&/[a-z]+/g.test(vv)&&/[A-Z]+/g.test(vv)){
		$(this).css({"border":""});
		$(this).parent().next().hide();
	}else{
		$(this).css({"border":"1px solid red"})
		$(this).parent().next().show();
	}
})
$('.login_content input:eq(4)').blur(function(){
	if($(this).val()==$('.login_content input:eq(3)').val()){
		$(this).css({"border":""});
		$(this).parent().next().hide();
	}else{
		$(this).css({"border":"1px solid red"})
		$(this).parent().next().show();
	}
})
var randomn=[];
for(var i=0;i<6;i++){
	randomn.push(Math.floor(Math.random()*10))
}
$('.pho_random').html(randomn.join(""))
$('.login_content input:eq(5)').blur(function(){
	if($(this).val()==$('.pho_random').html()){
		$(this).css({"border":""});
		$(this).parent().next().hide();
	}else{
		$(this).css({"border":"1px solid red"})
		$(this).parent().next().show();
	}
})
$('.login_content_cancel').click(function(){
	$('.login_content input').val('');
})

var inforarr=[];
localStorage.setItem("inforarr",inforarr)
$('.login_content_enter').click(function(){
	if($('.inp_judge').css("display")=="none"){
		var aa = localStorage.getItem("inforarr");
		var phone=$('.login_content input:eq(0)').val();
		var username=$('.login_content input:eq(2)').val();
		var pass=$('.login_content input:eq(3)').val();
		if(localStorage.getItem("phone")==null){
			localStorage.getItem("phone",phone)
			localStorage.getItem("username",username)
			localStorage.getItem("pass",pass)
		}else{
			alert('账号已注册');
		}
		$('#login').hide();
		$('#register').show();
		alert('注册成功');
	}else{alert('信息有误')}
})

//点击登录
$('#onregister').click(function(){
	$('#register').show();
	$('body').css("overflow","hidden");
})
$('.register_content_cancel').click(function(){
	$('.register_content input').val('');
})
$('.register_content_enter').click(function(){
	var registername=$('.register_content input:eq(0)').val();
	var registerpass=$('.register_content input:eq(1)').val();
	if(registername==localStorage.setItem("username")||registername==localStorage.setItem("phone")){
		if(registerpass==localStorage.setItem("pass")){
			$('#register').hide();
			var loinarr=[registername,registerpass]
			var loinstr=JSON.stringify(loinarr)
			localStorage.setItem("loin",loinstr)
			$('#outregister').show();
			$('#onregister').hide();
		}else{
			alert('密码错误');
			$('.register_content input:eq(1)').val('')
		}
	}else{
		alert('用户名不存在,请先注册');
		$('#register').hide();
		$('#login').show();
	}
})
//隐藏
$('#register').click(function(e){
	var e=e||window.event;
	var x1=e.pageX;
	var y1=e.pageY;
	var dx=$("#register>.register").offset().left;
	var dy=$("#register>.register").offset().top;
	if( (x1<dx||x1>(dx+$("#register>.register").width()))||(y1<dy||y1>(dy+$("#register>.register").height())) ){
		$('#register').hide();
	}
	$('body').css("overflow","");
})
$("#register .register_loginbtn").click(function(){
	$('#register').hide();
	$('#login').show();
})

//cart
$('.header_cart').click(function(){
	location.href="shopCar.html";
})
