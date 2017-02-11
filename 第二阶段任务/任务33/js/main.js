require.config({
	paths: {
		"renderTable": "renderTable",
		"constructor":"constructor"
	}
});

var square = null;//小方块对象;
var bg = $('#background');//表格
require(['renderTable',"constructor","util"], function (renderTable,constructor,util){
	var ROW = 11;//11行
    var COL = 11;//11列
	renderTable.createTable(bg,ROW,COL);//渲染表格
	$('#create').click(util.createDiv);
	$('#comfirm').click(util.moveSquare);
});
