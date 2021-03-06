import React  from 'react';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import {userRequest} from '../../actions/userActions';
import { FormattedMessage } from 'react-intl'; 
import ResumeOperation from './resumeOperation'; 
import {HARD,SOFT} from '../../constants/frontEndConstants'

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
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      emergencyReleased :true
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
               {(!this.props.releaseState || this.props.releaseState === HARD)?<FormattedMessage id='operation.alert.release' 
                    defaultMessage="All Emergency-stop buttons released"
                            description="Text for emergency button release heading"/> : (!this.props.breached ? <FormattedMessage id='operation.alert.releaseSoft' 
                    defaultMessage="All Emergency-pause buttons released"
                            description="Text for emergency button release heading"/>:<FormattedMessage id='operation.alert.releaseSoftBreached' 
                    defaultMessage="Pause button released"
                            description="Text for emergency button release heading"/>)}</span>
            </div>
            <div className='gor-operation-body'>
              <div className='gor-text-bold'>{(!this.props.releaseState || this.props.releaseState === HARD)?<FormattedMessage id='operation.alert.release.text' 
                    defaultMessage="All System-stop buttons have been released."
                            description="Text for System stop button release"/>:(!this.props.breached ? <FormattedMessage id='operation.alert.releaseSoft.text' 
                    defaultMessage="All Emergency-pause buttons have been released."
                            description="Text for System pause button release"/> : <FormattedMessage id='operation.alert.releaseSoft.textBreached' 
                    defaultMessage="System pause button in {zone} has been released"
                    description="Text for System pause button release"
                    values={{
                            zone:this.props.zone
                    }}/>)}
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
