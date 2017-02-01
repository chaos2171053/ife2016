define(function() {
	/**
	 * 小方块构造器
	 * @param {[type]} x [description]
	 * @param {[type]} y [description]
	 * @param {[type]} f [description]
	 */
	var Square = function(x,y,f) {
		
		if(typeof Square.instance === 'object'){
			Square.instance.reset();
			//square = null;
		}
		this.x = x;
		this.y = y;
		this.f = f;
		this.block = this.getBlock(this.x, this.y);
		 // 缓存
		Square.instance = this;
		 // 隐式返回this
	};

	/**
	 * 获取小方块所在单元格
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	Square.prototype.getBlock = function(x,y) {
		return bg[0].rows[x].cells[y];
	};

	/**
	 * 小方块的方向译码器，上、右、下、左对应0、1、2、3
	 */
	Square.prototype.change = ["Top", "Right", "Bottom", "Left"];

	/**
    * 重置功能
    */
    Square.prototype.reset = function () {
    	this.block.className = "";
    	this.block.innerHTML = "";
    };

    /**
    * 设置方向
    * @param block
    * @param D
    */
    Square.prototype.setDirection = function (block, D) {
 	    block.className = D;
    };

    /**
     * 设置Div
     * @param {[type]} block [description]
     */
    Square.prototype.setDiv = function(block){
    	block.innerHTML="<div></div>";
    };



    Square.prototype.go = function(){
    	switch (this.block.className) {
        case "Top":
            if(this.x > 1){
                this.x--;
                var newBlock = this.getBlock(this.x, this.y);
                this.setDiv(newBlock);
                this.setDirection(newBlock, this.change[this.f]);
                this.reset();
                this.block = newBlock;
            }
            break;
        case "Left":
            if(this.y > 1){
                this.y--;
                var newBlock = this.getBlock(this.x, this.y);
                this.setDiv(newBlock);
                this.setDirection(newBlock, this.change[this.f]);
                this.reset();
                this.block = newBlock;
            }
            break;
        case "Bottom":
            if(this.x < 10){
                this.x++;
                var newBlock = this.getBlock(this.x, this.y);
                this.setDiv(newBlock);
                this.setDirection(newBlock, this.change[this.f]);
                this.reset();
                this.block = newBlock;
            }
            break;
        case "Right":
            if(this.y < 10){
                this.y++;
                var newBlock = this.getBlock(this.x, this.y);
                this.setDiv(newBlock);
                this.setDirection(newBlock, this.change[this.f]);
                this.reset();
                this.block = newBlock;
            }
            break;
    }
    };


    /**
    * 改变方向
    * @param para
    */
    Square.prototype.changeDirection = function (param) {
    	var result = this.f + param;
    	if (result == 4) {
    		this.f = 0;
    	} else if (result == -1) {
    		this.f = 3;
    	} else if (result == 5) {
    		this.f = 1;
    	} else {
    		this.f = result;
    	}
    	this.block.className = this.change[this.f];
    };
	return {
		Square:Square
	};
});