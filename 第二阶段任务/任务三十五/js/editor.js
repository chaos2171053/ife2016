define(function(){
	/**
	 * Editor constructor
	 */
	var Editor = function(x,y) {
		var instance;
		if(typeof instance === 'object' ) {
			return instance;
		}
		instance = this;
		this.isRunning = false;
		this.isSuccessful = false;
		this.init();
	};

    /**
     * 编辑器绑定事件
     */
	Editor.prototype.init = function() {
		this.$commandNumber = $('#command-number');// 指令行数列表
		this.$commandList = $('#command-list');//指令列表
		this.$commandList.keydown(this.inputKeyDown);
		this.$commandList.focus(this.editorFocus());
		this.$commandList.scroll(this.editorScroll);
		this.$commandList.on('input propertychange',this.inputBackSpace);

	};


	/**
	 * 编辑器 回车事件 按下回车，ol添加一个li作为指令行数
	 * @param  {object} event 事件
	 */
	Editor.prototype.inputKeyDown = function(event) {
		var e = event || window.event;
		if(e.keyCode == 13) {
			$('#command-number').append("<li></li>");
		}
	};

	/**
	 * 根据右边指令行数更新左边行数目显示
	 */
	Editor.prototype.inputBackSpace = function() {
		var commands=$('#command-list').val();
		var liNum =$('#command-number').get(0).children.length;// li标签数目
		var enterNum = commands.split(/\n/g).length; // 换行符个数
		if(liNum != enterNum) {
			$('li').last().remove();
		}
		if(commands == ""){
			$('#command-number').html("<li></li>");
		}
	};

	/**
     * 滚动右边指令时，左边指令行数同步滚动。
     */
	Editor.prototype.editorScroll = function() {
		$('#command-number').scrollTop($('#command-list').get(0).scrollTop);
	};

	/**
	 * 编辑器获取焦点在文本最后一行
	 * @param  {object} event 事件
	 */
	Editor.prototype.editorFocus = function() {
		var content=$.trim($('#command-list').val());   
		$('#command-list').val("").focus().val(content);
	};

	/**
	 * 清除li标签的className
	 */
	Editor.prototype.clearFlag = function(i,className) {
		$('#command-number').children().removeClass();
	};

	/**
	 * 设置li标签的className
	 * @param {Int} i         li的索引
	 * @param {String} className 类名
	 */
	Editor.prototype.setFlag = function(i, className) {
		$('#command-number').children().eq(i).addClass(className);
	};


	/**
	 * 获取指令编辑器中的输入内容
	 * @return {array} 经过去除首尾空白符的指令
	 */
	Editor.prototype.getCommands = function() {
		var commands = [];
		$('#command-list').val().toLowerCase().split(/\n/g).forEach(function(command){
			commands.push($.trim(command));
		});
		return commands;
	};

	/**
     * 指令
     * @type {Array}
     */
    Editor.prototype.commands = [
    {
        pattern: /^go(\s+)?(\d+)?$/i
    },
    ];

	 /**
     * 依次编译指令
     * @return {bollean} 编译结果 
     */
	Editor.prototype.compileComands = function(string) {
		for(var i = 0,len = this.commands.length;i<len;i++) {
            var command = this.commands[i];
            var match = string.match(command.pattern);
            if(match){
                match.shift();
                return true;
            }
        }
        return false;
	};

	/**
	 * 设置错误提示信息
	 * @param {int} i         行数
	 * @param {string} className 类名
	 */
	Editor.prototype.setError = function(i,className) {
		$('#error').addClass(className);
		switch(className){
			case "errorText":
			$("#error").text("错误：第"+i+"行无效指令/(ㄒoㄒ)/~~");
			break;
			case "warnningText":
			$("#error").text("警告: 前面没有路了");
			break;

		}
	};
    
    /**
     * 清除错误信息
     */
	Editor.prototype.clearErrorText = function() {
		$("#error").text("");
	};


	return {
		Editor:Editor
	};
});