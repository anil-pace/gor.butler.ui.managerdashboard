import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST,SUCCESS} from '../../constants/frontEndConstants';
import ResumeOperation from './resumeOperation'; 
import {switchModalKey} from '../../actions/validationActions';

class EmergencyRelease extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  _removeThisModal() {
      this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||nextProps.activeModalKey !== this.props.activeModalKey)
    {
      this._removeThisModal();
    }
  }
  _resumeOperation(){
    this.props.switchModalKey(this.props.activeModalKey);
    this._removeThisModal();
    modal.add(ResumeOperation, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
    });
  }
  render()
  {
      return (
        <div className='gor-modal-content gor-resume-operation'>
          <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            <div className='gor-operation-head'>
              <div className='gor-caution'></div><span className='gor-operation-heading'>
              <FormattedMessage id='operation.alert.release' 
                    defaultMessage="Stop button released"
                            description="Text for emergency button release heading"/></span>
            </div>
            <div className='gor-operation-body'>
              <div className='gor-text-bold'><FormattedMessage id='operation.alert.release.text' 
                    defaultMessage="Emergency Stop button has been released."
                            description="Text for emergency stop button release"/>
              </div>
              <div className='gor-operation-text'><FormattedMessage id='operation.alert.release.subtext' 
                    defaultMessage="You will be required to enter your password in order to view the checklist.
              Approving all the items on checklist will resume the warehouse operation"
                            description="Text for next stop to resume operation"/></div>
              <div className='gor-margin-top gor-center-align'>              
                <button className='gor-add-btn' onClick={this._resumeOperation.bind(this)}>
                <FormattedMessage id='operation.alert.release.button' 
                    defaultMessage="Resume operation"
                            description="Text button to resume operation"/></button>
              </div>
            </div>
          </div>
      );
    }
  };
 function mapStateToProps(state, ownProps){
  return  {
      auth_token:state.authLogin.auth_token,
      activeModalKey: state.appInfo.activeModalKey || 0
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
      switchModalKey:function(data){dispatch(switchModalKey(data))}
    }
};

EmergencyRelease.propTypes={
      auth_token:React.PropTypes.string,
      activeModalKey:React.PropTypes.number, 
      userRequest:React.PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(EmergencyRelease);
