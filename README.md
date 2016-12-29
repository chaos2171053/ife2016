# 单刷百度前端技术学院2016任务

**开始时间**：`2016/12/17`

## 遇到的问题及其解决方法
###1. 任务十四

####1.1 遇到需要排序，复习了下几种基本排序算法
[JS版十大排序算法](http://blog.csdn.net/fengyinchao/article/details/52667625)<br>
[快速排序](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
看了网上的别人的解法，可以用array.filter、array.sort来实现大于60的筛选和排序，用array.forEach方法来代替for循环遍历处理数组元素。<br>

####1.2 对空气质量大于60筛选数据时，原始数据为如下：<br>
```
var aqiData = [
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
```
var temp=[];//声明一个临时数组
temp.push(arr[pivotIndex]);//用push方法把作为基准的城市数据暂存下来。
```

####1.3 动态添加li生成排行榜发现在循环在appendChild会导致回流。
```
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
```
var parentUl = document.getElementById('aqi-list');
var contentStr = "";
var len = result.length;
for(i = 1;i<=result.length;i++){
    contentStr += "<li>第" + i + "名：" + result[len-i][0] + "，" + result[len-i][1] + "</li>";
}
parentUl.innerHTML = contentStr;

})();
```


[页面呈现流程 ](http://www.blogjava.net/BearRui/archive/2010/05/10/320502.html)

###2. 任务十六

####2.1 运行时发现can't set property onclick' of null。
解决方法把js文件放在`</body>`前执行
####2.2 绑定删除按钮删除事件，参考了[别人的代码](http://www.cnblogs.com/AfterStories/articles/5384051.html)，学习了[call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

使用call()可以实现继承，新的对象可以继承另一个对象的方法而不用重写这个方法。

###3. 任务十七
####3.1 发现动态添加<option>的方法除了声明一个字符串，将option的内容使用innerHTML插入外，在《JavaScript高级程序设计》中发现
还可以使用add（）方法。
书中说，add（）接受两个参数：要添加的新选项和将位于新选项之后的选项。如果想在列表的最后添加一个选项，应该将第二个参数设置为null。在IE中，add（）第二个参数是可选的，兼容DOM的浏览器必须要求制定第二个参数。这时候，可以将第二个参数传入undefined。
innerHTML方法：
```
var cityStr = "";
for(var city in aqiSourceData){
    cityStr +="<option>"+ city +"</option>";
}
    document.getElementById('city-select').innerHTML = cityStr;
```
add()方法:
```
var city = document.getElementById('city-select');//获取<select>的id

for(var cityName in aqiSourceData){//遍历数据源aqiSourceData的key
    var newOption = new Option(cityName);
    city.add(newOption,undefined);
}
```

####3.2 事件委托
如果为fieldset中的每个input添加点击事件，循环遍历radio，为每个radio添加处理，增加交互就绪的时间。采用事件委托就是比较好的处理方式。适合用事件委托的事件：click、mousedown、mouseup、keydown、keyup、keypress。
好处：
1. 管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。
2. 以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。
3. JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。

任务中只需为input的父层fieldset添加点击添加点击事件监听，判断是否点击input，点击则执行相应处理。

###4.任务十八

####4.1 delete 一个数组arr[i]，只能让原来的arr[i]的值为undefined，应该使用数组的splice方法。
[MDN关于Array的描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
####4.2 实现“点击队列中任何一个元素，则该元素会被从队列中删除”需求时，一开始考虑的是判断点击的div里面的数字和队列中的哪个数字相等，如果相等则删除。忘记考虑了从多个数字相等的情况。应该获取点击的div在父元素中的索引，删除队列中对应的索引。
```
for()方法代码如下：
if(target && target.className === "numberList"){
//方法一：判断点击的div里面的数字与队列中的哪个数字相等，只适合数字都不同的时候
for(var i = 0; i<data.length;i++){
   if(data[i] == target.innerHTML){
   data.splice(i,1);
}
}
```
利用call来调用Array的原型方法indexOf()
```
var i = [].indexOf.call(target.parentNode.children, target);
data.splice(i,1);
renderChart(data);
```

###4.任务二十
####4.1 在textarea中按tab键会调到页面的下一个元素，而又想在textarea中按tab进行缩进。解决方法
是判断按下的键是否是tab键。
```
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
```

###5. 任务二十一
####5.1 input标签没有hover属性

####5.2 当输入标签为input时，对input设置keydown事件监听，按回车会提交表单，如果按1，会判断按下的键值，但是不会将1放入input的value属性里，使得console.log(input的value属性)为空值。应改为监听input的onkeyup事件,同时判断当按下回车时，阻止input的默认行为。

####5.3 想把获取的数据插入元素的内容，
```
var str = "<div class=" + '"tagListTop"' + ">" + 123123 +"</div>";
wrapperTagsTop.innerHTML = str;
```
发现插入的是一个数组，原因在于通过getElementsByClassName返回的是一个数组，还要通过索引获取想要的节点。

####5.4 给div设置onmouseover事件监听鼠标移动到div时获取点击的是哪个节点，然后通过innerHTML改变其样式，代码如下
```
function divMouseOver(ele){
  var ele = ele|| window.event;
  var target = ele.target ||ev.srcElement;
  if(target && target.className == "tagListTop"){
      var i = [].indexOf.call(target.parentNode.children,target);
      wrapperTagsTop.children[i].innerHTML = "<div class=" + '"tagListTop"' + ">" +           "点击删除"+data[i] +"</div>";
}
}

function divMouseOut(){
  var ele = ele|| window.event;
  var target = ele.target ||ev.srcElement;
  if(target && target.className == "tagListTop"){
    var i = [].indexOf.call(target.parentNode.children,target);
    wrapperTagsTop.children[i].innerHTML = "<div class=" + '"tagListTop"' + ">" +data[i] +"</div>";
}
}
```

发现鼠标悬停和移出的效果如下：
![21-1](problemsPic/21-1.png)
![21-2](problemsPic/21-2.png)<br>
原因：innerHTML实质是改变标签内的内容，即在该子节点div中间插入内容。
解决方法：在mouseover时插入"点击删除"和该爱好标签的内容，在mouseout时插入该爱好标签的内容。


####5.5 数组元素去重
一开始的思路是：
1. 声明一个新的数组用来存放结果；
2. for循环中每次从原数组中取出一个元素，用这个元素循环与结果数组对比；
3. 若结果数组中没有该元素，则存到结果数组中。
发现这种方法不够简练，改为
1. 声明一个新的数组用来存放结果
2. 声明一个空对象
3. for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

review别人的代码发现对数组使用indexof方法，如果返回-1则不重复。代码更简练。

####5.6 本来想用正则表达式和test（）判断标签输入框如果有空格、回车、逗号按下时，输入框内的内容自动生成一个标签，但是发现这样有一个bug就是先按空格、回车、逗号，会马上生成一个标签内容为空格、回车、逗号，而需求是输入标签内容后按空格、回车、逗号才生成标签。
```
keyRegExp = /[,，、\s\n]/;
function inputTagsEvent(event){
  var inputData = inputTags.value;
  if(keyRegExp.match(inputData)[0] || getEvent(event).keyCode == 13){
    getEvent(event).preventDefault(event);//阻止回车默认事件
  if(validData(inputData.trim(),inputTags)){
    renderChart(tags,tagsListWrapper[0]);
    clearText(inputTags);
}
```




