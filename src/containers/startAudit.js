import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { resetForm,validateID,validateName } from '../actions/validationActions'; 
import {setAuditType,resetAuditType} from '../actions/auditActions';
import {userRequest} from '../actions/userActions';
import { connect } from 'react-redux';
import {INVALID_SKUID,INVALID_LOCID,TYPE_SUCCESS} from '../constants/messageConstants';
import { ERROR,SUCCESS,SKU,LOCATION,CREATE_AUDIT } from '../constants/appConstants';
import { AUDIT_URL } from '../constants/configConstants';
import FieldError from '../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../utilities/fieldCheck';


class StartAudit extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  componentWillUnmount()
  {
    this.props.resetAuditType();
    this.props.resetForm();            
  }
  removeThisModal() {
    this.props.removeModal();
  }
  componentDidMount(){
        let userData={
                'url':'',
                'method':'GET',
                'cause':'',
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);
  }
  _handlestartaudit(e)
  {
    e.preventDefault();
    let op,md,sku,loc,formdata;
    op=this.sku;
    md=this.location;
    sku=this.skuId.value;
    loc=this.locationId.value;
    if(op.checked)
    {
      if(!this._checkSku(sku))
        return;
      formdata={
         audit_param_type: op.value,
         audit_param_value: sku 
      };
    } 
    else
    {
      if(!this._checkLocation(loc))
        return;
      formdata={
         audit_param_type: md.value,
         audit_param_value: loc
      };
    } 
    let userData={
                'url':AUDIT_URL,
                'formdata':formdata,
                'method':'POST',
                'cause':CREATE_AUDIT,
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
    }
    this.props.userRequest(userData);
    this.props.removeModal();
  }
  render()
  {
      let tick=(<div className='iTick'/>);  
      return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="audit.start.heading" description='Heading for start audit' 
            defaultMessage='Start audit task'/>
                          <div className='gor-sub-head'><FormattedMessage id="audit.start.subheading" description='Subheading for start audit' 
            defaultMessage='Assign one or more PPS and start the audit task.'/></div>
              </div>
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id = "startauditForm" ref={node => { this.startauditForm = node }} 
                onSubmit={(e) => this._handlestartaudit(e)}>

            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdsm'><FormattedMessage id="audit.start.auditdetails.heading" description='Text for audit details heading' 
            defaultMessage='Assign PPS for Location'/></div>
            <div className='gor-sub-head'><FormattedMessage id="audit.start.auditdetails.subheading" description='Text for audit details subheading' 
            defaultMessage='All PPS below are currently in the audit mode.'/></div>
            
            </div>
            
     
            <p className='gor-submit'>
             <button className="gor-add-btn"><FormattedMessage id="audit.start.password.button" description='Text for start audit button' 
            defaultMessage='Start task now'/></button>
            </p>
            </div>
            </form>
            </div>
          </div>
        </div>
      );
    }
  }
function mapStateToProps(state, ownProps){
  console.log(state);
  return {
      auditType:  state.auditInfo.auditType  || {},
      skuCheck: state.appInfo.idInfo || {},
      locCheck: state.appInfo.nameInfo || {}
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    setAuditType: function(data){ dispatch(setAuditType(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    validateSKU: function(data){ dispatch(validateID(data)); },
    validateLoc: function(data){ dispatch(validateName(data)); },            
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(StartAudit);