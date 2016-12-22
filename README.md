# 单刷百度前端技术学院2016任务

**开始时间**：`2016/12/17`

## 遇到的问题及其解决方法
###1.任务十四
####1.1遇到需要排序，复习了下几种基本排序算法
[JS版十大排序算法](http://blog.csdn.net/fengyinchao/article/details/52667625)<br>
[快速排序](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
看了网上的别人的解法，可以用array.filter、array.sort来实现大于60的筛选和排序，用array.forEach方法来代替for循环遍历处理数组元素。<br>

####1.2对空气质量大于60筛选数据时，原始数据为如下：<br>
```var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 80],
    ["广州", 85],
    ["成都", 95],
    ["西安", 100]
];
``` 
排序后发现![14-1](problemsPic/14-1.png)<br>
返回的应该是一个二维数组，里面的元素都是一个数组。<br>
解决方法：
```var temp=[];//声明一个临时数组
temp.push(arr[pivotIndex]);//用push方法把作为基准的城市数据暂存下来。
```
####1.3动态添加li生成排行榜发现在循环在appendChild会导致回流。
```//动态生成li，将数据放入li中
  var parentUl = document.getElementById('aqi-list');

  var len = result.length;
  for(i = 1;i<=result.length;i++){
    　var li = document.createElement("li");
　　　li.innerHTML = "第"+i+"名是："+result[len-i];
　　　parentUl.appendChild(li);
}
```
可考虑将ul中内容 保存到临时字符串 最后一次性添加。<br>
解决如下： 
```var parentUl = document.getElementById('aqi-list');
var contentStr = "";
var len = result.length;
for(i = 1;i<=result.length;i++){
contentStr += "<li>第" + i + "名：" + result[len-i][0] + "，" + result[len-i][1] + "</li>";
}
parentUl.innerHTML = contentStr;

})();
```

[页面呈现流程 ](http://www.blogjava.net/BearRui/archive/2010/05/10/320502.html)

###2.任务十六
####2.1 运行时发现can't set property onclick' of null。
解决方法把js文件放在</body>前执行
####2.2 绑定删除按钮删除事件，参考了[别人的代码](http://www.cnblogs.com/AfterStories/articles/5384051.html)，学习了[call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

使用call()可以实现继承，新的对象可以继承另一个对象的方法而不用重写这个方法。

###3.任务十七
####3.1 发现动态添加<option>的方法除了声明一个字符串，将option的内容使用innerHTML插入外，在《JavaScript高级程序设计》中发现
还可以使用add（）方法。
书中说，add（）接受两个参数：要添加的新选项和将位于新选项之后的选项。如果想在列表的最后添加一个选项，应该将第二个参数设置为null。在IE中，add（）第二个参数是可选的，兼容DOM的浏览器必须要求制定第二个参数。这时候，可以将第二个参数传入undefined。
innerHTML方法：
``` var cityStr = "";
    for(var city in aqiSourceData){
        cityStr +="<option>"+ city +"</option>";
    }
    document.getElementById('city-select').innerHTML = cityStr;
```
add():
```var city = document.getElementById('city-select');//获取<select>的id

   for(var cityName in aqiSourceData){//遍历数据源aqiSourceData的key
      var newOption = new Option(cityName);
      city.add(newOption,undefined);
  }
```
####3.2事件委托
如果为ui中的每个li添加点击事件，循环遍历li，为每个li添加处理，浏览器重绘与重排的次数回家多，增加交互就绪的时间。采用事件委托就是比较好的处理方式。适合用事件委托的事件：click、mousedown、mouseup、keydown、keyup、keypress。