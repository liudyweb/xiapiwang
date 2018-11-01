//加载头部脚步登录注册
$('#header').load('publichead.html',function(data,status,xhr){});
$('#footer').load('publicfooter.html',function(data,status,xhr){});
$('#login').load('publiclogin.html',function(data,status,xhr){});
$('#register').load('publicregister.html',function(data,status,xhr){});
//
$('.img_com_move').width($('.img_com_move').children().length*92)
//
var pidr=null;
function GetQueryString(){
//	var reg=new RegExp("(^|&)"+name+"=(^&)*(&|$)");
	var reg=/^pid=\w*$/g
	pidr=decodeURI(window.location.search.substr(1)).match(reg).join("").substring(4)
	return pidr
}
GetQueryString();
$.ajax({
	type:"get",
	url:"commodity.json",
	async:true,
	dataType:"json"
}).done(function(res){
	//pid
	console.log(res.com)
	var resarr=res.com;
	var resjson={}
	$.each(resarr,function(rindex,rele){
		if(rele.pid==pidr){
			resjson=rele;
			console.log(resjson)
		}	
	});
	//加载数据方法
	var Loadcom={
		Loadnav:function(navarr){
			$.each(navarr,function(navindex,navele){
				navstr+='<a href="#">'+navele+'</a>>';
			})
		},
		Loadicon:function(icarr){
			$.each(icarr,function(icindex,icele){
				icstr+='<div class="img_com_nav_icon" style="background-image:url('+icele+');background-size:contain;background-repeat:no-repeat;"></div>'
			});
		},
		Loaddis:function(disarr){
			if(disarr.comment==""){
				disstr+='<div class="ping">尚未有評價</div>'
				+'<div class="spec_com_salse"><span>'+disarr.sales+'</span>月銷售量</div>'
			}else{
				disstr+='<div class="spec_star"><div>'+disarr.comment+'</div><img src="img/Screenshotpinglunwuxing.jpg"/></div>'
				+'<div class="discuss"><div>'+disarr.numpeople+'</div>評價</div>'
				+'<div class="spec_com_salse"><span>'+disarr.sales+'</span>月銷售量</div>'
			}
		},
		Loadmodel:function(modarr){
			$.each(modarr,function(modindex,modele){
				modstr+='<li>'+modele+'</li>'
			});
		},
		Loadpart1:function(pararr){
			$.each(pararr, function(paindex,paele) {
				partstr+='<span>'+paele+'</span>'
			});
		},
		Loadpart2:function(parr){
			$.each(parr, function(pindex,pele) {
				partstrd+='<a href="#">#'+pele+'</a>'
			});
		}
	}
//导航菜单栏
//console.log(resjson.nav)
navstr='';
navarr=resjson.nav;
Loadcom.Loadnav(navarr);
$('#fontnav').html(navstr+resjson.title);
//pid
$('#commodity').attr("pid",resjson.pid)
//图片详情
$('.img_com_icon').css({"background-image":"url("+resjson.path+")","background-size":"contain","background-repeat":"no-repeat"});
	var icstr='';
	var icarr=resjson.suolue;
	Loadcom.Loadicon(icarr);
	$('.img_com_move').html(icstr);
	//加载宽度
	var icmlength=$('.img_com_move').children().length
	$('.img_com_move').width(icmlength*91);
	//默认焦点点击
	$('.img_com_nav_icon:eq(0)').addClass('movnavf52')
	$('.img_com_nav_icon').click(function(){
		$(this).addClass('movnavf52').siblings().removeClass('movnavf52');
		$('.img_com_icon').css("background-image",$(this).css("background-image"));
		$('.img_com_magn').css("background-image",$(this).css("background-image"));
	})
	//左右移动
	var iccn=0;
	$('.img_com_ctrl .prev').click(function(){
		iccn--;
		Jgn();
	});
	$('.img_com_ctrl .next').click(function(){
		iccn++;
		Jgn();
	});
	function Jgn(){
		if(iccn<=0){iccn=0}
		if(iccn>=(icmlength-5)){iccn=(icmlength-5)}
		$('.img_com_move').css("margin-left",(-91*iccn)+"px");
	}
//放大镜

$('.img_com_magn').css({"background-image":$('.img_com_magn').prev().css("background-image")})
$('.img_com_icon').mouseenter(function(){
	$(this).children().show();
	$(this).next().show();
	$('.img_com_icon').mousemove(function(e){
		var e=e||window.event;
		//设置选取框移动的XY
		var x=e.pageX-$(this).offset().left-$('.com_mask').width()/2;
		var y=e.pageY-$(this).offset().top-$('.com_mask').height()/2;
		var maxX=$(this).width()-$('.com_mask').width();
		x<0?x=0:x;
		x>maxX?x=maxX:x;
		var maxY=$(this).width()-$('.com_mask').height();
		y<0?y=0:y;
		y>maxY?y=maxY:y;
		$('.com_mask').css({"left":x+"px","top":y+"px"})
		//比例
		var bili=900/$('.img_com_icon').width()
		$('.img_com_magn').css({"background-position-x":(-x)*bili,"background-position-y":(-y)*bili})
	})
})
$('.img_com_icon').mouseleave(function(){
	$(this).children().hide();
	$(this).next().hide();
})
//喜欢
$('.img_com_like span').html("("+resjson.collect+")");
//spec_com
$('.spec_com>h3').html(resjson.title);
//
var disstr='';
var disarr=resjson;
Loadcom.Loaddis(disarr);
$('.spec_com_discuss').html(disstr);
//price
$('.spec_com_oldprice').html(resjson.oldprice);
$('.spec_com_nowprice').html(resjson.nowprice);
if(resjson.discount==""){
	$('.spec_com_discount').hide()
}else{
	$('.spec_com_discount').html(resjson.discount);	
}
//spec_com_model规格
var modstr='';
var modarr=resjson.spec
Loadcom.Loadmodel(modarr);
$('.spec_com_model_con').html(modstr);
$('.spec_com_model').height(modarr.length/4*41)
$('.spec_com_model_con li').click(function(){
	$(this).addClass('model_active').siblings().removeClass('model_active')
})
//spec_com_number数量
var num=1;
$('.spec_com_number input:eq(0)').click(function(){
	num--;
	Jgnum();
})
$('.spec_com_number input:eq(2)').click(function(){
	num++;
	Jgnum();
})
$('.spec_com_number input:eq(1)').blur(function(){
	num=$(this).val()
	Jgnum();
})
//
$('.spec_com_number>div>span').html(resjson.number)
function Jgnum(){
	var maxNum=$('.spec_com_number>div>span').html();
	if(num<1){num=1}
	if(num>maxNum){num=maxNum}
	$('.spec_com_number input:eq(1)').val(num)
}
//message 
$('.boss_name').html(resjson.mesname)
$('.boss_onlin').html(resjson.mesonlin);
$.each(resjson.mescn,function(index,ele){
	$('.mes_con_t span:eq('+index+')').html(ele);	
})

//details_spec_con高度
$.each(resjson.specl,function(sindex,sele){
	$('.details_spec_item_left:eq('+sindex+')').html(sele);
});
$('.details_spec_con').height((resjson.specl.length)*35);
$('.details_spec_item_right:eq(0)').html(navstr.substring(0,navstr.length-1));
$('.details_spec_item_right:eq(1)').html(resjson.specr[0]);
$('.details_spec_item_right:eq(2)').html(resjson.specr[1]);
$('.details_spec_item_right:eq(3)').html(resjson.specr[2]);
$('.details_spec_item_right:eq(4)').html(resjson.specr[3]);
$('.details_spec_item_right:eq(4)').wrapInner("<a href='#'></a>")
//details_part商品詳情
var partstr='';
var partarr1=resjson.part1;
Loadcom.Loadpart1(partarr1);
$('.details_part_top').html(partstr);
partstr='';
$('.details_part_top').children('span').eq($('.details_part_top').children().length-1).wrapInner('<a href="#"></a>');
var partarr2=resjson.part2;
Loadcom.Loadpart1(partarr2);
$('.details_part_center').html(partstr);
partstr='';
var partstrd='';
var partarr3=resjson.part3;
Loadcom.Loadpart2(partarr3);
$('.details_part_bottom').html(partstrd);
//
//存cookie商品详情
var cookie=cookieObj.get("datas");
if(cookie==undefined){
	cookieObj.set({name:"datas",value:"[]"});
}
//字符串转数组
var ckarr=JSON.parse(cookieObj.get("datas"))
//nowprice--#specNumber.val()--.img_com_iconbackground-image
var qx=$('.spec_com_deal_join').offset().left
var qy=$('.spec_com_deal_join').offset().top
console.log(qx,qy)
$('.movecart').css({"left":qx,"top":qy,"display":"block"})
$('.spec_com_deal_join').click(function(e){
	var sx=$('.header_cart').offset().left
	var sy=$('.header_cart').offset().top
	console.log(sx,sy)
	var x=qx;
	var y=qy;
	var timecar=setInterval(function(){
		x+=10;
		y+=-20;
		x>=sx?x=sx:x
		y<=sy?y=sy:y
		$('.movecart').css({"left":x+"px","top":y+"px","display":"block"})
		if(x>=sx&&y<=sy){
			$('.movecart').css({"left":qx+"px","top":qy+"px","display":"block"})
			clearInterval(timecar)
		}
	},10)
	
	var commodObj={};
	var pid=$('#commodity').attr("pid")
	commodObj.pid=pid;
	commodObj.name=$('.spec_com h3').html();
	var icil=$('.img_com_icon').css("background-image");
	commodObj.imgsrc=icil.substring(4,(icil.length-1));
	commodObj.nprice=$('.spec_com_nowprice').html();
	commodObj.pcount=$('#specNumber').val();
//	console.log($('#specNumber').val())
	if(checkCookie(pid)){
		commodObj.pid=pid;
		commodObj.name=$('.spec_com h3').html();
		var icil=$('.img_com_icon').css("background-image");
		commodObj.imgsrc=icil.substring(4,(icil.length-1));
		commodObj.nprice=$('.spec_com_nowprice').html();
		commodObj.pcount=$('#specNumber').val();
		//更新pcount
//		updateCookie(pid,1);
	}else{
		//把商品信息的json添加到cookie
		var carr=getAll();
		carr.push(commodObj);
		var ckstr=JSON.stringify(carr);
		cookieObj.set({name:"datas",value:ckstr});
	}
	console.log(commodObj);
})
	
})