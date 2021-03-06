
import React  from 'react';
import { connect } from 'react-redux';
import { FormattedMessage,injectIntl,intlShape,defineMessages } from 'react-intl'; 
import ValidateSelAtt from '../../components/audit/validateSelAtt';
import {makeAjaxCall} from '../../actions/ajaxActions';
import { APP_JSON,POST, GET, VALIDATE_SKU_ITEM_RECALL,CREATE_AUDIT_REQUEST,SELLER_RECALL } from '../../constants/frontEndConstants';
import { AUDIT_VALIDATION_URL,SELLER_RECALL_URL,SELLER_RECALL_EXPIRY_URL} from '../../constants/configConstants';

const messages = defineMessages({
    e026: {
        id: 'ValidateSelAtt.locationdoesnotexist.text',
        description: 'text for audit location does not exist error',
        defaultMessage: 'Location does not exist'
    },
    e027: {
        id: 'ValidateSelAtt.skudoesnotexist.text',
        description: 'text for audit sku does not exist error',
        defaultMessage: 'SKU does not exist'
    },
    e0xx: {
        id: 'ValidateSelAtt.duplicatelocation.text',
        description: 'text for audit duplicate location error',
        defaultMessage: 'Duplicate entry'
    }
});

const tabMessages = {
  sku_tab:<FormattedMessage id="itemRecall.tab.sku" description='Text for item recall button' 
            defaultMessage='Enter SKU & Validate'/>,
  att_tab:<FormattedMessage id="itemRecall.tab.att" description='Text for item recall button' 
            defaultMessage='Select Attributes'/>,
};

class ItemRecall extends React.Component{ 
  /**
   * Called once before rendering of component,used to displatch fetch action
   * @return {[type]}
   */ 
  constructor(props) 
  {  
   super(props); 
   this._getInitialState = this._getInitialState.bind(this);
   
   this._handleOptionChange = this._handleOptionChange.bind(this);
   this._validateSKU = this._validateSKU.bind(this);
   this._onAttributeSelection = this._onAttributeSelection.bind(this);
   this._recallItems = this._recallItems.bind(this);
   this.state=this._getInitialState()
 } 
 _getInitialState(){
  
  return {
    selectedOption:"expired_items",
    orderIdText:"",
    copyPasteData:{
          data:[{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }],
          focusedEl:"0",
          isInputEmpty:true
    },
    validationDoneSKU:false,
    allTuplesValid:false,
    skuDetails:{},
    enableRecall:false
  }
 } 


