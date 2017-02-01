define(["constructor"],function(constructor){
    /**
     * 创建小方块
     */
	var createDiv  = function(){
		var direction = ["top", "right", "bottom", "left"];
		var startX = $('#startX')[0];
		var startY = $('#startY')[0];
		var startFace = $('#startFace')[0];
		var x = parseInt(startX.value,10);
		var y = parseInt(startY.value,10);
		var face = direction.indexOf($.trim(startFace.value).toLowerCase());
		
		if (x >= 1 && x <= 11 && y >= 1 && y <= 11 && (face!= -1) ){
			square = new constructor.Square(x, y, face);
			var div = document.createElement("div");
			var cellTd = square.getBlock(square.x, square.y);
			cellTd.className = square.change[square.f];
			cellTd.appendChild(div);
		} else {
			alert("请输入有效的坐标!");
		}
		
	};

    /**
     * 移动方块事件
     */
	var moveSquare = function(){
		var com = ["go","tun lef","tun rig","tun bac","tra lef","tra top","tra rig","tra bot"];
		var command = $.trim($('#command')[0].value.toLowerCase());
		if(com.indexOf(command) == -1){
			alert("请输入有效的指令~");
			return;
		}
		else if(square == null){
			alert("请先创建方块");
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
				square.changeDirection(-1);
				break;
				case "tun rig":
				square.changeDirection(1);
				break;
				case "tun bac":
				square.changeDirection(2);
				break;
				case "tra lef":
				square.moveNoChangeDirection("lef");
				break;
				case "tra top":
				square.moveNoChangeDirection("top");
				break;
				case "tra rig":
				square.moveNoChangeDirection("rig");
				break;
				case "tra bot":
				square.moveNoChangeDirection("bot");
				break;
			}
		},1000);
		}
	};

	return {
		createDiv:createDiv,
		moveSquare:moveSquare
	};
});