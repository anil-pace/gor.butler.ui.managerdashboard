import React  from 'react';
import { connect } from 'react-redux' ;
import {modal} from 'react-redux-modal';
import { FormattedMessage } from 'react-intl'; 
import {setFireHazrdFlag} from '../../actions/tabActions';
import ResumeOperation from './resumeOperation'; 
import {userRequest} from '../../actions/userActions';  
import ShutterLocationTile from '../../components/fireHazardTiles/shutterLocationTile';
import {getSecondsDiff} from '../../utilities/getDaysDiff';
import {FAILED,CLEARED,PROGRESS,NOT_FOUND,IN_PROGRESS} from '../../constants/frontEndConstants';
class FireHazard extends React.Component{
  constructor(props) 
  { 
    super(props);
    this.state={buttonDisable:true};
    this._removeThisModal =  this._removeThisModal.bind(this);
    this._resumeOperation =  this._resumeOperation.bind(this);
  }
  _removeThisModal() {
    this.props.removeModal();
    this.props.setFireHazrdFlag(true);
   }
   endFireHazard(){
    this.props.removeModal();
   }
  
  componentDidMount(){
    if(this.props.checkingList){
      this.endFireHazard();  //If manager is on safety checklist page, don't show the release modal      
    }
  }
componentWillMount(){
     var limit=(this.props.config.fire_emergency_enable_resume_after)*60;
    var duration=(limit-getSecondsDiff(this.props.fireHazard.emergencyStartTime))*1000;
    
  if(this.state.buttonDisable)
    {
    setTimeout(function(){
      this.setState({buttonDisable:false})
    }.bind(this),duration); 
  }
}

   componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||!nextProps.fireHazard.emergencyStartTime)
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
      fireHazardPressed:true
      //.. all what you put in here you will get access in the modal props ;)
    });
  }

  _processData(){
    var shutters=this.props.fireHazard.shutters;
    var key=Object.keys(shutters);
    var shutterNuber=key.length;
    var Imageclass;
    var shutterWrap=[];
    for(var i=0;i<shutterNuber;i++){
      switch(shutters[key[i]]){
        case FAILED: 
        Imageclass=FAILED
        break;
        case CLEARED:
        Imageclass=CLEARED
        break;
        default:
        Imageclass=PROGRESS
      }
      var singleShutter=<ShutterLocationTile key={i} shutterName={key[i]} shutterStatus={Imageclass}>
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
      case FAILED: 
      f=1;
      break;
      case CLEARED:
      c=1;
      break;
      default:
      p=1;
    }
  }
  if(p>0){
    marker=(<div><span className='gor-image-status progress'></span> <span className='gor-status-text'> <FormattedMessage id='operation.fire.shutter'  defaultMessage='Clearing all shutters' description='Description Text clear shutter'/> </span></div>);
  }
  else if(f>0){
    marker=(<div><span className='gor-image-status failed'></span> <span className='gor-status-text'> <FormattedMessage id='operation.fire.failshutter'  defaultMessage='Failed to clear shutters' description='Description Text fail to clear shutter'/> </span></div>);
  }
  else if(c>0)
  { 
   marker=(<div><span className='gor-image-status cleared'></span> <span className='gor-status-text'> <FormattedMessage id='operation.fire.clearedshutter'  defaultMessage='Cleared all shutters' description='Description Text  cleared shutter'/> </span></div>);
  }
  return marker;
}

processEscapePath(data){
  var escapeMarker;
  if(data===CLEARED)
  {
    escapeMarker=(<div><span className='gor-image-status cleared'></span><span className="gor-status-text"><FormattedMessage id='operation.fire.escapecleared' defaultMessage="Cleared escape path"description="Description Text escape cleared"/></span></div>)
  }
  else if(data===IN_PROGRESS){
escapeMarker=(<div><span className='gor-image-status progress'></span><span className="gor-status-text"><FormattedMessage id='operation.fire.escapeprogress' defaultMessage="Clearing escape path"description="Description Text escape in progress"/></span></div>)
  }
  else{
escapeMarker=(<div><span className='gor-image-status failed'></span><span className="gor-status-text"><FormattedMessage id='operation.fire.escapefail' defaultMessage="Failed to clear escape path"description="Description Text escape to fail"/></span></div>)
  }
return escapeMarker;
}

render()
{   
  var shutterFlag=false,escapePathFlag=false;
  var  shutterNuber=Object.keys(this.props.fireHazard.shutters).length;
  shutterFlag=shutterNuber===0;
  escapePathFlag=(this.props.fireHazard.escapePath!==NOT_FOUND)?true:false;
  var shutterWrap=this._processData();
  var markerShutter=this.processShutterHeader(this.props.fireHazard.shutters);
  var markerEscapePath=this.processEscapePath(this.props.fireHazard.escapePath);
  return (

    <div className='gor-modal-content gor-firehazard'>
    <span className='hazard-image'></span>
    <span className="close" onClick={this._removeThisModal}>×</span>
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
    defaultMessage=" Please follow evacuation procedures immediately."
    description="Description Text evacuation"/>
    </span>
    </span> 
    </div>
    <div className={escapePathFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
   {markerEscapePath}
    </div>
    <div className={!shutterFlag? "gor-shutter-section":"gor-shutter-section hidden"}>
    {markerShutter}
    <div className="gor-shutter-status-box">
    {shutterWrap}
    </div>          
    </div>    
    <button className={this.state.buttonDisable?'gor-resume-btn disable':'gor-resume-btn'} disabled={this.state.buttonDisable} onClick={this._resumeOperation}>
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
    firehazadflag:state.fireReducer.firehazadflag ||false,
    config:state.config||{}
    }
  } 
  function mapDispatchToProps(dispatch){
    return {

      setFireHazrdFlag: function(data){ dispatch(setFireHazrdFlag(data)); },
      userRequest: function(data){ dispatch(userRequest(data)); }
    }
  };

  FireHazard.propTypes={
    auth_token:React.PropTypes.string,
    checkingList:React.PropTypes.bool
  }

  export default connect(mapStateToProps,mapDispatchToProps)(FireHazard);
