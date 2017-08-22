import React  from 'react';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import { FormattedMessage } from 'react-intl'; 
import {modal} from 'react-redux-modal';
import {validatePassword, modalFormReset, resetForm} from '../../actions/validationActions';
import { emptyField } from '../../utilities/fieldCheck';
import {LOGIN_URL} from '../../constants/configConstants';
import {ERROR,APP_JSON,POST,SUCCESS,RESUME_OPERATION,EMERGENCY_FIRE,SYSTEM_EMERGENCY} from '../../constants/frontEndConstants';
import SafetyChecklist from './safetyChecklist';

class ResumeOperation extends React.Component{
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
  componentWillMount() {
     this.props.resetFormField();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||!nextProps.system_emergency||nextProps.system_data !== this.props.system_data )
    {
      if(nextProps.system_emergency || nextProps.fireHazard.emergency_type!==EMERGENCY_FIRE)
      this._removeThisModal();
    }
    if(nextProps.modalStatus && !this.props.modalStatus){
      let typeFlag=this.props.fireHazardPressed?EMERGENCY_FIRE:SYSTEM_EMERGENCY
      this._removeThisModal();
      modal.add(SafetyChecklist, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      emergency_type:typeFlag
      //.. all what you put in here you will get access in the modal props ;)
      });
    }
  }
  _handleResume(){
   let formdata={         
            'username': this.props.username,
            'password': this.password.value,
    };
    let userData={
                'url':LOGIN_URL,
                'method':POST,
                'cause':RESUME_OPERATION,
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
              <div className='gor-question-2'></div>
              <FormattedMessage id='operation.resume.heading' 
                    defaultMessage="Resume Operation"
                            description="Text for resume operation heading"/>
            </div>
            <div className='gor-operation-body'>
              <span><FormattedMessage id='operation.resume.text' 
                    defaultMessage="To resume operation, you will be required to go through a safety
                checklist to make sure that the Butler system is ready"
                            description="Text for resume operation body"/></span>
              <div className='gor-margin-top'>
                 <div className={'gor-password-field-lg'+(this.props.passwordCheck.type=== ERROR?' gor-input-error':' gor-input-ok')} ref={node=> { this.passField=node }}>
                        <div className={this.props.passwordCheck.type=== ERROR?'gor-login-password-error':'gor-login-password'}></div>
                        <input className='field' type="password" id="password" 
                         ref={node=> { this.password=node }} onChange={this._typing.bind(this)} 
                         placeholder="Enter your password" />
                </div>
                {this.props.passwordCheck && this.props.passwordCheck.type=== ERROR?
                  (<div className='gor-login-usr-error gor-sm-string' >
                      <FormattedMessage id='operation.resume.error' 
                    defaultMessage="The entered input does not match. Please try again."
                            description="Text for wrong password"/>
                  </div>):''
                }
             </div>
              <div className='gor-margin-top'>              
                <button className='gor-cancel-btn' onClick={this._removeThisModal.bind(this)}>
                <FormattedMessage id='operation.cancel' 
                        defaultMessage="Cancel" description="Text for cancel"/></button>
                <button className='gor-add-btn' disabled={this.props.passwordCheck.type=== SUCCESS?false:true}
                onClick={this._handleResume.bind(this)} ><FormattedMessage id='operation.resume.view' 
                        defaultMessage="View safety checklist" description="Text for viewing safety checklist"/></button>
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
      system_emergency:state.tabsData.system_emergency||false,
      system_data:state.tabsData.system_data||null,
      fireHazard:state.fireHazardDetail,

    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
      validatePass: function(data){ dispatch(validatePassword(data)); }, 
      resetForm:   function(){ dispatch(modalFormReset()); }, 
      resetFormField:  function(){ dispatch(resetForm()); }
    }
};
ResumeOperation.propTypes={
      auth_token:React.PropTypes.string, 
      username:React.PropTypes.string,
      passwordCheck:React.PropTypes.object,
      modalStatus:React.PropTypes.bool,
      system_emergency:React.PropTypes.bool,
      userRequest:React.PropTypes.func,
      validatePass:React.PropTypes.func,
      resetForm:React.PropTypes.func,
      system_data:React.PropTypes.string,
      resetFormField:React.PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(ResumeOperation);
