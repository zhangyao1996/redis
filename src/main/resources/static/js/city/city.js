$(function() {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

});

var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#table').bootstrapTable({
			url : '/city/cityList', // 请求后台的URL（*）
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
			columns : [ {
				checkbox : true
			}, {
				field : 'provinceId',
				title : '省'
			}, {
				field : 'cityName',
				title : '城市'
			}, {
				field : 'description',
				title : '概况'
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
        result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"detailViewById('" + id + "')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
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
                proid: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '省id不能为空'
                        }
                    }
                },
                cityname: {
                    validators: {
                        notEmpty: {
                            message: '城市名不能为空'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e){
        	$("form").submit(function(){
        		var id=$("#id").val();
        		var provinceId=$("#proid").val();
            	var cityName=$("#cityname").val();
            	var description=$("#description").val();
            	var flag = $('form').data("bootstrapValidator").isValid();// 校验合格
            	if(flag&&id==""){
            		$.ajax({
            			url : '../../city/add',
            			type : 'post',
            			dataType : 'json',
            			contentType : 'application/json;charset=UTF-8',
            			data : JSON.stringify({
            				provinceId : provinceId,
            				cityName : cityName,
            				description:description
            			}),
            			success : function(data) {
            				if (data.result == true) {
            					toastr.success(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
                              	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
            				} else {
            					toastr.error(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
                             	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
            				}
            			}
            		})
            	}else if (flag&&id!="") {
            		$.ajax({
            			url : '../../city/edit',
            			type : 'post',
            			dataType : 'json',
            			contentType : 'application/json;charset=UTF-8',
            			data : JSON.stringify({
            				id:id,
            				provinceId : provinceId,
            				cityName : cityName,
            				description:description
            			}),
            			success : function(data) {
            				if (data.result == true) {
            					toastr.success(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
                              	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
            				} else {
            					toastr.error(data.msg);
            					$('#myModal').modal('hide');// 关闭模态框
                             	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
            				}
            			}
            		})
				}
        	})
        });
    });
    
    
    
   
    
    // toolBar函数实现

    $("#btn_query").on("click", function () {
         /** * 查询 */ 
    	
    	$('#table').bootstrapTable('refresh', { pageNumber: 1 });
    })
    
    // 打开添加模态框
    $("#btn_add").on("click", function () {
    	
    	$("#closebtn").show();
    	$("#submitbtn").show();
     	$("#myModalLabel").text("增加");
    	$("#myModal input").val("");
	   	 $('#proid').removeAttr("readonly");
		 $('#cityname').removeAttr("readonly");
    	$('#myModal').modal();
    })
    
    
    // 打开编辑模态框
   editViewById=function (id) {
    	 $.ajax({
             type: "get",
             url: "/city/get?id="+id,
             success: function (data) {
                 if (data) {
                	 // 赋值
                	 $("#id").val(data.id);
                	 $("#proid").val(data.provinceId);
                	 $("#cityname").val(data.cityName);
                	 $("#description").val(data.description);
                	 // 在修改城市信息时，部分不可修改
                	 
                     $('#proid').attr("readonly","readonly");
                     $('#cityname').attr("readonly","readonly");
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
                         url: "../../city/delete?id="+id,
                         success: function (data) {
                             if (data.result==true) {
                            	 toastr.success(data.msg);
                            	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
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
    
    // 点击批量删除按钮
  $("#btn_delete").on("click", function () {
    	var rows=$("#table").bootstrapTable('getSelections');
    	if(rows.length==0){
    		toastr.info('请选择要删除的数据');
    		return ;
    	}
    	var ids="";
    	for(var i=0;i<rows.length;i++){
    		ids+=rows[i]['id']+',';
    	}
    	deleteCity(ids);
    })
    
    // 批量删除操作
    function deleteCity(ids) {
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
  		message: '确认删除所选信息吗？',
  		callback: function(result) {
  			if(result) {
  				 $.ajax({
                       type: "delete",
                       url: "../../city/deleteIds?ids="+ids,
                       success: function (data) {
                           if (data.result==true) {
                          	 toastr.success(data.msg);
                          	 $('#table').bootstrapTable('refresh', { pageNumber: 1 });
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
    
  
  detailViewById=function (id) {
 	 $.ajax({
          type: "get",
          url: "/city/get?id="+id,
          success: function (data) {
              if (data) {
             	 // 赋值
             	 
             	 $("#detailModal #proid").val(data.provinceId);
             	 $("#detailModal #cityname").val(data.cityName);
             	 $("#detailModal #description").val(data.description);
             	 
                  // 显示按钮
      	    	
         		$("#detailModalLabel").text("详情");
             	$('#detailModal').modal();
              }else {
             	 toastr.error("查看信息失败");
				}
          }
      });
 }
    
    
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize : params.limit, // 页面大小
			pageNumer :(params.offset / params.limit) + 1, // 页码
			username : $("#txt_search_cityname").val(),
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