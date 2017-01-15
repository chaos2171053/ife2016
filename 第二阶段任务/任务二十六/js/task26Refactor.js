var SCREEN_WIDTH = 800; //屏幕宽度
var SCREEN_HEIGHT = 800; //屏幕高度
var SCREEN_CENTER_X = SCREEN_WIDTH / 2; //屏幕X轴中心坐标
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2; //屏幕Y轴中心坐标
var PLANET_RADIUS = 50; //行星半径

var FAILURE_RATE = 0.3;//命令发送失败几率
var POWERBAR_POS_OFFSET = 5; //电量条位置位移
var POWERBAR_COLOR_GOOD = "#70ed3f"; //电量良好状态颜色
var POWERBAR_COLOR_MEDIUM = "#fccd1f"; //电量一般状态颜色
var POWERBAR_COLOR_BAD = "#fb0000"; //电量差状态颜色
var POWERBAR_WIDTH = 5; //电量条宽度

var SPACESHIP_SPEED = 2; //飞船飞行速度
var SPACESHIP_SIZE = 40; //飞船大小
var SPACESHIP_COUNT = 4; //飞船数量
var DEFAULT_CHARGE_RATE = 0.3; //飞船充电速度
var DEFAULT_DISCHARGE_RATE = 0.2; //飞船放电速度


//根据浏览器类型设置相应的requestAnimationFrame
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

/**
 * 控制台信息输出
 * @param  {stirng}  控制命令
 * @return {function}       输出信息
 */
 var ConsoleUtil = (function(){
 	var $consoleLog = $(".console ul");
 	var show = function(msg){
 		var $msg = $("<li></li>");
 		$msg.text(msg);
 		$consoleLog.prepend($msg);
 	};
 	return {
 		show:show
 	};
 })();



/**
 * 飞船
 */
var Spaceships = function(id){
	this.id = id;
    this.power = 100; //飞船初始电量
    this.currState = "stop"; //飞船初始状态
    this.mediator = null; //飞船注册的mediator
    this.orbit = 100 + 85 * id - SPACESHIP_SIZE / 2; //飞船所在轨道的半径
    this.deg = 0; //飞船初始位置的角度
    this.timer = null;
};
Spaceships.prototype.powerManager = function(){
    var that = this;

    /**
     * 飞船充电
     * @return {object} 飞船充电放电
     */
    var charge = function() {
            var chargeRate = DEFAULT_CHARGE_RATE;
            var timer = setInterval(function() {
                //若飞船在飞行或者被销毁则不再充电
                if (that.currState == "fly" || that.currState == "destroy") {
                    clearInterval(timer);
                    return false;
                }
                if (that.power >= 100) { //如果飞船满电则不再充电
                    clearInterval(timer);
                    that.power = 100;
                    return false;
                }
                that.power += chargeRate;
                return true;
            }, 20);
    
        };
    /**
     * 飞船放电
     * @return {[type]} [description]
     */
     var discharge = function() {
        var dischargeRate = DEFAULT_DISCHARGE_RATE;
        var timer = setInterval(function() {
                //若飞船停止或者被销毁则不再放电
                if (that.currState == "stop" || that.currState == "destroy") {
                    clearInterval(timer);
                    return false;
                }
                if (that.power <= 0) {
                    clearInterval(timer);
                    that.power = 0;
                    that.stateManager().changeState("stop");
                    return false;
                }
                that.power -= dischargeRate; //电量下降
            }, 20);

    };

    return {
            charge: charge,
            discharge: discharge
    };

};
/**
 * 飞船动力系统，用于控制飞船的飞行与停止
 * @return {[type]} [description]
 */
Spaceships.prototype.dynamicManager = function(){
    var that = this;
    //飞行
    var fly = function() {
        that.timer = setInterval(function() {
            that.deg += SPACESHIP_SPEED;
                if (that.deg >= 360) {that.deg = 0;} //飞完一圈时，重置角度
            }, 20);
    };

    //停止
    var stop =function() {
        clearInterval(that.timer);
    }


    return {
        fly:fly,
        stop:stop
    };

};

/**
 * 飞船状态系统，用于控制飞船的飞行、停止、销毁
 * @return {obj} 改变状态
 */
Spaceships.prototype.stateManager = function(){
    var that = this;

    var states = {
            fly: function(state) {
                that.currState = "fly";
                that.dynamicManager().fly();
                that.powerManager().discharge();
            },
            stop: function(state) {
                that.currState = "stop";
                that.dynamicManager().stop();
                that.powerManager().charge();
            },
            destroy: function(state) {
                that.currState = "destroy";
                that.mediator.remove(that);
            }
        };

     /**
      * 飞船改变飞行状态
      * @param  {string} cmd 指令
      * @return {}     
      */
	var changeState = function(cmd) {
            //根据状态执行指令
            states[cmd] && states[cmd]();
            switch(cmd){
                case "fly":  
                state = "飞行";
                break;
                case "stop":  
                state = "停止";
                break;
                case "destroy":  
                state = "销毁";
                break;
                case "launch":
                state = "发射";
                break;
            }
            
            var id = that.id +1;
            ConsoleUtil.show("阿波罗" + id + "号现在" + state);

            };
            
        return {
            changeState: changeState
        };
};

