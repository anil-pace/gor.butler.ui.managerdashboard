import React  from 'react';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import {userRequest} from '../../actions/userActions';
import { FormattedMessage } from 'react-intl'; 
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST,SUCCESS} from '../../constants/frontEndConstants';
import ResumeOperation from './resumeOperation'; 
import ShutterLocationTile from '../../components/fireHazardTiles/shutterLocationTile';

class FireHazard extends React.Component{
  _removeThisModal() {
      this.props.removeModal();}
  componentDidMount(){
    if(this.props.checkingList){
      this._removeThisModal();  //If manager is on safety checklist page, don't show the release modal      
    }
  }
  componentWillReceiveProps(nextProps){
    var a=nextProps;
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
   _processData(){
  var  shutterNuber=Object.keys(this.props.system_data.shutters).length;
  var shutters=this.props.system_data.shutters,Imageclass;
  var key=Object.keys(shutters);
  var shutterWrap=[];
  for(var i=0;i<shutterNuber;i++){
    switch(shutters[key[i]]){
      case "failed":
      Imageclass="failed"
      break;
      case "cleared":
      Imageclass="cleared"
      break;
      default:
      Imageclass="progress"
    }

    var singleShutter=<ShutterLocationTile shutterName={key[i]} shutterStatus={Imageclass}>
    </ShutterLocationTile>
    shutterWrap.push(singleShutter);
  }
  return shutterWrap;
  }
  render()
  {
  var shutterFlag=escapePathFlag=false,location,escapePathFlag;
  var  shutterNuber=Object.keys(this.props.system_data.shutters).length;
  shutterFlag=shutterNuber>=0?true:false;
  escapePathFlag=(this.props.system_data.escapePath!=="not_found")?true:false;
  var shutterWrap=this._processData();
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
            <div className={escapePathFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
          <div className="gor-clearPath">
          <div className="gor-clearPath-wrapper">
            <span className="gor-image-status">
            </span>
            <span className="gor-status-text">Clearing escape path</span>
          </div>
          </div>
           <hr className="gor-line"/>
          </div>
           <div className={shutterFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
           <div className="gor-clearPath">
           <div className="gor-clearPath-wrapper">
            <span className={"gor-image-status"}></span>
            <span className="gor-status-text">Clearing all shutters</span>
            </div>
          </div>
          <div className="gor-shutter-status-box">
          {shutterWrap}
          </div>          
           <hr className="gor-footer-line"/> 
           </div>      
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

FireHazard.propTypes={
      auth_token:React.PropTypes.string,
      userRequest:React.PropTypes.func,
      system_data:React.PropTypes.string,
      checkingList:React.PropTypes.bool
}

export default connect(mapStateToProps,mapDispatchToProps)(FireHazard);
