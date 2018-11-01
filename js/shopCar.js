//加载头部脚步登录注册
$('#header').load('publichead.html',function(data,status,xhr){});
$('#footer').load('publicfooter.html',function(data,status,xhr){});
$('#login').load('publiclogin.html',function(data,status,xhr){});
$('#register').load('publicregister.html',function(data,status,xhr){});
//获取cookie数据
var ckarr=JSON.parse(cookieObj.get("datas"));
console.log(ckarr)
var ckstr='<tr class="shopcart_con_item">'
			+'<th class="wi13"><input type="checkbox" id="ck" /></th>'
			+'<th>全选</th>'
			+'<th>商品</th>'
			+'<th>单价(元)</th>'
			+'<th>数量</th>'
			+'<th>金额(元)</th>'
			+'<th>操作</th>'
		+'</tr>'
$.each(ckarr,function(ckindex,ckele){
	ckstr+='<tr pid="'+ckele.pid+'">'
				+'<td><input type="checkbox" name="check"/></td>'
				+'<td><img src='+ckele.imgsrc+'/></td>'
				+'<td>'+ckele.name+'</td>'
				+'<td>'+ckele.nprice.substring(1)+'/件</td>'
				+'<td class="shopcart_con_count">'
					+'<input type="button" name="" class="shopcartSub" value="-" />'
					+'<input type="text" name="" class="shopcartNum" value="'+Number(ckele.pcount-0)+'" />'
					+'<input type="button" name="" class="shopcartAdd" value="+" />'
				+'</td>'
				+'<td class="money">'+Number(ckele.pcount)*Number(ckele.nprice.substring(1))+'</td>'
				+'<td class="shopOper"><button>删除</button></td>'
			+'</tr>'
});
ckstr+='<tr class="tab_no"><td></td><td></td><td>暂无商品，去<a href="home.html">购物</a></td></tr>'
$('.shopcart_tab tbody').html(ckstr);
$('#ck').attr("checked","true");
$('input[name="check"]').attr("checked","true");
$('#ck').change(function(){
	$.each($('input[name="check"]'),function(index,ele){
		if($('#ck').prop('checked')){
			$('input[name="check"]').attr("checked","true");
		}else{
			$('input[name="check"]').removeAttr("checked")
		}
	});
	$('.zongji span').html(Getallprice());
	$('.gongji span').html(Getallnumber());
})
var len=$('.shopcart_tab tr').length-1;
function Loadtabh(){
	var len=$('.shopcart_tab tr').length-1;
	if(len==1){
		$('.tab_no').show();
		$('.shopcar_content').height((len+1)*71+27)
	}else{
		$('.tab_no').hide();
		$('.shopcar_content').height(len*71+27)
	}
}
Loadtabh()
function Jugck(){
	var flag=true;
	var trlen=$('.shopcart_tab tr').length
	for(var i=0;i<trlen-2;i++){
		if($('input[name="check"]').eq(i).prop('checked')){
		}else{
			flag=false;break;
		}
	}
	if(flag){$('#ck').attr("checked","true")}else{$('#ck').removeAttr("checked")}
}

