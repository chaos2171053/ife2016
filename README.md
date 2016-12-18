# 单刷百度前端技术学院2016任务

**开始时间**：`2016/12/17`

## 遇到的问题及其解决方法
###1.做任务十四的时候遇到需要排序，复习了下几种基本排序算法。
[JS版十大排序算法](http://blog.csdn.net/fengyinchao/article/details/52667625)<br>
[快速排序](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
看了网上的别人的解法，可以用array.filter、array.sort来实现大于60的筛选和排序，用array.forEach方法来代替for循环遍历处理数组元素。<br>

###2.做任务十四对空气质量大于60筛选数据时，原始数据为如下：<br>
var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 80],
    ["广州", 85],
    ["成都", 95],
    ["西安", 100]
    ];
排序后发现![14-1](problemsPic/14-1.png)<br>
返回的应该是一个一维数组，里面的元素都是一个数组。<br>
解决方法：
 var temp=[];//声明一个临时数组
 temp.push(arr[pivotIndex]);//用push方法把作为基准的城市数据暂存下来。

###3.做任务十四动态添加li生成排行榜发现在循环在appendChild会导致回流。
//动态生成li，将数据放入li中
  var parentUl = document.getElementById('aqi-list');

  var len = result.length;
  for(i = 1;i<=result.length;i++){
    　var li = document.createElement("li");
　　　li.innerHTML = "第"+i+"名是："+result[len-i];
　　　parentUl.appendChild(li);
  }
可考虑将ul中内容 保存到临时字符串 最后一次性添加。<br>
解决如下： 
var parentUl = document.getElementById('aqi-list');
var contentStr = "";
var len = result.length;
for(i = 1;i<=result.length;i++){
contentStr += "<li>第" + i + "名：" + result[len-i][0] + "，" + result[len-i][1] + "</li>";
}
parentUl.innerHTML = contentStr;

})();

