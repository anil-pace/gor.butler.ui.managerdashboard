import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { modalFormReset,validatingList} from '../../actions/validationActions'; 
import {userRequest} from '../../actions/userActions';
import {setSafetySpinner} from '../../actions/spinnerAction';
import { connect } from 'react-redux';
import { GET,APP_JSON,POST,CHECK_SAFETY,
  CONFIRM_SAFETY,EMERGENCY_FIRE,HARD_EMERGENCY} from '../../constants/frontEndConstants';
import {  VALIDATION_LIST,VALIDATE_SAFETY } from '../../constants/configConstants';
import {stringConfig} from '../../constants/backEndConstants';
import Spinner from '../../components/spinner/Spinner';

class SafetyChecklist extends React.Component{
  constructor(props) 
  {
      super(props);  
      this.state={allChecked:false, checkedSet: new Set(), 
        safetyError:false, errorList:[]};
  }
  componentWillUnmount()
  {
    this.props.resetForm();
    this.props.validatingList(false);            
  }
  _removeThisModal() {
    this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.breached && (!nextProps.auth_token||!nextProps.system_emergency))
    {
      if(nextProps.system_emergency || nextProps.fireHazard.emergency_type!==EMERGENCY_FIRE)
      {
      this._removeThisModal();
      }
    }
    if(nextProps.modalStatus && !this.props.modalStatus){
      this._removeThisModal();
    }
    if(nextProps.safetyErrorList.length && this.props.safetyErrorList!==nextProps.safetyErrorList)
    {
      var errorList=nextProps.safetyErrorList , noItems;
      this.setState({safetyError:true, errorList:errorList});
      noItems=this.props.checkList.length;
      for(let i in errorList){
        this._toggleSelection(errorList[i],noItems);           
      }      
    }
  }
  componentDidMount(){
   var url;
    if(this.props.emergency_type===EMERGENCY_FIRE){
       url=VALIDATION_LIST+"?emergency_type=fire_emergency";
     }
     else
     {
       url=VALIDATION_LIST+"?emergency_type=hard_emergency";
     }
        let userData={
                'url':url,
                'method':GET,
                'cause':CHECK_SAFETY,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
            }
        this.props.userRequest(userData);
        this.props.validatingList(true);
  }
  _toggleSelection(i,noItems){
    var currentSet=this.state.checkedSet;
    if(currentSet.has(i)){
      currentSet.delete(i);      
    }
    else{
      currentSet.add(i);
    }
    this.setState({checkedSet:currentSet});
    if(currentSet.size=== noItems){
      this.setState({allChecked:true});
    }
    else{
      this.setState({allChecked:false});
    }
  }
  _handleSafetyConfirm(e)
  {
  var reqType;
   if(this.props.emergency_type===EMERGENCY_FIRE){
      reqType=EMERGENCY_FIRE;
    }
    else
    {
     reqType=HARD_EMERGENCY;     
    }
    e.preventDefault();
    var formdata;
    formdata={'emergency_type':reqType};
    let userData={
                'url':VALIDATE_SAFETY,
                'method':POST,
                'formdata':formdata,
                'cause':CONFIRM_SAFETY,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this.props.setSafetySpinner(true);
  }
  _isValid(item,noItems){
    var errorList=this.state.errorList, idx;
    idx=errorList.indexOf(item);
    if(idx!==-1){
      return false;
    }
    return true;
  }
  _inList(item){
    var currentSet=this.state.checkedSet;
    if(currentSet.has(item)){
      return true;
    }
    return false;    
  }
  _processList(){
    var checkList=[],items=this.props.checkList, noItems, item, msgCode;
    noItems=items.length;
    for(let i=0;i<noItems;i++)
    {
        msgCode=items[i];
        if(this._inList(msgCode)){
          item=(<li key={msgCode}>
              <input type="checkbox" key={msgCode} checked={true} value={msgCode} onChange={this._toggleSelection.bind(this,msgCode,noItems)} />
              <span className='gor-checklist-item'>
                {this.context.intl.formatMessage(stringConfig[msgCode])}
              </span>
              </li>);

        }
        else if(this._isValid(msgCode,noItems)){
          item=(<li key={msgCode}>
              <input type="checkbox" key={msgCode} value={msgCode} checked={false} onChange={this._toggleSelection.bind(this,msgCode,noItems)} />
              <span className='gor-checklist-item'>
                {this.context.intl.formatMessage(stringConfig[msgCode])}
              </span>
              </li>);
        }
        else{
          item=(<li key={msgCode}>
              <input type="checkbox" key={msgCode} checked={false} value={msgCode} onChange={this._toggleSelection.bind(this,msgCode,noItems)} />
              <span className='gor-checklist-item'>
                {this.context.intl.formatMessage(stringConfig[msgCode])}
              </span><span className='gor-error-sm'><FormattedMessage id='operation.safety.steperror' 
                    defaultMessage="(Check again)"
                            description="Text for error in step"/></span>
              </li>);
        }
        checkList.push(item);
    }
    return checkList;
  }

  _processTableList(data){
    var botCheckList=[],items=this.props.botList, noItems, bots, msgCode;
     var butlerDetails;
   if(data){
    butlerDetails=data;
   }
    for(let i=0;i<butlerDetails.length;i++){
      bots=(<div className='gor-instruction-row'>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.botId" description='bot id'  defaultMessage='{botid}'  values={{botid: butlerDetails[i].bot_id ? butlerDetails[i].bot_id : '-'}}/></p></div>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.rackId" description='rack id'  defaultMessage='{rackid}'  values={{rackid: butlerDetails[i].rack_id? butlerDetails[i].rack_id : '-'}}/></p></div>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.racklocation" description='rack location'  defaultMessage='{racklocation}'  values={{racklocation: butlerDetails[i].rack_location? butlerDetails[i].rack_location : '-'}}/></p></div>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.rackface" description='rack face'  defaultMessage='{rackface}' values={{rackface: butlerDetails[i].rack_face? butlerDetails[i].rack_face : '-'}}/></p> </div>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.ppsid" description='pps id'  defaultMessage='{ppsid}'  values={{ppsid: butlerDetails[i].pps_id? butlerDetails[i].pps_id : '-'}}/></p></div>
<div className='gor-instruction-cell'><p><FormattedMessage id="misplaced.ppslocation" description='pps location'  defaultMessage='{ppslocation}'  values={{ppslocation: butlerDetails[i].pps_location? butlerDetails[i].pps_location : '-'}}/></p></div>
</div>);
     
      botCheckList.push(bots);    
    }
     return botCheckList;
  }


  render()
  {
      var checkList=this._processList();

      var butlerdetails=this.props.safetyErrorBotList.length>0?this.props.safetyErrorBotList:this.props.botList;

      var botchecklist=this._processTableList(butlerdetails);

      return (
        <div className='gor-safetylist'>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
          {this.props.emergency_type===EMERGENCY_FIRE?   
              (<div className='gor-usr-add'><FormattedMessage id='operation.firesafety.heading' 
                    defaultMessage="Resume Checklist"
                            description="Text for safety heading"/>
              </div>):
              (<div className='gor-usr-add'><FormattedMessage id='operation.safety.heading' 
                    defaultMessage="Safety Checklist"
                            description="Text for fire safety heading"/>
              </div>)}
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id="safetyForm">
             <div className='gor-usr-form'>
              <div className='gor-usr-details'>
                <div className='gor-safety-hd'><FormattedMessage id='operation.safety.steps' 
                    defaultMessage="Check approval steps"
                            description="Text for approval steps"/></div>
                <div className='gor-safetysub-head'><FormattedMessage id='operation.safety.text' 
                    defaultMessage="Tick every item to confirm that the system is safe to resume operation."
                            description="Text for ticking items"/></div>
                <div className='gor-safety-body'>
                 {this.state.safetyError && 
                  (<div className='gor-safety-error'>
                    <div className='tab-alert-icon'></div>
                    <div className='gor-error-sm'><FormattedMessage id='operation.safetychecklist.errors' 
                    defaultMessage="System has detected that one or more of the required conditions have not been fulfilled. 
                    Please try again or contact service engineer for support"
                            description="Text for safety error"/></div>
                  </div>)
                  }
                  <ul>
                  {checkList.length>0?checkList:''}
                  </ul>
{butlerdetails.length>0?
                  (<div className="gor-instruction-table">
                  <div className="gor-instruction-heading">
                  <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.botid' defaultMessage="Bot ID" description="Bot ID"/></p>
                  </div>
                  <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.rockid' defaultMessage="Rack ID" description="Rack ID"/></p>
                  </div>
                  <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.rocklocation' defaultMessage="Rack location" description="Rack location"/></p>
                  </div>
                  <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.rackface' defaultMessage="Rack face" description="Rack face"/></p>
                  </div>
                   <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.ppsid' defaultMessage="PPS ID" description="PPS ID"/></p>
                  </div>
                   <div className="gor-instruction-cell">
                  <p><FormattedMessage id='operation.safetychecklistTable.ppslocation' defaultMessage="PPS location" description="PPS location"/></p>
                  </div>
                  </div>
                {botchecklist}
                  </div>):""
}
                 </div>
                <div className='gor-margin-top'>
                {this.props.emergency_type===EMERGENCY_FIRE?
                (<button type="submit" className="gor-add-btn" disabled={(!this.state.allChecked)?true:false}
                  onClick={this._handleSafetyConfirm.bind(this)}><FormattedMessage id='operation.firesafety.confirm' 
                    defaultMessage="Resume Operation" description="Text for Resume Operation button"/>
                    <Spinner isLoading={this.props.safetySpinner} setSpinner={this.props.setSafetySpinner}/>
                    </button>):
                    (<button type="submit" className="gor-add-btn" disabled={(!this.state.allChecked)?true:false}
                  onClick={this._handleSafetyConfirm.bind(this)}><FormattedMessage id='operation.safety.confirm' 
                    defaultMessage="Confirm" description="Text for confirm button"/>
                    <Spinner isLoading={this.props.safetySpinner} setSpinner={this.props.setSafetySpinner}/>
                    </button>)}


                </div>
              </div>
             </div>
            </form>
            </div>
          </div>
        </div>
      );
    }
  }

