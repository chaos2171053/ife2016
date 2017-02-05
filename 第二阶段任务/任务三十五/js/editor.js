define(function(){
	var $commandNumber = $('#command-number');// 指令行数列表
	var $commandList = $('#command-list');//指令列表
	/**
	 * textarea回车事件
	 * @param  {object} event 事件
	 * @return {[type]}       [description]
	 */
	var editorKeyDown = function(event){
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
	var editorBackSpace = function(){
		var content=$commandList.val();
		var liNum = $commandNumber.get(0).children.length;// li标签数目
		var enterNum = content.split(/\n/g).length;
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

	return {
		editorKeyDown:editorKeyDown,
		editorFocus:editorFocus,
		editorBackSpace:editorBackSpace,
		editorScroll:editorScroll
	};
});