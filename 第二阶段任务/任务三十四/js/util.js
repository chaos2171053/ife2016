define(["constructor"],function(constructor){
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
				square.changeDirection(-1,command);
				break;
				case "tun rig":
				square.changeDirection(1,command);
				break;
				case "tun bac":
				square.changeDirection(2,command);
				break;
				case "tra lef":
				square.moveNoChangeDirection(command);
				break;
				case "tra top":
				square.moveNoChangeDirection(command);
				break;
				case "tra rig":
				square.moveNoChangeDirection(command);
				break;
				case "tra bot":
				square.moveNoChangeDirection(command);
				break;
				case "mov lef":
				square.changeDirection(-1,command);
				square.go();
				break;
				case "mov top":
				square.changeDirection(10,command);
				square.go();
				break;
				case "mov rig":
				square.changeDirection(1,command);
				square.go();
				break;
				case "mov bot":
				square.changeDirection(-10,command);
				square.go();
				break;
			}
		},1000);
		}
	};

	return {
		moveSquare:moveSquare
	};
});