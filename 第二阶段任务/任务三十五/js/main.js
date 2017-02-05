require.config({
	paths: {
		"renderTable": "renderTable",
		"robot":"robot",
		"control":"control",
		"editor":"editor"
	}
});

var square;
require(['render',"robot","control","editor"], function (render,robot,
	control,editor) {
	var ROW = 21;// 21行
    var COL = 21;// 21列
	var x = Math.floor(Math.random() * 10 + 1); // 小方块x轴坐标
	var y = Math.floor(Math.random() * 10 + 1); // 小方块y轴坐标
	var $commandList = $('#command-list');
	var table = new render.Table(ROW,COL);//表格实例
	square = new robot.Square($('#background'),x,y,0,"bottom");// 小方块实例，方向向下。	
	$commandList.keydown(editor.inputKeyDown).eq(0);// textarea回车按下事件监听，用于添加行数。
	$commandList.focus(editor.editorFocus()).eq(0);// textarea获取焦点事件，定位光标。
	$commandList.on('input propertychange',editor.intutBackSpace).eq(0);// textarea内容变化监听。
	$commandList.scroll(editor.editorScroll).eq(0);//指令条数栏和指令栏同步滚动。
	// 编译、运行指令
	$('#run').click(function(){
		if(editor.commandCompile()){
			editor.commandExecute();
		}
	});
});
