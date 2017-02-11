define(function(){
	var SPACESHIP_LOW_SPEED =0.5;//飞船飞行慢速度
    var SPACESHIP_NORMAL_SPEED =2;//飞船正常慢速度
    var SPACESHIP_FAST_SPEED =8;//飞船飞行快速度
    var SPACESHIP_CHARGE_LOW_RATE = 0.1;//飞船充电慢速度
    var SPACESHIP_CHARGE_NORMAL_RATE = 0.5;//飞船充电正常速度
    var SPACESHIP_CHARGE_FAST_RATE = 0.9;//飞船充电快速度

    var SPACESHIP_DISCHARGE_LOW_RATE = 0.1;//飞船放电慢速度
    var SPACESHIP_DISCHARGE_NORMAL_RATE = 0.5;//飞船放电正常速度
    var SPACESHIP_DISCHARGE_FAST_RATE = 0.9;//飞船放电快速度

/**
 * 指挥官发出的命令
 * @param  {int} id      飞船id
 * @param  {sring} speedCmd 速度命令
 * @param  {sring} powerCmd 能量命令
 */
var Message = function(id, cmd,speedCmd,powerCmd) {
    this.id = id;
    this.cmd = cmd;
    this.speedCmd = speedCmd ;
    this.powerCmd = powerCmd;
};

/**
 * 飞船发出的飞行状态信息。
 * @param  {[type]} id            飞船id
 * @param  {[type]} currState     飞行状态
 * @param  {[type]} speed         速度
 * @param  {[type]} chargeRate    充电速度
 * @param  {[type]} dischargeRate 放电速度
 * @param  {[type]} power         能量
 * @return {object}               飞行状态信息
 */
var SpaceshipMessage = function(id,currState,speed,chargeRate,dischargeRate,power) {
	this.id = id;
	this.currState = currState;
	this.speed = speed;
	this.chargeRate = chargeRate;
	this.dischargeRate = dischargeRate;
	this.power = power;
};
 
/**
 * 把指挥官的指令格式编译及反编，指令为二进制。
 * @return {object} 编译及反编译结果
 */
var messageAapter = function(){
    
    /**
     * 编译及反编译指令，指令为二进制
     * @param  {string} msg 指令
     * @return {object}     编译和反编译结果
     */
    var compile = function(msg){
        var comenderCode = "",
            spaceshipCode = "",
            idCode = "",
            cmdCode = "",
            speedCmdCode = "",
            powerCmdCode = "",
            currStateCode = "",
            shipPowerCode = "",
            speedCode = "",
            chargeCode = "".
            powerCode = "";

        //飞船id
        switch(msg.id){
            case 0:
            idCode = "000"+msg.id;
            break;
            case 1:
            idCode = "000"+msg.id;
            break;
            case 2:
            idCode = "000"+msg.id;
            break;
            case 3:
            idCode = "000"+msg.id;
            break;
        }

        //飞船行动指令
        switch(msg.cmd){
            case "launch":
            cmdCode = "0001";
            break;
            case "fly":
            cmdCode = "0002";
            break;
            case "stop":
            cmdCode = "0003";
            break;
            case "destroy":
            cmdCode = "0004";
            break;
        }

        //飞船速度
        switch(msg.speedCmd){
            case "slow":
            speedCmdCode = "0001";
            break;
            case "normal":
            speedCmdCode = "0002";
            break;
            case "fast":
            speedCmdCode = "0003";
            break;
        }

        //飞船能量
        switch(msg.powerCmd){
            case "slow":
            powerCmdCode = "0001";
            break;
            case "normal":
            powerCmdCode = "0002";
            break;
            case "fast":
            powerCmdCode = "0003";
            break;
        }

        //飞船飞行状态
        switch(msg.currState){
            case "launch":
            currStateCode = "0001";
            break;
            case "fly":
            currStateCode = "0002";
            break;
            case "stop":
            currStateCode = "0003";
            break;
            case "destroy":
            currStateCode = "0004";
            break;
        }
        //飞船速度
        switch(msg.speed){
        	case SPACESHIP_LOW_SPEED:
        	speedCode = "0001";
        	break;
        	case SPACESHIP_NORMAL_SPEED:
        	speedCode = "0002";
        	break;
        	case SPACESHIP_FAST_SPEED:
        	speedCode = "0003";
        	break;
        }

        //飞船充电放电
        switch(msg.chargeRate){
        	case SPACESHIP_DISCHARGE_FAST_RATE:
        	chargeCode = "0001";
        	break;
        	case SPACESHIP_DISCHARGE_NORMAL_RATE:
        	chargeCode = "0002";
        	break;
        	case SPACESHIP_DISCHARGE_LOW_RATE:
        	chargeCode = "0003";
        	break;
        }
        
        //飞船充电放电
        if(msg.power){
        	 powerCode = msg.power.toString(2);
        	 spaceshipCode = idCode + currStateCode + speedCode + chargeCode + powerCode;
        }
       

        comenderCode = idCode + cmdCode + speedCmdCode + powerCmdCode;
        
        return {
        	comenderCode:comenderCode,
        	spaceshipCode:spaceshipCode
        };
    };

    /**
     * 反编译指令
     * @param  {string} code 指令
     * @return {object}      反编译后的指令
     */
    var decompile = function(code) {
        var compileId  = code.slice(0, 4),
            compileCmd = code.slice(4,8),
            compileSpeed = code.slice(8, 12),
            compilePower = code.slice(12,16),
            compileCurrState = code.slice(4,8),
            compileCharge = code.slice(12,16),
            compilePowerNum = code.slice(16),
            msg = {},stateMsg = {},
            id,cmd,speed,dischargeRate,chargeRate,power,state,dynamicSystem,speedState;

        //反编译飞船id
        switch(compileId){
            case "0000":
            id = 0;
            break;
            case "0001":
            id = 1;
            break;
            case "0002":
            id = 2;
            break;
            case "0003":
            id = 3;
            break;
        }

        //反编译飞船命令
        switch(compileCmd){
            case "0001":
            cmd = "launch";
            break;
            case "0002":
            cmd = "fly";
            break;
            case "0003":
            cmd = "stop";
            break;
            case "0004":
            cmd = "destroy";
            break;
        }

        //飞船速度
        switch(compileSpeed){
            case "0001":
            speed = SPACESHIP_LOW_SPEED;
            speedState = "慢"; 
            break;
            case "0002":
            speed = SPACESHIP_NORMAL_SPEED;
            speedState = "中"; 
            break;
            case "0003":
            speed = SPACESHIP_FAST_SPEED;
            speedState = "快"; 
            break;
        }


        //飞船能量
        switch(compilePower){
            case "0001":
            dischargeRate = SPACESHIP_DISCHARGE_FAST_RATE;
            chargeRate = SPACESHIP_CHARGE_FAST_RATE;
            break;
            case "0002":
            dischargeRate = SPACESHIP_DISCHARGE_NORMAL_RATE;
            chargeRate = SPACESHIP_CHARGE_NORMAL_RATE;
            break;
            case "0003":
            dischargeRate = SPACESHIP_DISCHARGE_LOW_RATE;
            chargeRate = SPACESHIP_CHARGE_LOW_RATE;
            break;
        }

        //反编译飞船状态
        switch(compileCurrState){
            case "0001":
            state = "发射";
            break;
            case "0002":
            state = "飞行中";
            break;
            case "0003":
            state = "停止";
            break;
            case "0004":
            state = "销毁";
            break;
        }

        switch(compileCharge){
        	case "0001":
        	dynamicSystem ="普通型";
        	break;
        	case "0002":
        	dynamicSystem ="加强型";
        	break;
        	case "0003":
        	dynamicSystem ="劲爆型";
        	break;

        }

        
        msg.id = id;
        msg.cmd = cmd;
        msg.speed = speed;
        msg.dischargeRate = dischargeRate;
        msg.chargeRate = chargeRate;
        
        stateMsg.id = id;
        stateMsg.currState = state;
        stateMsg.speed = speedState;
        stateMsg.dynamicSystem = dynamicSystem;
        stateMsg.power =  parseInt(compilePowerNum,2);
        
        return {
        	msg:msg,
        	stateMsg:stateMsg
        };

    };
    return {
        compile:compile,
        decompile:decompile
    };
};
	return {
		Message:Message,
		SpaceshipMessage:SpaceshipMessage,
		messageAapter:messageAapter
	};
});
