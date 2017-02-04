define(["constructor"],function(constructor){
	var TIME = 1000;//指令执行时间
    /**
     * 移动方块事件
     * @return {function} 移动方块事件
     */
	var moveSquare = function(){
		var commandArray = ["go","tun lef","tun rig","tun bac",
		           "tra lef","tra top","tra rig","tra bot",
		           "mov lef","mov top","mov rig","mov bot"];
		var command = $.trim($('#command')[0].value.toLowerCase());
		if(commandArray.indexOf(command) == -1){
			alert("请输入有效的指令~");
			return;
		}
		else { 
		//1s后执行指令
		setTimeout(function(){
			switch (command){
				case "go":
				square.go();
				break;
				case "tun lef":
				case "tun rig":
				case "tun bac":
				case "tra lef":
				case "tra top":
				case "tra rig":
				case "tra bot":
				square.changeDirection(command);
				break;
				case "mov lef":
				case "mov top":
				case "mov rig":
				case "mov bot":
				square.changeDirection(command);
				square.go();
				break;
			}
		},TIME);
		}
	};
	return {
		moveSquare:moveSquare
	};
});