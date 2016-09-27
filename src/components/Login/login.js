import React  from 'react';
import ReactDOM  from 'react-dom';
import Footer from '../Footer/Footer';
import { authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';
import {AUTH_LOGIN} from '../../constants/appConstants'; 
import {LOGIN_URL} from '../../constants/configConstants'; 
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import Dropdown from '../../components/dropdown/dropdown.js';
import { translationMessages } from '../../utilities/i18n';


class Login extends React.Component{
	constructor(props) 
	{
    	super(props);      
    }
    componentWillMount()
    {
        document.body.className='gor-fill-back';
    }
    componentWillReceiveProps(nextProps) {
    /**
     * Checking if the user is loggedin 
     * and redirecting to main page
     */
      if(!nextProps.loginAuthorized)  
      {
         this.authError.style.display='block';
         this.userError.style.display='none';
         this.passError.style.display='none';
      }
      else
      {
           document.body.className='';
           this.context.router.push("/md");
      }
    }

    /**
     * Checks for the changes in the language selection
     * and dispatches the corresponding action.
     * @param  {String} sLocale sLocale has to be of pattern 'en-US'
     */
    _handleSelectionChange(sLocale){
        if (!sLocale){
            return ;
        }

        let data = {
            locale : sLocale,
            messages: translationMessages[sLocale]
        }
        this.props.updateIntl(data);
    }
    /**
     * @param  {[event]}
     * @return {[void]}
     * Function to handle login form submit
     */
    _handleSubmit(e){
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
                this.authError.style.display='none';
                this.passError.style.display='none';
                this.userField.style.borderColor='#EC1C24';
                this.passField.style.borderColor='';
            }
            else
            {
                this.passError.style.display='block';
                this.authError.style.display='none';
                this.userError.style.display='none';
                this.userField.style.borderColor='';                
                this.passField.style.borderColor='#EC1C24';
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
        let sel=0;
        const items =[
        { value: 'en', label: (<FormattedMessage id='login.lang.english' defaultMessage="English" description="English option in the language drop down"/>) },
        { value: 'ja', label: (<FormattedMessage id='login.lang.japanese' defaultMessage="Japanese" description="Japanese option in the language drop down"/>) },
        ];
        for (let i = 0; i < items.length; i++) 
        { 
            if(items[i].value === this.props.sLang)
                sel=i;
        }
        let usr=(<FormattedMessage id='login.form.username' defaultMessage="Username" description="Text for username"/>);
        let pwd=(<FormattedMessage id='login.form.password' defaultMessage="Password" description="Text for password"/>);

        return (
            <div className='gor-login-form'>

            <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} 
                onSubmit={(e) => this._handleSubmit(e)}>
                <div className='gor-login-lang'>
                    <div className='gor-lang-text'>
                    
                    <FormattedMessage id='login.butler.language' 
                        defaultMessage="Language" description="Text for language"/>
                
                    </div>
                    <Dropdown optionDispatch={(e) => this._handleSelectionChange(e)} items={items} styleClass={'gor-lang-drop'} currentState={items[sel]} />
                </div>
                <div className='gor-login-logo alt-gor-logo'>
                </div>
                <div className='gor-login-mid'>
                <div className='gor-upper-box'>
                    <div className='gor-login-head'>
                      <span className='gor-lg-txt'>
                       <FormattedMessage id='login.butler.title' 
                        defaultMessage="Butler" description="Text for butler management Login form title"/>
                       </span>
                       <sup>TM</sup>
                    </div>
                    <p>
                    <FormattedMessage id='login.butler.manageInterface' 

                    defaultMessage="Management Interface"
                            description="Text for Management Interface"/>

                    </p>   
                </div>
                <div className='gor-login-auth-error' 
                    ref={node => { this.authError = node }}><div className='gor-login-error'></div>

                    <FormattedMessage id='login.butler.fail' 
                        defaultMessage="Invalid username and/or password" description="Text for login failure"/>

                </div>
                <section>
                <div className='gor-login-field' ref={node => { this.userField = node }}>
				        <div className='gor-login-user'></div><input className='field' type="text" id="username"  
                        placeholder={usr.props.defaultMessage} ref={node => { this.userName = node }}/>
                </div>
                </section>
                    <div className='gor-login-usr-error' 
                    ref={node => { this.userError = node }}>

                    <FormattedMessage id='login.butler.error.username' 
                        defaultMessage="Please enter your username" description="Text for missing username error"/>

                    </div>
                <section>
                <div className='gor-login-field'  ref={node => { this.passField = node }}>
                        <div className='gor-login-password'></div><input className='field' type="password" id="password" placeholder={pwd.props.defaultMessage} ref={node => { this.password = node }}/>
                </div>
                </section>
                    <div className='gor-login-usr-error' ref={node => { this.passError = node }} >

                    <FormattedMessage id='login.butler.error.password' 
                        defaultMessage="Please enter your password" description="Text for missing password error"/>

                    </div>
                <section>
                    <input type="submit" className='gor-login-btn'  value="Login" /><br />
                </section>
                </div>
                <div className='gor-box-bottom'><span className='gor-box-bottom-left'>Current time: 09:00:15(IST)</span>
                    <span className='gor-box-bottom-right'></span>
                </div>
                </form>
                <Footer />
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
        loginAuthorized:state.authLogin.loginAuthorized,
        auth_token: state.authLogin.auth_token,
        userName: state.authLogin.username,
        sLang: state.intl.locale
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
