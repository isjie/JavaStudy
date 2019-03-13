
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
			error="�û�������Ϊ��";
		  }else if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
			error = '��������ȷ��Email';
		}
		this.setState({
		  username: value,
		  usernameError: error
		});
	},

	 handleUserpwd:function(e){
		  var value=e.target.value;
		  var error='';
		  if(value==""){error="���벻��Ϊ��";}
		  if(value.length<6){error='���볤�Ȳ�������6���ַ�';}
		  if(value.length>20){error='���볤�Ȳ��ô���20���ַ�';}
		  this.setState({
			userpwd:value,
			userpwdError:error
		  });
	 },

	 handleReuserpwd:function(e){
		  var value=e.target.value;
		  var error='';
		  {/*alert(value+","+this.state.userpwd);*/}
		  if(value==""){error="���ٴ���������";}
		  if(value!=this.state.userpwd){error='������������벻һ�£�����������';}

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
			<label>�û���</label>
			<span className="style_span">{this.state.usernameError}</span>
			<input id="username" name="username" type="text" className="form-control" value={this.state.username} placeholder="�����볣������" onChange={this.handleUsername} />                  
		  </div>
		  <div className="form-group">
			  <label>����</label>
			  <span className="style_span">{this.state.userpwdError}</span>
			  <input id="userpwd" name="userpwd" type="password" className="form-control" placeholder="����������" value={this.state.userpwd} onChange={this.handleUserpwd} />    
		  </div>
		  <div className="form-group">
			  <label>ȷ������</label>
			  <span className="style_span">{this.state.reuserpwdError}</span>
			  <input id="reuserpwd" name="reuserpwd" type="password" className="form-control" placeholder="���ٴ���������" value={this.state.reuserpwd} onChange={this.handleReuserpwd} />                   
		  </div>
		   <div className="form-group" >
			  <center>
				<a className="btn btn-danger " href="gerenxinx.html" role="button"  onClick={this.loginSave}>��һ��</a>
			  </center> 
			</div>
		</form>
	  );
	}
}); 
	