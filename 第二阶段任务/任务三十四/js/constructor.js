define(function() {
	/**
	 * 小方块构造器
	 * @param {[type]} x [description]
	 * @param {[type]} y [description]
	 * @param {[type]} f [description]
	 */
	var Square = function(x,y,face) {
        
		
		if(typeof Square.instance === 'object'){
			Square.instance.reset();
			//square = null;
		}
		this.x = x;
		this.y = y;
		this.face = face;
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
    * 重置
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
    Square.prototype.setDirection = function (block, direction) {
 	    block.className = direction;
    };

    /**
     * 设置Div
     * @param {[type]} block [description]
     */
    Square.prototype.setDiv = function(block){
    	block.innerHTML="<div></div>";
    };

    /**
     * 移动小方块
     */
    Square.prototype.moveDiv = function(){
        var newBlock = this.getBlock(this.x, this.y);
        this.setDiv(newBlock);
        this.setDirection(newBlock, this.change[this.face]);
        this.reset();
        this.block = newBlock;
    };
    /**
     * 方块向前移动
     */
    Square.prototype.go = function(){
    	switch (this.block.className) {
        case "Top":
            if(this.x > 1){
                this.x--;
                this.moveDiv();
            }
            break;
        case "Left":
            if(this.y > 1){
                this.y--;
                this.moveDiv();
            }
            break;
        case "Bottom":
            if(this.x < 10){
                this.x++;
                this.moveDiv();
            }
            break;
        case "Right":
            if(this.y < 10){
                this.y++;
                this.moveDiv();
            }
            break;
    }
    };


    /**
    * 改变方向
    * @param para
    */
    Square.prototype.changeDirection = function (param) {
    	var result = this.face + param;
    	if (result == 4) {
    		this.face = 0;
    	} else if (result == -1) {
    		this.face = 3;
    	} else if (result == 5) {
    		this.face = 1;
    	} else if(result >= 10 && result <=13){
            this.face = 0;
        } else if(result >=-10 && result <=-7){
            this.face = 2;
        }
        else {
    		this.face = result;
    	}
    	this.block.className = this.change[this.face];
    };

    Square.prototype.moveNoChangeDirection = function(direction){

        switch(direction){
            case "lef":
            if(this.y > 1){
                this.y--;
                this.moveDiv();
            }
            break;
            case "top":
            if(this.x>1){
                this.x--;
                this.moveDiv();
            }
            break;
            case "rig":
            if(this.y<10){
                this.y++;
                this.moveDiv();
            }
            break;
            case "bot":
            if(this.x<10){
                this.x++;
                this.moveDiv();
            }
            break;
        }


    };
	return {
		Square:Square
	};
});