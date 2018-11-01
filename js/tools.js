//取出cookie转为数组的方法
function getAll(){
	var cookie=cookieObj.get("datas");
	var cookiearr=JSON.parse(cookie);
	return cookiearr;
}
//更新cookie数量方法
function updateCookie(pid,num){
	//循环找到对应pid的pcount加num
	var cookie=getAll();
	for(var i=0;i<cookie.length;i++){
		if(cookie[i].pid==pid){
			cookie[i].pcount=cookie[i].pcount+num;
		}
	}
	var cookiestr=JSON.stringify(cookie);
	cookieObj.set({name:"datas",value:cookiestr})
}
//pid是否存在
function checkCookie(pid){
	var cookie=getAll();
	for(var i=0;i<cookie.length;i++){
		if(cookie[i].pid==pid){
			return true;
			break;
		}
	}
	return false;
}
//获取总数
function getTotal(){
	var cookie=getAll();
	var count=0;
	for(var i=0;i<cookie.length;i++){
		count+=Number(cookie[i].pcount);
	}	
	return count;
}
