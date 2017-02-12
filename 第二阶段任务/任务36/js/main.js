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
		this.$random = $("#random");
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
		this.$random.click(object,this.random);
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
        if(!_self.editor.isRunning){
        	_self.editor.clearFlag();
        	_self.editor.clearErrorText();
        	var commands = _self.editor.getCommands();
        	for(var i = 0,len = commands.index.length;i<len;i++){
        		_self.editor.isRunning = true;
        		if(_self.editor.compileComands(commands.cmd[commands.index[i]]) === false){
        			_self.editor.setFlag(commands.index[i], "error");//标记第一个错误的指令
        			_self.editor.setErrorText(commands.index[i],"errorText");
        			_self.editor.isRunning = false;
        			return false;
        		}
        	}
        	//依次执行指令
        	var nowExc = 0 ;
        	_self.editor.clearErrorText();
        	var t = null;
        	for(i = 0;i<len;i++){
        		(function(){
        			var j = i;
        			var timer = setTimeout(function(){
        				if(t!= false && (_self.editor.isRunning != false)){
        					_self.square.isRunSucceed = false;
        					nowExc = commands.index[j];
        					_self.editor.clearFlag();
        					//_self.square.execute(commands.cmd[nowExc]);
        					//if(_self.square.isRunSucceed){
        					if(_self.square.execute(commands.cmd[nowExc])){
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
	    _self.table.clearWall();

	};

	/**
	 * 键盘操控小方块移动
	 * @param  {object} event 事件
	 */
	Application.prototype.hotkey = function(event){
		var e = event || window.event;
		var _self = e.data.object;
		if(!_self.editor.isRunning){
			if (e.target.tagName.toLowerCase()  == 'body') {
				var code = {65: "left", 87: "top", 68: "right", 83: "bottom"};
				var direction = code[event.keyCode];
				if(direction != undefined){
					e.preventDefault();
					if(_self.square.direction != direction){
						_self.square.execute("change " + direction.slice(0,3));
					}else{
						_self.square.execute("go");
					}
				}
				if(e.keyCode == 32){
					e.preventDefault();
					_self.square.execute("build");
				}
			}
		}
	};

	/**
	 * 随机修墙
	 * @param  {object} event 事件
	 * @return {[type]}       [description]
	 */
	Application.prototype.random = function(event) {
		var e = event || window.event;
		var _self = e.data.object;
		if(!_self.editor.isRunning){
			_self.table.clearWall();
			var wallsNum = Math.floor(Math.random() * 10+1); // 随机要生成的墙数
			for(var i = 0;i<wallsNum;i++){
			var x = Math.floor(Math.random() * 20 + 1); // 墙x轴坐标
			var y = Math.floor(Math.random() * 20 + 1); // 
			var reuslt =_self.table.canBuild(x,y,_self.square.x,_self.square.y);
			while(reuslt){
				x = Math.floor(Math.random() * 20 + 1); 
				y = Math.floor(Math.random() * 20 + 1); 
				reuslt =_self.table.canBuild(x,y,_self.square.x,_self.square.y);
			}
			_self.table.build(x,y);
		}
		}
		else{
			_self.editor.setErrorText(null,"RunningText");
		}
	}
	new Application();
});