 _handleOptionChange(evt){
  
  this.orderInput.value = "";
  this.setState({
    selectedOption:evt.target.value,
    ...(evt.target.value === "expired_items" ? {
        copyPasteData:{
          data:[{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }],
          focusedEl:"0",
          isInputEmpty:true
    },
    validationDoneSKU:false,
    skuDetails:{}
    }:{})
  })
 }
 _validateSKU(data){
    let validSKUData={
      "audit_param_name":"name",
      "audit_param_type":"sku",
      "audit_param_value":{}
    };
    validSKUData.audit_param_value.sku_list = data;
    let urlData={
          'url': AUDIT_VALIDATION_URL,
          'formdata': validSKUData,
          'method':POST,
          'cause':VALIDATE_SKU_ITEM_RECALL,
          'contentType':APP_JSON,
          'accept':APP_JSON,
          'token':this.props.auth_token
      }
    
    this.props.makeAjaxCall(urlData);
 }
 _processSkuAttributes(data) {
    var processedData=[]
    for(let i=0,len=data.length; i<len ;i++){
      let tuple={};
      let error_code = data[i].status===true ? "" :data[i].status.error_code;
      tuple.checked=false;
      tuple.index=i;
      tuple.visible=true;
      tuple.value=data[i].skuName;
      tuple.errorMessage = data[i].status===true ? data[i].status : this.props.intl.formatMessage(messages[error_code]);
      processedData.push(tuple);
    }
    return processedData
  }
  _onAttributeSelection(selectedAttributes,sku,copyPasteData){
    
  var skuDetails = JSON.parse(JSON.stringify(this.state.skuDetails))
  
  var skuDetail=[];
  for(let i=0,len=copyPasteData.length;i < len;i++){
  let skuValue = copyPasteData[i].value.trim();
  let productAttributes=[];
  let tuple = {};
  tuple.productSku = skuValue;
  if(skuValue === sku){
  for(let k in selectedAttributes){
    let set = {};
    for(let kk in selectedAttributes[k]){
      set[selectedAttributes[k][kk].category]=(kk==="$expired" ? "true" : kk);
    }
    productAttributes.push(set);
    
  }
}

    tuple.productAttributes = productAttributes;
    skuDetails[skuValue] = tuple;
  }
  this.setState({
    skuDetails
  })
  }
  _recallItems(){
    var formData = {};
    formData.orderId=this.orderInput.value;
    formData.timeZone=this.props.timeOffset;
    if(this.state.selectedOption === "specific_item"){
    let skuDetail=[],
    skuDetails = JSON.parse(JSON.stringify(this.state.skuDetails))
    
    for(let k in skuDetails){
      skuDetail.push(skuDetails[k]);
    }
    formData.skuDetail = skuDetail;
  }
  else{
    
    formData.isExpired= true
  }
    let urlData={
                  'url': this.state.selectedOption === "specific_item" ? SELLER_RECALL_URL : SELLER_RECALL_EXPIRY_URL,
                  'formdata': formData,
                  'method':POST,
                  'cause':SELLER_RECALL,
                  'contentType':APP_JSON,
                  'accept':APP_JSON
      }
    //this.props.setAuditSpinner(true);
    this.props.makeAjaxCall(urlData);

  }
  componentWillReceiveProps(nextProps){
    if(this.props.hasDataChanged !== nextProps.hasDataChanged){
      let skuAttributes = JSON.parse(JSON.stringify(nextProps.skuAttributes));
      let validatedSKUs = this._processSkuAttributes(skuAttributes.data);
      let validationDoneSKU = Object.keys(skuAttributes).length ? true : false;
      let allTuplesValid = skuAttributes.totalInvalid === 0 ? true : false;
      this.setState({
         copyPasteData:{
          data:validatedSKUs,
          focusedEl:"0"
        },
        validationDoneSKU,
        allTuplesValid
      })
    }
  }
    /**Render method called when component react renders
     * @return {[type]}
     */
    render(){
     
      return (
           <div className={"item-recall-wrapper"}>
           <div className={"recall-options"}>
           <ul>
           <li>
           <input className={"recall-option"} onChange={this._handleOptionChange} value={"expired_items"} checked={this.state.selectedOption === "expired_items"} name={"recall-options"} type="radio" /><label className={"option-text"}>Expired Items</label>
           </li>
           <li>
           <input  className={"recall-option"} onChange={this._handleOptionChange} value={"specific_item"} checked={this.state.selectedOption === "specific_item"} type="radio" name={"recall-options"} /><label className={"option-text"}>Specific SKU + attribute(s)</label>
           </li>
           </ul>
           </div>
           <div className={"order-id-wrap"}>
           <p className="order-id-label"><FormattedMessage id="itemRecall.order.label" description='Text for item recall button' 
            defaultMessage='Order Id'/>:</p>
           <p className="order-inp-wrap"><input ref={(input) => { this.orderInput = input; }} type="text"  className="order-id-input" placeholder="Enter Order Id"/></p>
           </div>
           {this.state.selectedOption === "specific_item" &&  <ValidateSelAtt 
           validationCallBack={this._validateSKU} 
           validationDoneSKU={this.state.validationDoneSKU}
           allTuplesValid={this.state.allTuplesValid}
           skuAttributes={this.props.skuAttributes}
           copyPasteData={this.state.copyPasteData}
           onAttributeSelection={this._onAttributeSelection}
           tabMessages={tabMessages}
            />}
          
          <div className="recall-footer"><button className={"gor-item-recall-btn"} onClick={this._recallItems}>
          <FormattedMessage id="itemRecall.recall.button" description='Text for item recall button' 
            defaultMessage='Recall'/>
          </button></div>
           </div>
       );
    }
  };

ItemRecall.propTypes={
  auth_token:React.PropTypes.string,
  hasDataChanged:React.PropTypes.bool,
  skuAttributes:React.PropTypes.object
}
function mapDispatchToProps(dispatch){
  return {
    makeAjaxCall: function (data) {dispatch(makeAjaxCall(data))},
  }
};
function mapStateToProps(state, ownProps){
  return {
      auth_token:state.authLogin.auth_token,
      skuAttributes: state.auditInfo.skuAttributes,
      hasDataChanged:state.auditInfo.hasDataChanged,
      timeOffset:state.authLogin.timeOffset
  };
};
export  default connect(mapStateToProps,mapDispatchToProps)(injectIntl(ItemRecall));            


           