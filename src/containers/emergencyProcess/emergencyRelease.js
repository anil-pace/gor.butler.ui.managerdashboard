import React  from 'react';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import {userRequest} from '../../actions/userActions';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST,SUCCESS} from '../../constants/frontEndConstants';
import ResumeOperation from './resumeOperation'; 

class EmergencyRelease extends React.Component{
  _removeThisModal() {
      this.props.removeModal();
  }
  componentDidMount(){
    if(this.props.checkingList){
      this._removeThisModal();  //If manager is on safety checklist page, don't show the release modal      
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||nextProps.system_data !== this.props.system_data)
    {
      this._removeThisModal();
    }
  }
  _resumeOperation(){
    this._removeThisModal();
    modal.add(ResumeOperation, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
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
      system_data:state.tabsData.system_data||null,
      checkingList:state.emergency.checkingList||false
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); },
    }
};

EmergencyRelease.propTypes={
      auth_token:React.PropTypes.string,
      userRequest:React.PropTypes.func,
      system_data:React.PropTypes.string,
      checkingList:React.PropTypes.bool
}

export default connect(mapStateToProps,mapDispatchToProps)(EmergencyRelease);
