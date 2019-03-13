// rewrited by Zhangdi(zhangdiwaa@163.com) and Hanyuping(yuping0713@126.com)

(function () {
	$(function () {
		$('.datatable').dataTable({
			aoColumnDefs: [
				{
					bSortable: false,
					aTargets:  [0]
				}
			],
			aaSorting:    []
		});
		return $(".datatable").each(function () {
			var datatable, length_sel, search_input;
			datatable = $(this);
			search_input = datatable.closest(".dataTables_wrapper").find("div[id$=_filter] input");
			search_input.attr("placeholder", "搜索");
			search_input.addClass("form-control input-sm");
			length_sel = datatable.closest(".dataTables_wrapper").find("div[id$=_length] select");
			length_sel.addClass("form-control input-sm");
			length_sel = datatable.closest(".dataTables_wrapper").find("div[id$=_info]");

			var add_html = '<a class="btn btn-info btn-top btn-user" role="button" href="user-add.html">' +
					'<em class="fa fa-upload"> ' +
					'</em>' +
					'&nbsp;excel导入' +
					'</a>' +
					'&nbsp;&nbsp;',
				ban_html = '<button class="btn btn-success btn-user"> ' +
					'<em class="fa fa-file-excel-o"> ' +
					'</em>' +
					'&nbsp;excel导出' +
					'</button>' +
					'&nbsp;&nbsp;',
				search_html = '<button class="btn btn-default btn-user"> ' +
					'<em class="icon-remove icon-white"> ' +
					'</em>' +
					'&nbsp;删除' +
					'</button>' +
					'&nbsp;&nbsp;';

			$('.dataTables_wrapper .pull-right:first-child').append(add_html + ban_html);
			//$('.dataTables_wrapper .pull-right:first-child').prepend(search_html);
			return length_sel.css("margin-top", "18px");
		});
	});

}).call(this);
