$('#header').load('publichead.html',function(data,status,xhr){});
$('#footer').load('publicfooter.html',function(data,status,xhr){});
$('#login').load('publiclogin.html',function(data,status,xhr){});
$('#register').load('publicregister.html',function(data,status,xhr){});
//banner-------------------------------------------------------------------------
var banner=document.getElementById('banner'); 
var dis = banner.getElementsByClassName('banner_move')[0];
var imgs=dis.getElementsByTagName('img');
var spa = banner.getElementsByTagName('span');
var lis = banner.getElementsByTagName('li');
var timer=null;
var n = 0;
var a=0;
banner.onmouseenter=function(){
	spa[0].style.display="block";
	spa[1].style.display="block";
	clearInterval(timer)
}
banner.onmouseleave=function(){
	spa[0].style.display="";
	spa[1].style.display="";
	tim();
}
spa[0].onclick=function(){
	n--;
	a++;
	change();
}
spa[1].onclick=function(){
	n++;
	a--;
	change();
}
for(var i=0;i<imgs.length;i++){
	lis[i].ind=i;
	lis[i].onclick=function(){
		n=this.ind;
		a=-this.ind;
		change();
	}
}
lis[0].style.background="#ff5524";
function tim(){
	timer = setInterval(function(){
		n++;
		a--;
		change();
	},2500)
}
tim();
function change(){
	for (var i=0;i<lis.length;i++) {
		lis[i].style.background="";
	}
	dis.style.transition="0.7s";
	if(n>(imgs.length-1)){n=0;dis.style.transition=""}
	if(n<0){n=imgs.length-1;dis.style.transition=""}
	if(a<-(imgs.length-1)){a=0;dis.style.transition=""}
	if(a>0){a=-(imgs.length-1);dis.style.transition=""}
	dis.style.marginLeft=796*a+"px";
	lis[n].style.background="#ff5524";
}
//banner结束------------------------------------------------------------------
//FAFnav----------------------------------------------------------------------
$('#FAFnav .FAF_ico').hover(function(){
	$(this).css("margin-top","-2px")
	$(this).css("margin-left","1px")
},function(){
	$(this).css("margin-top","")
	$(this).css("margin-left","")
})
//hp_hot热门关键字
//ajax获取数据加载方法
$.ajax({
	type:"get",
	url:"home.json",
	async:true,
	dataType:"json"
}).done(function(res){
	var LoadData={
		LoadHot:function(hotarr){
			$.each(hotarr,function(hotindex,hotele){
				hotstr+='<div class="hp_hot_list">'
							+'<div class="hp_hot_list_con">'
								+'<p class="hp_hot_list_name">'+hotele.title+'</p>'
								+'<span class="hp_hot_list_num">'+hotele.number+'</span>件商品'
							+'</div>'
							+'<div class="hp_hot_list_icon" style="background-image: url(&quot;'+hotele.path+'&quot;); background-size: contain; background-repeat: no-repeat;"></div>'
						+'</div>'
			})
		},
		LoadLimited:function(limitarr){
			$.each(limitarr,function(limindex,limele){
				limstr+='<div class="hp_limit_con_item">'
						+'<a href="#">'
							+'<div class="hp_limit_con_icon" style="background-image: url(&quot;'+limele.path+'&quot;);background-size:contain;background-repeat: no-repeat;"></div>'
							+'<div class="hp_limit_con_par">'
								+'<p class="cff5b2a">$<span class="hp_limit_con_price">'+limele.price+'</span></p>'
								+'<div class="hp_limit_con_sold">'+limele.workoff+'</div>'
							+'</div>'
						+'</a>'
					+'</div>'
			});
		},
		LoadStore:function(storearr){
			$.each(storearr,function(storeindex,storeele){
				storestr+='<li style="background-image:url(&quot;'+storeele.path+'&quot;);background-size:contain;background-repeat:no-repeat;">'
							+'<a href="#"></a>'
						+'</li>'
			});
		},
		LoadGoods:function(goodarr){
			$.each(goodarr,function(goodindex,goodele){
				var gind=goodindex;
				if(gind==0){
					goodstr='<li>'+goodstr;
					addGoodstr();
				}else if((gind)%3==0&&(gind+1)!=goodarr.length){
					goodstr=goodstr+'</li><li>';
					addGoodstr();
				}else if((gind+1)==goodarr.length){
					addGoodstr();
					goodstr=goodstr+'</li>';
				}else{
					addGoodstr();
				}
				function addGoodstr(){
					goodstr+='<div class="hp_goods_top">'
								+'<div class="hp_goods_top1" style="background-image: url(&quot;'+goodele.top1+'&quot;);background-size:contain;background-repeat:no-repeat;">'
									+'<div class="_2dVBTK1"></div>'
									+'<div class="goods_month_sell">'+goodele.monSales+'</div>'
								+'</div>'
								+'<div class="hp_goods_right">	'								
									+'<div class="hp_goods_top2" style="background-image:url(&quot;'+goodele.top2+'&quot;);background-size:contain;background-repeat:no-repeat;"><div class="_2dVBTK2"></div></div>'
									+'<div class="hp_goods_top3" style="background-image:url(&quot;'+goodele.top3+'&quot;);background-size:contain;background-repeat:no-repeat;"><div class="_2dVBTK3"></div></div>'
								+'</div>'
								+'<div class="hp_goods_name">'+goodele.title+'</div>'
							+'</div>'
				}
			});
		},
		Loadfind:function(findarr){
			$.each(findarr,function(findex,fele){
				findstr+='<div class="hp_find_con" pid="'+fele.pid+'">'
							+'<a href="commodity.html?pid='+fele.pid+'">'
								+'<div class="hp_find_par">'
									+'<div class="hp_find_par_icon" style="background-image:url(&quot;'+fele.path+'&quot;);background-size:contain;background-repeat:no-repeat;"></div>'
									+'<div class="hp_find_par_name">'+fele.title+'</div>'
									+'<div class="hp_find_par_price">'
										+'<div class="hp_find_par_oldprice">'+fele.oldprice+'</div>'
										+'<div class="hp_find_par_nowprice">'+fele.nowprice+'</div>'
										+'<div class="hp_find_par_price_right"></div>'
									+'</div>'
									+'<div class="hp_find_par_appraise">'
										+'<div class="hp_find_par_appraise_left">'
											+'<img src="img/findconprelove.jpg"/>'
											+'<span>'+fele.collect+'</span>'
										+'</div>'
				if(fele.comment==""){
					findstr+='<div class="hp_find_par_appraise_right">'
								+'<div class="hp_find_par_appraise_star">'
									+'<div></div><div></div><div></div><div></div><div></div>'
								+'</div>'
								+'<span>'+fele.numpeople+'</span>'
							+'</div>'
						+'</div>'
						+'<div class="hp_find_similar">'
							+'找相似'
						+'</div>'
					+'</div>'
				+'</a>'
			+'</div>'
				}else{
					findstr+='<div class="hp_find_par_appraise_right">'+fele.comment+'</div>'
						+'</div>'
						+'<div class="hp_find_similar">'
							+'找相似'
						+'</div>'
					+'</div>'
				+'</a>'
			+'</div>'
				}
			});
		},
		Loadfoot:function(footarr){
			$.each(footarr,function(foindex,foele){
				var fostr='';
				$.each(foele.Tarr,function(fooindex,fooele){
					if(fooindex==(foele.Tarr.length-1)){
						fostr+='<a href="#">'+fooele+'</a>'
					}else{
						fostr+='<a href="#">'+fooele+'</a><span>|</span>'
					}
				})
				footstr+='<h2><a href="#">'+foele.title+'</a></h2>'+fostr
			})
		}
	}
//热门关键字
	console.log(res.hotkeywords);
	var hotstr='';
	var hotarr=null;
	var hotn=0;
	$('.hp_hot button').click(function(){
		hotn++;
		hotarr=null;
		if(hotn%2==0){
			hotarr=res.hotkeywords.slice(0,5);
			LoadData.LoadHot(hotarr);
			$('.hp_hot_conrent').html(hotstr);
			hotstr='';
		}else{
			hotarr=res.hotkeywords.slice(5);
			LoadData.LoadHot(hotarr);
			$('.hp_hot_conrent').html(hotstr);
			hotstr='';
		}
	});
	hotarr=res.hotkeywords.slice(0,5);
	LoadData.LoadHot(hotarr);
	$('.hp_hot_conrent').html(hotstr);
	hotstr='';
//分类
$('.hp_sort').hover(function(){
	$('.hp_sort .movebtn').addClass('sortbtnchange');
	$('.hp_sort .hp_store_prev').removeClass('movebtn');
	$('.hp_sort .hp_sort_next').removeClass('movebtn');
},function(){
	$('.hp_sort .hp_sort_prev').addClass('movebtn');
	$('.hp_sort .hp_sort_next').addClass('movebtn');
	$('.hp_sort .movebtn').removeClass('sortbtnchange');
})
$('.hp_sort_next').click(function(){
	$('.hp_sort_con').css("margin-left","-120px");
	$(this).hide();
	$('.hp_sort_prev').show();
})
$('.hp_sort_prev').click(function(){
	$('.hp_sort_con').css("margin-left","0");
	$(this).hide();
	$('.hp_sort_next').show();
})
//LimitedTimeSale限时抢购
	console.log(res.LimitedTimeSale)
	var limstr='';
	var limarr=res.LimitedTimeSale;
	LoadData.LoadLimited(limarr);
	$('.hp_limit_con').html(limstr);
//限时抢购hp_limit-----------------------------------------------
setInterval(function(){
	var limtim=new Date
	var limtime=new Date("2018-10-31");
	var limday=(limtime.getTime()-limtim.getTime())/1000/60/60/24
	var limhour=(limday-parseInt(limday))*24
	var limminute=(limhour-parseInt(limhour))*60
	var limsecond=(limminute-parseInt(limminute))*60
	$('.hp_limit_hour').html(parseInt(limhour))
	$('.hp_limit_minute').html(parseInt(limminute))
	$('.hp_limit_second').html(parseInt(limsecond))
},1000)
$('.hp_limit').hover(function(){
	$('.hp_limit .movebtn').addClass('sortbtnchange');
	$('.hp_limit .hp_limit_prev').removeClass('movebtn');
	$('.hp_limit .hp_limit_next').removeClass('movebtn');
},function(){
	$('.hp_limit .hp_limit_prev').addClass('movebtn');
	$('.hp_limit .hp_limit_next').addClass('movebtn');
	$('.hp_limit .movebtn').removeClass('sortbtnchange');
})
var hp_limita=0;
$('.hp_limit_next').click(function(){
	hp_limita++;
	$('.hp_limit_con').css("margin-left",(-1000*hp_limita)+"px");
	if(hp_limita!=0){$('.hp_limit_prev').show();}		
	if(hp_limita==2){$(this).hide()}
})
$('.hp_limit_prev').click(function(){
	hp_limita--;
	$('.hp_limit_con').css("margin-left",(-1000*hp_limita)+"px");
	if(hp_limita==0){$(this).hide()}
	if(hp_limita!=2){$('.hp_limit_next').show();}	
})
//Shop蝦皮商城
	console.log(res.Shop)
	var storestr='';
	var storearr=res.Shop;
	LoadData.LoadStore(storearr);
	$('.hp_store_con').html(storestr);
//熱門商品hp_goods
	console.log(res.HotCommodity);
	var goodstr='';
	var goodarr=res.HotCommodity;
	LoadData.LoadGoods(goodarr);
	$('.hp_goods_con').html(goodstr);
//蝦皮商城hp_store---------------------------------------------------
$('.hp_store').hover(function(){
	$('.hp_store .movebtn').addClass('sortbtnchange');
	$('.hp_store .hp_store_prev').removeClass('movebtn');
	$('.hp_store .hp_store_next').removeClass('movebtn');
},function(){
	$('.hp_store .hp_store_prev').addClass('movebtn');
	$('.hp_store .hp_store_next').addClass('movebtn');
	$('.hp_store .movebtn').removeClass('sortbtnchange');
})
$('.hp_store_next').click(function(){
	$('.hp_store_con').css("margin-left","-1200px");
	$(this).hide();
	$('.hp_store_prev').show();
})
$('.hp_store_prev').click(function(){
	$('.hp_store_con').css("margin-left","0");
	$(this).hide();
	$('.hp_store_next').show();
})
//热门商品hp_goods--------------------------------------------------
$('.hp_goods').hover(function(){
	$('.hp_goods .movebtn').addClass('sortbtnchange');
	$('.hp_goods .hp_goods_prev').removeClass('movebtn');
	$('.hp_goods .hp_goods_next').removeClass('movebtn');
},function(){
	$('.hp_goods .hp_goods_prev').addClass('movebtn');
	$('.hp_goods .hp_goods_next').addClass('movebtn');
	$('.hp_goods .movebtn').removeClass('sortbtnchange');
})
var hp_goodsa=0
$('.hp_goods_next').click(function(){
	hp_goodsa++;
	$('.hp_goods_con').css("margin-left",(-1200*hp_goodsa)+"px");
	judgegoodsa();
})
$('.hp_goods_prev').click(function(){
	hp_goodsa--;
	$('.hp_goods_con').css("margin-left",(-1200*hp_goodsa)+"px");
	judgegoodsa();
})
function judgegoodsa(){
	if(hp_goodsa==0){$('.hp_goods_prev').hide();}else{$('.hp_goods_prev').show()}
	if(hp_goodsa==5){$('.hp_goods_next').hide();}else{$('.hp_goods_next').show()}
}
//每日新发现newfind
	//数据加载
	console.log(res.Nfind)
	var moven=6;
	var findstr='';
	var findarr=res.Nfind;
	LoadData.Loadfind(findarr);
	$('.hp_find_content').html(findstr);
$('.hp_find_con').click(function(){
	window.location.href="commodity.html?pid="+$(this).attr('pid');
})
	//加载高度
	function fcHeight(){
		var hfclength=$('.hp_find_content').children('.hp_find_con').length/6
		var hfch=$('.hp_find_con').outerHeight()*hfclength;
		$('.hp_find_content').height(hfch);
	}
	fcHeight();
$('.look_movebtn').click(function(){
	LoadData.Loadfind(findarr);
	$('.hp_find_content').html(findstr);
	fcHeight();
	var hfcl=$('.hp_find_content').children('.hp_find_con').length
	if(hfcl>=moven*8){
		$(this).parent().hide();
	}	
	$('.hp_find_par').hover(function(){
		console.log(111)
		$(this).css({"border":"1px solid #FF561F","z-index":"10"});
		$(this).children('div:last-child').show()
	},function(){
		$(this).css({"border":"","z-index":""});
		$(this).children('div:last-child').hide();
	})
})
//每日新发现hover
$('.hp_find_par').hover(function(){
	console.log(111)
	$(this).css({"border":"1px solid #FF561F","z-index":"10"});
	$(this).children('div:last-child').show()
},function(){
	$(this).css({"border":"","z-index":""});
	$(this).children('div:last-child').hide();
})
	//foot2
console.log(res.footift);
var footstr='';
var footarr1=res.footift.Tone;
var footarr2=res.footift.Ttwo;
var footarr3=res.footift.Tthree;
var footarr4=res.footift.Tfour;
var footarr5=res.footift.Tfive;
LoadData.Loadfoot(footarr1);
$('.foot2_weman').html(footstr);footstr='';
LoadData.Loadfoot(footarr2);
$('.foot_man').html(footstr);footstr='';
LoadData.Loadfoot(footarr3);
$('.foot_health').html(footstr);footstr='';
LoadData.Loadfoot(footarr4);
$('.foot_slab').html(footstr);footstr='';
LoadData.Loadfoot(footarr5);
$('.foot_infant').html(footstr);footstr='';


}).complete(function(){
	//总是执行函数
	$(window).scroll(function(){
		if($(document).scrollTop()!=0){
			sessionStorage.setItem("myTop",$(window).scrollTop())
		}
	})
	$(function(){
		var ofTop=sessionStorage.myTop;
		$(window).scrollTop(ofTop)
	})
})


