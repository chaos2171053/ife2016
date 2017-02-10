require.config({
	paths: {
		"renderTable": "renderTable",
		"robot":"robot",
		"editor":"editor"
	}
});

// var square;
require(['render',"robot","editor"], function (render,robot,
	editor) {
    /**
     * constructor
     */
	var Application = function () {
		var ROW = 21;// 21行
        var COL = 21;// 21列
        var x = Math.floor(Math.random() * 10 + 1); // 小方块x轴坐标
	    var y = Math.floor(Math.random() * 10 + 1); // 小方块y轴坐标
		this.table = new render.Table(ROW,COL);//表格实例
		this.square = new robot.Square($('#background'),x,y,0,"bottom");// 小方块实例，方向向下。
		this.editor = new editor.Editor();//编辑器实例
		this.$run = $('#run');
		this.$reset = $('#reset');
		this.init();
	};

	/**
	 * 事件监听
	 */
	Application.prototype.init = function() {
		var object = {object:this};
		$(document).keydown(object,this.hotkey);
		this.$run.click(object,this.run);
		this.$reset.click(object,this.reset);
	};
	
	/**
	 * 点击执行按钮事件
	 * @param  {object} event 事件
	 * @return {bollean} 是否执行指令
	 */
	Application.prototype.run = function(event) {
		var TIME = 1000;//每次指令执行时间 1s
		var e = event || window.event;
		var _self = e.data.object;
		_self.editor.clearFlag();
		_self.editor.clearErrorText();
		var commands = _self.editor.getCommands();
	
        if(!_self.editor.isRunning){
        	for(var i = 0,len = commands.index.length;i<len;i++){
        		_self.editor.isRunning = true;
        		if(_self.editor.compileComands(commands.cmd[commands.index[i]]) === false){
        			_self.editor.setFlag(commands.index[i], "error");//标记第一个错误的指令
        			_self.editor.setErrorText(commands.index[i],"errorText");
        			_self.editor.isRunning = false;
        			return false;
        		}
        	}


        	//解析全部指令是否都有效
        	// for(var i =0,len = commands.length;i<len;i++){
        	// 	_self.editor.isRunning = true;
        	// 	if(commands[i] &&_self.editor.compileComands(commands[i]) === false) {
        	// 		_self.editor.setFlag(i, "error");//标记第一个错误的指令
        	// 		_self.editor.setErrorText(i,"errorText");
        	// 		_self.editor.isRunning = false;
        	// 		return false;
        	// 	}
        	// }
        	//依次执行指令
        	var nowExc = 0 ;
        	_self.editor.clearErrorText();
        	// var validComandsIndex = [];
        	// //筛选出有效指令的索引
        	// for(i =0;i<len;i++){
        	// 	if(commands[i]){
        	// 		validComandsIndex.push(i);
        	// 	}
        	// }
        	var t = null;
        	// for(var k=0,ln = validComandsIndex.length;k<ln;k++){
        	// 	(function(){
        	// 		var j = k;
        	// 		var timer = setTimeout(function(){
        	// 			if(t!= false && (_self.editor.isRunning != false)){
        	// 				_self.square.isRunSucceed = false;
        	// 				pre = validComandsIndex[j];
        	// 				_self.editor.clearFlag();
        	// 				_self.square.execute(commands[validComandsIndex[j]]);
        	// 				if(_self.square.isRunSucceed){
        	// 					_self.editor.setFlag(validComandsIndex[j],"success");
        	// 					if(j == (ln-1)){ //执行完所有指令时
        	// 						_self.editor.isRunning = false;
        	// 					}
        	// 				}
        	// 				else{
        	// 					_self.editor.setFlag(validComandsIndex[j],"warnning");
        	// 					_self.editor.setErrorText(j,"warnningText");
        	// 					_self.editor.isRunning = false;
        	// 					t =false;
        	// 				}
        	// 			}
        	// 			},j*TIME);
        	// 	})(k);
        	// }
        	for(i = 0;i<len;i++){
        		(function(){
        			var j = i;
        			var timer = setTimeout(function(){
        				if(t!= false && (_self.editor.isRunning != false)){
        					_self.square.isRunSucceed = false;
        					nowExc = commands.index[j];
        					_self.editor.clearFlag();
        					_self.square.execute(commands.cmd[nowExc]);
        					if(_self.square.isRunSucceed){
        						_self.editor.setFlag(nowExc,"success");
        						if(j == (len-1)){ //执行完所有指令时
        							_self.editor.isRunning = false;
        						}
        					}
        					else{
        						_self.editor.setFlag(nowExc,"warnning");
        						_self.editor.setErrorText(j,"warnningText");
        						_self.editor.isRunning = false;
        						t =false;
        					}
        				}
        				},j*TIME);
        		})(i);
        	}
        	}
        	return true;	
        };

    /**
     * 重置编辑器和小方块
     * @param  {object} event 事件
     */
	Application.prototype.reset = function(event) {
		var e = event || window.event;
		var _self = e.data.object;
		_self.editor.$commandList.val("");
		_self.editor.init();
	    _self.square.init();

	};

	/**
	 * 键盘操控小方块移动
	 * @param  {object} event 事件
	 */
	Application.prototype.hotkey = function(event){
		var e = event || window.event;
		var _self = e.data.object;
		var code = {65: "left", 87: "top", 68: "right", 83: "bottom"};
		var direction = code[event.keyCode];
		if(direction != undefined){
			if (event.target.tagName.toLowerCase()  == 'body') {
				e.preventDefault();
				if(_self.square.direction != direction){
					_self.square.execute("change " + direction.slice(0,3));
				}else{
					_self.square.execute("go");
				}

			}
		}
	};
	new Application();
});
