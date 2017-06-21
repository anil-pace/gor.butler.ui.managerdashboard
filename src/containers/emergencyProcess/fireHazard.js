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
        <div className='gor-modal-content gor-firehazard'>
          <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            <div className='gor-firehazard-header'>
              <span className='gor-caution-image'></span>
              <span className="gor-caution-text-header">FIRE EMERGENCY</span>
              <br/>
              <span className="gor-caution-text">Fire emergency has been triggered and system has started its safety measures. 
              <span className="gor-bold-underline">
              Please follow evacuation procedures immediately
              </span>
              </span> 
            </div>

            <hr className="gor-line"/>
          <div className="gor-clearPath">
          <div className="gor-clearPath-wrapper">
            <span className="gor-image-status">
            </span>
            <span className="gor-status-text">Clearing escape path</span>
          </div>
          </div>
           <hr className="gor-line"/>
           <div className="gor-clearPath">
           <div className="gor-clearPath-wrapper">
            <span className="gor-image-status"></span>
            <span className="gor-status-text">Clearing all shutters</span>
            </div>
          </div>
          <div className="gor-shutter-status-box">
            <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 1</div>
            </div>  
            </div>
            <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 2</div>
            </div>
            </div>
             <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 2</div>
            </div>
            </div>
             <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 2</div>
            </div>
            </div>
               <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 1</div>
            </div>  
            </div>
            <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 2</div>
            </div>
            </div>
             <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className="gor-shutter-image-status"></div>
              <div className="gor-shutter-text-status">Location 2</div>
            </div>
            </div>
          </div>
           <hr className="gor-footer-line"/>     
                <button className='gor-resume-btn' onClick={this._resumeOperation.bind(this)}>
                <FormattedMessage id='operation.alert.release.button' 
                    defaultMessage="RESUME OPERATION"
                            description="Text button to resume operation"/></button>            
       
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
