(function(){
	var student = $('student');
	var worker = $('worker');
	var city = $('city');
	var school = $('school');
	var citySchool = document.getElementsByClassName('city-school')[0];
	var company = document.getElementsByClassName('company')[0];
	var schoolData = [["厦门理工学院","厦门大学","华侨大学"],["朝阳科技大学","台中科技大学"]];

	addEventHandler(student,'change',function() {
		if(student.checked) {
			citySchool.style.display = "block";
			company.style.display = "none";
		}
		else {
			citySchool.style.display = "none";
			company.style.display = "block";
		}
	});
	addEventHandler(worker,'change',function(){
		if(worker.checked) {
			citySchool.style.display = "none";
			company.style.display = "block";
		}
		else{
			citySchool.style.display = "block";
			company.style.display = "none";
		}
	});

	addEventHandler(city,'change',function(){
		var schoolOption=schoolData[city.selectedIndex-1];
		 //清空学校下拉框，仅留提示选项
        school.length=1;

         //将学校数组中的值填充到学校下拉框中
         for(var i=0,len = schoolOption.length;i<len;i++){
             school[i+1]=new Option(schoolOption[i],schoolOption[i]);
         }

	});



})();