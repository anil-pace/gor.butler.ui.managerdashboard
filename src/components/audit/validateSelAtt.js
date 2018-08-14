
import React  from 'react';
import GorTabs from '../../components/gor-tabs/tabs';
import {Tab} from '../../components/gor-tabs/tabContent';
import { FormattedMessage,injectIntl,defineMessages } from 'react-intl'; 
import {InputComponent} from '../../components/InputComponent/InputComponent.js';
import SearchFilterComponent from '../../components/gor-search-component/searchFilter';
import Filter from '../../components/gor-filter-component/filter';
import SelectAttributes from '../../components/gor-select-attributes/selectAttributes';


const  messages= defineMessages({
    auditnameplaceholder: {
        id: 'ValidateSelAtt.nameplaceholder.text',
        description: 'text for audit name placeholder',
        defaultMessage: 'Time, place or products'
    },
    auditinputplaceholder: {
        id: 'ValidateSelAtt.inputplaceholder.text',
        description: 'text for audit input placeholder',
        defaultMessage: 'e.g: 012678ABC'
    },
    searchPlaceholderSKU:{
        id: 'ValidateSelAtt.searchinputplaceholder.text',
        description: 'text for search audit input placeholder',
        defaultMessage: 'Search SKU'
    },
    searchPlaceholderLocation:{
        id: 'ValidateSelAtt.locinputplaceholder.text',
        description: 'text for search audit input placeholder',
        defaultMessage: 'Search Location'
    }
    
});
const attributeComponentMessages={
        "apply":<FormattedMessage id="Audit.selectAttribute.apply" description="Texts for select attribute component"
                                          defaultMessage="Apply"/>,
        "add_set_of_attributes":<FormattedMessage id="Audit.selectAttribute.addSetofAttributes" description="Texts for select attribute component"
                                          defaultMessage="+ ADD SET OF ATTRIBUTES"/>,
        "footer_message":<FormattedMessage id="Audit.selectAttribute.footerMessage" description="Texts for select attribute component"
                                          defaultMessage="Note: You can add multiple sets of attributes"/>,
        "back":<FormattedMessage id="Audit.selectAttribute.back" description="Texts for select attribute component"
                                          defaultMessage="Back"/>,
        "clear_all":<FormattedMessage id="Audit.selectAttribute.clearAll" description="Texts for select attribute component"
                                          defaultMessage="Clear All"/>,
        "add_more_sets_of_attributes":<FormattedMessage id="Audit.selectAttribute.addMoreSets" description="Texts for select attribute component"
                                          defaultMessage="Add more Sets of Attributes"/>
};
class ValidateSelAtt extends React.Component{ 
  /**
   * Called once before rendering of component,used to displatch fetch action
   * @return {[type]}
   */ 
  constructor(props) 
  {  
   super(props); 
   this._getInitialState = this._getInitialState.bind(this);
   this._updateInput = this._updateInput.bind(this);
   this._addNewInput= this._addNewInput.bind(this);
   this._validateData = this._validateData.bind(this);
   this._onFilterSelection = this._onFilterSelection.bind(this);
   this._deleteTuples = this._deleteTuples.bind(this);
   this._onAttributeSelection = this._onAttributeSelection.bind(this);
   this._searchCallBack = this._searchCallBack.bind(this);
   this._resetStateData = this._resetStateData.bind(this);
   this._onBackClick = this._onBackClick.bind(this);
   this._togglePanel = this._togglePanel.bind(this);
   this.state=this._getInitialState()
 } 
 _getInitialState(){
  
  return {
    ...this.props,
    filterSelectionState:"none",
    isInputEmpty:true,
    panelClass:'collapsed'
  }
 }

 _updateInput(event,id) {
   
   var input = event.target.value.trim(),
   inputList = input.split(/[\s,;\t\n]+/),
   selectionStart = event.target.selectionStart,
   processedList=[],
   stateInputList = JSON.parse(JSON.stringify(this.state.copyPasteData.data)),
   focusedEl = id ? id.toString() : "0";
   
   if(inputList.length > 1){
    for(let i=0,len=inputList.length; i < len;i++){
      let tuple={};
      tuple.checked=false;
      tuple.index=i;
      tuple.visible=true;
      tuple.value=inputList[i];
      tuple.errorMessage = "";
      processedList.push(tuple);
   }
    stateInputList = processedList;
    focusedEl="0"
   }
   else{
    let tuple = Object.assign({},stateInputList[parseInt(id)]);
    tuple.value=input;
    tuple.visible=true;
    stateInputList.splice(id, 1, tuple);
    focusedEl = id.toString();
   }
   this.setState({
      copyPasteData:{
        data:stateInputList,
        selectionStart,
        focusedEl
      },
      isInputEmpty: stateInputList[0].value.trim() !=='' ? false : true
    })
} 
  _addNewInput(type){
    var stateInputList = JSON.parse(JSON.stringify(this.state.copyPasteData.data));
    var tuple={
      checked:false,
      index:stateInputList.length,
      value:"",
      visible:true,
      errorMessage:true
    }
    stateInputList.push(tuple);
    
    this.setState({
      copyPasteData:{
        data:stateInputList,
        focusedEl:(stateInputList.length -1).toString(),
        selectionStart:this.state.copyPasteData.selectionStart
      }
    })
  }

