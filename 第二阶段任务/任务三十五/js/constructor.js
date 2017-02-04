define(function() {
    var LEN_WID = 36;// 移动距离；
    var BOLCK_NUM = 20;// 一行、一列的单元格数量；

	/**
	 * 小方块构造器
	 * @param {int} x x轴坐标
	 * @param {int} y y轴坐标
	 * @param {int} degree 初始角度
     * @param {string} direction 上：top；右：right；下：bottom；左：left
	 */
	var Square = function(bg,x,y,degree,direction) {
        if(typeof Square.instance === 'object'){
            return Square.instance;
        }
        var img  = document.createElement("img");
        img.src = "img/bot.png";
        img.style.left = y * LEN_WID + 'px';
        img.style.top = x * LEN_WID + 'px';
        bg[0].appendChild(img);
		this.x = x;
		this.y = y;
		this.div = img;
        this.direction = direction;
        this.degree = degree;
        
		Square.instance = this;
		 // 隐式返回this
	};

    /**
     * 小方块旋转
     * @return {object} 小方块旋转
     */
    Square.prototype.rotate = function(){
        return $(this.div).css("transform", "rotate(" + this.degree +"deg)");//翻转
    };


    /**
     * 方块向前移动
     */
    Square.prototype.go = function(){
    	switch (this.direction) {
        case "top":
        if(this.x>1){
            this.x--;
            this.div.style.top = this.x * LEN_WID + 'px';
        }
            break;
        case "right":
            if(this.y < BOLCK_NUM){
                this.y ++;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            break;
        case "bottom":
            if(this.x < BOLCK_NUM){
                this.x++;
                this.div.style.top = this.x * LEN_WID + 'px';
            }
            break;
        case "left":
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            break;
    }
    };


    /**
    * 改变方向
    * @param para
    * @command 指令
    */
    Square.prototype.changeDirection = function (command) {
        switch(command){
            case "tun lef":
            this.degree -=90;// 左转
            switch(this.direction){
                case "top":
                this.direction = "left";
                break;
                case "right":
                this.direction = "top";
                break;
                case "bottom":
                this.direction = "right";
                break;
                case "left":
                this.direction = "bottom";
                break;
            }
            this.rotate();
            break;
            case "tun rig":
            this.degree +=90;// 右转
            switch(this.direction){
                case "top":
                this.direction = "right";
                break;
                case "right":
                this.direction = "bottom";
                break;
                case "bottom":
                this.direction = "left";
                break;
                case "left":
                this.direction = "top";
                break;
            }
            this.rotate();
            break;
            case "tun bac":
            this.degree +=180;// 转身
            switch(this.direction){
                case "top":
                this.direction = "bottom";
                break;
                case "right":
                this.direction = "left";
                break;
                case "bottom":
                this.direction = "top";
                break;
                case "left":
                this.direction = "right";
                break;
            }
            this.rotate();
            break;
            case "mov top":{  // 方向转向屏幕上面，向屏幕的上面移动一格
                switch(this.direction){
                    case "top":
                    this.degree +=0;
                    break;
                    case "right":
                    this.degree -=90;
                    break;
                    case "bottom":
                    this.degree +=180;
                    break;
                    case "left":
                    this.degree +=90;
                    break;
                }
                this.direction = "top";
                this.rotate();
            }
            break;
            case "mov bot":{// 方向转向屏幕下面，向屏幕的下面移动一格
                switch(this.direction){
                    case "top":
                    this.degree +=180;
                    break;
                    case "right": 
                    this.degree +=90;
                    break;
                    case "bottom":
                    this.degree +=0;
                    break;
                    case "left":
                    this.degree -=90;
                    break;
                }
                this.direction = "bottom";
                this.rotate();
            }
            break;
            case "mov lef":{ // 方向转向屏幕左侧，并向屏幕的左侧移动一格
                switch (this.direction){
                    case "top":
                    this.degree -=90;
                    break;
                    case "right": 
                    this.degree +=180;
                    break;
                    case "bottom":
                    this.degree +=90;
                    break;
                    case "left":
                    this.degree -=0;
                    break;
                }
                this.direction = "left";
                this.rotate();

            }
            break;
            case "mov rig":{ // 方向转向屏幕右侧，并向屏幕的右侧移动一格
                switch (this.direction){
                    case "top":
                    this.degree +=90;
                    break;
                    case "right": 
                    this.degree -=0;
                    break;
                    case "bottom":
                    this.degree -=90;
                    break;
                    case "left":
                    this.degree +=180;
                    break;
                }
                this.direction ="right";
                this.rotate();
            }
            break;
            case "tra lef":
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            break;
            case "tra top":
            if(this.x>1){
                this.x--;
                this.div.style.top = this.x * LEN_WID +'px';
            }
            break;
            case "tra rig":
            if(this.y<BOLCK_NUM){
                this.y++;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            break;
            case "tra bot":
            if(this.x<BOLCK_NUM){
                this.x++;
                this.div.style.top = this.x * LEN_WID +'px';
            }
            break;
            }
    };
	return {
		Square:Square
	};
});