SafetyChecklist.contextTypes={
    intl: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
  return {
      checkList: state.emergency.safetyList || [],
      botList: state.emergency.botList || [],
      safetyErrorList: state.emergency.safetyErrorList || [],
      safetyErrorBotList:state.emergency.safetyErrorBotList || [],
      auth_token:state.authLogin.auth_token,
      modalStatus: state.emergency.hideModal || false,
      safetySpinner:state.spinner.safetySpinner || false,
      system_emergency:state.tabsData.system_emergency||false,
      system_data:state.tabsData.system_data||null,
      breached: state.tabsData. breached,
      fireHazard:state.fireHazardDetail
  };
}
var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    resetForm:   function(){ dispatch(modalFormReset()); },
    setSafetySpinner: function(data){ dispatch(setSafetySpinner(data)); },
    validatingList: function(data){ dispatch(validatingList(data));}
  }
};
SafetyChecklist.propTypes={
      auth_token:React.PropTypes.string, 
      username:React.PropTypes.string,
      modalStatus:React.PropTypes.bool,
      checkList:React.PropTypes.array,
      safetyErrorList:React.PropTypes.array,
      safetySpinner:React.PropTypes.bool,
      system_emergency:React.PropTypes.bool,
      system_data:React.PropTypes.string,
      userRequest:React.PropTypes.func,
      setSafetySpinner:React.PropTypes.func,
      resetForm:React.PropTypes.func
}
export default connect(mapStateToProps,mapDispatchToProps)(SafetyChecklist);