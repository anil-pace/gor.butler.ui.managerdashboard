import React  from 'react';
import ReactDOM  from 'react-dom';
import { LOGIN_REQUEST, authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';

class Login extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    handleSubmit(e){
    	e.preventDefault();
    	let formdata={         
          	'username': this.userName.value,
          	'password': this.password.value,
         };
    	let loginData={
    		'formdata':formdata,
    		'url':'./dummy.json',
        	'method':'POST',
        	'contentType':'application/json'
    	}
    	
	    this.props.authLoginData(loginData);
    }
	render(){
		return (
			<form action="#" onSubmit={(e) => this.handleSubmit(e)}>
			<div>
				<input type="text" id="username"  placeholder="Enter Username" ref={node => { this.userName = node }}/>
				<input type="password" id="password" placeholder="Enter Password" ref={node => { this.password = node }}/>
				<select ref='language'>
					<option value="en-US">English</option>
					<option value="ch">Chinese</option>
				</select>
				<input type="submit"  value="Login" />
 			</div>
 			</form>
		);
	}
};

function mapStateToProps(state, ownProps){
	return state;
}

var mapDispatchToProps = function(dispatch){
    return {
        authLoginData: function(params){ dispatch(authLoginData(params)); }
    }
};

export 	default connect(mapStateToProps,mapDispatchToProps)(Login);