$(function() {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

});

$('#file-fr').fileinput({
    theme: 'fa',
    language: 'zh',
    uploadAsync: true,// 异步上传
    uploadUrl: '../../user/upload',
    allowedFileExtensions: ['jpg', 'png', 'gif','mp4'],
    maxFileSize:0,
    maxFileCount:10
})
/*
 * .on("fileuploaded", function(event,data) { // 异步上传成功结果处理
 * alert(data.response.src); $("#img").val(data.response.src); })
 */
 
 // 异步上传返回结果处理
  $('#file-fr').on('fileerror', function(event, data, msg) {
      console.log("fileerror");
      console.log(data);
  });
  // 异步上传返回结果处理
  $("#file-fr").on("fileuploaded", function(event, data, previewId, index) {
      console.log("fileuploaded");
      // 获取img路径
      $("#img").val(data.response.src);
  });

  // 上传前
  $('#file-fr').on('filepreupload', function(event, data, previewId, index) {
      console.log("filepreupload");
  });

var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#table').bootstrapTable({
			url : '/user/userList', // 请求后台的URL（*）
			method : 'get', // 请求方式（*）
			toolbar : '#toolbar', // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch : true,
			showColumns : true, // 是否显示所有的列
			showRefresh : true, // 是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "id", // 每一行的唯一标识，一般为主键列
			showToggle : true, // 是否显示详细视图和列表视图的切换按钮
			cardView : false, // 是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [{
				field : 'id',
				title : 'ID'
			}, {
				field : 'username',
				title : '用户名'
			}, {
				field : 'password',
				title : '密码'
			},  {
				field : 'img',
				title : '图片',
				width:200,
				formatter:function(value, row,index){
					var s;
					if (row.img!=null) {
						var url='../../lib/img/'+row.img;
					// url='../../lib/img/1.jpg';
						s = '<img style="width:100px;" src="'+url+'" class="img-rounded"/>';
					}
					return s;
				}
			},{
                field:'id',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter
            }, ],
            onLoadSuccess: function () {
            },
            onLoadError: function () {
                // showTips("数据加载失败！");
            },
  
		});

	};
	
	

	// 操作栏的格式化
    function actionFormatter(value, row, index) {
        var id = value;
        var result = "";
        result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"editViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
        result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"deleteById('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";

        return result;
    }
	
    
    
    // 表单验证
    $(function () {
        $('form').bootstrapValidator({
　　　　　　　　message: 'This value is not valid',
            　feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                username: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e){
        	$("form").submit(function(){
        		var id=$("#id").val();
        		var username=$("#username").val();
        		var password=$("#password").val();
        		var img=$("#img").val();
            	var flag = $('form').data("bootstrapValidator").isValid();// 校验合格
            	if(flag&&id==""){
            		$.ajax({
            			url : '../../user/add',
            			type : 'post',
            			dataType : 'json',
            			contentType : 'application/json;charset=UTF-8',
            			data : JSON.stringify({
            				username : username,
            				password : password,
            				img:img
            			}),
            			success : function(data) {
            				if (data.result == true) {
            					toastr.success(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
            					 location.reload();
            				} else {
            					toastr.error(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
            					 location.reload();
            				}
            			}
            		})
            	}else if (flag&&id!="") {
            		$.ajax({
            			url : '../../user/edit',
            			type : 'post',
            			dataType : 'json',
            			contentType : 'application/json;charset=UTF-8',
            			data : JSON.stringify({
            				id:id,
            				username : username,
            				password : password,
            				img:img
            			}),
            			success : function(data) {
            				if (data.result == true) {
            					toastr.success(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
            					 location.reload();
            				} else {
            					toastr.error(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
            					 location.reload();
            				}
            			}
            		})
				}
        	})
        });
    });
    
    // 打开添加模态框
    $("#btn_add").on("click", function () {
    	
    	$("#closebtn").show();
    	$("#submitbtn").show();
     	$("#myModalLabel").text("增加");
    	$("#myModal input").val("");
    	$('#myModal').modal();
    })
    
    
    // 打开编辑模态框
   editViewById=function (id) {
    	 $.ajax({
             type: "get",
             url: "/user/get?id="+id,
             success: function (data) {
                 if (data) {
                	 // 赋值
                	 $("#id").val(data.id);
                	 $("#username").val(data.username);
                	 $("#password").val(data.password);
                	 $("#img").val(data.img);
                	 
                     // 显示按钮
         	    	$("#closebtn").show();
         	    	$("#submitbtn").show();
            		$("#myModalLabel").text("编辑");
                	$('#myModal').modal();
                 }else {
                	 toastr.error("查看信息失败");
				}
             }
         });
    }
    
    // 点击删除按钮
    deleteById=function deleteCity(id){
    	bootbox.confirm({
    		buttons: {
    			confirm: {
    				label: '确认',
    				className: 'btn btn-info'
    			},
    			cancel: {
    				label: '取消',
    				className: 'btn btn-default'
    			}
    		},
    		message: '确认删除该信息吗？',
    		callback: function(result) {
    			if(result) {
    				 $.ajax({
                         type: "delete",
                         url: "../../user/delete?id="+id,
                         success: function (data) {
                             if (data.result==true) {
                            	 toastr.success(data.msg);
                            	 location.reload();
                             }else {
                            	 toastr.error(data.msg);
							}
                         },
                         error: function () {
                        	 toastr.error("删除操作出现问题");
                         }

                     });
    			} else {
    				toastr.info('没有进行数据删除');
    			}
    		},
    		// title: "bootbox confirm也可以添加标题哦",
    	    });
    }
    
 
    
  
 
    
    
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize : params.limit, // 页面大小
			pageNumer :(params.offset / params.limit) + 1, // 页码
		};
		return temp;
	};
	return oTableInit;
};

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};

	return oInit;
};