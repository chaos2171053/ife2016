define(["man","util",'spaceship','adapter'],function (man,util,ship,adapter) {
    var BUS_TRAMIT_SPEED = 300;//介质bus的传播速度
    var FAILURE_RATE = 0.1;//命令发送失败几率
    var SPACESHIP_BROADCAST_TIME = 1000;//飞船每秒广播自己的飞行状态
/**
 * 挥官通过信号发射器发出的命令是通过一种叫做Bus的介质进行广播
 */
var Bus = function() {
    var spaceships = []; //飞船队列
    var commander = null;
    
    // 判断是否存在Bus实例
    if(typeof Bus.instance === 'object'){
        return Bus.instance;
    }

    /**
     * 注册。指挥官通过信号发射器发出的命令是通过一种叫做Bus的介质进行广播。
     * 飞船通过Bus接受命令。
     * @param  {object} obj 指挥官/飞船实例
     */
    function register(obj){
        //如果是指挥官实例，绑定bus
        if(obj instanceof man.Commander ){
            commander = obj;
            obj.bus = this;
            util.ConsoleUtil().show("指挥官 " + obj.name + " 你好~请下指令。");
            return true;
        }
        //如果是飞船实例
        if(obj instanceof ship.Spaceships){
            spaceships[obj.id] = obj;
            obj.bus = this;
            return true;
        }
        util.ConsoleUtil().show("Bus 发生不知名问题，GG思密达");
         return false;
    }

    /**
     * 从行星发射到宇宙中,Bus是单向传播,在发射过程中，有10%的信息传送失败概率,
     * 每次信息正常传送的时间需要0.3秒。
     * 每个飞船通过信号接收器，接受到通过Bus传达过来的指挥官的广播信号。  
     */
    
    function send(msg) {
        var that = this;
        var timer = null;
        timer = setInterval(function() {
            //随机数大于发送失败率则执行消息发送
            var code = adapter.messageAapter().compile(msg).comenderCode;//编译指令转成二进制
            var success = Math.random() > FAILURE_RATE ? true : false;
            if(success) {
                clearInterval(timer);
                var decompileMsg = adapter.messageAapter().decompile(code).msg;//反编译指令
                if(decompileMsg.cmd == "launch"){
                    that.create(decompileMsg);
                }
                for (var key in spaceships) {
                    if (spaceships[key]) { //所有飞船迭代接收消息
                        spaceships[key].signalManager().receive(decompileMsg);
                    }
                }
            }
            else{
                util.ConsoleUtil().show("指令丢包,它迷路了/(ㄒoㄒ)/~~");
                util.ConsoleUtil().show("指令重新发送ing...");
                return;
            }

        },BUS_TRAMIT_SPEED);//0.3s后执行

    }


    /**
     * 创建飞船
     * @param  {obj} msg 指令
     */
    function create(msg){
        if (spaceships[msg.id] !== undefined) {
            util.ConsoleUtil().show("轨道上已有飞船，请先销毁飞船！");
            return false;
        }
        var spaceship = new ship.Spaceships(msg.id,msg.speed,msg.chargeRate,msg.dischargeRate);
        this.register(spaceship);
        this.broadcast();//创建飞船后，飞船开始发送自己的飞行状态
        return true;
    }

    /**
     * 返回飞船队列
     */
    function getSpaceships(){
        return spaceships;
    }
    
    /**
     * 把指定的飞船移出队列
     * @param  {object} obj 指定的飞船对象
     * @return {bolean}     指定结果
     */
    function remove(obj){
        if (obj instanceof ship.Spaceships) {
            util.ConsoleUtil().show("销毁阿波罗" + obj.id+"号/(ㄒoㄒ)/~~");
            delete spaceships[obj.id];
            delete stateCode[obj.id];
            // spaceships.splice(obj.id,1);
            return true;
        }
        util.ConsoleUtil().show("销毁阿波罗" + obj.id+"号失败/(ㄒoㄒ)/~~");
        return false;
    }

    /**
     * 飞船会通过BUS系统每秒广播自己的飞行状态
     * @return {[type]} [description]
     */
    var broadcast = function(){
        var that = this;
        var timer = null;
        timer = setInterval(function() {
            for(var key in spaceships){
                if(spaceships[key]){//所有飞船迭代发送自己的飞行状态消息
                    //stateCode.push(spaceship[key].signalManager().send());
                    msg = spaceships[key].signalManager().send().message;
                    var code = adapter.messageAapter().compile(msg).spaceshipCode;//编译指令转成二进制
                    var decompileCode = adapter.messageAapter().decompile(code).stateMsg;//反编译指令
                    stateCode[decompileCode.id] = decompileCode;//反编译后放入全局飞船信息数组
                }    
            } 
        },SPACESHIP_BROADCAST_TIME);//1s后执行
    };

    Bus.instance = this;

    //缓存
    // function getInstance(){
    //     return this;
    // }
    
    return {
        remove:remove,
        register:register,
        send:send,
        create:create,
        getSpaceships:getSpaceships,
        broadcast:broadcast
        // getInstance:getInstance
    };
};

return {
    Bus:Bus
};
    
});