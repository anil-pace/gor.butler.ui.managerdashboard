import React  from 'react';
import ReactDOM  from 'react-dom';
import { LOGIN_REQUEST, authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';
import {LOGIN_URL, AUTH_LOGIN} from '../../constants/appConstants'
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import { translationMessages } from '../../utilities/i18n';

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
           this.context.router.push("/overview");
      }
    }

    handleSelectionChange(e){
        let sLocale = this.locale.value;
        let sParentLocale = sLocale.split('-')[0];
        let data = {
            locale : this.locale.value,
            messages: translationMessages[sParentLocale]
        }
        this.props.updateIntl(data);
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
        if(!formdata.username||!formdata.password)
        {
            if(!formdata.username)
            {
                this.userError.style.display='block';
            }
            else
            {
                this.passError.style.display='block';
            }
            return;
        }
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
            <div className='login-form'>
            <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} 
                onSubmit={(e) => this.handleSubmit(e)}>
                <div className='login-lang'>
                    <span>Language:</span>
                    <select ref='language' onChange={(e) => this.handleSelectionChange(e)}
                          ref={node => { this.locale = node }}>
                        <option value="en-US">
                            <FormattedMessage id='login.lang.english' defaultMessage="English"
                            description="English option in the language drop down"/>
                        </option>
                        <option value="ja-JP">
                        <FormattedMessage id='login.lang.japanese' defaultMessage="Japanese"
                            description="Japanese option in the language drop down"/></option>
                    </select>
                </div>
                <div className='login-mid'>
                <div className='upper-box'>
                    <div className='login-head'>Butler</div>
                    <p>
                    <FormattedMessage id='login.manageInterface' 
                    defaultMessage="Management Interface"
                            description="Text for Management Interface"/></p>   
                </div>
                <section>
				    <input className='login-field' type="text" id="username"  placeholder="Username" ref={node => { this.userName = node }}/>
                </section>
                    <div className=' login-usr-error' ref={node => { this.userError = node }} >Please enter your username</div>
                <section>
                    <input className='login-field' type="password" id="password" placeholder="Password" ref={node => { this.password = node }}/>
                </section>
                    <div className='login-usr-error' ref={node => { this.passError = node }} >Please enter your password</div>
                <section>
                    <input type="submit" className='login-btn'  value="Login" /><br />
                </section>
                <div className='login-fgt'>
                    <a>Forgot password?</a>
                </div>
                </div>
                <div className='box-bottom-left'><span>Current time: 09:00:15(IST)</span></div>
                <div className='box-bottom-right'><span>v 1.0</span></div>
                </form>
            </div>
		);
	}

};
/**
 * [Passing Router to component through context]
 * @type {Object}
 */
Login.contextTypes = {
        router: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps){
	return {
        auth_token: state.authLogin.auth_token,
        userName: state.authLogin.username
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
        authLoginData: function(params){ dispatch(authLoginData(params)); },
        updateIntl: function(params){ dispatch(updateIntl(params));}
    }
};

export 	default connect(mapStateToProps,mapDispatchToProps)(Login);

