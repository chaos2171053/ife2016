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
 * 控制台信息输出
 * @param  {stirng}  控制命令
 * @return {function}       输出信息
 */
 var ConsoleUtil = (function(){
 	var $consoleLog = $(".console ul");

    /**
     * 获取当前时间
     * @return {string} 当前时间
     */
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
        return currentdate;
    }
 	var show = function(msg){
 		var $msg = $("<li></li>");
 		$msg.text(getNowFormatDate() +": " + msg);
 		$consoleLog.prepend($msg);
        liCount++;
        if(liCount == 12 ){
            liCount = 0;
            $('.control-wapper ul').html("");
            return;
        }

 	};
 	return {
 		show:show
 	};
 });


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
 * 原来的指令格式翻译成二进制码
 * @return {[type]} [description]
 */
var messageAapter = function(){
    
    /**
     * 编译及反编译指令，指令为二进制
     * @param  {string} msg 指令
     * @return {object}     编译和反编译结果
     */
    var compile = function(msg){
        var code = "",
            idCode = "",
            cmdCode = "",
            speedCmdCode = "",
            powerCmdCode = "";

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

        code = idCode + cmdCode + speedCmdCode + powerCmdCode;
        return code;
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
            msg = {},
            id,cmd,speed,dischargeRate,chargeRate;

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
            break;
            case "0002":
            speed = SPACESHIP_NORMAL_SPEED;
            break;
            case "0003":
            speed = SPACESHIP_FAST_SPEED;
            break;
        }


        //飞船能量
        switch(compileSpeed){
            case "0001":
            dischargeRate = SPACESHIP_DISCHARGE_LOW_RATE;
            chargeRate = SPACESHIP_CHARGE_LOW_RATE;
            break;
            case "0002":
            dischargeRate = SPACESHIP_DISCHARGE_NORMAL_RATE;
            chargeRate = SPACESHIP_CHARGE_NORMAL_RATE;
            break;
            case "0003":
            dischargeRate = SPACESHIP_DISCHARGE_FAST_RATE;
            chargeRate = SPACESHIP_CHARGE_FAST_RATE;
            break;
        }
         
        msg.id = id;
        msg.cmd = cmd;
        msg.speed = speed;
        msg.dischargeRate = dischargeRate;
        msg.chargeRate = chargeRate;
        
        return msg;

    };



    return {
        compile:compile,
        decompile:decompile
    };
};



 /**
 * 指挥官通过控制面板操作飞船
 */
 var controlSpaceship = (function(commander){   
 	var id = null,
 	    cmd = null;
    //确定、取消按钮点击事件
    $('.orbit button').bind('click',function(){
    	var cmdName = $(this).attr("class");
    	id = $(this).parent().index();
    	switch (cmdName) {
    		case "launch":
    		$('.space-option-plannel').show();
    		spaceOption(cmdName,id);
    		return true;
    		case "fly":
    		case "stop":
    		case "destroy":
    		var message = new Message(id, cmdName);
    		commander.send(message);
    		break;
    		default:
    		alert("指令无效!");
    		return false;
    	}
    });
    
    /**
     * 飞船类型获取
     * @param  {string} cmd 指令
     * @param  {[type]} id  飞船id
     */
     var spaceOption = function(cmd,id) {
     	$('#confirm').bind('click',function(){
            var speedCmd = $("input[name='speed']:checked").val();//获取选择的速度类型
                powerCmd = $("input[name='power']:checked").val();//获取选择的能量类型
                message = new Message(id, cmd,speedCmd,powerCmd);
                commander.send(message);
                $('.space-option-plannel').hide();
            $('#confirm').off();//解除绑定
            $('#cancel').off();
        });
     	$('#cancel').bind('click',function(){
     		$('.space-option-plannel').hide();
     		$('#confirm').off();
     		$('#cancel').off();
     	});


    };
    

 });
 return {
 	messageAapter:messageAapter,
 	ConsoleUtil:ConsoleUtil,
 	controlSpaceship:controlSpaceship,	
 };

});