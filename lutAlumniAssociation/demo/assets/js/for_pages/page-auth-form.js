$(document).ready(function () {
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass:    'iradio_square-green',
		increaseArea:  '20%' // optional
	});

	$(".showinfo").click(function(){
		$("#org_people_dialog").slideToggle("fast");
		return false;
	});


});