//
function Getallprice(){
	var zongji=0;
	var leng=$('.shopcart_tab tr').length-2;
	for(var i=0;i<leng;i++){
		if($('input[name="check"]').eq(i).prop("checked")){
zongji+=Number($('input[name="check"]').eq(i).parent().parent().children(".money").html())
		}
	}
	return zongji
}
function Getallnumber(){
	var gongji=0;
	var leng=$('.shopcart_tab tr').length-2;
	for(var i=0;i<leng;i++){
		if($('input[name="check"]').eq(i).prop("checked")){
gongji+=Number($('input[name="check"]').eq(i).parent().parent().children(".shopcart_con_count").children(".shopcartNum").val())
		}
	}
	return gongji
}
function catrload(){
	var count=0
	for(var i=0;i<ckarr.length;i++){
		count+=Number(ckarr[i].pcount);
	}
	return count;
}
catrload();
$('.cart_pcount').html(catrload())
$('input[name="check"]').change(function(){
	Jugck();
	var check=$(this).prop("checked");
	if(check){
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}else{
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}
	$('#ck').trigger("change");
})
//减
$('.shopcartSub').click(function(){
	var trs=$(this).parent().parent();
	var pid=trs.attr("pid");
	var num=Number($(this).next().val())-1
	if(num<1){num=1}else{updateCookie(pid,-1)}
	$(this).next().val(num);
	var danjial=$(this).parent().prev().html().length
	var danjia=$(this).parent().prev().html().substring(0,danjial-2)
	$(this).parent().next().html(num*Number(danjia))
	//选中计算总价
//		console.log($(this).next().val())
	var check=trs.children().children().prop("checked");
	if(check){
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}
})
//加
$('.shopcartAdd').click(function(){
	var trs=$(this).parent().parent();
	var pid=trs.attr("pid");
	var num=Number($(this).prev().val())+1
	$(this).prev().val(num);
	updateCookie(pid,1);
	var danjial=$(this).parent().prev().html().length
	var danjia=$(this).parent().prev().html().substring(0,danjial-2)
	$(this).parent().next().html(num*Number(danjia))
	//选中计算总价
	var check=trs.children().children().prop("checked");
	if(check){
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}
})
//输入
$('.shopcartNum').blur(function(){
	var trs=$(this).parent().parent();
	var pid=trs.attr("pid");
	for(var i=0;i<ckarr.length;i++){
		if(ckarr[i].pid==pid){
			ckarr[i].pcount=Number($(this).val());
		}
	}
	//选中计算总价
	var check=trs.children().children().prop("checked");
	if(check){
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}
})
//删除
$('.shopOper').click(function(){
	//选中计算总价
	var check=$(this).parent().children().children().prop("checked");
	if(check){
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}else{
		$('.zongji span').html(Getallprice());
		$('.gongji span').html(Getallnumber());
	}
	//
	$(this).parent().remove();
	//重新加载高度
	Loadtabh();
	//删除cookie
	var aa=$(this).parent().attr("pid")
	console.log($(this).parent().attr("pid"))
	for(var i=0;i<ckarr.length;i++){
		if(ckarr[i].pid==aa){
			ckarr.splice(i,1)
			var cookiestr=JSON.stringify(ckarr);
			cookieObj.set({name:"datas",value:cookiestr});
			console.log(ckarr)
		}
	}
	$('.cart_pcount').html(catrload())
//	return ckarr
})
//加载高度
Loadtabh();
//默认
var trs=$('.shopcartNum').parent().parent();
var check=trs.children().children().prop("checked");
if(check){
	$('.zongji span').html(Getallprice());
	$('.gongji span').html(Getallnumber());
}
$('.shopcar_content_foot button:eq(0)').click(function(){
	var tabtrlen=$('.shopcart_tab tr').length-2;
	for(var t=0;t<tabtrlen;t++){
		if($('.shopcart_tab input[name="check"]:eq('+t+')').prop("checked")){
			$('.shopcart_tab input[name="check"]:eq('+t+')').parent().parent().remove();
			//重新加载高度
			Loadtabh();
			//删除cookie
			var aa=$('.shopcart_tab input[name="check"]:eq('+t+')').parent().attr("pid")
			for(var i=0;i<ckarr.length;i++){
				if(ckarr[i].pid==aa){
					ckarr.splice(i,1)
					var cookiestr=JSON.stringify(ckarr);
					cookieObj.set({name:"datas",value:cookiestr});
					console.log(ckarr)
				}
			}
		}
	}
	Jugck();
	$('.zongji span').html(Getallprice());
	$('.gongji span').html(Getallnumber());
	$('.cart_pcount').html(catrload())
})
$('.shopcar_content_foot button:eq(1)').click(function(){
	$('.shopcart_tab input[name="check"]').removeAttr("checked");
	$('.shopOper').trigger("click");
	$('.zongji span').html(Getallprice());
	$('.gongji span').html(Getallnumber());
	$('.cart_pcount').html(catrload())
})