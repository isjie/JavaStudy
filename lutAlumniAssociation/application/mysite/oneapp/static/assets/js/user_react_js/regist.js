
var MyLogin=React.createClass({

	  getInitialState: function() {
		return {
		  username:"",
		  usernameError:"",
		  userpwd:"",
		  userpwdError:"",
		  reuserpwd:"",
		  reuserpwdError:""
		};

	 },
	  handleUsername: function(e) {
		var value = e.target.value;
		var error = '';
		  if(value==""){
			error="用户名不能为空";
		  }else if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
			error = '请输入正确的Email';
		}
		this.setState({
		  username: value,
		  usernameError: error
		});
	},

	 handleUserpwd:function(e){
		  var value=e.target.value;
		  var error='';
		  if(value==""){error="密码不能为空";}
		  if(value.length<6){error='密码长度不得少于6个字符';}
		  if(value.length>20){error='密码长度不得大于20个字符';}
		  this.setState({
			userpwd:value,
			userpwdError:error
		  });
	 },

	 handleReuserpwd:function(e){
		  var value=e.target.value;
		  var error='';
		  {/*alert(value+","+this.state.userpwd);*/}
		  if(value==""){error="请再次输入密码";}
		  if(value!=this.state.userpwd){error='两次输入的密码不一致，请重新输入';}

		  this.setState({
			reuserpwd:value,
			reuserpwdError:error
		  });
	 },

	loginSave:function(){

	},


	render:function(){
	  return (
		<form role="form">
		  <div className="form-group">
			<label>用户名</label>
			<span className="style_span">{this.state.usernameError}</span>
			<input id="username" name="username" type="text" className="form-control" value={this.state.username} placeholder="请输入常用邮箱" onChange={this.handleUsername} />                  
		  </div>
		  <div className="form-group">
			  <label>密码</label>
			  <span className="style_span">{this.state.userpwdError}</span>
			  <input id="userpwd" name="userpwd" type="password" className="form-control" placeholder="请输入密码" value={this.state.userpwd} onChange={this.handleUserpwd} />    
		  </div>
		  <div className="form-group">
			  <label>确认密码</label>
			  <span className="style_span">{this.state.reuserpwdError}</span>
			  <input id="reuserpwd" name="reuserpwd" type="password" className="form-control" placeholder="请再次输入密码" value={this.state.reuserpwd} onChange={this.handleReuserpwd} />                   
		  </div>
		   <div className="form-group" >
			  <center>
				<a className="btn btn-danger " href="gerenxinx.html" role="button"  onClick={this.loginSave}>下一步</a>
			  </center> 
			</div>
		</form>
	  );
	}
}); 
	