  _validateData(){
    if(this.props.validationCallBack){
      let {copyPasteData} = this.state;
      let validationData=[]
      for(let i=0,len=copyPasteData.data.length; i < len; i++){
        validationData.push(copyPasteData.data[i].value);
      }
      this.props.validationCallBack(validationData);
    }
  }
  _onFilterSelection(selection){
      
      var validatedData = JSON.parse(JSON.stringify(this.state.copyPasteData.data));
      var processedData=[],filterSelectionState;
      for(let i=0,len=validatedData.length; i<len;i++){
        let tuple = Object.assign({},validatedData[i])
        if(selection === "select_all"){
          tuple.checked = true;
          processedData.push(tuple);
        }
        else if(selection === "select_all_valid"){
          if(tuple.errorMessage.constructor === Boolean){
            tuple.checked = true;
          }
          else{
            tuple.checked = false;
          }
          processedData.push(tuple);
        }
        else if(selection === "select_all_invalid"){
          if(tuple.errorMessage.constructor !== Boolean){
            tuple.checked = true;
            
          }
          else{
            tuple.checked = false;
          }
          processedData.push(tuple);
        }
         else if(selection === "deselect_all"){
            tuple.checked = false;
            processedData.push(tuple);
         }
      }
      if(selection === "deselect_all"){
        filterSelectionState = "none";
      }
      else if(selection === "select_all"){
        filterSelectionState="all";
      }
      else{
        filterSelectionState="partial";
      }
      
      
      
        this.setState({
            copyPasteData:{
            data:processedData,
            focusedEl:this.state.copyPasteData.focusedEl,
            selectionStart:this.state.copyPasteData.selectionStart
          },
          filterSelectionState
         })
      
    }
    _deleteTuples(){
      var selectedTuples =[];
      var tuples = this.state.copyPasteData.data;
      for(let i=0,len=tuples.length; i<len ;i++){
        if(!tuples[i].checked){
          selectedTuples.push(Object.assign({},tuples[i]))
        }
      }
      
         this.setState({
          copyPasteData:{
          data:selectedTuples,
          focusedEl:"0",
          selectionStart:this.state.copyPasteData.selectionStart
        }
      })
     
     
    }

    _onAttributeSelection(selectedAttributes,index){
    
    var copyPasteData = JSON.parse(JSON.stringify(this.state.copyPasteData.data));
    var sku = this.state.copyPasteData["data"][index].value;
    this.props.onAttributeSelection(selectedAttributes,sku,copyPasteData)
    

  }
    _searchCallBack(value){
    value =  value.trim().toLowerCase();
    var data =  JSON.parse(JSON.stringify(this.state.copyPasteData.data));
    var filteredList=[];
    if(value !== ""){
    //Traversing the list
    for(let i=0,len=data.length;i<len;i++){
      if(data[i].value.indexOf(value) > -1){
        data[i].visible = true;
      }
      else{
        data[i].visible = false;
      }
    }
      this.setState({
        copyPasteData:{
          data:data,
          focusedEl:"0"
        },
        filterApplied:true,
        selectionStart:this.state.copyPasteData.selectionStart
      })
  }
  else{
    let filteredData = this._resetStateData(data);
      this.setState({
        filterApplied:false,
        copyPasteData:{
          data:filteredData,
          focusedEl:"0",
          selectionStart:this.state.copyPasteData.selectionStart
        }
      })
  }
  }
  _resetStateData(data){
      for(let i=0,len=data.length;i<len;i++){
        data[i].visible = true;
      }
      return data;
  }
   _onBackClick(){
    var data = JSON.parse(JSON.stringify(this.state.copyPasteData.data));
    var resetData = this._resetStateData(data);
    
      this.setState({
      validationDoneSKU:false,
      allTuplesValid:false,
      skuAttributes:{},
      copyPasteData:{
        data:resetData,
        focusedEl:"0",
        selectionStart:this.state.copyPasteData.selectionStart
      }
    })
    
    
  }
  _togglePanel(){
     this.setState({
        panelClass:this.state.panelClass === 'expanded' ? 'collapsed' : 'expanded'
      })
  }

