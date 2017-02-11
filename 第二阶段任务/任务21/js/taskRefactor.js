var inputTags = $('input-tags','id');
	inputHobbies =$('input-hobbies','id');
	confirm = $('confirm','id');
	inputError = $('input-error','className');
	tagsListWrapper = $('tags-list-wrapper','className');
	tags = []; //存放个人标签
	hobbies = [];//存放个人爱好
	inputRegExp = //;
	contRegExp = /[^(\n|\,|\，|\、|\s)]+/g;

/*
事件绑定
*/
addEventHandler(inputTags,'keyup',inputTagsEvent);
addEventHandler(confirm,'click',inputHobbiesEvent);
/*addEventHandler(tagsListWrapper,'mouseover',divMouseOver);*/

/**
 * 提交爱好
 */
function inputHobbiesEvent(){
	var inputdata = inputHobbies.value.trim();

	if(validData(inputdata.match(contRegExp))){
		renderChart(hobbies,tagsListWrapper[1]);
		clearText(inputHobbies);
	}
	delegateEvent(tagsListWrapper[1],"hobbies","mouseover",divMouseOver);
	delegateEvent(tagsListWrapper[1],"hobbies","mouseout",divMouseOut);
	delegateEvent(tagsListWrapper[1],"hobbies","click",deleteOne);
}

/**
 * 监测标签输入框按键按下事件
 * @param {string} event 事件的状态
 */
 function inputTagsEvent(event){
 	var content = inputTags.value.trim();
 	if(content ==""){
 		return;
 	}
 	inputdata = content.match(contRegExp)[0];
 	if(/13|32|188|229/.test(getEvent(event).keyCode)){
 		getEvent(event).preventDefault(event);//阻止回车默认事件
 		if(validData(inputdata,inputTags)){
 			renderChart(tags,tagsListWrapper[0]);
 			clearText(inputTags);
 		}
 		delegateEvent(tagsListWrapper[0],"tags","mouseover",divMouseOver);
 		delegateEvent(tagsListWrapper[0],"tags","mouseout",divMouseOut);
 		delegateEvent(tagsListWrapper[0],"tags","click",deleteOne);
 	}
 }



/**
 * 渲染画面
 * @param {string} wrapper 标签div的父元素或爱好div的父元素
 * @param  {array} inputdata 标签或爱好
 */
function renderChart(inputdata,wrapper){
	var content ="";
/*	for(var i = 0,len = inputdata.length; i < len;i++){
		content += "<div class=" + '"tags-list"' + ">" + inputdata[i] +"</div>";
	}*/
	content = inputdata.map(function(e){
		return "<div class=" + '"tags-list"' + ">" + e +"</div>";
	}).join("");
	wrapper.innerHTML = content;
}

/**
 * 判断输入的数据是否符合要求
 * @param  {string} inputdata 做trim()处理后的输入内容
 * @return {bollean}    判断结果
 */
 function validData(inputData){
 	if(inputData ==""){
 		inputError[0].innerHTML = "快输入点东西啦(ノω<。)ノ))☆.。";
 		return false;
 	}
 	else if(inputData == null ){
 		inputError[0].innerHTML = "快输入点东西啦(ノω<。)ノ))☆.。";
 		return false;
 	}
 	else{

 		if(removeRepeat(inputData)){
 			isOverTen(inputData);
 			return true;
 		}
 		else{
 			return false;
 		}		
 }
}

/**
 * @param  {array}  inputData 标签或爱好的内容数组
 * 
 */
 function isOverTen(inputData){
 	switch(Object.prototype.toString.call(inputData)){
 		case "[object String]":
 		if(tags.length <10){
 			tags.push(inputData);
 		}
 		else{
 			tags.shift();
 			tags.push(inputdata);
 		}
 		break;
 		case "[object Array]":
 		var len = hobbies.length;
 		if(len>10){
 			hobbies.splice(0,len-10);
 		}
 		break;
 }
}
/**
 * @param {HTMLElement} element element元素
 * @param  {string} inputdata 个人标签
 * @return {boolean}      判断结果
 */
 function removeRepeat(inputData){
 	//判断是标签输入框传入的字符串还是爱好输入框传入的数组
 	switch(Object.prototype.toString.call(inputData)){
 		case "[object String]":
 		    if(tags.indexOf(inputData) == -1){
 			    return true;
 		    }
 		    else{
 			    inputError[0].innerHTML = inputData + "已经有啦Σ( ° △ °|||)︴换一个嘛";
 			    clearText(inputTags);
 			    return false;
 		    }
 		break;
 		case "[object Array]":
 		    var concatArray = hobbies.concat(inputData);
 		    var result = [];
 		    var object = {};
 		    for(var i=0,len = concatArray.length;i<len;i++){
 		    	if(!object.hasOwnProperty(concatArray[i])){
 		    		    result.push(concatArray[i]);
 		    			object[concatArray[i]] = 1;
 		    	}
 		    }
 		    hobbies = result;
 		    return true;
 		break;
 	}
 	

}

/**
 * 清除输入框
 * @param  {HTMLElement} element 元素节点
 * 
 */
function clearText(element){
    element.value= "";
}

/**
 * 鼠标在标签爱好上的悬停事件
 * @param  {HTMLElement} target 元素节点
 */
function divMouseOver(target,tagsHobbies){
	
	var data = [];
	var i = [].indexOf.call(target.parentNode.children,target);
	data = (tagsHobbies == "tags" ? tags:hobbies);
	target.parentNode.children[i].innerHTML = "点击删除"+data[i];

}

/**
 * 鼠标在标签爱好上的移走事件
 * @param  {HTMLElement} target 元素节点
 */
function divMouseOut(target,tagsHobbies){
	
	var data = [];
	var i = [].indexOf.call(target.parentNode.children,target);
	data = (tagsHobbies == "tags" ? tags:hobbies);
	target.parentNode.children[i].innerHTML = data[i];

}

/**
 * 点击删除标签
 * @param  {HTMLElement} target 元素节点
 */
function deleteOne(target,tagsHobbies) {

	var data = [];
	var i = [].indexOf.call(target.parentNode.children, target);
	data = (tagsHobbies == "tags" ? tags:hobbies);
	wrapper = (tagsHobbies == "tags" ? tagsListWrapper[0]:tagsListWrapper[1]);
	data.splice(i,1);
	renderChart(data,wrapper);
}

/**
 * 事件代理
 * @param  {HTMLElement} 元素节点   
 * @param  {string} tagsHobbies       
 * @param  {string} eventName 事件名
 * @param  {function} handler   处理函数
 */
function delegateEvent(element, tagsHobbies,eventName, handler) {
   addEventHandler(element, eventName, function (event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        if (target && target.className === "tags-list") {
            handler.call(this,target, tagsHobbies);
        }
    });
}