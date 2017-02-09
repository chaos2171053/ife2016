define(function(){
	// var $commandNumber = $('#command-number');// 指令行数列表
	// var $commandList = $('#command-list');//指令列表
	
	// /**
	//  * textarea回车事件
	//  * @param  {object} event 事件
	//  */
	// var inputKeyDown = function(event){
	// 	if(event.keyCode == 13) {
	// 		$commandNumber.append("<li></li>").eq(0);// 按下回车，ol添加一个li作为指令行数。
	// 	}
	// };

	// /**
	//  * textarea获取焦点在文本最后一行
	//  */
	// var editorFocus = function(){
	// 	var content=$.trim($commandList.val());   
	// 	$commandList.val("").focus().val(content);  
	// };

	// /**
	//  * 根据右边指令行数更新左边行数目显示
	//  */
	// var intutBackSpace = function(){
	// 	var command=$commandList.val();
	// 	var liNum = $commandNumber.eq(0).children.length;// li标签数目
	// 	var enterNum = command.split(/\n/g).length; // 换行符个数
	// 	if(liNum != enterNum) {
	// 		$('li').last().remove();
	// 	}
	// };

    /**
     * 滚动右边指令时，左边指令行数同步滚动。
     */
	// var editorScroll = function(){
	// 	$commandNumber.scrollTop($commandList.eq(0).scrollTop).eq(0);
	// };

 //    /**
 //     * 编译指令 如果成功则返回命令对象，否则返回 false
 //     * @return {bollean} 判断结果
 //     */
	// var commandCompile = function(){
	// 	var array = $commandList.val().toLowerCase().split(/\n/g);
	// 	console.log(array);
	// };

	// var commandExecute = function(){
		
	// };
	// return {
	// 	commandExecute:commandExecute,
	// 	commandCompile:commandCompile,
	// 	inputKeyDown:inputKeyDown,
	// 	intutBackSpace:intutBackSpace,
	// 	editorFocus:editorFocus,
	// 	editorScroll:editorScroll
	// };
	

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
		// if(i !== undefined){
		// 	$('#command-number').children().eq(i-1).removeClass("success");
		// }else{
		// 	$('#command-number').children().removeClass();
		// }
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


	return {
		Editor:Editor
	};
});