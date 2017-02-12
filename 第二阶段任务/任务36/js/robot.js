define(function() {
    var DISTANCE = 36;// 移动距离；
    var BOLCK_NUM = 20;// 一行、一列的单元格数量；
  

	/**
	 * 小方块构造器
	 * @param {int} x x轴坐标
	 * @param {int} y y轴坐标
	 * @param {int} degree 角度
     * @param {string} direction 方向
	 */
	var Square = function(bg,x,y,degree,direction) {
        var instance;
        if(typeof instance === 'object'){
            return instance;
        }
        instance = this;
        var img  = document.createElement("img");
        img.src = "img/bot.png";
        img.style.left = x * DISTANCE + 'px';
        img.style.top = y * DISTANCE + 'px';
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
     * 初始化小方块的位置
     */
    Square.prototype.init = function() {
        var x = Math.floor(Math.random() * 10 + 1); // 小方块x轴坐标
        var y = Math.floor(Math.random() * 10 + 1); // 小方块y轴坐标
        this.x = x;
        this.y = y;
        this.div.style.left = x * DISTANCE + 'px';
        this.div.style.top = y * DISTANCE + 'px';
        this.isRunning = false;
        this.isRunSucceed = false;
        this.degree = 0;
        this.direction = "bottom";
        this.rotate();
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
        if(this.canGo(this.direction)){
            switch (this.direction) {
                case "top":
                    this.y--;
                break;
                case "right":
                    this.x ++;
                break;
                case "bottom":
                    this.y++;
                break;
                case "left":
                    this.x--;
                break;
            }
            this.div.style.top = this.y * DISTANCE + 'px';
            this.div.style.left = this.x * DISTANCE +'px';
            this.isRunSucceed = true;
            return true;
        }else{
          this.isRunSucceed = false;
          return false;
        }
    };


    /**
    * 改变方向
    * @param para
    * @command 指令
    */
    Square.prototype.changeDirection = function (command) {
        switch(command){
            case "tun lef":{
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
            }
            break;
            case "tun rig":{
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
            }
            break;
            case "tun bac":{
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
            }
            break;
            case "mov top":{  // 方向转向屏幕上面
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
            case "mov bot":{// 方向转向屏幕下面
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
            case "mov lef":{ // 方向转向屏幕左侧
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
            case "mov rig":{ // 方向转向屏幕右侧
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
            case "tra lef":{
                if(this.canGo("left")){
                    this.x--;
                    this.div.style.left = this.x * DISTANCE +'px';
                }
                else{
                    this.isRunSucceed = false;
                    return false;
                }
            }
            break;
            case "tra top":{
                if(this.canGo("top")){
                    this.y--;
                    this.div.style.top = this.y * DISTANCE +'px';
                }
                else{
                    this.isRunSucceed = false;
                    return false;
                }
            }
            break;
            case "tra rig":{
                if(this.canGo("right")){
                    this.x++;
                    this.div.style.left = this.x * DISTANCE +'px';
                }
                else{
                    this.isRunSucceed = false;
                    return false;
                }

            }
            break;
            case "tra bot":{
                if(this.canGo("bottom")){
                    this.y++;
                    this.div.style.top = this.y * DISTANCE +'px';
                }
                else{
                    this.isRunSucceed = false;
                    return false;
                }
            }
            break;
            }
            this.isRunSucceed = true;
            return true;
    };

    /**
     * 指令
     * @type {Array}
     * @return {Bollen} 如果执行完全部指令则true，反之false。
     */
    Square.prototype.commands = [
    {
        pattern: /^go(\s+)?(\d+)*$/i,
        step:/\d+/,
        handler: function () {
            var step =arguments[1];
            if(step !== null){
                for(var i = 0;i<step;i++) {
                    if(this.go() === false) {
                        return false;
                    }
                }
                return true;
            }
            else {
                if(this.go() ===false){
                    return false;
                }
            }           
        }
    },
    {
        pattern:/^tra\s+(lef|top|rig|bot)/i,
        step:/\d+/,
        handler:function(){
            var step = arguments[1];
            if(step !== null){
                for(var i = 0;i<step;i++) {
                    if(this.changeDirection(arguments[0]) === false) {
                        return false;
                    }
                }
                return true;
            }
            else {
                if(this.changeDirection(arguments[0]) ===false){
                    return false;
                }
            }        
        }
    },
    {
        pattern:/^mov\s+(lef|top|rig|bot)/i,
        step:/\d+/,
        handler:function(){
            var step = arguments[1] ||1 ;
            this.changeDirection(arguments[0]);
            if(step !== null){
                for(var i = 0;i<step;i++) {
                    if(this.go() === false) {
                        return false;
                    }
                }
                return true;
            }
            else {
                if(this.go() ===false){
                    return false;
                }
            }        
        }
    },
    {
        pattern:/^tun\s+(lef|rig|bac)\s*\d*$/i,
        handler:function(){
            this.changeDirection(arguments[0]);
            return true;
        }
    },
    {
        pattern:/^change\s+(lef|top|rig|bot)/i,
        handler:function(){
            this.changeDirection("mov " +arguments[0].match(/lef|top|rig|bot/i)); 
            return true;
        }
    },
    {
        pattern:/^build$/i,
        handler:function(){
            if(this.canGo(this.direction)){
                this.build();
                return true;
            }else{
                return false;
            }
        }
    },
    {
        pattern:/^bru\s+#[0-9a-fA-F]{6}$/i,
        color:/#[0-9a-fA-F]{6}$/i,
        handler:function(){
            if(!(this.canGo(this.direction))){
                this.bru(arguments[1]);
            }
            return true;
        }
    },
    ];

     /**
     * 执行指令
     * @param {String} command 指令
     * @return {bollean} 执行则返回true 
     */
    Square.prototype.execute = function(string) {
        if(!this.isRunning){
            this.isRunning = true;
            for(var i = 0,len = this.commands.length;i<len;i++) {
                var command = this.commands[i];
                var match = string.match(command.pattern);
                var argument;
                if(match){
                    if(command.step){
                        argument= string.match(command.step);// 移动格子 
                    }
                    if(command.color){
                        argument = string.match(command.color)[0].toLowerCase();// 16进制颜色 
                    }
                    command.handler.call(this,match[0].replace(/\s+/g," "),argument);
                    // var step = string.match(command.step);// 移动格子 
                    // command.handler.call(this,match[0].replace(/\s+/g," "),step);
                    match.shift();
                    this.isRunning = false;
                    if(this.isRunSucceed){
                        return true;
                    }else{
                        return false;
                    }
                }
            }

        }
    };

    /**
     * 获取选择的方向的第一个小方块坐标
     * @param  {string} direction 选择的方向
     * @return {object}           x、y坐标
     */
    Square.prototype.getPosition = function(direction){
        var x;
        var y;
        switch(direction){
            case "top":{
                x = this.x;
                y = this.y-1;
            }
            break;
            case "right":{
                x = this.x+1;
                y = this.y;
            }
            break;
            case "bottom":{
                x = this.x;
                y = this.y+1;
            }
            break;
            case "left":{
                x = this.x-1;
                y = this.y;
            }
            break;
        }
        return {x:x,y:y};
    };

    /**
     * 判断前方一格是否有墙
     * @param {string} direction 要前进的方向
     * @return {bollean} 可走true，不可以false。
     */
    Square.prototype.canGo =function(direction){
        var targetClaaName;
        var x = this.getPosition(direction).x;
        var y = this.getPosition(direction).y;
        if( x>=1 && x<= BOLCK_NUM && y<= BOLCK_NUM && y>=1){
            targetClassName = $("tr:nth-child("+ (y+1) +") td:nth-child("+ (x+1) +")")[0].className;
            if (targetClassName == "x-axis" || targetClassName == "wall" || targetClassName =="y-axis"){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    };

    /**
     * 在小方块前方修墙
     */
    Square.prototype.build = function(){
        var x = this.getPosition(this.direction).x;
        var y = this.getPosition(this.direction).y;
        var $target = $("tr:nth-child("+ (y+1) +") td:nth-child("+ (x+1) +")");
        $target.addClass("wall");
        this.isRunSucceed = true;
    };

    /**
     * 粉刷墙
     * @param  {sring} color 颜色（16进制）
     */
    Square.prototype.bru = function(color){
        var targetClaaName;
        var x = this.getPosition(this.direction).x;
        var y = this.getPosition(this.direction).y;
        var $target = $("tr:nth-child("+ (y+1) +") td:nth-child("+ (x+1) +")");
        targetClassName = $("tr:nth-child("+ (y+1) +") td:nth-child("+ (x+1) +")")[0].className;
        if(targetClassName == "wall"){
            $target.css("background-color",color);
        }
        this.isRunSucceed = true;

    }


	return {
		Square:Square
	}; 
});