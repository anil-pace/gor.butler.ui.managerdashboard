import React  from 'react';
import ReactDOM  from 'react-dom';
import { authLoginData } from '../../actions/loginAction';
import { connect } from 'react-redux';
import {LOGIN_URL, AUTH_LOGIN} from '../../constants/appConstants'
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import { translationMessages } from '../../i18n';
import Dropdown from '../../components/dropdown/dropdown.js';

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
		return (
            <div className='login-form'>
            <form action="#"  id = "loginForm" ref={node => { this.loginForm = node }} 
                onSubmit={(e) => this.handleSubmit(e)}>
                <div className='login-lang'>
                    <div className='lang-text'>Language:</div>
                    <Dropdown 
                     pf={(e) => this.handleSelectionChange(e)} items={item} styleClass={'lang-drop'} defSel={sel} />
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
                    <div className=' login-usr-error' 
                    ref={node => { this.userError = node }}>Please enter your username</div>
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
    console.log(state);
	return {
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
