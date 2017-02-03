define(function(){
	/**
	 * 渲染表格
	 * @param  {object} tbody tbody
	 * @param  {int} row   行数
	 * @param  {int} col   列数
	 */
	var createTable = function(tbody,row,col){
		for(var i = 0;i<row;i++) {
			var strTr = "<tr>";
			for(var j = 0;j<col;j++) {
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
			tbody.append(strTr);
		}
		
	};
	return {
		createTable:createTable
	};

}	
);