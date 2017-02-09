require.config({
	paths: {
		"renderTable": "renderTable",
		"robot":"robot",
		"control":"control",
		"editor":"editor"
	}
});

// var square;
require(['render',"robot","control","editor"], function (render,robot,
	control,editor) {
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
		this.reset();
	};

	/**
	 * 事件监听
	 */
	Application.prototype.init = function() {
		var object = {object:this};
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
		var commandError = false;
		_self.editor.clearFlag();
		_self.editor.clearErrorText();
		var commands = _self.editor.getCommands();
	
        if(!_self.editor.isRunning){
        	//解析全部指令是否都有效
        	for(var i =0,len = commands.length;i<len;i++){
        		_self.editor.isRunning = true;
        		if(commands[i] &&_self.editor.compileComands(commands[i]) === false) {
        			_self.editor.setFlag(i, "error");//标记第一个错误的指令
        			_self.editor.setErrorText(i,"errorText");
        			commandError = true;
        			_self.editor.isRunning = false;
        			return false;
        		}
        	}
        	//依次执行指令
        	var pre = 0 ;
        	_self.editor.clearErrorText();
        	var validComandsIndex = [];
        	//筛选出有效指令的索引
        	for(i =0;i<len;i++){
        		if(commands[i]){
        			validComandsIndex.push(i);
        		}
        	}
        	var t = null;
        	for(var k=0,ln = validComandsIndex.length;k<ln;k++){
        		(function(){
        			var j = k;
        			var timer = setTimeout(function(){
        				if(t!= false && (_self.editor.isRunning != false)){
        					_self.square.isRunSucceed = false;
        					_self.editor.isRunning = true;
        					pre = validComandsIndex[j];
        					_self.editor.clearFlag();
        					_self.square.execute(commands[validComandsIndex[j]]);
        					if(_self.square.isRunSucceed){
        						_self.editor.setFlag(validComandsIndex[j],"success");
        					}
        					else{
        						_self.editor.setFlag(validComandsIndex[j],"warnning");
        						_self.editor.setErrorText(j,"warnningText");
        						_self.editor.isRunning = false;
        						t =false;
        					}
        					_self.editor.isRunning = false;
        				}
        				},j*TIME);
        		})(k);
        	}
        	}
        	return true;	
        };
	Application.prototype.reset = function() {

	};
	new Application();
});
