import React  from 'react';
import ReactDOM  from 'react-dom';

class Login extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    handleLogin(){
    var  data={         
          'username': document.getElementById('username').value,
          'password': document.getElementById('password').value
          }
    }
	render(){
		return (
			<div>
				<input type="text" id="username" placeholder="Enter Username" ref='username'/>
				<input type="password" id="password" placeholder="Enter Password" ref='password'/>
				<select ref='language'>
					<option value="en-US">English</option>
					<option value="ch">Chinese</option>
				</select>
				<input type="button" id="loginBtn" onClick={this.handleLogin} value="Login" />
 			</div>
		);
	}
};


export default Login;