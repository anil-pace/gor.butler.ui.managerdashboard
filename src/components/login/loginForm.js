import React  from 'react';
import ReactDOM  from 'react-dom';
import {authLoginData,setLoginSpinner,connectionFault,setUsername} from '../../actions/loginAction';
import {validateID, validatePassword} from '../../actions/validationActions';
import { connect } from 'react-redux';
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST} from '../../constants/appConstants'; 
import {LOGIN_URL} from '../../constants/configConstants'; 
import { FormattedMessage } from 'react-intl';
import { emptyField } from '../../utilities/fieldCheck';

class LoginForm extends React.Component{
	 constructor(props) 
	 {
    	super(props);      
   }
    _checkUser(){
        let userid=this.userName.value, userNameCheck;
        userNameCheck=emptyField(userid);
        this.props.validateID(userNameCheck);
        return userNameCheck.type;
    }
    _typing(Field){
      if(Field===1)
        this.userField.className=TYPING;
      else
        this.passField.className=TYPING;
    }
    _checkPass(){
          let password=this.password.value.trim(), loginPassInfo;
          loginPassInfo=emptyField(password);
          this.props.validatePass(loginPassInfo);
          return loginPassInfo.type;    
    }
    _handleSubmit(e){
    	e.preventDefault();
      if(!window.navigator.onLine)
      {
        this.props.connectionFault();
    	   return;
      }
      if(!this.props.userNameCheck.type||!this.props.passWordCheck.type)
        {
            if(!this._checkUser())
                return;
            if(!this._checkPass())
                return;
        }
       let formdata={         
            'username': this.userName.value,
            'password': this.password.value,
        };

        let loginData={
                'url':LOGIN_URL,
                'formdata':formdata,
                'method':POST,
                'cause':AUTH_LOGIN,
                'contentType':APP_JSON,
                'accept':APP_JSON
            }
        sessionStorage.setItem('nextView', 'md');
        this.props.setLoginSpinner(true);
        this.props.setUsername(formdata.username);
        this.props.authLoginData(loginData);
    }
	render(){
        return (
              <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} 
                onSubmit={(e) => this._handleSubmit(e)}>
                <div className='gor-login-mid'>
                <div className='gor-upper-box'>
                    <div className='gor-login-head'>
                      <span className='gor-lg-txt'>
                       <FormattedMessage id='login.butler.title' 
                        defaultMessage="Butler" description="Text for butler management Login form title"/>
                       </span>
                       <sup><FormattedMessage id='login.butler.trademark' 
                    defaultMessage="TM"
                            description="Trademark"/></sup>
                    </div>
                    <p>
                    <FormattedMessage id='login.butler.manageInterface' 
                    defaultMessage="Management Interface"
                            description="Text for Management Interface"/>
                    </p>   
                </div>
                {(this.props.loginAuthorized===false)?(<div className='gor-login-auth-error'><div className='gor-login-error'></div>

                    <FormattedMessage id='login.butler.fail' 
                        defaultMessage="Invalid username and/or password, please try again" description="Text for login failure"/>
                 </div>):''
                }
                {(this.props.connectionActive===false)?(<div className='gor-login-auth-error'><div className='gor-login-error'></div>

                    <FormattedMessage id='login.butler.connection.fail' 
                        defaultMessage="Connection failure" description="Text for connection failure"/>
                 </div>):''
                }
                <section>
                <div className={'gor-login-field'+(this.props.userNameCheck.type===ERROR||this.props.loginAuthorized===false?' gor-input-error':' gor-input-ok')} ref={node => { this.userField = node }}>
				        <div className={this.props.userNameCheck.type===ERROR||this.props.loginAuthorized===false?'gor-login-user-error':'gor-login-user'}></div>
                        <input className="field" onInput={this._typing.bind(this,1)} onBlur={this._checkUser.bind(this)} type="text" id="username"  
                        placeholder={this.props.intlMessages["login.form.username"]}
                         ref={node => { this.userName = node }}/>                    
                </div>
                </section>
                {this.props.userNameCheck?(this.props.userNameCheck.type===ERROR?(
                    <div className='gor-login-usr-error' >
                    <FormattedMessage id='login.butler.error.username' 
                        defaultMessage="Please enter your username" description="Text for missing username error"/>
                    </div>):''):''
                }
                <section>
                <div className={'gor-login-field'+(this.props.passWordCheck.type===ERROR||this.props.loginAuthorized===false?' gor-input-error':' gor-input-ok')}  ref={node => { this.passField = node }}>
                        <div className={this.props.passWordCheck.type===ERROR||this.props.loginAuthorized===false?'gor-login-password-error':'gor-login-password'}></div>
                        <input className='field' onInput={this._typing.bind(this,2)} onBlur={this._checkPass.bind(this)} type="password" id="password" 
                        placeholder={this.props.intlMessages["login.form.password"]}
                         ref={node => { this.password = node }}/>
                </div>
                </section>
                {this.props.passWordCheck?(this.props.passWordCheck.type===ERROR?(
                    <div className='gor-login-usr-error' >
                    <FormattedMessage id='login.butler.error.password' 
                        defaultMessage="Please enter your password" description="Text for missing password error"/>
                    </div>):''):''
                }
                <section>
                    <input type="submit" className='gor-login-btn'  value={this.props.intlMessages["login.form.button"]} /><br />
                </section>
                </div>
                </form>
		);
	}
};

function mapStateToProps(state, ownProps){
	return {
        loginAuthorized:state.authLogin.loginAuthorized ,
        connectionActive:state.authLogin.connectionActive,
        intlMessages: state.intl.messages || {},
        userNameCheck: state.appInfo.idInfo||{},
        passWordCheck: state.appInfo.passwordInfo||{},
        loginSpinner:state.spinner.loginSpinner         
    };
}
function mapDispatchToProps (dispatch){
    return {
        authLoginData: function(params){ dispatch(authLoginData(params)); },
        validateID: function(data){ dispatch(validateID(data)); }, 
        validatePass: function(data){ dispatch(validatePassword(data)); },        
        setLoginSpinner:   function(data){ dispatch(setLoginSpinner(data)); },
        setUsername: function(data){ dispatch(setUsername(data)); },   
        connectionFault: function(){dispatch(connectionFault()); }
    };
}
export 	default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
