import React  from 'react';
import ReactDOM  from 'react-dom';
import Footer from '../Footer/Footer';
import Loader from '../../components/loader/Loader'
import { authLoginData,mockLoginAuth,setUsername,setLoginLoader } from '../../actions/loginAction';
import {validateID, validatePass, resetForm} from '../../actions/validationActions';
import { connect } from 'react-redux';
import {AUTH_LOGIN,ERROR} from '../../constants/appConstants'; 
import {LOGIN_URL} from '../../constants/configConstants'; 
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import Dropdown from '../../components/dropdown/dropdown.js';
import { translationMessages } from '../../utilities/i18n';
import { messages } from './messages'


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
      if(nextProps.loginAuthorized)  
      {
           this.props.resetForm();
           document.body.className='';
           this.context.router.push("/md");
      }
    }
    _checkUser(){
            let data1={userid:this.userName.value};
            this.props.validateID(data1);
    }
    _checkPass(){
            let data1={password:this.password.value};
            this.props.validatePass(data1);
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
            return;
        }
        let loginData={
                'url':LOGIN_URL,
                'formdata':formdata,
                'method':'POST',
                'cause':AUTH_LOGIN,
                'contentType':'application/json',
                'accept':'application/json'
            }
        sessionStorage.setItem('nextView', 'md');
        if(MOCK === false){
    	    this.props.setUsername(formdata.username);
            this.props.setLoginLoader(true);
            this.props.authLoginData(loginData);
        }
        else{
            this.props.mockLoginAuth(loginData);
        }
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
        return (
               
            <div className='gor-login-form'>
            <Loader isLoading={this.props.loginLoading} />
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
                {(this.props.loginAuthorized===false)?(<div className='gor-login-auth-error'><div className='gor-login-error'></div>

                    <FormattedMessage id='login.butler.fail' 
                        defaultMessage="Invalid username and/or password" description="Text for login failure"/>

                 </div>):''
                }
                <section>
                <div className={'gor-login-field'+(this.props.idInfo.type===ERROR||this.props.loginAuthorized===false?' gor-input-error':' gor-input-ok')} ref={node => { this.userField = node }}>
				        <div className={this.props.idInfo.type===ERROR||this.props.loginAuthorized===false?'gor-login-user-error':'gor-login-user'}></div>
                        <input className="field" onBlur={this._checkUser.bind(this)} type="text" id="username"  
                        placeholder={this.props.intlMessages["login.form.username"]}
                         ref={node => { this.userName = node }}/>
                        
                </div>
                </section>
                {this.props.idInfo?(this.props.idInfo.type===ERROR?(
                    <div className='gor-login-usr-error' >

                    <FormattedMessage id='login.butler.error.username' 
                        defaultMessage="Please enter your username" description="Text for missing username error"/>

                    </div>):''):''
                }
                <section>
                <div className={'gor-login-field'+(this.props.loginPassCheck.type===ERROR||this.props.loginAuthorized===false?' gor-input-error':' gor-input-ok')}  ref={node => { this.passField = node }}>
                        <div className={this.props.idInfo.type===ERROR||this.props.loginAuthorized===false?'gor-login-password-error':'gor-login-password'}></div>
                        <input className='field' onBlur={this._checkPass.bind(this)} type="password" id="password" 
                        placeholder={this.props.intlMessages["login.form.password"]}
                         ref={node => { this.password = node }}/>
                </div>
                </section>
                {this.props.loginPassCheck?(this.props.loginPassCheck.type===ERROR?(
                    <div className='gor-login-usr-error' >

                    <FormattedMessage id='login.butler.error.password' 
                        defaultMessage="Please enter your password" description="Text for missing password error"/>

                    </div>):''):''
                }
                <section>
                    <input type="submit" className='gor-login-btn'  value="Login" /><br />
                </section>
                </div>
                <div className='gor-box-bottom'><span className='gor-box-bottom-left'></span>
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
        sLang: state.intl.locale,
        intlMessages: state.intl.messages,
        idInfo: state.appInfo.idInfo||{},
        loginPassCheck: state.appInfo.loginPassInfo||{},
        loginLoading:state.loader.loginLoader           
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
        updateIntl: function(params){ dispatch(updateIntl(params));},
        mockLoginAuth: function(params){ dispatch(mockLoginAuth(params)); },
        validateID: function(data){ dispatch(validateID(data)); }, 
        setUsername: function(data){ dispatch(setUsername(data)); },        
        validatePass: function(data){ dispatch(validatePass(data)); },        
        resetForm:   function(){ dispatch(resetForm()); },
        setLoginLoader:   function(data){ dispatch(setLoginLoader(data)); }
    }
};

export 	default connect(mapStateToProps,mapDispatchToProps)(Login);
