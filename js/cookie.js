//cookie操作
var cookieObj={
	http:"http://192.168.0.157/",
	deltime:5,
	//设置cookie
//	set({name:"user",value:"zhangsan",expires:时间})
	set:function(o){
		//name=value   过期时间expires
		var cookiestr=encodeURIComponent(o.name)+"="+encodeURIComponent(o.value);
//			"user=zhangsan"
		if(o.expires){
			cookiestr+="; expires="+o.expires;
		}
		document.cookie=cookiestr;
	},
	//获取cookie的方法
	get:function(oname){
			//把参数进行编码
		oname=encodeURIComponent(oname)
		//获取所有cookie
		var cookies=document.cookie;
		var cookiearr=cookies.split("; ");
//		console.log(cookiearr)
		for(var i=0;i<cookiearr.length;i++){
			var splitarr=cookiearr[i].split("=");
//			console.log(splitarr)
			if(oname==splitarr[0]){
						//给字符串解码
				return decodeURIComponent(splitarr[1])
			}
		}	
	},
	//删除cookie的方法
	del:function(name){
		var mydate=new Date();
		mydate.setHours(-1);
		//设置过期
		this.set({
			name:name,
			expires:mydate
		})
	},
	//判断cookie是否存在
	hascookie:function(oname){
			//把参数进行编码
		oname=encodeURIComponent(oname)
		//获取所有cookie
		var cookies=document.cookie;
		var cookiearr=cookies.split("; ");
		console.log(cookiearr)
		for(var i=0;i<cookiearr.length;i++){
			
			var splitarr=cookiearr[i].split("=");
			console.log(splitarr)
			if(oname==splitarr[0]){
						//给字符串解码
				return true
			}
		}	
		return false;
	}
}
//产品操作
//var productObj={
//	
//}
