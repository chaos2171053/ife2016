// var classNnameArray = ['root', 'child_1', 'child_1', 'child_2', 'child_2', 'child_2', 'child_2', 'child_3', 
//  'child_3', 'child_3', 'child_3', 'child_3', 'child_3', 'child_3', 'child_3'];
//     dlr = $('dlr','id');
//     ldr = $('ldr','id');
//     lrd = $('lrd','id');
//     body = $('body','tagName')[0];

// //绑定事件
// // addEventHandler(dlr,'click',DLR);

// /**
//  * 创建div节点
//  * @return {[type]} [description]
//  */
// function div(){
// 	this.classNname  = "";
// 	this.leftChild = "";
// 	this.rightChild = "";
// }


// function createElement(node){
// 	var divNode = document.createElement('div');
// 	divNode.setAttribute('class',node.classNname); 
// 	return divNode;
// }

// /**
//  * 创建dom节点树
//  * @return {[type]} [description]
//  */
// function buildDomTree(node, i){
//     var leftIndex = 2*i+1,
//         rightIndex = 2*i+2,
//         len = classNnameArray.length;
//     if (rightIndex <len) {
//     	var childNode = new div();
//         childNode.classNname  = classNnameArray[rightIndex];
//         node.rightChild = childNode;
//         $(node.classNname,'tagName')[1].appendChild(createElement(childNode));
//         buildDomTree(childNode,rightIndex);
//         }
//     if (leftIndex <len) {
//     	var childNode = new div();
//         childNode.classNname  = classNnameArray[rightIndex];
//         node.rightChild = childNode;
//         $(node.classNname,'tagName')[0].appendChild(createElement(childNode));
//         buildDomTree(childNode,rightIndex);
//      }
// }

// var node = new div();
// node.classNname = classNnameArray[0];
// body.appendChild(createElement(node));
// //buildDomTree(node, 0);   //索引i是从0开始构建
// buildDomTree(node.leftChild,1);

(function(){
	var tree = new buildTree();
	dlr = $('dlr','id');
    ldr = $('ldr','id');
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
}

/**
 * 前序遍历
 * @param  {object} node 节点
 */
buildTree.prototype.dlrOrder = function(node) {
	// body...
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

buildTree.prototype.animation = function(){
	var stack       = this.stack,
	    speedSelect = document.querySelector('#speedSelect'),
	    i           = 0,
	    timer;

	    this.stack = [];
	    stack[i].style.backgroundColor = '#9da6bd';
	    timer = setInterval(function(){
	    	if(i == stack.length-1){
	    		stack[i].style.backgroundColor = '#fff';
	    			// this.isBuilding = false;
	    			clearInterval(timer);
	    		}
	    		else{
	    			++i;
	    			stack[i-1].style.backgroundColor = '#fff';
	    			stack[i].style.backgroundColor = '#9da6bd';
	    		}

	    	},speedSelect.value);


};
