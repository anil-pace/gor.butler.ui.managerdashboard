import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import { resetForm,validateID,validateName } from '../actions/validationActions'; 
import {setAuditType} from '../actions/auditActions';
import {userRequest} from '../actions/userActions';
import { connect } from 'react-redux';
import {INVALID_SKUID,INVALID_LOCID,TYPE_SUCCESS} from '../constants/messageConstants';
import { ERROR,SUCCESS,SKU,LOCATION } from '../constants/appConstants';
import FieldError from '../components/fielderror/fielderror';

class CreateAudit extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
    this.props.resetForm();    
    this.props.removeModal();
  }
  _checkSku(skuId){
    let skuInfo;
    if(skuId.length<1)
      {
            skuInfo={
              type:ERROR,
              msg:INVALID_SKUID           
            }
      }
      else
      {
            skuInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
      }
      this.props.validateSKU(skuInfo);
      return skuInfo.type;
   }  
  _checkLocation(locId){
    let locInfo;
    if(locId.length<1)
      {
            locInfo={
              type:ERROR,
              msg:INVALID_LOCID           
            }
      }
      else
      {
            locInfo={
              type:SUCCESS,
              msg:TYPE_SUCCESS               
            };            
      }
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
    } 
    else
    {
      if(!this._checkLocation(loc))
        return;
    } 
    let userData={
                'url':'',
                'formdata':formdata,
                'method':'POST',
                'cause':'',
                'contentType':'application/json',
                'accept':'application/json',
                'token':sessionStorage.getItem('auth_token')
    }
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
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
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
            defaultMessage='SKU'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="audit.add.typedetails.skutext" description='Subtext for sku' 
            defaultMessage='Choose an audit based on SKU number'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value={LOCATION} onChange={this._checkType.bind(this)} name="role" ref={node => { this.location = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="audit.add.typedetails.location" description='Text for location' 
            defaultMessage='Location'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="audit.add.typedetails.locationtext" description='Subtext for manager' 
            defaultMessage='Choose an audit based on the warehouse floor'/></div>
                </div>
            </div>
            
            <div className='gor-usr-details'>
            <div style={{'display':this.props.auditType==LOCATION?'none':'block'}}>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.sku.heading" description='Text for SKU heading' 
            defaultMessage='Enter SKU'/></div>
              <div className='gor-sub-head'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku' 
            defaultMessage='Enter the 9 digit SKU number below'/></div>
              <input className={"gor-usr-fdlg"+(this.props.skuCheck.type===ERROR?' gor-input-error':' gor-input-ok')} placeholder="e.g. 46978072" id="skuid"  ref={node => { this.skuId = node }} />
              {this.props.skuCheck.type===ERROR?<FieldError txt={this.props.skuCheck.msg} />:''}
            </div>

            <div style={{'display':this.props.auditType==LOCATION?'block':'none'}}>
             <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.location.heading" description='Text for location heading' 
            defaultMessage='Enter Location'/></div>
              <div className='gor-sub-head'><FormattedMessage id="audit.add.location.subheading" description='Subtext for enter location' 
            defaultMessage='Enter the location in its given format'/></div>
              <input className={"gor-usr-fdlg"+(this.props.locCheck.type===ERROR?' gor-input-error':' gor-input-ok')} placeholder="e.g. 132.0.A.47" id="locationid"  ref={node => { this.locationId = node }} />
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
      auditType:  state.auditInfo.auditType  || {},
      skuCheck: state.appInfo.idInfo || {},
      locCheck: state.appInfo.nameInfo || {}
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    setAuditType: function(data){ dispatch(setAuditType(data)); },
    validateSKU: function(data){ dispatch(validateID(data)); },
    validateLoc: function(data){ dispatch(validateName(data)); },            
    resetForm:   function(){ dispatch(resetForm()); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateAudit);