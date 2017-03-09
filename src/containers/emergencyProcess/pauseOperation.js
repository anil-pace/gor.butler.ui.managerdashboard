import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {validatePassword, resetForm} from '../../actions/validationActions';
import { emptyField } from '../../utilities/fieldCheck';
import {LOGIN_URL} from '../../constants/configConstants';
import {ERROR,APP_JSON,POST,SUCCESS,AUTH_USER,PAUSE_OPERATION} from '../../constants/frontEndConstants';

class PauseOperation extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  _removeThisModal() {
      this.props.resetForm();
      this.props.removeModal();
  }
  _typing(){
        this.passField.className='gor-password-field-lg gor-input-ok gor-input-typing';
        this._checkPass();
  }
  _checkPass(){
          let password=this.password.value.trim(), loginPassInfo;
          loginPassInfo=emptyField(password);
          this.props.validatePass(loginPassInfo);
          return loginPassInfo.type;    
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
    if(nextProps.modalStatus && !this.props.modalStatus){
      this._removeThisModal();
    }    
  }
  _handlePause(){
   let formdata={         
            'username': this.props.username,
            'password': this.password.value,
    };
    let userData={
                'url':LOGIN_URL,
                'method':POST,
                'cause':PAUSE_OPERATION,
                'formdata':formdata,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
  }
  render()
  {
      return (
          <div className='gor-operation-pause gor-modal-content'>
            <div className='gor-operation-head'>
              <div className='gor-question-2'></div>Pause Operation
            </div>
            <div className='gor-operation-body'>
              <span>All Butler bots, PPS and other sysytem components will be paused once
              completed the last action</span>
              <div className='gor-margin-top'>
                <div className={'gor-password-field-lg'+(this.props.passWordCheck.type === ERROR?' gor-input-error':' gor-input-ok')} ref={node => { this.passField = node }}>
                        <div className={this.props.passWordCheck.type === ERROR?'gor-login-password-error':'gor-login-password'}></div>
                        <input className='field' type="password" id="password" 
                         ref={node => { this.password = node }} onChange={this._typing.bind(this)}
                         placeholder="Enter your password" />
                </div>
                {this.props.passWordCheck && this.props.passWordCheck.type === ERROR?
                  (<div className='gor-login-usr-error gor-sm-string' >
                      The entered input does not match. Please try again.
                  </div>):''
                }
              </div>
              <div className='gor-margin-top'>              
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>Cancel</button>
                <button className='gor-add-btn' disabled={this.props.passWordCheck.type === SUCCESS?false:true}
                  onClick={this._handlePause.bind(this)} >Pause Operation</button>
              </div>
            </div>
          </div>
      );
    }
  };
 function mapStateToProps(state, ownProps){
  return  {
      auth_token:state.authLogin.auth_token,
      username:state.authLogin.username,
      passWordCheck: state.appInfo.passwordInfo||{},
      modalStatus: state.appInfo.hideModal || false
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
      validatePass: function(data){ dispatch(validatePassword(data)); },  
      resetForm:   function(){ dispatch(resetForm()); }                  
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(PauseOperation);
