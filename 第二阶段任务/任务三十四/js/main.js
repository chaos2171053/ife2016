require.config({
	paths: {
		"renderTable": "renderTable",
		"constructor":"constructor",
		"util":"util"
	}
});

var square;
require(['renderTable',"constructor","util"], function (renderTable,constructor,util){
	var ROW = 11;// 11行
    var COL = 11;// 11列
    var bg = $('#background');// 表格
	var x = Math.floor(Math.random() * 10 + 1); // 小方块x轴坐标
	var y = Math.floor(Math.random() * 10 + 1); // 小方块y轴坐标
	renderTable.createTable(bg,ROW,COL);//渲染表格
	$('#comfirm').click(util.moveSquare);
    square = new constructor.Square(bg,x,y,0,"top");// 小方块对象	
});
