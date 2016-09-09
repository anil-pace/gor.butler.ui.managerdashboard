import React  from 'react';
import ReactDOM  from 'react-dom';
import { LOGIN_REQUEST, authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';
import {LOGIN_URL, AUTH_LOGIN} from '../../constants/appConstants'
import {FormattedMessage} from 'react-intl';
import messages from './messages';

class Login extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    
    componentWillReceiveProps(nextProps) {
    /**
     * Checking if the user is loggedin 
     * and redirecting to main page
     */
        
      if (nextProps.auth_token  && nextProps.userName) {
           this.props.history.push("/overview");
      }
    }
    /**
     * @param  {[event]}
     * @return {[void]}
     * Function to handle login form submit
     */
    handleSubmit(e){
    	e.preventDefault();
    	let formdata={         
          	'username': this.userName.value,
          	'password': this.password.value,
         };
    	let loginData={

    		'url':LOGIN_URL,
    		'formdata':formdata,
        	'method':'POST',
        	'cause':AUTH_LOGIN,
        	'contentType':'application/json'
    	}
    	
	    this.props.authLoginData(loginData);
    }
	render(){
		return (
            <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} onSubmit={(e) => this.handleSubmit(e)}>
			<div className='login-form'>
                Language:
                <select ref='language'>
                    <option value="en-US">English</option>
                    <option value="ch">Chinese</option>
                </select>
                <div className='login-mid'>
                <div className='upper-box'>
                    <h1>Butler</h1>
                    Management Interface   
                </div>
                <p>
				    <input className='login-field' type="text" id="username"  placeholder="Username" ref={node => { this.userName = node }}/>
				</p>
                <p>
                    <input className='login-field' type="password" id="password" placeholder="Password" ref={node => { this.password = node }}/>
				</p>
                <p>
                    <input type="submit" className='login-btn'  value="Login" />
 			    </p>
                </div>
            </div>
            <div>
            </div>
 			</form>
		);
	}
};

function mapStateToProps(state, ownProps){
	return {
        auth_token:state.authLogin.auth_token,
        userName:state.authLogin.username
    };
}
/**
 * @param  {[Function]}
 * @return {[Object]}
 * mapping dispatch function to props
 * so that they could be called from props
 */
var mapDispatchToProps = function(dispatch){
    return {
        authLoginData: function(params){ dispatch(authLoginData(params)); }
    }
};

export 	default connect(mapStateToProps,mapDispatchToProps)(Login);