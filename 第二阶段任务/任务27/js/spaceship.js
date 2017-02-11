define(['util'],function(util){
	var SPACESHIP_SIZE = 40; //飞船大小
   


/**
 * 飞船构造函数
 * @param {int} id            飞船id
 * @param {int} speed         飞船速度
 * @param {int} chargeRate    飞船充电
 * @param {int} dischargeRate 飞船放电速度
 */
var Spaceships = function(id,speed,chargeRate,dischargeRate){
    this.id = id;
    this.power = 100; //飞船初始电量
    this.currState = "stop"; //飞船初始状态
    this.bus = null; //飞船注册的bus
    this.orbit = 100 + 85 * id - SPACESHIP_SIZE / 2; //飞船所在轨道的半径
    this.deg = 0; //飞船初始位置的角度
    this.timer = null;
    this.chargeRate = chargeRate;//飞船充电速度
    this.dischargeRate = dischargeRate;//飞船放电速度
    this.speed = speed;//飞船速度
};
Spaceships.prototype.powerManager = function(){
    var that = this;

    /**
     * 飞船充电
     * @return {object} 飞船充电放电
     */
    var charge = function() {
            var chargeRate = that.chargeRate;
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
                that.power += that.chargeRate;
                return true;
            }, 20);
    
        };
    /**
     * 飞船放电
     * @return {[type]} [description]
     */
     var discharge = function() {
        var dischargeRate = that.dischargeRate;
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
                that.power -= that.dischargeRate; //电量下降
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
            that.deg += that.speed;
                if (that.deg >= 360) {that.deg = 0;} //飞完一圈时，重置角度
            }, 20);
    };

    //停止
    var stop =function() {
        clearInterval(that.timer);
    };


    return {
        fly:fly,
        stop:stop
    };

};

/**
 * 飞船状态系统，用于控制飞船的发射、飞行、停止、销毁
 * @return {obj} 改变状态
 */
Spaceships.prototype.stateManager = function(){
    var that = this;

    var states = {
            // launch :function(state){
            //     that.currState = "stop";
            // },
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
                that.bus.remove(that);
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
                case "launch":  
                state = "发射";
                break;
                case "fly":  
                state = "飞行";
                break;
                case "stop":  
                state = "停止";
                break;
                case "destroy":  
                state = "销毁";
                break;
            }
            
            util.ConsoleUtil().show("阿波罗" + that.id + "号现在" + state);

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

return {
	Spaceships:Spaceships
};

});