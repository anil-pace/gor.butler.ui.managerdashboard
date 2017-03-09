import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { resetForm,validateID,validateName } from '../../actions/validationActions'; 
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import { ERROR,SUCCESS,GET,APP_JSON,POST,CONFIRM_SAFETY} from '../../constants/frontEndConstants';
import { PPSLIST_URL } from '../../constants/configConstants';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';


class SafetyChecklist extends React.Component{
  constructor(props) 
  {
      super(props);  
      this.state={allChecked:false, checkedSet: new Set(), 
        safetyError:false, errorList:[]};
  }
  componentWillUnmount()
  {
    this.props.resetAuditType();
    this.props.resetForm();            
  }
  _removeThisModal() {
    this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
  }
  componentDidMount(){
        let userData={
                'url':PPSLIST_URL,
                'method':GET,
                'cause':CONFIRM_SAFETY,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
  _toggleSelection(i,noItems){
    var currentSet = this.state.checkedSet;
    if(currentSet.has(i)){
      currentSet.delete(i);      
    }
    else{
      currentSet.add(i);
    }
    this.setState({checkedSet:currentSet});
    if(currentSet.size === noItems){
      this.setState({allChecked:true});
    }
    else{
      this.setState({allChecked:false});
    }
  }
  _handleSafetyConfirm(e)
  {
    e.preventDefault();
    var noItems;
    noItems = this.props.ppsList.length;
    this.setState({safetyError:true, errorList:[4,3]});
    for(let i in this.state.errorList){
      this._toggleSelection(errorList[i],noItems);           
    }

  }
  _isValid(item,noItems){
    var errorList = this.state.errorList, idx;
    idx = errorList.indexOf(item);
    if(idx!=-1){
      return false;
    }
    return true;
  }
  _processList(){
    var checkList=[],items=this.props.ppsList,noItems=items.length,item;
    for(let i=0;i<noItems;i++)
    {
        if(this._isValid(items[i],noItems)){
          item = (<li key={items[i]}>
              <input type="checkbox" key={true} value={items[i]} onChange={this._toggleSelection.bind(this,i,noItems)} />
              <span className='gor-checklist-item'>
                {items[i]}
              </span>
              </li>);
        }
        else{
          item = (<li key={items[i]}>
              <input type="checkbox" key={false} value={items[i]} onChange={this._toggleSelection.bind(this,i,noItems)} />
              <span className='gor-checklist-item'>
                {items[i]}
              </span><span className='gor-error-sm'>(Check again)</span>
              </li>);
        }
        checkList.push(item);
    }
    return checkList;
  }
  _handleSafety(){
    let delurl='';
    let userData={
                'url':delurl,
                'method':POST,
                'cause':PAUSE_OPERATION,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
  }
  render()
  {
      var checkList = this._processList();
      return (
        <div className='gor-safetylist'>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'>Safety checklist
              </div>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id = "safetyForm" 
                onSubmit={(e) => this._handleSafetyConfirm(e)}>
             <div className='gor-usr-form'>
              <div className='gor-usr-details'>
                <div className='gor-usr-hdsm'>Check approval steps</div>
                <div className='gor-sub-head'>Tick every item to confirm that the system is safe to resume operation</div>
                <div className='gor-safety-body'>
                 {this.state.safetyError && 
                  (<div className='gor-safety-error'>
                    <div className='tab-alert-icon'></div>
                    <div className='gor-error-sm'>System has found some of these steps were not followed. 
                    Please check or contact service engineer for support</div>
                  </div>)
                  }
                  <ul>
                  {checkList.length>0?checkList:''}
                  </ul>
                </div> 
                <div className='gor-margin-top'>
                <button type="submit" className="gor-add-btn" disabled={(!this.state.allChecked)?true:false}
                  onClick={this._handleSafetyConfirm.bind(this)}>Confirm</button>
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
function mapStateToProps(state, ownProps){
  return {
      auditType:  state.auditInfo.auditType  || {},
      ppsList: [2,3,4],
      auth_token:state.authLogin.auth_token
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SafetyChecklist);