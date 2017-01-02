
(function(){
	var tree = new buildTree(),
	    dlr = $('dlr','id'),
	    ldr = $('ldr','id'),
	    lrd = $('lrd','id');
	    rootNode = document.querySelector('.root');

	addEventHandler(dlr,'click',function(){
		tree.dlrOrder(rootNode);
		tree.animation();
	});
	addEventHandler(ldr,'click',function(){
		tree.ldrOrder(rootNode);
		tree.animation();
	});
	addEventHandler(lrd,'click',function(){
		tree.lrdOrder(rootNode);
		tree.animation();
	});
}());

function buildTree(){
	this.stack = [];
	this.isBuilding = false;
}

/**
 * 前序遍历
 * @param  {object} node 节点
 */
 buildTree.prototype.dlrOrder = function(node) {
	this.stack.push(node);
	for(var i= 0,len = node.children.length;i<len;i++){
		this.dlrOrder(node.children[i]);
	}
};


/**
 * 中序遍历
 * @param  {object} node 节点
 */
 buildTree.prototype.ldrOrder = function(node){
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
 buildTree.prototype.lrdOrder = function(node){
 	for(var i = 0,len = node.children.length;i<len;i++){
 		this.lrdOrder(node.children[i]);
 	}
 	this.stack.push(node);
 };

/**
 * 渲染动画
 *
 */
 buildTree.prototype.animation = function(){
 	var stack       = this.stack,
 	speedSelect = document.querySelector('#speedSelect'),
 	i           = 0,
 	nodeThis = this,
 	timer = 0;
 	this.stack = [];
 	if(!this.isBuilding){
 		this.isBuilding = true;


 		stack[i].style.backgroundColor = '#9da6bd';
 		timer = setInterval(function(){
 			if(i == stack.length-1){
 				stack[i].style.backgroundColor = '#fff';
 				nodeThis.isBuilding = false;
 				clearInterval(timer);
 			}
 			else{
 				++i;
 				stack[i-1].style.backgroundColor = '#fff';
 				stack[i].style.backgroundColor = '#9da6bd';


 			}
 		},speedSelect.value);

 	}
 };
