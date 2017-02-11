define(["constructor"],function(constructor){
	var createDiv  = function(){
		var startX = $('#startX')[0];
		var startY = $('#startY')[0];
		var startFace = $('#startFace')[0];
		var x = parseInt(startX.value,10);
		var y = parseInt(startY.value,10);
		var f = parseInt(startFace.value,10);
		if (x >= 1 && x <= 11 && y >= 1 && y <= 11 && f >= 0 && f <= 3) {
			square = new constructor.Square(x, y, f);
			var div = document.createElement("div");
			var cellTd = square.getBlock(square.x, square.y);
			cellTd.className = square.change[square.f];
			cellTd.appendChild(div);
		} else {
			alert("请输入有效的坐标!");
		}
	};

	var moveSquare = function(){
		var command = $('#command')[0].value.trim();
		switch (command){
        case "GO":
            square.go();
            break;
        case "TUN LEF":
            square.changeDirection(-1);
            break;
        case "TUN RIG":
            square.changeDirection(1);
            break;
        case "TUN BAC":
            square.changeDirection(2);
            break;
    }

	};

	return {
		createDiv:createDiv,
		moveSquare:moveSquare
	};
});