import React  from 'react';
import ReactDOM  from 'react-dom';
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
        document.body.className='fill-back';
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
           this.context.router.push("/overview");
      }
    }

    /**
     * Checks for the changes in the language selection
     * and dispatches the corresponding action.
     * @param  {String} sLocale sLocale has to be of pattern 'en-US'
     */
    handleSelectionChange(sLocale){
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
                this.authError.style.display='none';
                this.passError.style.display='none';
            }
            else
            {
                this.passError.style.display='block';
                this.authError.style.display='none';
                this.userError.style.display='none';
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
        const item =[
        { value: 'en', label: (<FormattedMessage id='login.lang.english' defaultMessage="English" description="English option in the language drop down"/>) },
        { value: 'ja', label: (<FormattedMessage id='login.lang.japanese' defaultMessage="Japanese" description="Japanese option in the language drop down"/>) },
        ];
        for (let i = 0; i < item.length; i++) 
        { 
            if(item[i].value===this.props.sLang)
                sel=i;
        }
        console.log(item[sel]);
		return (
            <div className='login-form'>
            <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} 
                onSubmit={(e) => this.handleSubmit(e)}>
                <div className='login-lang'>
                    <div className='lang-text'>Language:</div>
                    <Dropdown optionDispatch={(e) => this.handleSelectionChange(e)} items={item} styleClass={'lang-drop'} currentState={item[sel]} />
                </div>
                <div className='login-logo alt-gor-logo'>
                </div>
                <div className='login-mid'>
                <div className='upper-box'>
                    <div className='login-head'><FormattedMessage id='login.butler' 
                        defaultMessage="BUTLER" description="Text for butler"/>
                    </div>
                    <p>
                    <FormattedMessage id='login.title.manageInterface' 
                    defaultMessage="Management Interface"
                            description="Text for Management Interface"/></p>   
                </div>
                <div className=' login-auth-error' 
                    ref={node => { this.authError = node }}><div className='login-error'></div>Invalid username and/or password, please try again</div>
                <section>
                <div className='login-field'>
				        <div className='login-user'></div><input className='field' type="text" id="username"  placeholder="Username" ref={node => { this.userName = node }}/>
                </div>
                </section>
                    <div className=' login-usr-error' 
                    ref={node => { this.userError = node }}>Please enter your username</div>
                <section>
                <div className='login-field'>
                        <div className='login-password'></div><input className='field' type="password" id="password" placeholder="Password" ref={node => { this.password = node }}/>
                </div>
                </section>
                    <div className='login-usr-error' ref={node => { this.passError = node }} >Please enter your password</div>
                <section>
                    <input type="submit" className='login-btn'  value="Login" /><br />
                </section>
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