/**
 * 飞船信号处理模块，只接受信号
 * @return {object} 接收功能
 */
Spaceships.prototype.signalManager = function(){
	var that = this;
        return {
            receive: function(msg) {
                if (that.currState != msg.cmd && that.id == msg.id) {
                    that.stateManager().changeState(msg.cmd);
                }
            }
        };
};

/**
 * 挥官通过信号发射器发出的命令是通过一种叫做Mediator的介质进行广播
 */
var Mediator = function() {
	var spaceships = []; //飞船队列
	var commander = null;
    
    // 判断是否存在Mediator实例
	if(typeof Mediator.instance === 'object'){
		return Mediatorr.instance;
	}
	/**
	 * 注册。指挥官通过信号发射器发出的命令是通过一种叫做Mediator的介质进行广播。
	 * 飞船通过Mediator接受命令。
	 * @param  {object} obj 指挥官/飞船实例
	 * @return {function}     medior的注册、发送
	 */
	function register(obj){
		//如果是指挥官实例，绑定mediator
		if(obj instanceof Commander ){
			commander = obj;
			obj.mediator = this;
			ConsoleUtil.show("Mediator：指挥官" + obj.name + "已上线");
            return true;
		}
		//如果是飞船实例
		if(obj instanceof Spaceships){
			spaceships[obj.id] = obj;
			obj.mediator = this;
			//ConsoleUtil.show("Mediator 注册 " + "阿波罗 " + obj.id +"成功");
			return true;
		}
		ConsoleUtil.show("Mediator 发生不知名问题，GG思密达");
         return false;
	}

	/**
	 * 从行星发射到宇宙中,Mediator是单向传播,在发射过程中，有30%的信息传送失败概率,
	 * 每次信息正常传送的时间需要1秒。
	 * 每个飞船通过信号接收器，接受到通过Mediator传达过来的指挥官的广播信号。  
	 */
	
	function send(msg) {
		var that = this;
		setTimeout(function() {
			//随机数大于发送失败率则执行消息发送
			var success = Math.random() > FAILURE_RATE ? true : false;
			if(success) {
				if(msg.cmd == "launch"){
					that.create(msg);
				}
				for (var key in spaceships) {
                    if (spaceships[key]) { //所有飞船迭代接收消息
                        spaceships[key].signalManager().receive(msg);
                    }
                }
			}
			else{
				ConsoleUtil.show("指令发送失败，它在太空中迷路了/(ㄒoㄒ)/~~");
                return;
			}

		},1000);//1s后执行

	}


    /**
     * 创建飞船
     * @param  {obj} msg 指令
     */
	function create(msg){
		if (spaceships[msg.id] !== undefined) {
			ConsoleUtil.show("轨道上已有飞船");
			return false;
		}
		var spaceship = new Spaceships(msg.id);
        this.register(spaceship);
        return true;
	}

    /**
     * 返回飞船队列
     */
    function getSpaceships(){
    	return spaceships;
    }
    

    function remove(obj){
        if (obj instanceof Spaceships) {
            var id = obj.id+1;
            ConsoleUtil.show("销毁阿波罗" + id+"号/(ㄒoㄒ)/~~");
            spaceships.splice(obj.id,1);
            return true;
        }
        ConsoleUtil.show("销毁阿波罗" + id+"号失败/(ㄒoㄒ)/~~");
        return false;
    }


    //缓存
	Mediator.instance = this;
	return {
        remove:remove,
		register:register,
		send:send,
		create:create,
		getSpaceships:getSpaceships
	};
};


/*/**
 * 指挥官
 */
var Commander = function(){
	// 判断是否存在指挥官实例
	if(typeof Commander.instance === 'object'){
		return Commander.instance;
	}

 	this.name = "Chaos";
 	this.mediator = null;

     // 缓存
 	Commander.instance = this;

 	// 隐式返回this
};

/**
 * 指挥官只能发送命令，且为单播模式
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
Commander.prototype.send = function(msg) {
    this.mediator.send(msg);
         
};

/**
 * 指挥官发出的命令
 * @param  {int} targetId      飞船id
 * @param  {sring} targetCommand 命令
 */
var Message = function(targetId,targetCommand) {
	this.id = targetId;
	this.cmd = targetCommand;
};



/**
 * 动画
 */
