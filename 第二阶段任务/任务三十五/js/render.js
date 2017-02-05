define(function(){
	/**
	 * 表格constructor
	 * @param  {int} row   行数
	 * @param  {int} col   列数
	 */
	var Table = function(row,col){
		if(typeof Table.instance === 'object'){
            return Table.instance;
        }
		this.$element = $('#background');
		this.row = row;
		this.col = col;
		this.init();
		Table.instance = this;
	};

	/**
	 * 表格初始化
	 * @return {[type]} [description]
	 */
	Table.prototype.init = function() {
		for(var i = 0;i<this.row;i++) {
			var strTr = "<tr>";
			for(var j = 0;j<this.col;j++) {
				var strTd = "";
				//标注行数
				if(i ==0 && j>0) {
					strTd = "<td>"+ j +"</td>";
				}
				//标注列数
				else if(j == 0 && i>0) {
					strTd = "<td>" + i +"</td>"; 
				}
				else {
					strTd = "<td></td>";
				}
				strTr +=  strTd;
			}
			strTr += "</tr>";
			this.$element.append(strTr);
		}
	};
	return {
		Table:Table
	};
}	
);