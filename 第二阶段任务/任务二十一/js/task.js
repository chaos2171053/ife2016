var data = [];//存放input队列中的内容  
// var dataList = [];//存放textarea中的队列
var inputHobby = document.getElementById('input-hobby');
var wrapperTags = document.getElementsByClassName('wrapperTags')[0];
var confirmBtn = document.getElementById('confirm');
var wrapperTagsBottm = document.getElementsByClassName('wrapperTagsBottm');
var inputError = document.getElementsByClassName('input-error')[0];
var inputText = document.getElementById('input-text');
var wrapperTagsBottm = document.getElementsByClassName('wrapperTagsBottm')[0];




//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
	if (ele.addEventListener) {
		ele.addEventListener(event, hanlder, false);
	} else if (ele.attachEvent) {
		ele.attachEvent("on"+event, hanlder);
	} else  {
		ele["on" + event] = hanlder;
	}
}

//为按钮绑定事件
addEventHandler(inputHobby,'keyup',inputHobbyKeyUp);
addEventHandler(inputHobby,'keydown',formKeyDown);
addEventHandler(wrapperTags,'click',deleteOneOfTheList);
addEventHandler(wrapperTags,'mouseover',divMouseOver);
addEventHandler(wrapperTags,'mouseout',divMouseOut);
addEventHandler(confirmBtn,'click',confirmTags);

function confirmTags(){
	var result = validDataTextArea();
	if(result ==-1){
		return;
	}
	renderChartArea(result);
	deleteOneOfTheList();
}
function renderChartArea(data){
	var str = "";
	for(var i = 0; i <data.length;i++){
		str += "<div class=" + '"tagLisBottm"' + ">" + data[i] +"</div>";
	}
	wrapperTagsBottm.innerHTML = str;
	inputText.value= "";
}
function validDataTextArea(){
	data = [];
	var inputString = inputText.value.trim();
	var regExp = /[^(\n|\,|\，|\、|\s)]+/g ;
	if( inputString.length == 0){
		inputError.innerHTML = "快输入点东西啦(ノω<。)ノ))☆.。";
		return -1;
	}		
	inputError.innerHTML = "";
	var dataList = inputString.match(regExp);//存放分割后的爱好标签

    //留下10个不重复的爱好标签
    var data = [];
    var object ={};
    for(var i=0;i<dataList.length;i++){
    	if(!object.hasOwnProperty(dataList[i])){
    		if(data.length <10 ){
    			data.push(dataList[i]);
    			object[dataList[i]] = 1;
    		}
    		else{
    			data.shift();
			    data.push(dataList[i]);
    		}
    	}
    }
    return data;
        


}

function formKeyDown(e){
	if(e.keyCode ==13){
			e.preventDefault();//阻止input默认行为，即阻止按回车提交。
		}
}
function inputHobbyKeyUp(e){
	var regExp = /13|32|188|229/;
	if(regExp.test(e.keyCode)){
		
		if(validData() == -1){
			return;
		}
		renderChart(data);
		deleteOneOfTheList();
	}

}


function renderChart(data){
	var str = "";
	for(var i = 0; i <data.length;i++){
		str += "<div class=" + '"tagListTop"' + ">" + data[i] +"</div>";
	}
	wrapperTags.innerHTML = str;
	inputHobby.value= "";

}

function validData(){
	var regExp = /[^(\n|\,|\，|\、|\s)]+/g ;
	var check  = inputHobby.value.trim();
	if(check == ""){
		inputError.innerHTML = "快输入点东西啦(ノω<。)ノ))☆.。";
		inputHobby.value = "";
		return -1;
	}
	var inputString  = check.match(regExp)[0];
	

	if(data.length == 0){
		data.push(inputString);
		return true;
	}
	else{
		for(var i = 0;i<data.length;i++){
			if(inputString == data[i]){
				inputHobby.value = "";
				return ;
			}	
		}
		if(data.length == 10){
			data.shift();
			data.push(inputString);
		}
		else{
			data.push(inputString);

		}
	}
	return true;

}


function deleteOneOfTheList(ele) {
	var ele = ele || window.event;
	var target = ele.target || ev.srcElement;
	if(target && target.className === "tagListTop"){
		var i = [].indexOf.call(target.parentNode.children, target);
		data.splice(i,1);
		renderChart(data);
	}
}

function divMouseOver(ele){
	var ele = ele|| window.event;
	var target = ele.target ||ele.srcElement;
	if(target && target.className == "tagListTop"){
		var i = [].indexOf.call(target.parentNode.children,target);
		wrapperTags.children[i].innerHTML = "点击删除"+data[i];
	}

}

function divMouseOut(){
	var ele = ele|| window.event;
	var target = ele.target ||ele.srcElement;
	if(target && target.className == "tagListTop"){
		var i = [].indexOf.call(target.parentNode.children,target);
		wrapperTags.children[i].innerHTML = data[i];
	}
}