var AminateUtil = function(){
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var mediator = null;
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;

	

	//画行星
	var drawPlanet = function(){
		//ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);//clear canvas
		var x = SCREEN_CENTER_X - PLANET_RADIUS;
		var y = SCREEN_CENTER_Y - PLANET_RADIUS;
		var planet = new Image();
		planet.src = "img/min-iconfont-planet.png";
		// planet.onload = function() {
		// 	ctx.drawImage(planet, x, y, PLANET_RADIUS * 2, PLANET_RADIUS * 2);
		// };
        
        //利用image对象的complete属性让图片完全加载完才在canvas上绘制
        if (planet.complete) {
        ctx.drawImage(planet, x, y, PLANET_RADIUS * 2, PLANET_RADIUS * 2);
        } 
        else {
        planet.onload = function () {
            ctx.drawImage(planet, x, y, PLANET_RADIUS * 2, PLANET_RADIUS * 2);
            planet.onload = null;
        };
        }
        
	};

    //画4条轨道
    var drawOrbits = function(){
    	for (var i = 0; i < 4 ;i++) {
    		ctx.lineWidth = 5;
    		ctx.strokeStyle = "#113A58";
    		ctx.beginPath();
    		ctx.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 100 + 85 * i, 0, 2 * Math.PI);
    		ctx.closePath();
    		ctx.stroke();
    	}
    };

    /**
     * 画飞船
     * @param  {array} spaceships 飞船队列
     */
     var drawSpaceships = function(spaceship){
    	var spaceshipImg = new Image(); //创建飞船贴图
        spaceshipImg.src = "img/min-iconfont-rocket-active.png";
        var drawing = function(){
            ctx.save(); //保存画布原有状态
            ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y); //将画布坐标原点移到画布中心
            ctx.rotate(-spaceship.deg * Math.PI / 180); //根据飞船飞行角度进行画布选择
            ctx.beginPath();
            if (spaceship.power > 60) {
                ctx.strokeStyle = POWERBAR_COLOR_GOOD;
            } else if (spaceship.power <= 60 && spaceship.power >= 20) {
                ctx.strokeStyle = POWERBAR_COLOR_MEDIUM;
            } else {
                ctx.strokeStyle = POWERBAR_COLOR_BAD;
            }
            ctx.lineWidth = POWERBAR_WIDTH;
            ctx.moveTo(spaceship.orbit, -POWERBAR_POS_OFFSET);
            ctx.lineTo(spaceship.orbit + SPACESHIP_SIZE * (spaceship.power / 100), -POWERBAR_POS_OFFSET);
            ctx.stroke();
            ctx.drawImage(spaceshipImg, spaceship.orbit, 0, SPACESHIP_SIZE, SPACESHIP_SIZE); //画飞船贴图
            ctx.restore(); //恢复画布到原有状态
        };
        
        //利用image对象的complete属性让图片完全加载完才在canvas上绘制
        if (spaceshipImg.complete) {
            drawing();
        } 
        else {
            spaceshipImg.onload = function () {
                drawing();
                spaceshipImg.onload = null;
            };
        }
    };

    /**
     * 绘制飞船队列
     * @param  {array} spaceships 飞船队列
     * @return {bollean}    判断结果       
     */
    var onDraw = function(spaceships){

    	if (spaceships.length != 0) {
            ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); // clear canvas
            AminateUtil.drawPlanet();
            AminateUtil.drawOrbits();
            
                for (var i = 0; i < spaceships.length; i++) { //绘制飞船
                	if (spaceships[i]) {
                		drawSpaceships(spaceships[i]);
                	}
                }
                return true;
            } 
            else {
                ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); // clear canvas
                AminateUtil.drawPlanet();
                AminateUtil.drawOrbits();
                return false;
            }


    };

   /**
    * 配置mediator
    * @param {object} _mediator mediator
    */
   var setMediator = function(_mediator) {
            mediator = _mediator;
        };

    /**
     * 动画循环
     * @param  {object} mediator mediator
     */
    var animLoop = function(){
    	requestAnimationFrame(animLoop);
    	onDraw(mediator.getSpaceships());
    };

    return {
    	setMediator: setMediator,
    	animLoop: animLoop,
    	drawPlanet :drawPlanet,
    	drawOrbits :drawOrbits 
    };
}();


/**
 * 指挥官通过控制面板操作飞船
 */
function controlSpaceship(commander){	
	var id = null,
	    cmd = null;
	$('button').bind('click',function(){
		var cmdName = $(this).attr("class");
		switch (cmdName) {
                case "launch":
                case "fly":
                case "stop":
                case "destroy":
                    id = $(this).parent().index();
                    cmd = cmdName;
                    break;
                default:
                    alert("指令无效!");
                    return false;
            }
            var message = new Message(id, cmd);
            commander.send(message);
	});
	
}



//主线程
$(document).ready(function() {
 	var commander = new Commander();
	var mediator = new Mediator(); 
	mediator.register(commander);
	controlSpaceship(commander);
	AminateUtil.setMediator(mediator);
	AminateUtil.animLoop();
});

