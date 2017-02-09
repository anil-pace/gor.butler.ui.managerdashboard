import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { resetForm,validateSKU,validateLOC,validateSKUcode, validateSKUcodeSpinner } from '../../actions/validationActions'; 
import {setAuditType,resetAuditType,auditValidatedAttributes} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import {INVALID_SKUID,INVALID_LOCID,TYPE_SUCCESS} from '../../constants/messageConstants';
import { ERROR,SUCCESS,SKU,LOCATION,CREATE_AUDIT,APP_JSON,POST, GET, VALIDATE_SKU_ID, VALID_SKU, NO_ATTRIBUTE_SKU, INVALID_SKU } from '../../constants/frontEndConstants';
import { AUDIT_URL ,SKU_VALIDATION_URL} from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';
import SearchDropdown from '../../components/dropdown/searchDropdown';


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

  componentWillMount() {
    var initialSkuInfo = {}, initialAttributes;
    this.noSkuValidation = true;
    this.props.validateSKU(initialSkuInfo);
    this.props.validateSKUcodeSpinner(false);
    this.props.auditValidatedAttributes(initialAttributes)
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

  _validSku() {
    var initialAttributes;
    let urlData={
         'url': SKU_VALIDATION_URL + this.skuId.value,
         'method':GET,
         'cause': VALIDATE_SKU_ID,
         'token': this.props.auth_token,
         'contentType':APP_JSON
        }
      this.props.auditValidatedAttributes(initialAttributes)
      this.props.validateSKUcodeSpinner(true);
      this.props.validateSKUcode(urlData);
      this.noSkuValidation = false;
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
                'method':POST,
                'cause':CREATE_AUDIT,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this.props.removeModal();
  }

  _claculateSkuState() {
    var skuState = (!this.noSkuValidation?(this.props.skuValidationResponse?"":(this.props.skuAttributes?(this.props.skuAttributes.audit_attributes_values?VALID_SKU:NO_ATTRIBUTE_SKU):INVALID_SKU)):"");
    return skuState
  }

  render()
  {
      //---------------------------------------------------
      const tempdata = [
    { value: '11'},
    { value: '2'},
    { value: '31'},
    { value: '44'},
    { value: '51'},
    { value: '71'},
    { value: '8'},
    { value: '1'},
    { value: '44'},
    { value: '51'}
    ];
    
      //---------------------------------------------------
      let tick=(<div className='gor-tick'/>);  
      let validSkuMessg = <FormattedMessage id="audit.valid.sku" description='text for valid sku' defaultMessage='SKU confirmed'/>;
      let invalidSku = <FormattedMessage id="audit.invalid.sku" description='text for invalid sku' defaultMessage='Please enter correct SKU number'/>;
      let validSkuNoAtri = <FormattedMessage id="audit.noAtrributes.sku" description='text for valid sku with no attributed' defaultMessage='SKU confirmed but no batch number found'/>;
      var skuState = this._claculateSkuState()
      
              
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
            defaultMessage='Select audit type by'/></div>
              <div className='gor-usr-field'>              
                
              </div>
            
                <div className='gor-role'>
                <input type="radio"  name='role' onChange={this._checkType.bind(this)} defaultChecked value={SKU} ref={node => { this.sku = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="audit.add.typedetails.sku" description='Text for sku' 
            defaultMessage='Audit by SKU code'/> </span>
                </div>
                <div className='gor-role'>
                <input type="radio" value={LOCATION} onChange={this._checkType.bind(this)} name="role" ref={node => { this.location = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="audit.add.typedetails.location" description='Text for location' 
            defaultMessage='Audit by Location code'/></span>
                </div>
                
            </div>
            
            <div className='gor-usr-details'>
            <div style={{'display':this.props.auditType==LOCATION?'none':'block'}}>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.sku.heading" description='Text for SKU heading' 
            defaultMessage='Enter SKU code'/></div>
              <div className="gor-audit-input-wrap">
                <input className={"gor-audit-input"+(skuState===INVALID_SKU ? ' gor-input-error':' gor-input-ok')} placeholder="e.g. 46978072" id="skuid"  ref={node => { this.skuId = node }}/>
                <div className={skuState===INVALID_SKU?"gor-login-error":(skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU?"header-yellow-alert-icon":"")}/>
              </div>
              <div className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationResponse?" gor-disable-content":"")}>
                <button className="gor-auditCreate-btn" type="button" onClick={this._validSku.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>
              <div className={skuState===INVALID_SKU?"gor-sku-error":"gor-sku-valid"}>
                {skuState===INVALID_SKU?invalidSku:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtri:""))}
              </div>
              {this.props.skuAttributes && !this.props.skuAttributes.audit_attributes_values?"":
                <div className={"gor-searchDropdown-audit-wrap" + (!this.props.skuAttributes?" gor-disable-content":"")}>
                  <SearchDropdown list={tempdata}/>
                </div>}
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
      skuValidationResponse: state.auditInfo.skuValidationSpinner || false,
      auditType:  state.auditInfo.auditType  || {},
      skuCheck: state.appInfo.skuInfo || {},
      locCheck: state.appInfo.locInfo || {},
      auth_token:state.authLogin.auth_token,
      skuAttributes: state.auditInfo.skuAttributes
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    setAuditType: function(data){ dispatch(setAuditType(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    validateSKU: function(data){ dispatch(validateSKU(data)); },
    validateLoc: function(data){ dispatch(validateLOC(data)); },            
    resetForm:   function(){ dispatch(resetForm()); },
    validateSKUcode: function(data){dispatch(validateSKUcode(data));},
    validateSKUcodeSpinner: function(data){dispatch(validateSKUcodeSpinner(data));},
    auditValidatedAttributes: function(data){dispatch(auditValidatedAttributes(data));}
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateAudit);

