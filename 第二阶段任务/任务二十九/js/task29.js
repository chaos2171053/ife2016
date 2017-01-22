function init() {
	var submit = $('submit');
	var input  = $('input');
	var span = $('error');

	/**
	 * 验证信息
	 * @param  {string} str 错误信息
	 */
	function checkColor(str){
		span.innerText = str;
		input.style.borderColor = "#dc143c";
		span.style.color = "#dc143c";
	}

	addEventHandler(submit,'click',function(){
		var value = input.value;
		
		if (value == "") {
			checkColor("名字不能为空!");
		}
		else if(value.length>16 ||value.length<4){
			checkColor("字符数为4~16位!");
		}
		else if(/[\u4e00-\u9fa5]{3}/g.test(value)){
			checkColor("汉字长度不超过2位!");
		}
		else if(/[a-zA-Z]{2}|[0-9]{2}/g.test(value)){
			checkColor("每个英文字母、数字、英文符号长度为1!");
		}
		else{
			span.innerText = "名称格式正确";
			input.style.borderColor = "#32cd32";
			span.style.color = "#32cd32";
		}


	});	
}
init();