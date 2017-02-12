define(function(){
	
	/**
	 * 表格constructor
	 * @param  {int} row   行数
	 * @param  {int} col   列数
	 */
	var Table = function(row,col){
		var instance;
		if(typeof instance === 'object'){
            return instance;
        }
        instance = this;
		this.$element = $('#background');
		this.row = row;
		this.col = col;
		this.init();
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
					strTd = '<td class = "x-axis">'+ j +"</td>";
				}
				//标注列数
				else if(j == 0 && i>0) {
					strTd = '<td class = "y-axis">' + i +"</td>"; 
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

	/**
	 * 清除所有墙
	 */
	Table.prototype.clearWall = function(){
		$("td").removeClass("wall"); 
		$("td").css("background-color","");
	};

	/**
	 * 判断目标是否可以修墙
	 * @param  {int} x       目标x坐标
	 * @param  {int} y       目标y坐标
	 * @param  {int} squareX 小方块x坐标
	 * @param  {int} squareY 小方块y坐标
	 * @return {bollean}         可以返回false，不可以true。
	 */
	Table.prototype.canBuild = function(x,y,squareX,squareY) {
		if( x>0 && x<21 && y>0 && y< 21 && x != squareX && y != squareY){
			var targetClassName = $("tr:nth-child("+ y +") td:nth-child("+ x +")")[0].className;
			if(targetClassName != "wall"){
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}

    /**
     * 修建一堵墙
     * @param  {int} x 墙的x轴坐标
     * @param  {int} y 墙的y轴坐标
     */
	Table.prototype.build = function(x,y) {
		$("tr:nth-child("+ (y+1) +") td:nth-child("+ (x+1) +")").addClass("wall");
	};
	return {
		Table:Table
	};
}	
);