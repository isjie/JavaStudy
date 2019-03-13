
(function () {
	//icheck
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass:    'iradio_square-green',
		increaseArea:  '20%' // optional
	});
	//修改密码，置换
	$("#oldpwd-auth-set").click(function(){
		$("#oldpwd-auth").hide();
		$("#newpwd-auth").show();
	});

	//个人信息修改
	$("#tab-userself-edit").click(function(){
		$("#tab_userself").find("input").attr("disabled", false);
		$("#tab_userself").find("select").attr("disabled", false);
		$("#tab-userself-edit").hide();
		$("#tab-userself-edit-pane").show();
	})
	//个人信息修改完毕/取消
	$("#tab-userself-edit-cancel").click(function(){
		$("#tab_userself").find("input").attr("disabled", true);
		$("#tab_userself").find("select").attr("disabled", true);
		$("#tab-userself-edit-pane").hide();
		$("#tab-userself-edit").show();
	})

	//添加新学历
	var addEduFuc = function(){
		var edu = $(".education").first().clone();
		var edu_num = $(".education").length+1;
		var new_edu_name = $("#addEduModal").find("#new-edu-name").val();
		var new_edu_year = $("#addEduModal").find("#new-edu-year").val();
		var new_edu_collage = $("#addEduModal").find("#new-edu-collage").val();
		var new_edu_major = $("#addEduModal").find("#new-edu-major").val();

		edu.find(".old-edu-name").val(new_edu_name);
		edu.find(".old-edu-year").val(new_edu_year);
		edu.find(".old-edu-collage").val(new_edu_collage);
		edu.find(".old-edu-major").val(new_edu_major);
		edu.find(".old-edu-num").text(edu_num);

		console.log(edu_num);
		$(".edu-pane").append(edu);
	}
	$('#add-edu-button').click(addEduFuc);

}).call(this);