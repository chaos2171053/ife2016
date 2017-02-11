
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
	if(node.firstElementChild){
		this.dlrOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.dlrOrder(node.lastElementChild);
	}
	
};


/**
 * 中序遍历
 * @param  {object} node 节点
 */
 buildTree.prototype.ldrOrder = function(node){
 	if (node.firstElementChild) {
 		this.ldrOrder(node.firstElementChild);
 	}
 	this.stack.push(node);
 	if(node.lastElementChild){
 		this.ldrOrder(node.lastElementChild);
 	}

 };

/**
 * 后序遍历
 * @param  {object} node 节点
 */
 buildTree.prototype.lrdOrder = function(node){
 	if(node.firstElementChild){
 		this.lrdOrder(node.firstElementChild);
 	}
 	if (node.lastElementChild) {
 		this.lrdOrder(node.lastElementChild);
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

 	console.log("1"+this);
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
