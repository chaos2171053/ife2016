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
        var instance;
        if(typeof instance === 'object'){
            return instance;
        }
        instance = this;
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
        this.isRunning = false;
        this.isRunSucceed = false;
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
     * @returns {Bollean} 判断前方是否可走
     * @returns {Bollean} 小方块指令是否运行成功
     */
    Square.prototype.go = function(step){

    	switch (this.direction) {
            case "top":
            if(this.x>1){
                this.x--;
                this.div.style.top = this.x * LEN_WID + 'px';
            }
            else{
                this.isRunSucceed = false;
                return false;
            }
            break;
            case "right":
            if(this.y < BOLCK_NUM){
                this.y ++;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            else{
                this.isRunSucceed = false;
                return false;
            }
            break;
            case "bottom":
            if(this.x < BOLCK_NUM){
                this.x++;
                this.div.style.top = this.x * LEN_WID + 'px';
            }
            else{
                this.isRunSucceed = false;
                return false;
            }
            break;
            case "left":
            if(this.y > 1){
                this.y--;
                this.div.style.left = this.y * LEN_WID +'px';
            }
            else{
                this.isRunSucceed = false;
                return false;
            }
            break;
    }
    this.isRunSucceed = true;
    return true;
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

    /**
     * 指令
     * @type {Array}
     * @return {Bollen} 如果执行完全部指令则true，反之false。
     */
    Square.prototype.commands = [
    {
        pattern: /^go(\s+)?(\d+)?$/i,
        step:/\d+/,
        handler: function (step) {
            if(step !== undefined){
                for(var i = 0;i<step;i++) {
                    if(this.go() === false) {
                        this.isRunSucceed = false;
                        return false;
                    }
                }
                return true;
            }
            else {
                if(this.go() ===false){
                    this.isRunSucceed = false;
                    return false;
                }
            }
            // this.isRunSucceed = true;
            // return true;
            
        }
    },
    ];

     /**
     * 执行指令
     * @param {String} command 指令
     * @return {[type]} [description]
     */
    Square.prototype.execute = function(string) {
        if(!this.isRunning){
            this.isRunning = true;
            for(var i = 0,len = this.commands.length;i<len;i++) {
                var command = this.commands[i];
                var match = string.match(command.pattern);
                var step = match[0].match(command.step);// 移动格子数
                if(match){
                    command.handler.apply(this,step);
                    match.shift();
                    this.isRunning = false;
            }
            }

        }
    };
	return {
		Square:Square
	}; 
});