import React  from 'react';
import ReactDOM  from 'react-dom';
import { LOGIN_REQUEST, authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';

class Login extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    handleLogin(){
    	let formdata={         
          	'username': document.getElementById('username').value,
          	'password': document.getElementById('password').value,
         };
    	let loginData={
    		'formdata':formdata,
    		'url':'https://192.168.8.118/api/auth/token',
        	'method':'POST',
        	'contentType':'application/json'
    	}
    	const { dispatch} = this.props;
	    dispatch(authLoginData(loginData));
    }
	render(){
		return (
			<div>
				<input type="text" id="username"  placeholder="Enter Username" ref='username'/>
				<input type="password" id="password" placeholder="Enter Password" ref='password'/>
				<select ref='language'>
					<option value="en-US">English</option>
					<option value="ch">Chinese</option>
				</select>
				<input type="button" id="loginBtn" onClick={this.handleLogin.bind(this)} value="Login" />
 			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
	return state;
}

export 	default connect(mapStateToProps)(Login);