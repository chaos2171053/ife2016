define(function() {
	/**
	 * 小方块构造器
	 * @param {int} x x轴坐标
	 * @param {int} y y轴坐标
	 * @param {int} degree 初始角度
     * @param {int} direction 上：0；右：1；下：2；左：3
	 */
	var Square = function(bg,x,y,degree,direction) {
        if(typeof Square.instance === 'object'){
            return Square.instance;
        }
        var div = document.createElement("div");
        div.className = "actionDiv";
        div.style.position = "absolute";
        div.style.left = y * 51 + 'px';
        div.style.top = x * 51 + 'px';
        bg[0].appendChild(div);
		this.x = x;
		this.y = y;
		this.div = div;
        this.direction = direction;
        this.degree = degree;
        
		Square.instance = this;
		 // 隐式返回this
	};

	/**
	 * 获取小方块所在单元格
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	// Square.prototype.getBlock = function(x,y) {
	// 	return bg[0].rows[x].cells[y];
	// };

	/**
	 * 小方块的方向译码器，上、右、下、左对应0、1、2、3
	 */
	Square.prototype.change = ["Top", "Right", "Bottom", "Left"];

	// /**
 //    * 重置
 //    */
 //    Square.prototype.reset = function () {
 //    	this.block.className = "";
 //    	this.block.innerHTML = "";
 //    };

    // /**
    // * 设置方向
    // * @param block
    // * @param D
    // */
    // Square.prototype.setDirection = function (block, direction) {
 	  //   block.className = direction;
    // };

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
    // Square.prototype.moveDiv = function(){
    //     var newBlock = this.getBlock(this.x, this.y);
    //     this.setDiv(newBlock);
    //     this.setDirection(newBlock, this.change[this.face]);
    //     this.reset();
    //     this.block = newBlock;
    // };
    /**
     * 方块向前移动
     */
    Square.prototype.go = function(){
    	switch (this.direction) {
        case 0:
        if(this.x>1){
            this.x--;
            this.div.style.top = this.x * 51 + 'px';
        }
            break;
        case 1:
            if(this.y < 11){
                this.y ++;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
        case 2:
            if(this.x < 11){
                this.x++;
                this.div.style.top = this.x * 51 + 'px';
            }
            break;
        case 3:
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
    }
    };


    /**
    * 改变方向
    * @param para
    * @command 指令
    */
    Square.prototype.changeDirection = function (param,command) {
    	var result = this.direction + param;
    	if (result == 4) {
    		this.direction = 0;
    	} else if (result == -1) {
    		this.direction = 3;
    	} else if (result == 5) {
    		this.direction = 1;
    	} else if(result >= 10 && result <=13){
            this.direction = 0;
        } else if(result >=-10 && result <=-7){
            this.direction = 2;
        }
        else {
    		this.direction= result;
    	}
        switch(command){
            case "tun lef":
            this.degree -=90;//左转
            break;
            case "tun rig":
            this.degree +=90;//右转
            break;
            case "tun bac":
            this.degree +=180;//转身
            break;
            }
        $(this.div).css("transform", "rotate(" + this.degree +"deg)");
    };

    Square.prototype.moveNoChangeDirection = function(direction){

        switch(direction){
            case "lef":
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
            case "top":
            if(this.x>1){
                this.x--;
                this.div.style.top = this.x * 51 +'px';
            }
            break;
            case "rig":
            if(this.y<10){
                this.y++;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
            case "bot":
            if(this.x<10){
                this.x++;
                this.div.style.top = this.x * 51 +'px';
            }
            break;
        }


    };
	return {
		Square:Square
	};
});