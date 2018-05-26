		var db=openDatabase("myDB","1.0","test db",2014*10);
		//获得数据库
		function Add(){
             db.transaction(function(fx){
             	fx.executeSql("create table if not exists UserInfor(UserName TEXT,Pwd TEXT)",[]);
             	var username=$("#txtusername").val();
             	var pwd=$("#txtPwd").val();
             	if(username==null||username==""||pwd==null||pwd=="")
             	{
             	    alert("请输入完整信息");
             	}
             	else
             	{
             		fx.executeSql("insert into UserInfor values(?,?)",[username,pwd],function(){
                    
             	  });
             	}

             });
		}
		function Sel(){
			
				var sql="select * from UserInfor where 1=1";
               
                var reusername=$("#reusername").val();
                 
                 if(reusername!="")
                 {
                    sql += " and UserName= '" +reusername+ "'";
                 }
                 db.transaction(function(fx){
                 	$('#dCon').html("");
                   fx.executeSql(sql,[],function(fx,rs){
                   	for(var i=0;i<rs.rows.length;i++)
                   	{
                   		var s="<div>"+rs.rows.item(i).UserName+"&nbsp;&nbsp;"+rs.rows.item(i).Pwd+"</div>";
                   		$("#dCon").append(s);
                   	}
                   });

			});
		}
		function Del(){
           db.transaction(function(fx){
           	var username=$("#deName").val();
               fx.executeSql("delete from UserInfor where UserName=?",[username],function(){
               	alert("删除成功");
               	Sel();
               });
           });
		}
		function Update(){
           db.transaction(function(fx){
              var username=$("#upName").val();
              var newPwd=$("#upPwd").val();
              fx.executeSql("update UserInfor set Pwd=? where UserName=?",[newPwd,username],function(){
                  alert("修改成功");
                  Sel();
              });
           });
		}