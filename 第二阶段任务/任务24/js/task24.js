
(function(){
	var tree = new BuildTree(),
	    dlr = $('dlr'),
	    ldr = $('ldr'),
	    lrd = $('lrd'),
	    deleteTags = $('deleteTags'),
	    comfirm = $('comfirm'),
	    rootNode = document.querySelector('.root');

	addEventHandler(dlr,'click',function(){
		tree.stack = [];
		if(tree.validNode()){
			return;
		}
		tree.dlrOrder(rootNode);
		tree.resetChart();
		tree.animation();
	});
	addEventHandler(ldr,'click',function(){
		tree.stack = [];
		tree.ldrOrder(rootNode);
		if(tree.validNode()){
			return;
		}
		tree.resetChart();
		tree.animation();
	});
	addEventHandler(lrd,'click',function(){
		tree.stack = [];
		tree.lrdOrder(rootNode);
		if(tree.validNode()){
			return;
		}
		tree.resetChart();
		tree.animation();
	});
	addEventHandler(rootNode,'click',function(event){
		tree.delegateEvent(event);
	});
    addEventHandler(deleteTags,'click',function(){
    	tree.stack = [];
    	tree.selectedStack = [];
    	tree.dlrOrder(rootNode);
    	if(tree.getSelected()){
    		tree.deleteTags();
    	}
        
    });

    addEventHandler(comfirm,'click',function(){
    	tree.stack = [];
    	tree.selectedStack = [];
    	tree.dlrOrder(rootNode);
    	if(tree.getSelected()){
    		tree.appendNode();
    	}
    });
}());

/**
 * 构建树
 */
function BuildTree(){
	this.stack = [];
	this.isBuilding = false;
	this.selectedStack = [];
}



/**
 * 前序遍历
 * @param  {object} node 节点
 */
 BuildTree.prototype.dlrOrder = function(node) {
	this.stack.push(node);
	for(var i= 0,len = node.children.length;i<len;i++){
		this.dlrOrder(node.children[i]);
	}
};


/**
 * 中序遍历
 * @param  {object} node 节点
 */
BuildTree.prototype.ldrOrder = function(node){
 	if(node.children.length == 0){
 		this.stack.push(node);//子节点入栈
 	}
 	for(var i = 0,len = node.children.length;i<len;i++){
 		this.ldrOrder(node.children[i]);
 		if(this.stack.indexOf(node)==-1){
 			this.stack.push(node); //把根节点入栈
 		} 		
 	}
 };

/**
 * 后序遍历
 * @param  {object} node 节点
 */
BuildTree.prototype.lrdOrder = function(node){
 	for(var i = 0,len = node.children.length;i<len;i++){
 		this.lrdOrder(node.children[i]);
 	}
 	this.stack.push(node);
 };

/**
 * 渲染动画
 */
BuildTree.prototype.animation = function(){
 	var stack       = this.stack,
 	    speedSelect = document.querySelector('#speedSelect'),
 	    i           = 0,
 	    nodeThis    = this,
        regExp      = /[^\n]+/;
        search      = $('searchInformation','id'),
        found       = 0,
 	    timer       = 0;
 	this.stack = [];
 	if(!this.isBuilding){
 		this.isBuilding = true;
 		stack[i].style.backgroundColor = '#9da6bd';
 		timer = setInterval(function(){
 			if(i == stack.length-1){
 				stack[i].style.backgroundColor = '#fff';
 				nodeThis.isBuilding = false;
 				clearInterval(timer);
 				if(found == 0){
 					alert("纳尼！没有找到" + search.value + "!");
 				}
 			}else if(stack[i].textContent.match(regExp)[0] == search.value){
 				stack[i].style.backgroundColor = '#dc143c';
 				// nodeThis.isBuilding = false;
 				// clearInterval(timer);
 				found++;
 				++i;
 			}
 			else{
 				++i;
 				stack[i-1].style.backgroundColor = '#fff';
 				stack[i].style.backgroundColor = '#9da6bd';
 			}
 		},speedSelect.value);

 	}

 };

/**
 * 清除颜色
 */
BuildTree.prototype.resetChart  =function(){
	var stack = this.stack;
	stack.forEach(function(e){
		e.style.backgroundColor = '#fff';
	});
};

/**
 * 点击某个节点元素，则该节点元素背景色变绿
 * @param  {object} event  MouseEvent
 */
BuildTree.prototype.delegateEvent =  function (event) {
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if (target && target.tagName.toLowerCase() === "div") {
		target.style.backgroundColor = '#33CC00';
	}
};

/**
 * 判断有没有选择节点
 */
BuildTree.prototype.getSelected = function(){
	var selectedStack = this.selectedStack,
	            stack = this.stack;
    //根据颜色获取点击的节点
    stack.forEach(function(e){
    	if(e.style.backgroundColor == 'rgb(51, 204, 0)'){
    		selectedStack.push(e);
    	}
    });
    if(selectedStack.length ==0){
    	alert("啊喂，你还没有选择节点！");
    	return false;
    }
    return true;
};

/**
 * 点击删除按钮，将该节点及其所有子节点删除掉
 */
BuildTree.prototype.deleteTags = function(){
    var selectedStack = this.selectedStack;
    selectedStack.forEach(function(e){
    	// var childs = e.childNodes;
    	// //从索引最大值开始删除，采用递减的方法，这样索引便不会移动改变了.
    	// for(var i = childs.length - 1; i >= 0; i--) { 
    	// 	e.removeChild(childs[i]); 
    	// } 
    	e.parentNode.removeChild(e);
    });
};

/**
 * 判断是否还有节点存在
 * @return {bollean} 判断结果
 */
BuildTree.prototype.validNode = function(){
	//使用childNode判断是否还有节点存在
	// var wrapper= document.querySelector('.wrapper'),
	//     NodeList = wrapper.childNodes;//返回的是NodeList！，NodeList不是数组，没有数组方法！
	//     regExp = /[^\[object Text\],]+/,
	//     arr = Array.prototype.slice.call(NodeList)//将 NodeList 转换为 Array
	//     str = arr.join();
	     
	// if(!regExp.test(str)){
	// 	alert("没有节点啦！");
	// 	return true;
	// }
	// else{
	// 	return false;
	// }
	// 
	// 使用children
	var wrapper= document.querySelector('.wrapper'),
	    NodeList = wrapper.children;
	    if(NodeList.length == 0){
	    	alert("没有节点啦！");
		    return true;
	    }
	    else{
		return false;
	    }
	
};

/**
 * 在选择的该节点下增加一个子节点
 */
BuildTree.prototype.appendNode = function(){
	var value = $('nodeText').value.trim(),
	    selectedStack = this.selectedStack;
	    

	if(value == ""){
		alert("你还没有输入要插入的节点内容啊/(ㄒoㄒ)/~~");
		return;
	}

	selectedStack.forEach(function(e){
		
		createDiv = document.createElement('div');
		if(e.children.length == 0){
			createDiv.className = e.className;
		}
		else{
			var childClassName = e.children[0].className;
			createDiv.className = childClassName;
		}
		createDiv.innerHTML = value;
		e.appendChild(createDiv);
	});

	
};