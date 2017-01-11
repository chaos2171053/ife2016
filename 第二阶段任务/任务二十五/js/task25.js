/**
 * 构建树
 */
function BuildTree (){
	this.stack = [];
	this.isSearching = false;
}

/**
 * 清除颜色
 */
BuildTree.prototype.resetChart  =function(){
	var p = document.querySelectorAll(".content");
	for(var i = 0,len = p.length;i<len;i++){
		p[i].style.color = "#000";
	}
};


/**
 * 事件委托
 */
BuildTree.prototype.delegateEvent = function(event){
	var event = event || window.event,
	    target = event.target || event.srcElement,
	    children = target.parentNode.children,
	    len = children.length,
	    found = 0,
	    input;
	    
        //折叠与展开
	if (target && target.className.toLowerCase() === "toggle"){
		if(children[0].innerHTML == "v"){
			for(var i = 4;i<len;i++){
				children[i].style.display ="none";
			}
			children[0].innerHTML = ">";
		}
		else{
			for(var i = 4;i<len;i++){
				children[i].style.display ="block";
			}
			children[0].innerHTML = "v";
		}
	}

	    //添加
	if (target && target.className.toLowerCase() === "add"){
		input = trim(prompt("添加内容","我是一个膜法师"));
		if(input !=""){
			var str = "";
			if(len == 4){
				str = '<ul><li>'+'<span class="toggle">></span><p class ="content">' + input 
			+ '</p><span class="add">+</span><span class="delete">x</span></li></ul>';
			   target.parentNode.innerHTML += str ;
			   children[0].innerHTML = "v";
			}
			else{
				str = '<li>'+'<span class="toggle">></span><p class ="content">'  
				+input + '</p><span class="add">+</span><span class="delete">x</span></li>';
				target.parentNode.children[4].innerHTML 
			   = str + target.parentNode.children[4].innerHTML;
			   children[0].innerHTML = "v";
			   for(var i = 4;i<len;i++){
			   	children[i].style.display ="block";
			   }
			}
			
		}

	} 

	//删除
	if (target && target.className.toLowerCase() === "delete"){
		target.parentNode.parentNode.removeChild(target.parentNode);
	}

	//编辑
	if (target && target.tagName.toLowerCase() === "p"){
		var text = trim(prompt("编辑",target.innerHTML ));
		if(text != ""){
			target.innerHTML = text;
		}
		 
	}
};


/**
 * 搜索内容
 * @param {array} node 节点
 * @param  {string} information 要查询的信息
 */
BuildTree.prototype.searchInformation = function(node,information){
	var regExp = new RegExp(information),
	    wrapper= document.querySelector('#list'),
	    stack =this.stack,
	    count = 0,
	    isSearching = this.isSearching,
	    NodeList = wrapper.children;
        
        //如果树没有任何节点,则返回
    if(NodeList.length == 0){
        alert("没有内容可供搜索/(ㄒoㄒ)/~~");
        return ;
    }
    isSearching = true;
    //广度遍历
    stack.push(node);
    while (stack.length > 0) {
        node = stack.shift();
        len = node.children.length;
        if (len) {
            for (var i = 0; i < len; i++) {
                stack.push(node.children[i]);
                //查找p标签里面是否有要搜索的内容
                if(node.children[i].tagName.toLowerCase() =="p"
                	&& regExp.test(node.children[i].innerHTML)){
                	count++;
                	node.children[i].style.color = "#f56352";//有，则颜色标记
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
                        	if(tag != "toggle" && tag != "content" && tag !="add"
                        		&& tag != "delete"){
                        		e.children[j].style.display = "block";
                        	    }
                        	else{
                        		if(tag == "toggle") {
                        				e.children[j].innerHTML = "v";
                        		}
                        	}
                        }
                    });		
                }
                }
            }
        }
        isSearching = false;
        alert("共找到"+count+"个搜索结果");
};

(function(){
	var tree = new BuildTree(),
	    search = $('search'),
	    rootNode = document.querySelector('#list'),
	    information = "";

	    //搜索
	addEventHandler(search,"click",function(){
	    tree.stack = [];//清空队列
	    tree.resetChart();//上一次搜索结果颜色还原
	    information = trim($('information').value);
	    if(information == ""){
			alert("啊喂！你还没有输入内容");
			return;
		}
		tree.searchInformation(rootNode,information);
	});
	   
	   //事件代理
	addEventHandler(rootNode,'click',function(event){
		tree.delegateEvent(event);
	});
	 
}());