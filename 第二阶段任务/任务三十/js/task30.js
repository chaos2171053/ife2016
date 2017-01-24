(function(){

	var name = $('name');
	var password = $('password');
	var rePassword  = $('password-re');
	var emailRegExp  = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var email = $('email');
    var phoneRegExp = /^1[34578]\d{9}$/;
    var phone = $('phone');
    var submit = $('submit');
    var input = document.getElementsByTagName("input");

	/**
	 * 校验信息结果显示
	 * @param {sring} str 校验信息结果
	 * @param {object} obj 校验结果
	 */
	var UIRender = function(str,obj) {

        //显示校验规则
		var validRule = function(str,obj){
			obj.nextElementSibling.innerText = str;
			obj.style.borderColor = "#00bfff";
			obj.nextElementSibling.color = "#ccc";
		};

		//显示校验成功信息
		var resultTrue = function(str,obj) {
			obj.nextElementSibling.innerText = str;
			obj.style.borderColor = "#32cd32";
			obj.nextElementSibling.color = "#32cd32";
		};

        //显示校验失败信息
		var resultFalse = function(str,obj) {
			obj.nextElementSibling.innerText = str;
			obj.style.borderColor = "#ff0000";
			obj.nextElementSibling.color = "#ff0000";
		};

		return {
			validRule:validRule,
			resultTrue:resultTrue,
			resultFalse:resultFalse
		};
		
	};


	/**
	 * 校验名称
	 * @param  {sring} str 字符串
	 * @return {boolean}     判断结果
	 */
	var validNamePassword = function(str) {
		var realLength = 0;
		for (var i = 0,len = str.length; i < len; i++)
		{
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128)
				realLength += 1;
			else
				realLength += 2;
		}
		if(realLength<4||realLength>16) {
			return false;
		}
		else {
			return true;
		}

	};
	
	/**
	 * 是否每个input输入框校验都正确
	 * @param  {object}  item  元素内容
	 * @param  {int}  index 索引
	 * @param  {arry}  array 数组
	 * @return {Boolean}   判断结果
	 */
	var isCorrect = function(item, index, array){
		return (item.style.borderColor == "rgb(50, 205, 50)");

	};

	addEventHandler(name,'focus',function() {
		UIRender().validRule("必填，长度为4-16个字符。",name);
	});

	addEventHandler(name,'blur',function(){
		switch (validNamePassword(name.value)){
			case "":
			UIRender().resultFalse("长度为4-16个字符!",name);
			break;
			case true:
			UIRender().resultTrue("名称可用",name);
			break;
			case false:
			UIRender().resultFalse("长度为4-16个字符!",name);
			break;
			default:
			break;
		}
	});

	addEventHandler(password,'focus',function() {
		UIRender().validRule("必填，长度为4-16个字符。",password);
	});

	addEventHandler(password,'blur',function(){
		switch (validNamePassword(password.value)){
			case "":
			UIRender().resultFalse("请输入密码",password);
			break;
			case true:
			UIRender().resultTrue("密码可用",password);
			break;
			case false:
			UIRender().resultFalse("长度为4-16个字符!",password);
			break;
			default:
			break;
		}
	});


	addEventHandler(rePassword,'focus',function() {
		UIRender().validRule("必填，长度为4-16个字符,需要与前面密码一致。",rePassword);
	});

	addEventHandler(rePassword,'blur',function(){
		if(rePassword.value != password.value){
			UIRender().resultFalse("密码不一致！",rePassword);
			return;
		}
		switch (validNamePassword(rePassword.value)){
			case "":
			UIRender().resultFalse("请输入密码",rePassword);
			break;
			case true:
			UIRender().resultTrue("密码可用",rePassword);
			break;
			case false:
			UIRender().resultFalse("长度为4-16个字符!",rePassword);
			break;
			default:
			break;
		}
	});

	addEventHandler(email,'focus',function() {
		UIRender().validRule("请输入常用的邮箱地址",email);
	});

	addEventHandler(email,'blur',function(){
		switch (emailRegExp.test(email.value)){
			case true:
			UIRender().resultTrue("邮箱可用",email);
			break;
			case false:
			UIRender().resultFalse("不是有效的邮箱地址",email);
			break;
			default:
			break;
		}
	});

	addEventHandler(phone,'focus',function() {
		UIRender().validRule("请输入手机号码",phone);
	});
	addEventHandler(phone,'blur',function(){
		switch (phoneRegExp.test(phone.value)){
			case true:
			UIRender().resultTrue("手机号码可用",phone);
			break;
			case false:
			UIRender().resultFalse("不是有效的手机号码",phone);
			break;
			default:
			break;
		}
	});

	addEventHandler(submit,'click',function(){
		var arr = Array.prototype.slice.call(input);//把input转换成数组才能使用every方法
		if (arr.every(isCorrect)) {
			alert("输入成功！");
		}
		else {
			alert("输入失败！");
		}
	});
	

})();