/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
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


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) { //91天的数据
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
var radio  = document.getElementsByName('gra-time');//获取radio中选的是日/周/月
var city = document.getElementById('city-select');//获取select中选的城市
var aqiChartWrap =  document.getElementsByClassName('aqi-chart-wrap')[0];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
 function renderChart() {
  var color = "";
  var content = "";
  for(var item in chartData){
    color = '#' + Math.floor(Math.random()* 0xFFFFFF).toString(16);
    content += '<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:'+color+'"></div>';
  }
  aqiChartWrap.innerHTML = content;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
 function graTimeChange() {
  // console.log("Enter graTimeChange()");
  // 确定是否选项发生了变化
  //利用for循环遍历寻找哪个radio被点击
/*  for(var i = 0; i<radio.length;i++){
    if(radio[i].checked){
     pageState.nowGraTime = (pageState.nowGraTime == radio[i].value) ? pageState.nowGraTime:radio[i].value;
     
   }  
 }*/
 //使用querySelctorAll()判断哪个radio被选择
 var theDateChosen = document.querySelectorAll('input:checked')[0];
 pageState.nowGraTime = (pageState.nowGraTime == theDateChosen.value) ? pageState.nowGraTime:theDateChosen.value;
     
  // 设置对应数据

  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
 function citySelectChange() {
  // console.log("Enter citySelectChange()");
  // 确定是否选项发生了变化 
  
 /* for(var i = 0; i<city.length;i++){
    if(city[i].selected){
      pageState.nowSelectCity = (pageState.nowSelectCity == city[i].innerHTML) ? pageState.nowSelectCity:city[i].innerHTML;
      
    }
  }*/
  //使用querySelectorAll()判断哪个城市被选择
  var theCityChosen = document.querySelectorAll('select option:checked')[0];
  pageState.nowSelectCity = (pageState.nowSelectCity == theCityChosen.innerHTML) ? pageState.nowSelectCity:theCityChosen.innerHTML;
  // 设置对应数据
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
 function initGraTimeForm() {
  //用for循环遍历radio绑定点击事件，为每个元素都添加监听函数，增加JavaScript和DOM节点之间的关联。
/*  for(var i = 0;i<radio.length;i++){
    radio[i].addEventListener('click',graTimeChange);
  }
  console.log(radio[0]);*/
  //使用事件委托
  var formGraTime = document.getElementById('form-gra-time');
  /* addEventHandler(formGraTime,"click",graTimeChange);*/
  　　　
  addEventHandler(formGraTime,"click",function(ele){
    　var ele = ele || window.event;
    　var target = ele.target || ev.srcElement;
    if(ele.target && ele.target.nodeName.toLowerCase() === "input"){
      graTimeChange();
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
 function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
 /*  var cityStr = "";
  for(var city in aqiSourceData){
    cityStr +="<option>"+ city +"</option>";
  }
  document.getElementById('city-select').innerHTML = cityStr;*/

  for(var cityName in aqiSourceData){
    var newOption = new Option(cityName);
    city.add(newOption,undefined);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  // city.addEventListener('change',citySelectChange);
  addEventHandler(city,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
 function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var nowCityData = aqiSourceData[pageState.nowSelectCity];//nowCityData是一个对象，
  switch (pageState.nowGraTime){
    case "day":
    chartData = {};//清空charData
    chartData = nowCityData;
    break;
    case "week":
    {
      chartData = {};//清空charData
      var countSum=0, daySum=0, week=0;
      for (var item in nowCityData) {
        countSum += nowCityData[item];
        daySum ++;
        if ((new Date(item)).getDay() == 6 ) {
          week ++;
          chartData['第'+week+'周'] = Math.floor(countSum/daySum);;
          countSum = 0;
          daySum = 0;
        }
      }
      if (daySum!=0) {
        week ++;
        chartData['第'+week+'周'] = Math.floor(countSum/daySum);
    }//保证最后一周若不满也能算一周
  }

  break;
  case "month":{
    chartData = {};//清空charData
    var count= 0,month =-1,total = 0, month = -1,date;
    for(var item in nowCityData){
      date = new Date(item);
      if(month == -1){
        month = date.getMonth()+1;
      }
      else if(date.getMonth()+1 != month){
        chartData[month +"月"]  = Math.floor(total/count);
        month = date.getMonth()+1;
        count = 0;
        total = 0;
      }
      count++;
      total += aqiSourceData[pageState.nowSelectCity][item];
    }
    chartData[month +"月"]  = Math.floor(total/count);
    break;
  }
  
}


  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
 function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();