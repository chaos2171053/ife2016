# 单刷百度前端技术学院2016任务

**开始时间**：`2016/12/17`

## 遇到的问题及其解决方法
### 1. 任务十四

#### 1.1 遇到需要排序，复习了下几种基本排序算法
[JS版十大排序算法](http://blog.csdn.net/fengyinchao/article/details/52667625)<br>
[快速排序](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)<br>
看了网上的别人的解法，可以用array.filter、array.sort来实现大于60的筛选和排序，用array.forEach方法来代替for循环遍历处理数组元素。<br>

#### 1.2 对空气质量大于60筛选数据时，原始数据为如下：<br>
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

#### 1.3 动态添加li生成排行榜发现在循环在appendChild会导致回流。
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

### 2. 任务十六

#### 2.1 运行时发现can't set property onclick' of null。
解决方法把js文件放在`</body>`前执行
#### 2.2 绑定删除按钮删除事件，参考了[别人的代码](http://www.cnblogs.com/AfterStories/articles/5384051.html)，学习了[call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

使用call()可以实现继承，新的对象可以继承另一个对象的方法而不用重写这个方法。

### 3. 任务十七
#### 3.1 发现动态添加`<option>的方法除了声明一个字符串，将option的内容使用innerHTML插入外，在《JavaScript高级程序设计》中发现
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

#### 3.2 事件委托
如果为fieldset中的每个input添加点击事件，循环遍历radio，为每个radio添加处理，增加交互就绪的时间。采用事件委托就是比较好的处理方式。适合用事件委托的事件：click、mousedown、mouseup、keydown、keyup、keypress。
好处：
1. 管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。
2. 以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。
3. JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。

任务中只需为input的父层fieldset添加点击添加点击事件监听，判断是否点击input，点击则执行相应处理。

### 4.任务十八

#### 4.1 delete 一个数组arr[i]，只能让原来的arr[i]的值为undefined，应该使用数组的splice方法。
[MDN关于Array的描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
#### 4.2 实现“点击队列中任何一个元素，则该元素会被从队列中删除”需求时，一开始考虑的是判断点击的div里面的数字和队列中的哪个数字相等，如果相等则删除。忘记考虑了从多个数字相等的情况。应该获取点击的div在父元素中的索引，删除队列中对应的索引。
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

### 5.任务二十
#### 5.1 在textarea中按tab键会调到页面的下一个元素，而又想在textarea中按tab进行缩进。解决方法
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

### 6. 任务二十一
#### 6.1 input标签没有hover属性

#### 6.2 当输入标签为input时，对input设置keydown事件监听，按回车会提交表单，如果按1，会判断按下的键值，但是不会将1放入input的value属性里，使得console.log(input的value属性)为空值。应改为监听input的onkeyup事件,同时判断当按下回车时，阻止input的默认行为。

#### 6.3 想把获取的数据插入元素的内容，
```
var str = "<div class=" + '"tagListTop"' + ">" + 123123 +"</div>";
wrapperTagsTop.innerHTML = str;
```
发现插入的是一个数组，原因在于通过getElementsByClassName返回的是一个数组，还要通过索引获取想要的节点。

#### 6.4 给div设置onmouseover事件监听鼠标移动到div时获取点击的是哪个节点，然后通过innerHTML改变其样式，代码如下
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


#### 6.5 数组元素去重
一开始的思路是：
1. 声明一个新的数组用来存放结果；
2. for循环中每次从原数组中取出一个元素，用这个元素循环与结果数组对比；
3. 若结果数组中没有该元素，则存到结果数组中。
发现这种方法不够简练，改为
1. 声明一个新的数组用来存放结果
2. 声明一个空对象
3. for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

review别人的代码发现对数组使用indexof方法，如果返回-1则不重复。代码更简练。

#### 6.6 本来想用正则表达式和test（）判断标签输入框如果有空格、回车、逗号按下时，输入框内的内容自动生成一个标签，但是发现这样有一个bug就是先按空格、回车、逗号，会马上生成一个标签内容为空格、回车、逗号，而需求是输入标签内容后按空格、回车、逗号才生成标签。
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

### 7. 任务二十二

#### 7.1 实现前序遍历动画后点击其他遍历无法进行。
```
buildTree.prototype.animation = function(){
  var stack       = this.stack,
  speedSelect = document.querySelector('#speedSelect'),
  i           = 0,
  timer = 0;
  this.stack = [];

  console.log("1"+this);
  if(!this.isBuilding){
    this.isBuilding = true;
    console.log("2"+this);

    stack[i].style.backgroundColor = '#9da6bd';
    timer = setInterval(function(){
      if(i == stack.length-1){
        stack[i].style.backgroundColor = '#fff';
        this.isBuilding = false;
        console.log("3"+this);
        clearInterval(timer);
      }
      else{
        ++i;
        stack[i-1].style.backgroundColor = '#fff';
        stack[i].style.backgroundColor = '#9da6bd';
        console.log("every"+this);

      }
    },speedSelect.value);

  }
 };
 ```
 打印this后发现进入if判断后this对象从节点对象变为Window，因为在setInterval方法中this为Window
 ![22-1](problemsPic/22-1.png)<br>
 解决方法：
 在进入setInterval方法前，把this引用复制给一个变量，在setInterval中使用该变量引用节点对象。

### 8. 任务二十四
#### 8.1 设置默认背景色
实现“点击某个节点元素，则该节点元素呈现一个特殊被选中的样式”需求时，对节点元素设置事件代理个，点击时改变其颜色为红色。发现点击一个节点后，里面的子节点颜色也变红。
```
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if (target && target.tagName.toLowerCase() === "div") {
      target.style.backgroundColor = 'red';
    }
```
点击Shaq，里面的Shaq1、Shaq2、Shaq3、Shaq4背景颜色也变红。
![24-1](problemsPic/24-1.png)<br>

打开控制台发现Shaq的样式
![24-2](problemsPic/24-2.png)<br>

Shaq1、Shaq2、Shaq3、Shaq4的样式
![24-3](problemsPic/24-3.png)<br>

原来是没有设置div的默认背景颜色为白色。只需在css中设置div的默认样式为白色即可。
在css中修改后，点击Shaq
![24-4](problemsPic/24-4.png)<br>


#### 8.2 
删除子节点时，使用for循环从索引为0开始删除，发现不能删除完全部子节点，当删除索引为0的子节点后，原来索引为1的节点此时变成0了，而这时变量i已经变成1了，for继续运行时时就会删除原先索引为２的现在为1的节点删除。
解决办法是从索引最大值开始删除，采用递减的方法。
[Javascript removeChild()删除节点及删除子节点的方法](http://www.jb51.net/article/77042.htm);

#### 8.3 将wrapper下所有节点删除后发现在chrome下还有两个text空白节点，而且使用querySelector获取wrapper,使用wrpper.childNodes 返回的是一个NodeList，而 NodeList 不是数组，不能用数组方法。
```
var wrapper= document.querySelector('.wrapper'),
    NodeList = wrapper.childNodes,//返回的是NodeList！，NodeList不是数组，没有数组方法！
    regExp = /[^text,]+/,
    arr = Array.prototype.slice.call(NodeList)//将 NodeList 转换为 Array
```
如果使用wrapper = document.getElementsByClassName('wrapper')，使用Object.prototype.toString.call判断wrapper，返回[object HTMLCollection].
wrapper= document.querySelector('.wrapper')，使用Object.prototype.toString.call判断wrapper返回[object HTMLDivElement]。
Node.childNodes返回的是[object NodeList]
Node.children返回的是[object HTMLCollection]

删除wapper内所有节点后，看控制台可以发现
![24-5](problemsPic/24-5.png)<br>
元素是一个小范围的定义，必须是含有完整信息的节点才是一个元素； 一个节点不一定是一个元素，而一个元素一定是一个节点。
[MDN关于NodeList的解释](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)
[DOM树中的Node（节点）与Element（元素）的区别](http://blog.csdn.net/zgrjkflmkyc/article/details/43268933)


### 9 任务二十五
#### 9.1 js中静态方法
[js中静态方法（属性）、实例方法（属性）、内部方法（属性）和原型的一点见解](http://blog.csdn.net/panying0903/article/details/50246091)

#### 9.2 查找祖节点
实现“按照内容进行节点查找，并且把找到的节点进行特殊样式呈现，如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开”需求时，一开始想到的是找到该节点node，找到该节点的父节点node.parentNode，然后展开，但是发现如果还有祖节点，那还需要把祖节点也展开。于是需要遍历该节点的所有祖节点。
```
//寻找祖节点
  var resultParent = [],
  x = node.children[i];
  while (x.getAttribute("id") != 'list') {
    resultParent.push(x);//把祖节点都入栈
    x = x.parentNode;
    }
    //对每个祖节点遍历,如果子节点是ul或li标签，则展开。
    resultParent.forEach(function(e){
    for(var j =0,ln = e.children.length;j<ln;j++){
    var tag =e.children[j].className.toLowerCase();
    if(tag != "toggle" && tag != "content" && tag !="add"&& tag != "delete"){
        e.children[j].style.display = "block";
    }
    else{
      if(tag == "toggle") {
        e.children[j].innerHTML = "v";
        }
    }
    }
});   
```

但是发现这样仍然存在不足，如果兄弟节点A、B都包含有需要查找的内容，如果找到A，再找到所有祖节点依次展开，到B的时候，还得再执行依次一样的流程，而这些祖节点在找到A后都已经展开了。

### 10. 任务二十六
#### 10.1 当飞船飞行时，发现
![26-1](problemsPic/26-1.png)<br>
原因:
```
/**
     * 画飞船
     * @param  {array} spaceships 飞船队列
     */
    var drawSpaceships = function(spaceship){
      var spaceshipImg = new Image(); //创建飞船贴图
            spaceshipImg.src = "img/min-iconfont-rocket-active.png";
            spaceshipImg.onload = function(){

              ctx.save(); //保存画布原有状态
              ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y); //将画布坐标原点移到画布中心
              ctx.rotate(-spaceship.deg * Math.PI / 180); //根据飞船飞行角度进行画布选择
              ctx.beginPath();
              if (spaceship.power > 60) {
                ctx.strokeStyle = POWERBAR_COLOR_GOOD;
              } else if (spaceship.power <= 60 && spaceship.power >= 20) {
                ctx.strokeStyle = POWERBAR_COLOR_MEDIUM;
              } else {
                ctx.strokeStyle = POWERBAR_COLOR_BAD;
              }
              ctx.lineWidth = POWERBAR_WIDTH;
              ctx.moveTo(spaceship.orbit, -POWERBAR_POS_OFFSET);
              ctx.lineTo(spaceship.orbit + SPACESHIP_SIZE * (spaceship.power / 100), -POWERBAR_POS_OFFSET);
                ctx.stroke();
                ctx.drawImage(spaceshipImg, spaceship.orbit, 0, SPACESHIP_SIZE, SPACESHIP_SIZE); //画飞船贴图
                ctx.restore(); //恢复画布到原有状态
            };

    };
```
画飞船的时候，没有把canvas清屏，每次都在原来的基础上继续画飞船。
在onload事件执行一开始开始添加
```
ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); // clear canvas
                AminateUtil.drawPlanet();
                AminateUtil.drawOrbits();
```

#### 10.2image对象onload方法没有执行，没有显示图片。
再次刷新canvas（如销毁飞船，需要重绘时）由于图片加载缓冲区的速度太快，以至于没有运行到onload的时候，图片已经被加载完毕了。所以没有显示图片。
解决方法，利用image对象的complete属性,如：
```
var imgLoad = function (url) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback(img.width, img.height);
    } else {
        img.onload = function () {
            callback(img.width, img.height);
            img.onload = null;
        };
    };
};
```

#### 10.3使用requirejs对代码进行模块化优化
学习了requirejs，提高了代码的维护性。<br>
[require.js 入门学习](http://www.2cto.com/kf/201312/262057.html)<br>
[使用RequireJS优化Web应用前端](http://www.csdn.net/article/2012-09-27/2810404)<br>
[require.js 简洁入门](http://blog.sae.sina.com.cn/archives/4382)<br>

#### 10.4 this和$(this)的区别
实际上$(this)=jquery()，所以$(this)获取的是jq对象

#### 10.5飞船销毁
飞船销毁时，如果一开始销毁1号，第二次销毁3号时，无法销毁。这是因为一开始我把每个飞船的id从0到3赋值，如果销毁1号（1号飞船在飞船队列的索引为1），那2号飞船在队列的索引自动变为1,3号为2，这样，执行
`spaceships.splice(obj.id,1)`时，无法删除3号，因为他一开始的索引为3。<br>
解决方法使用delete删除属性:
`delete spaceships[obj.id]`<br>
[MDN-delete](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)<br>


### 11. 任务三十三
#### 11.1 如何获取表格的在某行某列上的单元格
`return table.rows[index].cells[index]`

### 12. 任务三十四
#### 12.1 旋转div
原本想通过角度变化，旋转div实现向左向右方向改变,如向左：
`$(square.div).css("transform", "rotate(" -90 +"deg)");`
发现只能旋转一次，第二次再向左就无法旋转了。这是因为在rotate（）中的角度永远都是根据最初始的角度0度旋转，不是根据现在的角度。

### 13. 任务三十五
#### 13.1 textarea光标定位在最后一行
![35-1](problemsPic/35-1.png)<br>
想点击textarea时，光标定位在文本最后一行（第三行）。
获取textarea的文本内容，利用focus()将光标定位在文本最后一行。
```
var content=$.trim($('#command-list').val());  
$('#command-list').val("").focus().val(content); 
``` 
[JQUERY实现点击INPUT使光标移动到最后或指定位置](https://www.xiariboke.com/design/2441.html)

#### 13.2 
实现删除命令后，左边指令行标同步。但是发现这样再按回车就无法新增一行。因为删除li和添加li冲突。按下回车，新增一行（此时这行的内容为空，做了忽略前后空白字符处理），代码中根据换行符匹配出指令的条数，忽略了空指令。此时指令条数和li数目不同，就会把新增的li删掉。只需不忽略指令前后空字符即可。
```
var editorBackSpace = function(event){
    var content=$('#command-list').val();
    var liNum = $('#command-number').get(0).children.length;
    var entnterNum = content.split(/\n/g).length;
    if(liNum != entnterNum) {
      $('li').last().remove();
    }
  };

```
#### 13.3 滚动右边指令时，左边指令行数同步滚动。
-![35-2](problemsPic/35-2.png)<br>
```$commandNumber.scrollTop($commandList.get(0).scrollTop).get(0);```

#### 13.4 jquery click()、keydown()中如何传递参数
想在keydwons()事件中把editor对象当参数传进去
```
var Editor = function(x,y) {
    var instance;
    if(typeof instance === 'object' ) {
      return instance;
    }
    instance = this;
    this.$commandNumber = $('#command-number');// 指令行数列表
    this.$commandList = $('#command-list');//指令列表
    //this.$commandList.keydown({object: this},this.inputKeyDown);
    this.$commandList.keydown(this,this.inputKeyDown);//this为editor对象当参数传进去
    this.$commandList.focus(this.editorFocus());
    this.$commandList.scroll(this.editorScroll);
    this.$commandList.on('input propertychange',this.inputBackSpace);
  };

```
但是在
```
Editor.prototype.inputKeyDown = function(event) {
    // var e = event || window.event;
    // if(e.keyCode == 13) {
    //  $('#command-number').append("<li></li>");
    // }
    console.log(this);
    
  };
```
this是当前执行inputKeyDown的控件。查了资料，发现在
`jQueryObject.click([[data,]handler])`中data是个jason对象。
解决方法：
声明一个对象`var object = {object:this};`
在`this.$commandList.keydown(object,this.inputKeyDown);`中传进去。
[JQuery中如何传递参数如click(),change()等具体实现](http://www.jb51.net/article/36249.htm)

####13.5 for循环里使用setTimeout()
```
//执行指令
if(!commandError) {
      var pre = 0;
      for(var j = 0,l = commands.length;j<l;j++){
        if(commands[j]){
          setTimeout(function(){
            _self.square.execute(_self.square,commands[j]);
            _self.editor.clearFlag(pre,"");
            _self.editor.setFlag(j,"success");
            pre = j;
          },TIME);
        }
      }
    }
```
想每隔1s执行依次执行命令，但是发现这样写1s后才开始执行setTimeout里面的方法，而此时j已经为undefined。
setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。
所以setTimeout的真正作用是，在“任务队列”的现有事件的后面再添加一个事件，规定在指定时间执行某段代码。setTimeout添加的事件，会在下一次Event Loop执行。
解决方法，使用闭包:
```
//依次运行命令
    if(!commandError) {
      var pre = 0;
      for (var j = 0,l = commands.length;j<l;j++) {
        if(commands[j]){
          (function(j){
            setTimeout( function timer(){
              _self.square.execute(_self.square,commands[j]);
              _self.editor.clearFlag(pre,"");
              _self.editor.setFlag(j,"success");
              pre = j;
            }, 1000 *j);//乘以j因为是指从开始进入队列开始等待的时间，1s、2s...即每隔1s执行。
          })(j);
        }
      }
    }
```
[关于setTimeout()你所不知道的地方](http://caibaojian.com/about-settimeout.html)<br>
[js for里面setTimeout问题]()<br>

#### 13.6 使用apply()、call()、bind()传递this
依次执行执行的时候
```
 Square.prototype.execute = function(string) {
        // var that = square;
        if(!this.isRunning){
            this.isRunning = true;
            for(var i = 0,len = this.commands.length;i<len;i++) {
                var command = this.commands[i];
                var match = string.match(command.pattern);
                if(match){
                    console.log(this);
                    command.handler(match[2]);
                    //command.handler.apply(this,[match[2]]);
                    match.shift();
                    //this.isRunSucceed = true;
                    this.isRunning = false;
            }
            }

        }
    };
```
这里的this是Square对象
![35-3](problemsPic/35-3.png)<br>
在指令中，this对象却变成了commands数组对象
![35-4](problemsPic/35-4.png)<br>
因为我没有指定comands中的this为Square,this变成运行时候的对象即commands数组。
```
 /**
     * 指令
     * @type {Array}
     */
    Square.prototype.commands = [
    {
        pattern: /^go(\s+)?(\d+)?$/i,
        handler: function (step) {
            // this.go(step);
            for(var i = 0;i<step;i++) {
                this.go();
            }
        }
    },
    ];
```
解决:`command.handler.apply(this,[match[2]]);`把Square对象当参数传进去。<br>
[js中bind、call、apply函数的用法](http://rangercyh.blog.51cto.com/1444712/1615809);

#### 13.7 块级作用域
js没有块级作用域。
```
if(true){
  var color = "red";
}
alert(color);//red
```
如果在c、java、c++中，color会在if语句执行完毕后销毁。在js中，if中的变量声明会将变量添加到当前执行环境中。在使用for语句时要牢记这一点。

#### 13.8 在点击运行时，在点击运行，小方块执行了两次全部指令
原因还是同10.5中所说。setTimeout在“任务队列”的现有事件的后面再添加一个事件，规定在指定时间执行某段代码。第一次点击，判断编辑器是否在运行的变量_self.editor.isRunning已经在setTimeout的指定时间内运行完变成false，所以可以再点击运行按钮重复运行指令。
解决方法，把原本在一开始执行指令后使```_self.editor.isRunning = ture```放在setTimeout方法里面。

#### 13.9 指令执行时间
当有空指令时，虽然没有执行指令，但是也等待了一段时间才执行有效指令。而我想要的是跳过空指令的等待时间，直接执行有效指令。
![35-5](problemsPic/35-5.png)<br>
这里等待了3秒后才执行go，应该是等待1s执行go。<br>
解决方法：
1、先筛选有效指令的索引
```
var validComandsIndex = [];
          //筛选出有效指令
          for(i =0;i<len;i++){
            if(commands[i]){
              validComandsIndex.push(i);
            }
          }
```
2、再执行有效指令
```
for(var k=0,ln = validComandsIndex.length;k<ln;k++){
            (function(){
              var j = k;
              _self.square.isRunSucceed = false;
              setTimeout(function(){
                  _self.editor.isRunning = true;
                  pre = validComandsIndex[j];
                  _self.editor.clearFlag();
                  _self.square.execute(commands[validComandsIndex[j]]);
                  if(_self.square.isRunSucceed){
                    _self.editor.setFlag(validComandsIndex[j],"success");
                  }
                  else{
                    _self.editor.setFlag(validComandsIndex[j],"warnning");
                    _self.editor.setErrorText(j,"warnningText");
                    _self.editor.isRunning = false;
                    return true;
                  }
                },j*TIME);
            })(k);
          }
```

#### 13.10 中断setTimeout
当小方块前面有墙时，应该不能执行下一步指令。我在setTimeout中设置了return 中止。但是发现这样不行。
![35-6](problemsPic/35-6.png)<br>
```
else{
    _self.editor.setFlag(validComandsIndex[j],"warnning");
    _self.editor.setErrorText(j,"warnningText");
    _self.editor.isRunning = false;
    return true;
    }
```
解决方法：
```
var t = null;
          for(var k=0,ln = validComandsIndex.length;k<ln;k++){
            (function(){
              var j = k;
              var timer = setTimeout(function(){
                if(t!= false && (_self.editor.isRunning != false)){
                  _self.square.isRunSucceed = false;
                  pre = validComandsIndex[j];
                  _self.editor.clearFlag();
                  _self.square.execute(commands[validComandsIndex[j]]);
                  if(_self.square.isRunSucceed){
                    _self.editor.setFlag(validComandsIndex[j],"success");
                    if(j == (ln-1)){
                      _self.editor.isRunning = false;
                    }
                  }
                  else{
                    _self.editor.setFlag(validComandsIndex[j],"warnning");
                    _self.editor.setErrorText(j,"warnningText");
                    _self.editor.isRunning = false;
                    t =false;
                  }
                }
                },j*TIME);
            })(k);
          }
```
因为闭包的关系，timer每隔1s被赋予新的值。因为每次执行timer，timer会自己+1。一开始想到的是把timer+1然后赋值给t，执行下一条指令判断t是否等于timer，但是忘记考虑多条指令的情况下了。毕竟可能还有timer+2、timer+3等等情况。所以利用这一点，在需要清除的时候，t值赋予false（t需要声明在闭包外)。每次执行setTimeout时候，判断t是否等于false。同样编辑器是否正在运行的判断也要这样处理。

### 14 任务37
#### 14.1  
`<button>`和`<input type="button">`的区别
[HTML<button>和<input type="button"> 的区别](http://blog.csdn.net/lee_sire/article/details/50312301)<br>

#### 14.2 配置CSS Modules
[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)<br>

#### 14.3 React中设置不同class
[React中classSet的用法](http://lib.csdn.net/article/react/12201?knId=685)<br>
[React学习笔记—类名操作](http://www.07net01.com/2015/04/827648.html)<br>
[github-Classnames](https://github.com/JedWatson/classnames)<br>

#### 14.4 学习使用React DnD 实现拖拽浮出层
[React-DnD 的使用](http://www.phperz.com/article/16/0115/183290.html)<br>
[HTML5拖放事件](http://www.bubuko.com/infodetail-832223.html)<br>
[HTML5 拖放（Drag 和 Drop）](http://www.runoob.com/html/html5-draganddrop.html)<br>
[React-DnD 官方文档](https://react-dnd.github.io/react-dnd/docs-tutorial.html)<br>

#### 14.5 修饰器
[ECMAScript 6 入门-修饰器](http://es6.ruanyifeng.com/#docs/decorator#Mixin)<br>
[github-Babel Legacy Decorator plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)<br>

### 16 任务38、39
#### 16.1 px em rem区别
一般`1rem=16px`
em是相对于元素的父元素的font-size进行计算；rem是相对于根元素html的font-size进行计算。
[彻底弄懂css中单位px和em,rem的区别](https://www.baidu.com/s?ie=UTF-8&wd=rem)<br>
[Sass基础——Rem与Px的转换](http://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html)<br>

#### 16.2 react中this问题
想在父组件TableController中实现一个回调函数，子组件TableHeader中点击降序/升序调用这个回调函数，在父组件中更新表格中的数据进行排序，但是遇到了[这种情况](http://react-china.org/t/this-null/3749/2。
解决方法：在注入该回调函数给子组件时绑定this，同时在文件头`import React, {Component,PropTypes} from 'react';`，声明组建时使用`class TableController extends Component `。原来为`class TableController extends React.Component`
Component是React内的一个基类，用于继承和创建React自定义组件。ES6规范下的面向对象实现起来非常精简，class关键字 可以快速创建一个类，而Component类内的所有属性和方法均可以通过this访问。换而言之，在Component内的任意方法内，可以通过this.xxx的方式调用该Component的其他属性和方法。
[深入理解React中的上下文this](http://blog.csdn.net/u011413061/article/details/51946425)<br>
[react中this](http://react-china.org/t/this-null/3749/2)<br>
[React:ES6:ES7中的6种this绑定方法](http://blog.csdn.net/wzgl708937822/article/details/52399617)<br>

#### 16.3 react中获取到真实的DOM节点
想在渲染完表格后获取表头的真是dom节点。需要<br>
`import ReactDOM from 'react-dom';`
`let headerDOM = ReactDOM.findDOMNode(this.refs.tHeader);`

### 17 任务40
安装不了node-sass
[安装node-sass](https://segmentfault.com/q/1010000006025361)<br>
[node-sass安装](http://www.jianshu.com/p/0ccf4587122d)<br>
[sass-loader](https://github.com/webpack-contrib/sass-loader)<br>

### 18 react-yelp
#### 18.1
[Sass with CSS Modules & Webpack](http://stackoverflow.com/questions/34443827/sass-with-css-modules-webpack)<br>
#### 18.2 
使用了css modules处理样式，但是使用了sass，所以要将scss文件转成css<br>
webpack中配置<br>
```
{
    test: /\.scss$/,
    exclude: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
  }, {
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css!sass?sourceMap=true'
  }
````
[CSS Modules 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20495964?columnSlug=purerender)<br>

 
### 19 问卷管理系统
#### 19.1 
1. calc()
2. em
3. rem
4. 在开发页面的时候在head中添加个viewport的meta 
`<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">`
5. 视窗 viewport
简单的理解，viewport是严格等于浏览器的窗口。在桌面浏览器中，viewport就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。
6. meta标签

主要用来告诉浏览器如何规范的渲染Web页面<br>
[CSS3的calc()使用](http://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)<br>
[CSS中强大的EM ](http://www.uml.org.cn/html/201207311.asp)<br>
[css中的px、em、rem 详解](http://www.mamicode.com/info-detail-655497.html)<br>
[css3的字体大小单位[rem]到底好在哪？](https://www.zhihu.com/question/21504656)<br>
[移动端适配方案(上)](https://github.com/riskers/blog/issues/17)<br>
[深入了解viewport和px](http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml)<br>
[移动端适配方案(下)](https://github.com/riskers/blog/issues/18)<br>
[MobileWeb 适配总结](http://html-js.com/article/MobileWeb)<br>
[手机百度移动适配切图解决方案介绍](http://js8.in/2015/12/12/%E6%89%8B%E6%9C%BA%E7%99%BE%E5%BA%A6%E7%A7%BB%E5%8A%A8%E9%80%82%E9%85%8D%E5%88%87%E5%9B%BE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E4%BB%8B%E7%BB%8D/)<br>
[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)<br>
[掘金-rem](http://www.w3cplus.com/blog/tags/143.html)<br>
[viewports剖析](http://www.w3cplus.com/css/viewports.html)<br>
[媒体查询](http://www.cnblogs.com/lyzg/p/4877277.html)<br>

#### 19.2 子路由嵌套问题
在react-router v4之前,可能需要这样写
```
<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="edit" component={Edit} />
                <Route path="fill" component={Fill} />
                <Route path="check" component={Check} />
            </Route>
        </Router>
    </Provider>,
```
但是在V4之后，需要改为这样，这样才支持嵌套
```
<Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <App>
                <div>
                    <Header />
                    <Main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/edit" component={Edit} />
               {/* <Route path="/fill" component={Fill} />
                <Route path="/check" component={Check} >*/}
                        </Switch>
                    </Main>
                </div>
            </App>
        </ConnectedRouter>
```
因为在v4版本，this.props.children已被移除

#### 19.3 组件重复渲染
```
this.state = {
            chooseSignin: false,
            chooseSignup: true
        }
```
```
renderNavs() {
        console.log(this.state.chooseSignin)
        return (
            <div className={styles.navs}>
                <div className={styles['navs-slider']}>
                    <span href='#' className={classNames({ [styles['active']]: this.state.chooseSignup })}
                                onClick ={()=>{ this.setState({
            chooseSignin: false,
            chooseSignup: true
        })}}>注册</span>
                    <span href='#' className={classNames({ [styles['active']]: this.state.chooseSignin })}
                                onClick ={::this.toogleRenderSignin}>登录</span>
                    <span className={styles['navs-slider-bar']}></span>
                    <span className={classNames({
                        [styles["navs-slider-bar"]]: true,
                        [styles['bar-acitve']]: this.state.chooseSignin
                    })}></span>
                </div>
            </div>
        )
    }
```
想点击登录、注册改变state切换显示登录、注册面板组件。但是发现点击一次，打印两次`this.state.chooseSignin`的值。<br>
原因在于使用了a标签，点击时改变了一次state，页面跳转，改变一次state，一共两次。<br>
解决方法：改为用div或span标签。<br>

#### 19.4 上面的代码出现了另外的bug
![50-1](problemsPic/50-1.png)<br>
原因是我在 state 还在更新中时 setState。<br>
解决方法:<br>
在组件constructor方法里面
```
this.toogleRenderSignup = this.toogleRenderSignup.bind(this,true)
this.toogleRenderSignin = this.toogleRenderSignin.bind(this,false)
```
在render方法里
```
<span className={classNames({ [styles['active']]: this.state.chooseSignup })}
                                onClick ={this.toogleRenderSignup}>注册</span>
<span className={classNames({ [styles['active']]: this.state.chooseSignin })}
                                onClick ={this.toogleRenderSignin}>登录</span>
```

解决方法：使用redux控制组件切换更新。<br>
[参考](http://4dev.tech/2016/03/reactjs-error-cannot-update-during-an-existing-state-transition-such-as-within-render-render-methods-should-be-a-pure-function-of-props-and-state/)<br>

#### 19.5 canvas的宽高自适应
登录界面的背景用了canvas，可是发现css设置了宽高100%，高度都无法达到100%。<br>
解决方法：在render方法里使用内联式<br>
```
const canvasStyle = {
            position: 'absolute',
            top: '0',
            height: '100%',
            width: '100%',
            margin: '0',
            padding: '0',
            display: 'block',
            background: 'blue',
        }
```
`<canvas id='canvas' style={canvasStyle} className={styles.canvasBackground}></canvas>`

#### 19.6 div内文字怎么水平垂直居中忘记了
令行高等于div高度，然后加上`text-align:center;`即可<br>

#### 19.7 如果之前已经登录过系统，再重新刷新页面，应该直接跳过登录页面到主界面。但是此时报错
`Uncaught TypeError: Cannot read property 'getContext' of null`
这是因为在登录页面的componentDidMount方法里，我渲染canvas,需要获取getContext，但是此时已调到主界面了，获取不到。
解决方法
```
let cx = document.getElementById('canvas');
        if (cx!==null) {
          let ctx = cx.getContext('2d');
          ...
        }
```

#### 19.8 登出的时候路由重定向，action的type不同。<br>
我定义了action的type为 `SIGN_OUT`<br>
```
case SIGN_OUT: {//登出状态
            const state = Object.assign({}, state, {
                isRenderSignin:false,
                isRenderSignup:true,
                isLogin: false
            })
            localStorage.statusState = JSON.stringify(state);
            return state
        }
```
但是在我定义Link点击事件的时候
```
signout() {
        const history = this.props.history
        history.push('/')
        this.props.actions.signOut()
        <!--return <Redirect to='/home' />-->
    }
```
触发action signOout方法，在reducer里面应该根据signOout的type来计算新的state，但是打断点发现action的type变了。无论是我使用
```
const history = this.props.history
history.push('/')
this.props.actions.signOut()
```
还是`return <Redirect to='/home'`，action的type都是
![50-2](problemsPic/50-2.png)<br>
解决方法就把action的type改成`@@router/LOCATION_CHANGE`


#### 19.9 路由重定向
```
const initialState = localStorage.statusState ? JSON.parse(localStorage.statusState) : {
    isLogin: false,
    isRenderSignin: false,
    isRenderSignup: true,
}

console.log("获取："+localStorage.statusState)
const status = (state = initialState, action) => {

    switch (action.type) {
        case LOG_IN: {//登录
            const state1 = Object.assign({}, state, {
                // isRenderSignin: false,
                // isRenderSignup: true,
                isLogin: true
            })
            localStorage.statusState = JSON.stringify(state1);
            console.log("login:   "+localStorage.statusState)
            return state1
        }
            break;
        case SIGN_OUT: {//登出
            const state = Object.assign({}, state, {
                isRenderSignin: false,
                isRenderSignup: true,
                isLogin: false
            })
            localStorage.statusState = JSON.stringify(state);
            console.log("logout:   "+localStorage.statusState);
            return state
        }
            break;
```
发现第一次进入系统，打印出来<br>
![50-3](problemsPic/50-3.png)<br>
登陆后打印：<br>
![50-4](problemsPic/50-4.png)<br>
登陆后竟然触发了logout的action。。。<br>
可能是因为重定向的action也同时执行了？后面发现其实刷新页面触发了很多种action。所以需要对action的payload里判断是不是登出。<br>
解决：<br>
```
signout() {
       this.props.actions.signOut('SIGN_OUT')
    }
```
```
case ROUTER_LOACTION_CHANGE: { //路由切换
            if (action.payload.signout === SIGN_OUT) {//登出
                const state = Object.assign({}, state, {
                    isRenderSignin: false,
                    isRenderSignup: true,
                    isLogin: false
                })
                localStorage.statusState = JSON.stringify(state);
                return state
            }else {
                return state;
            }
        }
```
```
render() {
        const { actions: { signOut }, status: { isLogin } } = this.props;
        // debugger
        if (!isLogin) {
            return <Redirect to='/' />
        }
        ......
```

#### 19.10 导航固定
```
.nav{
    position: fixed;
    top: 0;
    left: 0;
    ....    
}
```
#### 19.11 切图先把大概div分布确定好

#### 19.12 数组中元素交换位置
在新增页面中，对问题进行上移下移操作，需要对state中question数组进行重新排序<br>
```var swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
    };
 // 上移
swapItems(arr, index, index - 1);
//下移
swapItems(arr, index, index + 1);
```
[JavaScript下实现交换数组元素上下移动例子](http://www.111cn.net/wy/js-ajax/80973.htm)

#### 19.13 克隆数组中的元素
```
/**
 * 判断arr是否为一个数组，返回一个bool值
 *
 * @param  {any}  arr 目标对象
 * @return {boolean}        判断结果
 */
function isArray(arr) {
    return '[object Array]' === Object.prototype.toString.call(arr);
}
/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isPlain(obj){
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        key;
    if ( !obj ||
         //一般的情况，直接用toString判断
         Object.prototype.toString.call(obj) !== "[object Object]" ||
         //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    //判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( obj.constructor &&
        !hasOwnProperty.call(obj, "constructor") &&
        !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in obj ) {}
    return key === undefined || hasOwnProperty.call( obj, key );
}

/**
 * 对一个object进行深度拷贝
 *
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 *
 * @param  {Object} source 需要进行拷贝的对象
 * @return {Object} 拷贝后的新对象
 */
export function cloneObject (source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i++) {
            result[resultLen++] = cloneObject(source[i]);
        }
    } else if (isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = cloneObject(source[i]);
            }
        }
    }
    return result;
}
```

#### 19.14 使用Redux DevTools浏览器插件调试redux
使用了Redux DevTools来调试<br>
[使用Redux DevTools浏览器插件调试redux](http://blog.csdn.net/applebomb/article/details/54918659)<br>

#### 19.15 在对话框中点击确定后跳转页面
[50-5](problemsPic/50-4.png)<br>
因为使用了antd库的对话框组件，所以需要在点击确定的时候提交问卷并且返回主界面。<br>
在确定按钮的回调函数中`<Link to ='/home'/>`，但是这样无法跳转。<br>
解决方法：使用history的push方法,调用withRouter方法。<br>
```
import { Link, withRouter } from 'react-router-dom'
...
const Footer = withRouter(({ handleSetDeadLine, handleSaveQuestionnaire ,history}) => {
    const handleSaveQuestionnaireModal = () => {
        Modal.confirm({
            title: '提示',
            content: '确定要保存问卷吗？',
            okText: '确定',
            cancelText: '取消',
            onOk(){
                handleSaveQuestionnaire();
                history.push('/home')
            },
            onCancel() {},
        });
    }
    return (
        .....
    )
})
```

#### 19.16 npm start
`"start": "node node_modules/webpack-dev-server/bin/webpack-dev-server.js",`

#### 19.17 css行高line-height的用法
[css行高line-height的用法](http://www.studyofnet.com/news/273.html)

#### 19.18 删除问卷时表格不同步渲染问卷数量，每次添加新的问卷创建新的用户副本和问卷副本
原因：
1、在reducers里，我没有每次返回一个新的state，我直接修改state返回了，导致没有获取新的state。
2、在表格组件里，我把问卷数量信息作为表格组件的state独自维护，在接受到新的props时，没有触发更新。
解决方法：
1、在reducers里，删除问卷时返回新的state，使用深度克隆。
2、在表格组组件里，使用
```
componentWillReceiveProps(nextProps) {
       let questionnaires = this.handleFormatDeadline(cloneObject(nextProps.questionnairesArray))
       this.setState({ questionnaires: questionnaires })
    }
```
 在表格组件实例存在的生命周期，接受新的props，更新其state，触发render，更新问卷列表。<br>
[React组件生命周期过程说明](http://react-china.org/t/react/1740)

#### 19.19 span内容自动换行
[span 文本内容超过宽度自动换行](http://blog.csdn.net/qingyun0719/article/details/5629981)<br>

#### 19.20 移动端测试网页
在控制台敲入下面的命令：
`browser-sync start --proxy http://localhost:8000/webpack-dev-server/ --files "style/**"`
手机上访问192.168.0.108:3000<br>
[知乎](https://www.zhihu.com/question/37361845)<br>
[移动端页面调试神器-browser-sync](http://www.cnblogs.com/kbqncf/p/4206244.html)<br>
 
#### 19.21 打包后运行index.html报错
`Uncaught DOMException: Failed to execute 'replaceState' on 'History': A history state object with URL`
原因我在项目中history使用了browserHistory，打包后服务器，所有访问不了。<br>
在代码中改为就可以了<br>
`import createHistory from 'history/createHashHistory'`


