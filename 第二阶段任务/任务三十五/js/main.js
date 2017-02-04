require.config({
	paths: {
		"renderTable": "renderTable",
		"constructor":"constructor",
		"control":"control",
		"editor":"editor"
	}
});

var square;
require(['renderTable',"constructor","control","editor"], function (renderTable,constructor,
	control,editor) {
	var ROW = 21;// 16行
    var COL = 21;// 16列
	var x = Math.floor(Math.random() * 10 + 1); // 小方块x轴坐标
	var y = Math.floor(Math.random() * 10 + 1); // 小方块y轴坐标
	var $commandList = $('#command-list');


	renderTable.createTable($('#background'),ROW,COL);// 渲染表格
	square = new constructor.Square($('#background'),x,y,0,"bottom");// 小方块实例，方向向下。	
	$commandList.keydown(editor.editorKeyDown).eq(0);// textarea回车按下事件监听，用于添加行数。
	$commandList.focus(editor.editorFocus()).eq(0);// textarea获取焦点事件 定位光标
	$commandList.on('input propertychange',editor.editorBackSpace).eq(0);// textarea内容变化监听。
	$commandList.scroll(editor.editorScroll).get(0);
	$('#run').click(control.moveSquare);
});