  componentWillReceiveProps(nextProps){
    //var validationDoneSKU = this.props.skuAttributes && Object.keys(this.props.skuAttributes).length ? true : false;
    //var allTuplesValid = (nextProps.skuAttributes && nextProps.skuAttributes.totalInvalid === 0) ? true : false;
      this.setState({
        ...nextProps
        
      }) 
  }

 
    /**Render method called when component react renders
     * @return {[type]}
     */
    render(){
      var {validationDoneSKU,copyPasteData,allTuplesValid} = this.state;
      let searchSKUPH = this.props.intl.formatMessage(messages.searchPlaceholderSKU);
      let auditBySkuMessg=<FormattedMessage id="ValidateSelAtt.auditbysku.text" description='text for Enter SKU and validate ' defaultMessage='Enter SKU and validate'/>;
      let skuSelectAttributes = <FormattedMessage id="ValidateSelAtt.auditbysku.selectAttributes" description='text for Select Attributes' defaultMessage='Select Attributes'/>;
      let auditByLocationMessg=<FormattedMessage id="ValidateSelAtt.auditbylocation.text" description='text for audit by location' defaultMessage='Audit by Location'/>;
      let selectAllLabel = <FormattedMessage id="ValidateSelAtt.inputCheckbox.selectAllLabel" description="audit dropdown option for Select All"
                                          defaultMessage="Select All"/>
      let selectAllInvalidLabel = <FormattedMessage id="ValidateSelAtt.inputCheckbox.selectAllInvalidLabel" description="audit dropdown option for Select All Invalid"
                                          defaultMessage="Select all invalid"/>
      let selectAllValidLabel = <FormattedMessage id="ValidateSelAtt.inputCheckbox.selectAllValidLabel" description="audit dropdown option for Select All valid"
                                          defaultMessage="Select all valid"/>
      
      let deselectAllLabel = <FormattedMessage id="ValidateSelAtt.inputCheckbox.deselectAllLabel" description="audit dropdown option for Deselecting all"
                                          defaultMessage="Deselect All"/>
      let filterOptions=[{
        value:"select_all",
        label:selectAllLabel,
        disabled:false
        },{
        value:"select_all_valid",
        label:selectAllValidLabel,
        disabled:false
        },{
        value:"select_all_invalid",
        label:selectAllInvalidLabel,
        disabled:false
        },{
        value:"deselect_all",
        label:deselectAllLabel,
        disabled:false
      }];
      let self = this;
      return (
            <div className={"validate-sel-att"}>
            <GorTabs defaultActiveTabIndex={!validationDoneSKU ? 0 :1} disabledTabIndex={validationDoneSKU ? 0 :1} tabClass={"sub-tabs-audit"}>
            <Tab tabName = {<span className={"sub-tab-name"}><i className={"sub-tab-index"}>1</i>{this.props.tabMessages.sku_tab}</span>} iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'}  >
          {!validationDoneSKU && <div className="gor-audit-inputlist-wrap" >
              <div>
               <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku' 
            defaultMessage='Use copy and paste if you have muktiple sku numbers'/></div>
            </div>
              <div>
               {copyPasteData.data.map(function(tuple, i){
                    let focus = (self.state.copyPasteData.focusedEl === i.toString()) ? true : false;
                    return(tuple.visible ? <div className="gor-audit-input-wrap" key={tuple.value+i}>
                        <InputComponent.CopyPaste
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}  
                        selectionStart={self.state.copyPasteData.selectionStart}
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                      </div>:null) 
              }) }
               <div>
                      <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.auditAdd" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>
               </div>

             
              
              </div>}
            </Tab>
            <Tab tabName = {<span className={"sub-tab-name"}><i className={"sub-tab-index"}>2</i>{this.props.tabMessages.att_tab}</span>} iconClassName={'icon-class-1'}
                                 linkClassName={'link-class-1'}  >
                        <div className={"gor-global-notification"}>
              {validationDoneSKU && allTuplesValid?
                 <div className={"gor-audit-att-ribbon"}>
                 <div className="gor-sku-validation-btn-wrap">
                 <button onClick={this._onBackClick} className={"gor-audit-edit-att"}><FormattedMessage id="audits.editSKUText" description='Text for editing a location' 
                        defaultMessage='BACK TO EDIT'/></button>
                <div className="sku-search"> <SearchFilterComponent animate={true} callBackDelay={300} placeHolder={searchSKUPH} searchCallBack={this._searchCallBack}/></div>

                 </div>
                 <div className={"message success"}>
                  <FormattedMessage id="audit.skuValidation.success" description='Audit sku verification success message'
                                                              defaultMessage='{valid} out of {total} SKUs valid'
                                                              values={
                                                                {
                                                                  valid: self.props.skuAttributes.totalValid ? self.props.skuAttributes.totalValid.toString() : "0",
                                                                  total: self.props.skuAttributes.totalSKUs ? self.props.skuAttributes.totalSKUs.toString() : "0"
                                                                }
                                                              }/>
                </div></div>:<div><div className="gor-sku-validation-btn-wrap"><Filter options={filterOptions} checkState={self.state.filterSelectionState} onSelectHandler={this._onFilterSelection} />
                <span className="gor-delete-outline">
              <span className={self.state.filterSelectionState==="none"?"gor-delete-location-disabled":"gor-delete-location"} onClick={this._deleteTuples}></span>
              </span>
              </div>
              <div className={"message error"}>
                  <FormattedMessage id="audit.skuValidation.error" description='Audit sku verification error message'
                                                              defaultMessage='{invalid} Error found out of {total} SKUs, Please rectify or enter valid SKUs'
                                                              values={
                                                                {
                                                                  invalid: self.props.skuAttributes.totalInvalid ? self.props.skuAttributes.totalInvalid.toString() : "0",
                                                                  total: self.props.skuAttributes.totalSKUs ? self.props.skuAttributes.totalSKUs.toString() : "0"
                                                                }
                                                              }/>
                </div></div>}
              
             
                
              </div>
          {validationDoneSKU && <div><div className="gor-audit-inputlist-wrap" >
          <div className={"gor-audit-inputlist-cont "+self.state.panelClass}>
          <div className={"note-message"}>
                  <FormattedMessage id="audit.skuValidation.note" description='Audit location verification error message'
                                                              defaultMessage='Note: Not setting any attributes will result in auditing the entire SKU with all attributes'
                                                              />
                </div>
              <div>
               {copyPasteData.data.map((tuple,i)=>{
                    let tuples=[],
                    attributeList = self.props.skuAttributes.data[i].attributeList;

                    if(tuple.visible){
                    tuples.push(<div className={allTuplesValid ? "gor-valid-row" : "gor-valid-row has-error"} key={tuple.value+i}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}
                        selectionStart={self.state.copyPasteData.selectionStart}
                        allRowValid={allTuplesValid}
                        onAttributeCheck={self._onAttributeCheck}
                        checked={tuple.checked}
                        errorMessage={!allTuplesValid ? tuple.errorMessage : true}  
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                        {allTuplesValid && attributeList.length > 0 && <SelectAttributes 
                          messages={attributeComponentMessages}
                          attributeList={attributeList}
                          applyCallBack={this._onAttributeSelection}
                          index={i}
                          usePositionHack={true}
                          />}
                      </div>)
                  }
                    return(tuples) 
              }
              )}
               {!validationDoneSKU && <div>
                      <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.Validation" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>}
               </div>
              </div>
              </div>
              <div className="gor-audit-excol-wrap"> <span onClick={this._togglePanel} className={"gor-exp-coll "+self.state.panelClass}></span>
              </div>
              </div>}
             
            </Tab>
            </GorTabs>
             {!allTuplesValid && <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationSpinner?" gor-disable-content":"")}>
                <button className={this.state.isInputEmpty ? "gor-auditValidate-btn-disabled" : "gor-auditValidate-btn"}  type="button" onClick={this._validateData}>
                <FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>}
          </div>
       );
    }
  };


ValidateSelAtt.defaultProps = {
  validationDoneSKU:false,
  copyPasteData:{
    data:[{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }],
          focusedEl:"0"
  },
  allTuplesValid:false,
  skuAttributes:{}

};

 ValidateSelAtt.propTypes={
  validationDoneSKU:React.PropTypes.bool,
  allTuplesValid:React.PropTypes.bool,
  copyPasteData:React.PropTypes.object,
  skuAttributes:React.PropTypes.object
}
export  default injectIntl(ValidateSelAtt);            


           