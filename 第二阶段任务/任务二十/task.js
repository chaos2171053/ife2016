var data = [];//存放队列中的内容   
var leftPush= document.getElementById('left-push');
var rightPush = document.getElementById('right-push');
var leftPop = document.getElementById('left-pop');
var rightPop = document.getElementById('right-pop');
var input = document.getElementById('input-text');
var wrapper = document.getElementsByClassName('wrapper')[0];
var inputError = document.getElementsByClassName('input-error')[0];
var clearList = document.getElementById('clear-list');
var lookUpText = document.getElementById('look-up-text');
var looKUpBtn = document.getElementById('look-up');

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
addEventHandler(leftPush,'click',leftPushData);
addEventHandler(rightPush,'click',rightPushData);
addEventHandler(leftPop ,'click',leftPopData);
addEventHandler(rightPop,'click',RightPopData);
addEventHandler(input,'keydown',inputKeyDown);
addEventHandler(clearList,'click',clearTheList);
addEventHandler(looKUpBtn,'click',lookUpTextFromTheList);

function lookUpTextFromTheList(){
	var text = lookUpText.value.trim();
	var regExp = new RegExp(text,"g");
	var temp = [];
	if(text == ""){
		inputError.innerHTML ="你倒是输入点什么啊<(－︿－)>"
		return;
	}
	if(data.length == 0){
		inputError.innerHTML ="队列空空如也"
		return;
	}
	wrapper.innerHTML = wrapper.innerHTML.replace(regExp, '<font color="#000">'+text+"</font>");
	lookUpText.value = "";

}

function clearTheList(){
	data = [];
	renderChart(data);

}

function inputKeyDown(e){
	 if(e.keyCode == 9){
        e.preventDefault();
        var indent = '    ';
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var selected = window.getSelection().toString();
        selected = indent + selected.replace(/\n/g,'\n'+indent);
        this.value = this.value.substring(0,start) + selected + this.value.substring(end);
        this.setSelectionRange(start+indent.length,start+selected.length);
    }

}

function renderChart(data){
	var str = "";
	for(var i = 0; i <data.length;i++){
		str += "<div class=" + '"textList"' + ">" + data[i] +"</div>";
	}
	wrapper.innerHTML = str;
}

function validData(){
	
	var inputString = input.value.trim();
	var regExp = /[^(\n|\,|\，|\、|\s|\v|\t)]+/g ;
	var flag = 0;
	
	
	if( inputString.length == ""){
		inputError.innerHTML = "快输入点东西啦(ノω<。)ノ))☆.。";
		return null;
	}		
		inputError.innerHTML = "";
		return inputString.match(regExp);
}

function leftPushData(){
	var result = validData();
	if(result == null){
		return;
	}
	for(var i = 0;i<result.length;i++){
		data.unshift(result[i]); 
	}
	renderChart(data);
	input.value = "";
}

function rightPushData(){
	var result = validData();
	if(result == null){
		return;
	}
	for(var i = 0;i<result.length;i++){
		data.push(result[i]); 
	}
	renderChart(data);
	input.value = "";
}

function leftPopData(){
	if(validData() == null){
		return;
	}
	alert("左边出去的内容为："+data.shift());
	renderChart(data);
}

function RightPopData(){
	if(validData() == null){
		return;
	}
	alert("右边出去的内容为：" + data.pop()); 
	renderChart(data);
}

function deleteOneOfTheList() {
	addEventHandler(wrapper,"click",function(ele){
		　var ele = ele || window.event;
		　var target = ele.target || ev.srcElement;
		if(target && target.className === "textList"){
			var i = [].indexOf.call(target.parentNode.children, target);
			data.splice(i,1);
			renderChart(data);
		}
	});
}

deleteOneOfTheList();