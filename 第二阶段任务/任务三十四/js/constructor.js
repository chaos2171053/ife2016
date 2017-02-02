define(function() {
	/**
	 * 小方块构造器
	 * @param {int} x x轴坐标
	 * @param {int} y y轴坐标
	 * @param {int} degree 初始角度
     * @param {int} direction 上：top；右：right；下：bottom；左：left
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
     * 方块向前移动
     */
    Square.prototype.go = function(){
    	switch (this.direction) {
        case "top":
        if(this.x>1){
            this.x--;
            this.div.style.top = this.x * 51 + 'px';
        }
            break;
        case "right":
            if(this.y < 10){
                this.y ++;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
        case "bottom":
            if(this.x < 10){
                this.x++;
                this.div.style.top = this.x * 51 + 'px';
            }
            break;
        case "left":
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
        switch(command){
            case "tun lef":
            this.degree -=90;// 左转
            break;
            case "tun rig":
            this.degree +=90;// 右转
            break;
            case "tun bac":
            this.degree +=180;// 转身
            break;
            case "mov top":{  // 方向转向屏幕上面，向屏幕的上面移动一格
                switch(this.direction){
                    case "top":
                    this.direction = "top";
                    this.degree +=0;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "right":
                    this.direction = "top";
                    this.degree -=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "bottom":
                    this.direction = "top";
                    this.degree +=180;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "left":
                    this.direction = "top";
                    this.degree +=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                }
            }
            break;
            case "mov bot":{// 方向转向屏幕下面，向屏幕的下面移动一格
                switch(this.direction){
                    case "top":
                    this.direction = "bottom";
                    this.degree +=180;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "right": 
                    this.direction = "bottom";
                    this.degree +=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "bottom":
                    this.direction = "bottom";
                    this.degree +=0;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "left":
                    this.direction = "bottom";
                    this.degree -=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                }
            }
            break;
            case "mov lef":{ // 方向转向屏幕左侧，并向屏幕的左侧移动一格
                switch (this.direction){
                    case "top":
                    this.direction = "left";
                    this.degree -=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "right": 
                    this.direction = "left";
                    this.degree +=180;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "bottom":
                    this.direction = "left";
                    this.degree +=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "left":
                    this.direction = "left";
                    this.degree -=0;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                }

            }
            break;
            case "mov rig":{ // 方向转向屏幕右侧，并向屏幕的右侧移动一格
                switch (this.direction){
                    case "top":
                    this.direction ="right";
                    this.degree +=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "right": 
                    this.direction ="right";
                    this.degree -=0;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "bottom":
                    this.direction ="right";
                    this.degree -=90;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                    case "left":
                    this.direction ="right";
                    this.degree -=180;
                    $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
                    return;
                }

            }
            break;
            }

    	// if (result == 4) {
    	// 	this.direction = 0;
    	// } 
     //    else if (result == -1) {
    	// 	this.direction = 3;
    	// } 
     //    else if (result == 5) {
    	// 	this.direction = 1;
    	// } 
     //    else if(result >= 10 && result <=13){
     //        this.direction = 0;
     //    } 
     //    else if(result >=-10 && result <=-7){
     //        this.direction = 2;
     //    }
     //    else {
    	// 	this.direction= result;
    	// }

        switch(result){
            case -1:
            this.direction = 3;
            break;
            case 4:
            this.direction = 0;
            break;
            case 5:
            this.direction = 1;
            break;
            case result >= 10 && result <=13:
            this.direction = 0;
            break;
            case result >=-10 && result <=-7:
            this.direction = 2;
            break;
            default:
            this.direction= result;
            break;



        }

        $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
    };

    /**
     * 不改变方向移动小方块
     * @param  {string} direction 方向
     */
    Square.prototype.moveNoChangeDirection = function(direction){

        switch(direction){
            case "tra lef":
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
            case "tra top":
            if(this.x>1){
                this.x--;
                this.div.style.top = this.x * 51 +'px';
            }
            break;
            case "tra rig":
            if(this.y<10){
                this.y++;
                this.div.style.left = this.y * 51 +'px';
            }
            break;
            case "tra bot":
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