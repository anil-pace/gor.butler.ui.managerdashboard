import React  from 'react';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage } from 'react-intl'; 
import {validatePassword, modalFormReset} from '../../actions/validationActions';
import { emptyField } from '../../utilities/fieldCheck';
import {LOGIN_URL} from '../../constants/configConstants';
import {ERROR,APP_JSON,POST,SUCCESS,PAUSE_OPERATION} from '../../constants/frontEndConstants';

class PauseOperation extends React.Component{
 
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
    if(!nextProps.auth_token||nextProps.system_data !== this.props.system_data)
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
            "grant_type": "password",
            "action": "LOGIN"
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
              <div className='gor-question-2'></div><FormattedMessage id='operation.pause.heading' 
                    defaultMessage="Pause Operation"
                            description="Text for pause operation heading"/>
            </div>
            <div className='gor-operation-body'>
              <FormattedMessage id='operation.pause.text' 
                    defaultMessage="All Butler bots, PPS and other sysytem components will be paused once
              completed the last action" description="Text for pause operation action"/>
              <div className='gor-margin-top'>
                <div className={'gor-password-field-lg'+(this.props.passwordCheck.type=== ERROR?' gor-input-error':' gor-input-ok')} ref={node=> { this.passField=node }}>
                        <div className={this.props.passwordCheck.type=== ERROR?'gor-login-password-error':'gor-login-password'}></div>
                        <input className='field' type="password" id="password" 
                         ref={node=> { this.password=node }} onChange={this._typing.bind(this)}
                         placeholder="Enter your password" />
                </div>
                {this.props.passwordCheck && this.props.passwordCheck.type=== ERROR?
                  (<div className='gor-login-usr-error gor-sm-string' >
                      <FormattedMessage id='operation.pause.error' 
                    defaultMessage="The entered input does not match. Please try again."
                            description="Text for wrong password"/>
                  </div>):''
                }
              </div>
              <div className='gor-margin-top'>              
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>
                <FormattedMessage id='operation.pause.cancel' 
                    defaultMessage="Cancel"
                            description="Text for cancel button"/></button>
                <button className='gor-add-btn' disabled={this.props.passwordCheck.type=== SUCCESS?false:true}
                  onClick={this._handlePause.bind(this)} >
                  <FormattedMessage id='operation.pause.button' 
                    defaultMessage="Pause Operation"
                            description="Text for pause button"/></button>
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
      passwordCheck: state.appInfo.passwordInfo||{},
      modalStatus: state.emergency.hideModal || false,
      system_data:state.tabsData.system_data||null
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
      validatePass: function(data){ dispatch(validatePassword(data)); },  
      resetForm:   function(){ dispatch(modalFormReset()); }                  
    }
};
PauseOperation.propTypes={
      auth_token:React.PropTypes.string, 
      username:React.PropTypes.string,
      passwordCheck:React.PropTypes.object,
      modalStatus:React.PropTypes.bool,
      userRequest:React.PropTypes.func,
      validatePass:React.PropTypes.func,
      resetForm:React.PropTypes.func,
      system_data:React.PropTypes.string
}

export default connect(mapStateToProps,mapDispatchToProps)(PauseOperation);
