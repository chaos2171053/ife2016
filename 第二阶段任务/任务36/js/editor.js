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
		this.$commandNumber = $('#command-number');// 指令行数列表
		this.$commandList = $('#command-list');//指令列表
		this.$commandList.focus(this.editorFocus());
		this.$commandList.scroll(this.editorScroll);
		this.$commandList.on('input propertychange',this.textChanged);
		this.init();
	};

    /**
     * 编辑器初始化
     */
	Editor.prototype.init = function() {
		this.isRunning = false;
		this.isSuccessful = false;
		this.textChanged();
		this.clearFlag();
		this.clearErrorText();
	};
	/**
	 * 根据右边指令行数更新左边行数目显示
	 */
	Editor.prototype.textChanged = function() {
		var commands=$('#command-list').val();
		var liNum =$('#command-number').get(0).children.length;// li标签数目
		var enterNum = commands.split(/\n/g).length; // 换行符个数
		if(liNum != enterNum) {
			var htmlStr = "";
			for(var i =0;i<enterNum;i++){
				htmlStr +="<li></li>";
			}
			$('#command-number').html(htmlStr);
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
	Editor.prototype.clearFlag = function() {
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
	 * @return {object} cmd：经过去除首尾空白符、中间多个空格的非空白指令, index：指令索引。
	 */
	Editor.prototype.getCommands = function() {
		var commands = {};
		var cmdIndex = [];
		$('#command-list').val().toLowerCase().split(/\n/g).forEach(function(command,i){
			if(command){
				commands[i] = $.trim(command);
				cmdIndex.push(i);
			}
		});
		return {
			cmd:commands,
			index:cmdIndex
		};
		// return [commands,cmdIndex];
	};

	/**
     * 指令
     * @type {Array}
     */
    Editor.prototype.commands = [
    {
        pattern: /^go(\s+)?(\d+)*$/i
    },
    {
    	pattern:/^tra\s+(lef|top|rig|bot)\s*\d*$/i
    },
    {
    	pattern:/^mov\s+(lef|top|rig|bot)\s*\d*$/i
    },
    {
    	pattern:/^tun\s+(lef|rig|bac)$/i
    },
    {
    	pattern:/^build$/i
    },
    {
    	pattern:/^bru\s+#[0-9a-fA-F]{6}$/i
    },
    {
    	pattern:/^mov\s+to\s*\d*,\d*$/i
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
	Editor.prototype.setErrorText = function(i,className) {
		$('#error').addClass(className);
		switch(className){
			case "errorText":
			$("#error").text("错误：第"+(i+1)+"行无效指令!");
			break;
			case "warnningText":
			$("#error").text("警告: 前进方向有墙!");
			break;
			case "RunningText":
			$("#error").text("警告: 执行指令中!");
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