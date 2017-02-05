define(function(){
	var $commandNumber = $('#command-number');// 指令行数列表
	var $commandList = $('#command-list');//指令列表
	
	/**
	 * textarea回车事件
	 * @param  {object} event 事件
	 */
	var inputKeyDown = function(event){
		if(event.keyCode == 13) {
			$commandNumber.append("<li></li>").get(0);// 按下回车，ol添加一个li作为指令行数。
		}
	};

	/**
	 * textarea获取焦点在文本最后一行
	 */
	var editorFocus = function(){
		var content=$.trim($commandList.val());   
		$commandList.val("").focus().val(content);  
	};

	/**
	 * 根据右边指令行数更新左边行数目显示
	 */
	var intutBackSpace = function(){
		var command=$commandList.val();
		var liNum = $commandNumber.get(0).children.length;// li标签数目
		var enterNum = command.split(/\n/g).length; // 换行符个数
		if(liNum != enterNum) {
			$('li').last().remove();
		}
	};

    /**
     * 滚动右边指令时，左边指令行数同步滚动。
     */
	var editorScroll = function(){
		$commandNumber.scrollTop($commandList.get(0).scrollTop).get(0);
	};

    /**
     * 编译指令 如果成功则返回命令对象，否则返回 false
     * @return {bollean} 判断结果
     */
	var commandCompile = function(){
		var array = $commandList.val().toLowerCase().split(/\n/g);
		console.log(array);
	};

	var commandExecute = function(){
		
	};
	return {
		commandExecute:commandExecute,
		commandCompile:commandCompile,
		inputKeyDown:inputKeyDown,
		intutBackSpace:intutBackSpace,
		editorFocus:editorFocus,
		editorScroll:editorScroll
	};
});