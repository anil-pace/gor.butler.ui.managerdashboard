import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { resetForm,validateID,validateName } from '../../actions/validationActions'; 
import {setAuditType,resetAuditType} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import {INVALID_SKUID,INVALID_LOCID,TYPE_SUCCESS} from '../../constants/messageConstants';
import { ERROR,SUCCESS,SKU,LOCATION,CREATE_AUDIT } from '../../constants/appConstants';
import { AUDIT_URL } from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';


class CreateAudit extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  componentWillUnmount()
  {
    this.props.resetAuditType();
    this.props.resetForm();            
  }
  _removeThisModal() {
    this.props.removeModal();
  }
  _checkSku(skuId){
    let skuInfo;
    skuInfo=skuStatus(skuId);
    this.props.validateSKU(skuInfo);
    return skuInfo.type;
   }  
  _checkLocation(locId){
    let locInfo;
    locInfo=locationStatus(locId);
    this.props.validateLoc(locInfo);
    return locInfo.type;
   }  
  _checkType(){
    let op,md;
    op=this.sku;
    md=this.location;
    if(op.checked)
    {
            this.props.setAuditType(op.value);
    }
    else if(md.checked)
    {
            this.props.setAuditType(md.value);
    }
  }
  _handleAddaudit(e)
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
                'token':this.props.auth_token
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
              <div className='gor-usr-add'><FormattedMessage id="audit.add.heading" description='Heading for add audit' 
            defaultMessage='Create new audit task'/>
                          <div className='gor-sub-head'><FormattedMessage id="audit.add.subheading" description='Subheading for add audit' 
            defaultMessage='Select and enter details below to create a new audit task'/></div>
              </div>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <form action="#"  id = "createauditForm" ref={node => { this.addauditForm = node }} 
                onSubmit={(e) => this._handleAddaudit(e)}>

            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="audit.add.auditdetails.heading" description='Text for audit details heading' 
            defaultMessage='Select the type of audit task'/></div>
            <div className='gor-sub-head'><FormattedMessage id="audit.add.auditdetails.subheading" description='Text for audit details subheading' 
            defaultMessage='Select the audit type and enter details accordingly'/><p><FormattedMessage id="audit.add.auditdetails.fields" description='Text for field information' 
            defaultMessage='All fields are required'/></p></div>

              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.type.heading" description='Text for Audit type' 
            defaultMessage='Audit type'/></div>
              </div>
            
                <div className='gor-role'>
                <input type="radio"  name='role' onChange={this._checkType.bind(this)} defaultChecked value={SKU} ref={node => { this.sku = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="audit.add.typedetails.sku" description='Text for sku' 
            defaultMessage='Audit by SKU code'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="audit.add.typedetails.skutext" description='Subtext for sku' 
            defaultMessage='Create an audit task based on the SKU code of an item'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value={LOCATION} onChange={this._checkType.bind(this)} name="role" ref={node => { this.location = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="audit.add.typedetails.location" description='Text for location' 
            defaultMessage='Audit by Location code'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="audit.add.typedetails.locationtext" description='Subtext for manager' 
            defaultMessage='Create an audit task based on the location of a MSU'/></div>
                </div>
            </div>
            
            <div className='gor-usr-details'>
            <div style={{'display':this.props.auditType==LOCATION?'none':'block'}}>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.sku.heading" description='Text for SKU heading' 
            defaultMessage='Enter SKU code'/></div>
              <div className='gor-sub-head'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku' 
            defaultMessage='Enter alphanumeric SKU code of the item to be audited'/></div>
              <input className={"gor-usr-fdlg"+(this.props.skuCheck.type === ERROR ? ' gor-input-error':' gor-input-ok')} placeholder="e.g. 46978072" id="skuid"  ref={node => { this.skuId = node }} />
              {this.props.skuCheck.type===ERROR?<FieldError txt={this.props.skuCheck.msg} />:''}
            </div>

            <div style={{'display':this.props.auditType==LOCATION?'block':'none'}}>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.location.heading" description='Text for location heading' 
            defaultMessage='Enter Location'/></div>
              <div className='gor-sub-head'><FormattedMessage id="audit.add.location.subheading" description='Subtext for enter location' 
            defaultMessage='Format: (XXX.X.X.XX)'/></div>
              <input className={"gor-usr-fdlg"+(this.props.locCheck.type === ERROR ? ' gor-input-error':' gor-input-ok')} placeholder="e.g. 132.0.A.47" id="locationid"  ref={node => { this.locationId = node }} />
              {this.props.locCheck.type===ERROR?<FieldError txt={this.props.locCheck.msg} />:''}
            </div>
            </div>

            <div className='gor-usr-details'>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.tips.heading" description='Text for tips heading' 
            defaultMessage='Tips:'/></div>
              <div className='gor-sub-head'><FormattedMessage id="audit.add.tips.subheading" description='Subtext for tips' 
            defaultMessage='Once an audit task has been created, please click on the "Assign PPS" button in the audit listing to start the audit task.'/></div>
            </div>
     
            <p className='gor-submit'>
             <button className="gor-add-btn"><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='Create audit'/></button>
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
  return {
      auditType:  state.auditInfo.auditType  || {},
      skuCheck: state.appInfo.idInfo || {},
      locCheck: state.appInfo.nameInfo || {},
      auth_token:state.authLogin.auth_token
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

export default connect(mapStateToProps,mapDispatchToProps)(CreateAudit);