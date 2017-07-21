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
    if(!nextProps.auth_token||!nextProps.system_emergency)
    {
      if(nextProps.system_emergency || nextProps.fireHazard.emergency_type!==EMERGENCY_FIRE)
      {
      this._removeThisModal();
      }
    }
    if(nextProps.modalStatus && !this.props.modalStatus){
      this._removeThisModal();
    }
    if(nextProps.safetyErrorList.length)
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

  _processTableList(){
    var botCheckList=[],items=this.props.checkList, noItems, bots, msgCode;
   var butlerDetails=this.props.checkList.butlerDetails;
    for(let i=0;i<butlerDetails.length;i++){
      bots=(<div className='Row'><div className='Cell'><p>butlerDetails[i].botid</p> </div>
<div className='Cell'><p>butlerDetails[i].botDirection</p></div><div className='Cell'><p>butlerDetails[i].rackid</p></div></div>);
     
      botCheckList.push(bots);    
    }
     return botCheckList;
  }


  render()
  {
      var checkList=this._processList();
      var botchecklist=this._processTableList();
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
                    <div className='gor-error-sm'><FormattedMessage id='operation.safety.errors' 
                    defaultMessage="System has found some of these steps were not followed. 
                    Please check or contact service engineer for support"
                            description="Text for safety error"/></div>
                  </div>)
                  }
                  <ul>
                  {checkList.length>0?checkList:''}
                  </ul>
                  <div className="Table">
                  <div className="Title">
                  <p>This is a Table</p>
                  </div>
                  <div className="Heading">
                  <div className="Cell">
                  <p>Heading 1</p>
                  </div>
                  <div className="Cell">
                  <p>Heading 2</p>
                  </div>
                  <div className="Cell">
                  <p>Heading 3</p>
                  </div>
                  </div>
                {botchecklist}
                  </div>
                 </div>
                <div className='gor-margin-top'>
                {this.props.emergency_type===EMERGENCY_FIRE?
                (<button type="submit" className="gor-add-btn" disabled={(!this.state.allChecked)?true:false}
                  onClick={this._handleSafetyConfirm.bind(this)}><FormattedMessage id='operation.firesafety.confirm' 
                    defaultMessage="Resume Opeartion" description="Text for Resume Opeartion button"/>
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
      safetyErrorList: state.emergency.safetyErrorList || [],
      auth_token:state.authLogin.auth_token,
      modalStatus: state.emergency.hideModal || false,
      safetySpinner:state.spinner.safetySpinner || false,
      system_emergency:state.tabsData.system_emergency||false,
      system_data:state.tabsData.system_data||null,
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