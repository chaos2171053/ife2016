var data = [];//存放队列中的数字
var leftPush= document.getElementById('left-push');
var rightPush = document.getElementById('right-push');
var leftPop = document.getElementById('left-pop');
var rightPop = document.getElementById('right-pop');
var input = document.getElementById('input-number');
var wrapper = document.getElementsByClassName('wrapper')[0];
var inputError = document.getElementsByClassName('input-error')[0];

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

function renderChart(data){
	var str = "";
	for(var i = 0; i <data.length;i++){
		str += "<div class=" + '"numberList"' + ">" + data[i] +"</div>";
	}
	wrapper.innerHTML = str;
}

function validData(){
	var  check =  input.value;
	var Rep = /^[0-9]*$/;
	if( check == ""){
		inputError.innerHTML = "必须输入一个数字啦";
		return null;
	}else if(!Rep.test(check)){
		inputError.innerHTML = "必须输入一个数字啦";
		return null;
	}
	else{
		inputError.innerHTML = ""
		return true;
	}
}

function leftPushData(){
	if(validData() == null){
		return;
	}
	data.unshift(input.value); 
	renderChart(data);
	input.value = "";
}

function rightPushData(){
	if(validData() == null){
		return;
	}
	data.push(input.value); 
	renderChart(data);
	input.value = "";
}

function leftPopData(){
	if(data.length == 0){
		inputError.innerHTML = "队列为空，请输入一个数字";
		return;
	}
	alert("左边出去的数字为："+data.shift());
	renderChart(data);
}

function RightPopData(){
	if(data.length == 0){
		inputError.innerHTML = "队列为空，请输入一个数字";
		return;
	}
	alert("右边出去的数字为：" + data.pop()); 
	renderChart(data);
}

function deleteOneOfTheList() {
	addEventHandler(wrapper,"click",function(ele){
		　var ele = ele || window.event;
		　var target = ele.target || ev.srcElement;
		if(target && target.className === "numberList"){
			//方法一：判断点击的div里面的数字与队列中的哪个数字相等，只适合数字都不同的时候
			/*for(var i = 0; i<data.length;i++){
				if(data[i] == target.innerHTML){
					data.splice(i,1);
				}
				
			}*/
			var i = [].indexOf.call(target.parentNode.children, target);
			data.splice(i,1);
			renderChart(data);
		}
	});
}
deleteOneOfTheList();