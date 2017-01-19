define(['adapter'],function(adapter){
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
        if(liCount == 11 ){
            liCount = 0;
            $('.control-wrapper ul').text("");
            return;
        }

 	};
 	return {
 		show:show
 	};
 });

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
    		var message = new adapter.Message(id, cmdName);
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
                message = new adapter.Message(id, cmd,speedCmd,powerCmd);
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
 	ConsoleUtil:ConsoleUtil,
 	controlSpaceship:controlSpaceship,	
 };

});