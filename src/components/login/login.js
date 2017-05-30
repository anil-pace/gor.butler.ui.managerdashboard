import React  from 'react';
import LoginForm from './loginForm';
import Footer from '../footer/Footer';
import Spinner from '../../components/spinner/Spinner';
import { setLoginSpinner } from '../../actions/loginAction';
import {resetForm} from '../../actions/validationActions';
import { connect } from 'react-redux';
import {EN, JA, ES, ZH, DE, FR,FILL_BACK} from '../../constants/frontEndConstants'; 
import {ENG, JAP, SPANISH, CHINESE, GERMAN, FRENCH} from '../../constants/messageConstants'; 
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';

import Dropdown from '../../components/dropdown/dropdown.js';
import TopNotifications from '../../components/topnotify/topnotify';
import { translationMessages } from '../../utilities/i18n';




class Login extends React.Component{
	 constructor(props) 
	 {
    	super(props);      
      this.state={sel:0, items :[
        { value: EN, label: ENG },
        { value: JA, label: JAP },
        { value: ES, label: SPANISH},
        { value: ZH, label: CHINESE},
        { value: DE, label: GERMAN},
        { value: FR, label: FRENCH}
      ]};
    }
    componentWillMount()
    {
        document.body.className=FILL_BACK;
        this._changeDropdown();
    } 
    _changeDropdown()
    {
        for (let i=0; i < this.state.items.length; i++) 
        { 
            if(this.state.items[i].value=== this.props.sLang)
                this.setState({sel:i});
        }      
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

    /**
     * Checks for the changes in the language selection
     * and dispatches the corresponding action.
     * @param  {String} sLocale sLocale has to be of pattern 'en-US'
     */
    _handleSelectionChange(sLocale){
        if (!sLocale){
            return ;
        }
        let data={
            locale : sLocale,
            messages: translationMessages[sLocale]
        }
        this.props.updateIntl(data);
        sessionStorage.setItem('localLanguage', sLocale);
        this._changeDropdown();
    }
 	render(){
        return (
          <div>
              <TopNotifications />
            <div className='gor-login-form'>
            
            <Spinner isLoading={this.props.loginSpinner} setSpinner={this.props.setLoginSpinner}/>
                <div className='gor-login-lang'>
                    <div className='gor-lang-text'>
                    <FormattedMessage id='login.butler.language' 
                        defaultMessage="Language" description="Text for language"/>
                    </div>
                    <Dropdown optionDispatch={(e)=> this._handleSelectionChange(e)} items={this.state.items}
                     styleClass={'gor-lang-drop'} 
                    currentState={this.state.items[this.state.sel]} />
                </div>
                <div className='gor-login-logo alt-gor-logo'>
                </div>
                <LoginForm />

                <div className='gor-box-bottom'><span className='gor-box-bottom-left'></span>
                    <span className='gor-box-bottom-right'></span>

                </div>
                <Footer />
            </div>
          </div>
		);
	}

};
/**
 * [Passing Router to component through context]
 * @type {Object}
 */
Login.contextTypes={
        router: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps){
	return {
        loginAuthorized:state.authLogin.loginAuthorized ,
        sLang: state.intl.locale || null,
        loginSpinner:state.spinner.loginSpinner         
    };
}
/**
 * @param  {[Function]}
 * @return {[Object]}
 * mapping dispatch function to props
 * so that they could be called from props
 */
var mapDispatchToProps=function(dispatch){

    return {
        updateIntl: function(params){ dispatch(updateIntl(params));},
        resetForm:   function(){ dispatch(resetForm()); },
        setLoginSpinner: function(params) { dispatch(setLoginSpinner(params));}
    }
};


export 	default connect(mapStateToProps,mapDispatchToProps)(Login);
