var data = [];//存放队列中的数字

var leftPush= document.getElementById('left-push');
var rightPush = document.getElementById('right-push');
var leftPop = document.getElementById('left-pop');
var rightPop = document.getElementById('right-pop');
var input = document.getElementById('input-number');
var wrapper = document.getElementsByClassName('wrapper')[0];
var inputError = document.getElementsByClassName('input-error')[0];
var quickSort = document.getElementById('quick-sort');
var barBubble = document.getElementById('bubble-sort');
var random = document.getElementById('random');

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
addEventHandler(leftPop,'click',leftPopData);
addEventHandler(rightPop,'click',rightPopData);
addEventHandler(quickSort,'click',quickSortTheList);
addEventHandler(barBubble,'click',barBubbleSortTheList);
addEventHandler(random,'click',randomData);

function randomColor(){
		var colorstr=["#FF4D00","#FFBF00","#00FFFF","#66FF00","#6495ED","#DA70D6","#C0C0C0","#8CE600","#FF8C69","#00FA9A"];
		var i=Math.floor(Math.random()*10);
		return colorstr[i];}
function randomData(){
	for(i=0;i<10;i++){
			data[i]=Math.floor(Math.random()*91+9);
		}
		renderChart(data);
}
function barBubbleSortTheList(){
	if(data.length == 0){
		inputError.innerHTML = "空队列怎么排列嘛！o(╯□╰)o";
		return;
	}
	var i = 0,j = 1,temp;
				len = data.length;
				timer = null;
		timer = setInterval(run,25);
		function run() {
			if (i < len) {
				if (j < len) {
					if (data[i] > data[j]) {
						temp = data[i];
						data[i] = data[j];
						data[j] = temp;
						renderChart(data);
					}
					j++;
				} else {
					i++;
					j = i + 1;
				}
			} else {
				clearInterval(timer);
				return;
			}
		}

}
function quickSortFunction(list, start, end){
	//这样写当有数值相同的元素时，得到的是没有删去重复项的数组
	/*if(sortData.length <=1){
		return sortData;
	}
	var pivotIndex = Math.floor(sortData.length/2);
	var pivot = sortData[pivotIndex];
	var left = [];
	var right = [];
	for(var i = 0;i<sortData.length;i++){
		if (sortData[i] < pivot){
			left.push(sortData[i]);
		}else if(sortData[i] ==pivot){
			continue;
		}else{
			right.push(sortData[i]);
		}
	}
	return quickSortFunction(left).concat([pivot],quickSortFunction(right));*/

	
	if (start < end) {  
        var pivotpos = partition(list, start, end);   //找出快排的基数  
        quickSortFunction(list, start, pivotpos - 1);        //将左边的快排一次  
        quickSortFunction(list, pivotpos + 1, end);          //将右边的快排一次  
      }  
    }  
    //将一个序列调整成以基数为分割的两个区域，一边全都不小于基数，一边全都不大于基数  
    function partition(list, start, end) {  
      var pivotpos = start;  
      var pivot = list[start];  
      var tmp;  
      for(var i = start + 1; i <= end; i ++) {  
        if (list[i] < pivot) {  
          tmp = list[i];  
          pivotpos += 1;  
          list[i] = list[pivotpos];  
          list[pivotpos] = tmp;  
        }  
      }  

      tmp = list[start];  
      list[start] = list[pivotpos];  
      list[pivotpos] = tmp;  
      return pivotpos;  
}

function quickSortTheList(){
	if(data.length == 0){
		inputError.innerHTML = "空队列怎么排列嘛！o(╯□╰)o";
		return;
	}
	quickSortFunction(data,0,data.length);
	renderChart(data);
}

function renderChart(data){
	var str = "";
	for(var i = 0; i <data.length;i++){
		str += "<div class=" + '"numberList"' + "style=" + '"height:' +data[i] +"px; background-color:"
		+randomColor()+'"'+">"+data[i] +"</div>";
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
	}else if(check<10 || check>100){
		inputError.innerHTML = "输入的数字在10-100";
		return null;
	}else if(data.length == 60){
		alert("队列里面有60个数字啦。" + check +"挤不进去了/(ㄒoㄒ)/~~");
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

function rightPopData(){
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