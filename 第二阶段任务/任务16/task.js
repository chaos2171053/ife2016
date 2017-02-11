/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    if(validateCityInput() === null) {
    	return;
    }else if(validataDataInput() === null) {
    	return;
    }else{
    aqiData[validateCityInput()] = validataDataInput();
    clearInput();
    }
    
	
}
function clearInput(){
	document.getElementById('aqi-city-input').value = "";
	document.getElementById('aqi-value-input').value = "";
	document.getElementById('city-input-error').innerHTML = "";
	document.getElementById('data-input-error').innerHTML = "";
}
  
function validateCityInput(){
	var city = document.getElementById('aqi-city-input').value.trim();
	var cityRegExp = /^[\u4e00-\u9fa5a-zA-Z]+$/ //判断城市名称是否符合中英文字符 
    var cityInputError = document.getElementById('city-input-error');
    if(!cityRegExp.test(city)){
    	cityInputError.innerHTML = "城市名必须为中英文字符";
    	return null;
    }else {
    	cityInputError.innerHTML = "";
    	return city;
    }
    
    

}
function validataDataInput(){
	var data = document.getElementById('aqi-value-input').value.trim();

	var dataRegExp = /^[0-9]*[1-9][0-9]*$/ //判断是否是正整数
	var dataInputError = document.getElementById('data-input-error');
    if(!dataRegExp.test(data)){
    	dataInputError.innerHTML = "空气质量指数必须为整数";
    	return null;
    }else{
    	 dataInputError.innerHTML = "";
    	 return data;
    }

   
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var dataStr ="";
	var tableTitle = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var length = aqiData.length;
	var table = document.getElementById('aqi-table');
    
	for(var i in aqiData){
		dataStr += "<tr><td>"+i+"</td><td>"+aqiData[i]
		+"</td><td><button>删除</button></td></tr>";
	}
	   table.innerHTML = i ? tableTitle+dataStr : "";

	   //// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	   var delBtn =  document.querySelectorAll('tbody tr td button');
	   

	   for(var i = 0;i < delBtn.length;i++){
	   	delBtn[i].addEventListener("click",delBtnHandle);
	   	
	   }
	 

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var cityBtn = this.parentNode.parentNode.firstElementChild.innerHTML;
  
  delete aqiData[cityBtn];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  var cityInput = document.getElementById('aqi-city-input');
  var dataInput = document.getElementById('aqi-value-input');
  addBtn.addEventListener("click", addBtnHandle);
  //使用dataset方法给按钮绑定时间
  //var delBtn = document.getElementById("aqi-table");
  // delBtn.addEventListener("click", function(event){
  //       if(event.target.nodeName.toLowerCase() === 'button') 
  //       	delBtnHandle.call(null, event.target.dataset.city);
  //   });
  cityInput.addEventListener("blur",validateCityInput);
  dataInput.addEventListener("blur",validataDataInput);

}

init();
