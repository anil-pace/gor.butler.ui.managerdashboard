import React  from 'react';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import { FormattedMessage } from 'react-intl'; 
import {setFireHazrdFlag} from '../../actions/tabActions';
import {AUTH_LOGIN,ERROR,TYPING,APP_JSON,POST,SUCCESS} from '../../constants/frontEndConstants';
import ResumeOperation from './resumeOperation'; 
import ShutterLocationTile from '../../components/fireHazardTiles/shutterLocationTile';
import {getSecondsDiff} from '../../utilities/getDaysDiff';
class FireHazard extends React.Component{
  constructor(props) 
  {  
    super(props);
    this.state={buttonEnable:true}
  }
  _removeThisModal() {
    this.props.removeModal();
    this.props.setFireHazrdFlag(true);
   }
   componentWillMount(){
    var limit=(this.props.config.fire_emergency_enable_resume_after)*60;
    var duration=(limit-getSecondsDiff(this.props.fireHazard.emergencyStartTime))*1000;
    setTimeout(function(){
      this.setState({buttonEnable:false})
    }.bind(this),duration); 
  }
  componentDidMount(){
    if(this.props.checkingList){
      this._removeThisModal();  //If manager is on safety checklist page, don't show the release modal      
    }

  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||nextProps.fireHazard.emergency_type !== this.props.fireHazard.emergency_type)
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
    var shutters=this.props.fireHazard.shutters;
    var key=Object.keys(shutters);
    var shutterNuber=key.length;
    var Imageclass;
    var shutterWrap=[];
    var emergencyStartTime=this.props.fireHazard.emergencyStartTime;
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
  processShutterHeader(data){
    var  p=0,f=0,c=0,marker;
    var key=Object.keys(data);
    var shutterNuber=key.length;
    for(var i=0;i<shutterNuber;i++){
     switch(data[key[i]]){
      case "failed": 
      f=1;
      break;
      case "cleared":
      c=1;
      break;
      default:
      p=1;
    }
  }
  if(p>0){
    marker="gor-image-status progress"
  }
  else if(f>0){
    marker="gor-image-status failed"
  }
  else
  { 
    marker="gor-image-status cleared"
  }
  return marker;
}

render()
{   
  var shutterFlag=escapePathFlag=false,location,escapePathFlag,marker;
  var  shutterNuber=Object.keys(this.props.fireHazard.shutters).length;
  shutterFlag=shutterNuber===0;
  escapePathFlag=(this.props.fireHazard.escapePath!=="not_found")?true:false;
  var shutterWrap=this._processData();
  var markerShutter=this.processShutterHeader(this.props.fireHazard.shutters);
  return (

    <div className='gor-modal-content gor-firehazard'>
    <span className='hazard-image'></span>
    <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
    <div className='gor-firehazard-header'>
    <span className='gor-caution-image'></span>
    <span className="gor-caution-text-header">
    <FormattedMessage id='operation.fire.header' 
    defaultMessage="FIRE EMERGENCY"
    description="Header Text FIRE EMERGENCY"/>
    </span>
    <span className="gor-caution-text">
    <FormattedMessage id='operation.fire.cautionText' 
    defaultMessage="Fire emergency has been triggered and system has started its safety measures."
    description="Description Text FIRE EMERGENCY"/>

    <span className="gor-bold-underline">
    <FormattedMessage id='operation.fire.evacuation' 
    defaultMessage="Please follow evacuation procedures immediately."
    description="Description Text evacuation"/>
    </span>
    </span> 
    </div>
    <div className={escapePathFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
    <span className={this.props.fireHazard.escapePath!=="cleared"?(this.props.fireHazard.escapePath=="in_progress"? "gor-image-status progress":"gor-image-status failed"):"gor-image-status cleared"}>
    </span>
    <span className="gor-status-text">
    <FormattedMessage id='operation.fire.escape' 
    defaultMessage="Clearing escape path"
    description="Description Text escape"/>
    </span>
    </div>
    <div className={!shutterFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
    <span className={markerShutter}></span>
    <span className="gor-status-text">
    <FormattedMessage id='operation.fire.shutter' 
    defaultMessage="Clearing all shutters"
    description="Description Text clear shutter"/>
    </span>
    <div className="gor-shutter-status-box">
    {shutterWrap}
    </div>          
    </div>      
    <button className='gor-resume-btn' disabled={this.state.buttonEnable} onClick={this._resumeOperation.bind(this)}>
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
    checkingList:state.emergency.checkingList||false,
    fireHazard:state.fireHazardDetail,
    firehazadflag:state.fireReducer.firehazadflag,
    config:state.config||{}
    }
  } 
  function mapDispatchToProps(dispatch){
    return {
      setFireHazrdFlag: function(data){ dispatch(setFireHazrdFlag(data)); }
    }
  };

  FireHazard.propTypes={
    auth_token:React.PropTypes.string,
    checkingList:React.PropTypes.bool
  }

  export default connect(mapStateToProps,mapDispatchToProps)(FireHazard);
