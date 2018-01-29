import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { resetForm,validateSKU,validateLOC,validateSKUcode,validateLocationcode,validateLocationcodeCsv ,validateSKUcodeSpinner, validateLocationcodeSpinner,validateLocationcodeSpinnerCsv } from '../../actions/validationActions'; 
import {setAuditType,resetAuditType,auditValidatedAttributes,auditValidatedAttributesLocation,auditValidatedAttributesLocationCsv} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import { ERROR,SKU,LOCATION,CREATE_AUDIT,APP_JSON,POST, GET, VALIDATE_SKU_ID,VALIDATE_LOCATION_ID, VALIDATE_LOCATION_ID_CSV,VALID_SKU,VALID_LOCATION, NO_ATTRIBUTE_SKU, SKU_NOT_EXISTS,LOCATION_NOT_EXISTS,NO_SKU_VALIDATION,NO_LOCATION_VALIDATION,WATING_FOR_VALIDATION } from '../../constants/frontEndConstants';
import { AUDIT_URL,AUDIT_VALIDATION_URL,AUDIT_CREATION_URL,SKU_VALIDATION_URL} from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';
import SearchDropdown from '../../components/dropdown/searchDropdown';
import {InputComponent} from '../../components/InputComponent/InputComponent.js';
import Filter from '../../components/gor-filter-component/filter';
import GorTabs from '../../components/gor-tabs/tabs';
import {Tab} from '../../components/gor-tabs/tabContent';
import CSVUpload from '../../components/gor-drag-drop-upload/index';
import  {setCheckAll} from '../../actions/sortHeaderActions';
import {makeAjaxCall} from '../../actions/ajaxActions';

const filterOptions=[{
  value:"select_all",
  label:"Select All",
  disabled:false
},{
  value:"select_all_valid",
  label:"Select All Valid",
  disabled:false
},{
  value:"select_all_invalid",
  label:"Select All Invalid",
  disabled:false
},{
  value:"deselect_all",
  label:"Deselect All",
  disabled:false
}]
class CreateAudit extends React.Component{
  constructor(props) 
  {
      super(props); 

      this.state={
        selected: [],
        confirmedSku: null,
        currentSku: "", 
        csvUploadStatus:false,
        active: 0,
        activeSku: true,
        activeCSV: false,
        active_sku:0,
        active_tab: 0,
        arrGroupCsv:[],
        arrGroup:[{"id":"1","value":""}],
        copyPasteSKU:[{"id":"1","value":""}],
        copyPasteLocation:{
          data:[{
            checked:false,
            index:0,
            value:"",
            errorMessage:""
          }],
          focusedEl:"0"
        },
        filterSelectionState:"none",
        locationAttributes:this.props.locationAttributes,
        value:"",
        valueCsv:"",
        userInput:[],
        userInputCSV:[],
        id:0,
        id_csv:0,
        csvUploaded:false,
        locationMode:"location",
        skuMode:"sku",
        isSlot:false,
        statusList:[],
        statusListCsv:[],
        slotList:[],
        slotListCsv:[],
        checkedState:true
        
      };
      
      
      this._updateInput=this._updateInput.bind(this);
      this._addNewInput= this._addNewInput.bind(this);
      this._onAttributeCheck=this._onAttributeCheck.bind(this);
      this._onFilterSelection=this._onFilterSelection.bind(this);
      this._deleteTuples = this._deleteTuples.bind(this);
      this._onLocationModeSelection = this._onLocationModeSelection.bind(this);
      this._onSkuModeSelection = this._onSkuModeSelection.bind(this);
      this._dropHandler = this._dropHandler.bind(this);
      this._parseCSVFile =this._parseCSVFile.bind(this);
      this._onFileUpload = this._onFileUpload.bind(this);
      this._validLocation=this._validLocation.bind(this);
      this._onBackClick=this._onBackClick.bind(this);
      
      
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
    if(this.props.hasDataChanged !== nextProps.hasDataChanged){
      let locationAttributes = JSON.parse(JSON.stringify(nextProps.locationAttributes)),
      validatedLocations = this._processLocationAttributes(locationAttributes.data),
      validationDone = Object.keys(locationAttributes).length ? true : false;
      this.setState({
      copyPasteLocation:{
        data:validatedLocations,
        focusedEl:"0"
      },
      locationAttributes,
      validationDone

    })
    }
    
    
  }
  _onAttributeCheck(event,index){
    var copyPasteLocation = JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
    var tuple = Object.assign({},copyPasteLocation[parseInt(index)]);
    tuple.checked = event.target.checked;
    copyPasteLocation.splice(parseInt(index), 1, tuple);
    this.setState({
      copyPasteLocation:{
        data:copyPasteLocation,
        focusedEl:this.state.copyPasteLocation.focusedEl
      }
    })
  }
  _processLocationAttributes(data){
    var processedData=[];
    for(let i=0,len=data.length;i<len;i++){
      let children = data[i].children,
      tuple = {};
      tuple.checked=false;
      tuple.index=i;
      tuple.value=data[i].name;
      tuple.errorMessage = data[i].status;
      processedData.push(tuple);
      if(children){
      for(let j=0;j<children.length ;j++){
        let child = {}
        child.checked=false;
        child.index=j;
        child.value=children[j].name;
        child.errorMessage = children[j].status;
        processedData.push(child);
      }
    }
    }
    return processedData
  }
  _selectedAttributes(selectedList) {
    this.setState({selected:selectedList});
  }


  _validSku() {
    var initialAttributes;
    let validSkuData;
    let urlData={
         'url': SKU_VALIDATION_URL + this.state.arrGroup,
         'method':GET,
         'cause': VALIDATE_SKU_ID,
         'token': this.props.auth_token,
         'contentType':APP_JSON
        }


      this.props.auditValidatedAttributes(initialAttributes)
      this.props.validateSKUcodeSpinner(true);
      this.props.validateSKUcode(urlData);
      this.noSkuValidation=false;
      this.setState({confirmedSku:this.skuId.value})
  }



  _validLocation(type){
    let validLocationData;
    let msu_list=[];
    let slot_list=[];
    let arrLocation=this.state.copyPasteLocation.data.slice(0);
    let auditParamValue = []

    for(let i=0,len=arrLocation.length; i<len;i++){
      auditParamValue.push(arrLocation[i].value)
    }
   
    validLocationData={
      "audit_param_name":"name",
      "audit_param_type":"location",
      "audit_param_value":{
        "locations_list":auditParamValue
      }
    }

     
    let urlData={
                'url': (type === "create") ? AUDIT_CREATION_URL: AUDIT_VALIDATION_URL,//'https://192.168.14.124:5000/api/audit'+'/validate',
                'formdata':validLocationData,
                'method':POST,//POST,
                'cause':VALIDATE_LOCATION_ID,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    
    this.props.makeAjaxCall(urlData);
    this.props.validateLocationcodeSpinner(true);
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



  _claculateSkuState(processedSkuResponse) {
    var skuState=(this.noSkuValidation?NO_SKU_VALIDATION:(!processedSkuResponse.isValid?SKU_NOT_EXISTS:(processedSkuResponse.hasAttribute?VALID_SKU:NO_ATTRIBUTE_SKU)));
    skuState=(this.props.skuValidationSpinner?WATING_FOR_VALIDATION:skuState);
    this.skuState=skuState;

    return skuState;
  }
  
   _claculateLocationState(processedLocationResponse) {
   var locationState=(this.noLocationValidation?NO_LOCATION_VALIDATION:(!processedLocationResponse.isValid?LOCATION_NOT_EXISTS:VALID_LOCATION));
    locationState=(this.props.locationValidationSpinner?WATING_FOR_VALIDATION:locationState);
    this.locationState=locationState;

    return locationState;
  }
  _claculateLocationStateCsv(processedLocationResponse) {
   var locationState=(this.noLocationValidationCsv?NO_LOCATION_VALIDATION:(!processedLocationResponse.isValid?LOCATION_NOT_EXISTS:VALID_LOCATION));
    locationState=(this.props.locationValidationSpinnerCsv?WATING_FOR_VALIDATION:locationState);
    this.locationState=locationState;

    return locationState;
  }

_processSkuAttributes() {
    
    var keys=[], hasAttribute=false, isValid=false;
    var skuAttributeData={keys:keys, hasAttribute: hasAttribute, isValid:isValid};
    if(this.props.skuAttributes && this.props.skuAttributes.audit_attributes_values) {
        isValid=true;
        for (var key in this.props.skuAttributes.audit_attributes_values) {
          if (this.props.skuAttributes.audit_attributes_values.hasOwnProperty(key)) {
            keys.push(key);
            if(this.props.skuAttributes.audit_attributes_values[key].length) {
              hasAttribute=true;
            }
          }
        }
    }
    skuAttributeData={keys:keys, hasAttribute: hasAttribute, isValid:isValid};
    this.keys=keys[0]; // harcoding since backend support only one entry
    return skuAttributeData;
  }
  



  _searchDropdownEntries(skuState,processedSkuResponse) {
    if(skuState=== VALID_SKU && processedSkuResponse.keys){
      var key=processedSkuResponse.keys[0]; //not generic need to change in version 2 of pdfa
      var dropdownDataField={value:""},dropdownData=[];
      var skuAttributes=this.props.skuAttributes.audit_attributes_values[key];
      for (var i=skuAttributes.length - 1; i >= 0; i--) {
        dropdownDataField.value=skuAttributes[i];
        dropdownData.push(dropdownDataField);
        dropdownDataField={value:""};
      }
      return dropdownData;
    }
  }
  _captureQuery(e) {
    if(e.target.value) {
      var emptyList=[];
      this.setState({currentSku:e.target.value,selected:emptyList})
    }
  }

  _addNewInput(){
    var stateInputList = JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
    var tuple={
      checked:false,
      index:stateInputList.length,
      value:"",
      errorMessage:""
    }
    stateInputList.push(tuple);
    this.setState({
      copyPasteLocation:{
        data:stateInputList,
        focusedEl:(stateInputList.length -1).toString()
      }
    })
  }
  _updateInput(event,id) {
   
   var input = event.target.value.trim(),
   inputList = input.split(/[\s,;\t\n]+/),
   processedList=[],
   stateInputList = JSON.parse(JSON.stringify(this.state.copyPasteLocation.data)),
   focusedEl = id.toString();

   if(inputList.length > 1){
    for(let i=0,len=inputList.length; i < len;i++){
      let tuple={};
      tuple.checked=false;
      tuple.index=i;
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
    stateInputList.splice(id, 1, tuple);
    focusedEl = id.toString();
   }
   this.setState({
      copyPasteLocation:{
        data:stateInputList,
        focusedEl
      }
    })
    


}



/*Function to check the location mode selection*/
  _onLocationModeSelection(selection){
      this.setState({
        locationMode:selection
      })
    
  }

  _onSkuModeSelection(selection){
    this.setState({
        skuMode:selection
      })
  }

  
    _deleteTuples(){
      var selectedTuples =[];
      var tuples = this.state.copyPasteLocation.data;
      for(let i=0,len=tuples.length; i<len ;i++){
        if(!tuples[i].checked){
          selectedTuples.push(Object.assign({},tuples[i]))
        }
      }
      this.setState({
        copyPasteLocation:{
          data:selectedTuples,
          focusedEl:"0"
        }
      })
    }
    _onFilterSelection(selection){
      var validatedData = JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
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
      copyPasteLocation:{
        data:processedData,
        focusedEl:this.state.copyPasteLocation.focusedEl
      },
      filterSelectionState
     })
      
    }
    _dropHandler(evt){
      evt.preventDefault();
    // If dropped items aren't files, reject them
    var dt = evt.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind === "file") {
          let fileName = dt.items[i].getAsFile();
          this._parseCSVFile(fileName);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i=0; i < dt.files.length; i++) {
        let fileName = dt.files[i].name;
        this._parseCSVFile(fileName);
      }  
    }
    }
    _parseCSVFile(fileObject){
    
    var _this =this;
    var textType = /text.*/;
      if (fileObject.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function() {
          let data = reader.result.split("\n");
           let processedList=[];
           for(let i=0,len=data.length; i< len;i++){
            let tuple={};
            tuple.checked=false;
            tuple.index=i;
            tuple.value=data[i];
            tuple.errorMessage = "";
            processedList.push(tuple);

           }
           
           
            _this.setState({
              copyPasteLocation:{
                data:processedList,
                focusedEl:"0"
              },
              locationMode:"location",
              locationAttributes:{},
              validationDone:false,
              csvUploaded:true
            });
        }
        reader.readAsText(fileObject);  
      } else {
        console.log("File not supported!");
      }
    }
    _onFileUpload(event){
      var fileObject = event.target.files[0];
      this._parseCSVFile(fileObject);
    }
    _onBackClick(){
      this.setState({
        validationDone:false,
        locationAttributes:{}
      })
    }

  render()
  {
      let validSkuMessg=<FormattedMessage id="audit.valid.sku" description='text for valid sku' defaultMessage='SKU confirmed'/>;
      let validLocationMessg=<FormattedMessage id="audit.valid.location" description='text for valid location' defaultMessage='Location valid'/>;
      let invalidSkuMessg=<FormattedMessage id="audit.invalid.sku" description='text for invalid sku' defaultMessage='Please enter correct SKU number'/>;
      let invalidLocationMessg=<FormattedMessage id="audit.invalid.location" description='text for invalid location' defaultMessage='Please enter correct Location number'/>;
      let validSkuNoAtriMessg=<FormattedMessage id="audit.noAtrributes.sku" description='text for valid sku with no attributed' defaultMessage='SKU confirmed but no Box Id found'/>;
      var processedSkuResponse=this._processSkuAttributes();
      //var processedLocationResponse=this._processLocationAttributes();
      //var processedLocationResponseCsv=this._processLocationAttributesCsv();
      var skuState=this._claculateSkuState(processedSkuResponse);
      //var locationStateCsv=this._claculateLocationStateCsv(processedLocationResponseCsv);
      //var locationState=this._claculateLocationState(processedLocationResponse);
      //var dropdownData=this._searchDropdownEntries(skuState,processedSkuResponse);
      var confirmedSkuNotChanged=(this.state.confirmedSku===this.state.currentSku?true:false)
      var csvUploadStatus = this.state.csvUploadStatus;
      let items = ["Upload CSV and validate", "Select attributes"];
      let items2 = ["Audit by SKU","Audit by Location"];
      let items3 = ["Enter SKU and validate","Select attributes"];
      let userInput=this.state.userInput.slice(1);
      let userInputCSV=this.state.userInputCSV.slice(1);
      let arrgroup=this.state.arrGroup.slice(1);
      let arrGroupCsv=this.state.arrGroupCsv.slice(1);
      let statusList=this.state.statusList;
      let statusListCsv=this.state.statusListCsv;
      let slotList=this.state.slotList;
      let slotListCsv=this.state.slotListCsv;
      let self=this;
      var isSlot=this.state.isSlot;
      let drop;
      let auditInputPHolder = <FormattedMessage id="Audit.inputCheckbox.auditInputPHolder" description="Placeholder for audit inputCheckbox dropdown"
                                          defaultMessage="Select one"/>
      let selectAllLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllLabel" description="audit dropdown option for Select All"
                                          defaultMessage="Select All"/>
      let selectAllInvalidLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllInvalidLabel" description="audit dropdown option for Select All Invalid"
                                          defaultMessage="Select all invalid"/>
      let selectAllValidLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllValidLabel" description="audit dropdown option for Select All valid"
                                          defaultMessage="Select all valid"/>
      
       let deselectAllLabel = <FormattedMessage id="Audit.inputCheckbox.deselectAllLabel" description="audit dropdown option for Deselecting all"
                                          defaultMessage="Deselect All"/>

       const filterList=[ {value: 'Select All', disabled:false,label: selectAllLabel},
            {value: 'Select All Invalid',  disabled:false,label:selectAllInvalidLabel},
            {value: 'Select All Valid',  disabled:false,label: selectAllValidLabel},
            {value: 'Deselect All',  disabled:false,label: deselectAllLabel}  
            ];
       let {validationDone} = self.state; 
       let allLocationsValid = (self.state.locationAttributes && !self.state.locationAttributes.totalInvalid) ? true : false

            
          
      
      return (
        <div>
          <div className="gor-modal-content gor-audit-create">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="audit.add.heading" description='Heading for add audit' 
            defaultMessage='Create new audit'/>
                          
              </div>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            

            <div className='gor-audit-form'>
            <GorTabs defaultActiveTabIndex={0} tabClass={"tabs-audit"} internalTab={false}>
                    <Tab tabName = "Audit by SKU" iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={false} >
                          <div>
                          <div className='gor-usr-hdsm'><FormattedMessage id="audit.select.sku.value" description='Name of audit' defaultMessage='Enter audit name:'/></div>
                          <div>
                          <input className="gor-audit-name-wrap" type="text" placeholder="Time,place or products"  />
                          </div>
                            <div className='gor-usr-hdsm'>
                          <FormattedMessage id="audit.select.sku.mode" description='Text for sku mode' defaultMessage='Select mode of input:'/>
                          </div>
                          
                         

              <div className='gor-audit-button-wrap'>
                            <button onClick={()=>(self._onSkuModeSelection('sku'))} className={`gor-loc-mode-btn ${self.state.skuMode === 'sku' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.enterLocation" description='Button for entering skus' defaultMessage='Enter Sku'/></button>
                            <button onClick={()=>(self._onSkuModeSelection('csv'))} className={`gor-loc-mode-btn ${self.state.skuMode === 'csv' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.csvUpload" description='Button for csv upload' defaultMessage='Upload CSV file'/></button>
                          </div>
                               
                          <div className={`location-mode ${self.state.skuMode === 'sku' ? 'active-mode' : 'inactive-mode'}`}>

                          <div className="gor-audit-inputlist-wrap" >
              <div>

              <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku' 
            defaultMessage='Use copy and paste if you have muktiple sku numbers'/></div>
            </div>
              
              </div>
              <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationSpinner?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"+(this.state.arrGroup.length===0?" gor-disable-content-audit-validate":"")}  type="button" onClick={this._validSku.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>
                  </div>
            
                          </div>  
                                
               
                    </Tab> 

                    <Tab tabName = "Audit by Location" iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={false} >
                         
                      <div>
                        <div className='gor-usr-hdsm'><FormattedMessage id="audit.select.sku.value" description='Name of audit' defaultMessage='Enter audit name:'/></div>
                        <input className="gor-audit-name-wrap" type="text" placeholder="Time,place or products" />
                        
                        
                        <div className='gor-usr-hdsm'><FormattedMessage id="audit.select.sku.mode" description='Text for location mode' defaultMessage='Select mode of input:'/></div>
                          <div className='gor-audit-button-wrap'>
                            <button onClick={()=>(self._onLocationModeSelection('location'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.enterLocation" description='Button for entering skus' defaultMessage='Enter Location'/></button>
                            <button onClick={()=>(self._onLocationModeSelection('csv'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'csv' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.csvUpload" description='Button for csv upload' defaultMessage='Upload CSV file'/></button>
                          </div>


                          
                      <div className={`location-mode ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}>
                         <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.location.heading" description='Text for location heading' 
                        defaultMessage='Enter Location and validate'/></div>


                          
             
              
            {!validationDone?<div className="gor-audit-inputlist-wrap gor-audit-location-wrap" >
            
              
               {self.state.copyPasteLocation.data.map(function(tuple, i){
                    let focus = (self.state.copyPasteLocation.focusedEl === i.toString()) ? true : false;
                    return(<div className="gor-audit-input-wrap" key={tuple.value}>
                        <InputComponent.CopyPaste
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}  
                        value={tuple.value} placeholder={"e.g: 012678ABC"}/>
                      </div>) 
              }) }
              

    <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.addLocation" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>:<div className="gor-audit-inputlist-wrap gor-audit-location-wrap" >
              <div className={"gor-global-notification"}>
              {allLocationsValid?
                 <div className={"gor-audit-att-ribbon"}>
                 <button onClick={this._onBackClick} className={"gor-audit-edit-att"}>Edit</button>
                 <div className={"message success"}>
                  <FormattedMessage id="audit.locationValidation.success" description='Audit location verification success message'
                                                              defaultMessage='{valid} out of {total} locations valid'
                                                              values={
                                                                {
                                                                  valid: self.state.locationAttributes.totalValid.toString(),
                                                                  total: self.state.locationAttributes.totalLocations.toString()
                                                                }
                                                              }/>
                </div></div>:<div><Filter options={filterOptions} checkState={self.state.filterSelectionState} onSelectHandler={this._onFilterSelection} />
              <span className={"gor-delete-location"} onClick={this._deleteTuples}></span>
              <div className={"message error"}>
                  <FormattedMessage id="audit.locationValidation.error" description='Audit location verification error message'
                                                              defaultMessage='{invalid} Error found out of {total} Locations, Please rectify or enter valid Location'
                                                              values={
                                                                {
                                                                  invalid: self.state.locationAttributes.totalInvalid.toString(),
                                                                  total: self.state.locationAttributes.totalLocations.toString()
                                                                }
                                                              }/>
                </div></div>}
              
             
                
              </div>
                  <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.locationValidation.subheading" description='Subtext for enter location' 
            defaultMessage='MSU will always supercede and all slots in the MSU will be audited'/></div>
            {self.state.copyPasteLocation.data.map((tuple,i)=>{
                    let tuples=[];
                    tuples.push(<div key={tuple.value}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}
                        allRowValid={allLocationsValid}
                        onAttributeCheck={self._onAttributeCheck}
                        checked={tuple.checked}
                        errorMessage={!allLocationsValid ? tuple.errorMessage : null}  
                        value={tuple.value} placeholder={"e.g: 012678ABC"}/>
                      </div>)
                    
                    
                    return(tuples) 
              })}
            <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.locationValidation.addLocation" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>
            }
            
                          <div  className={"gor-sku-validation-btn-wrap"}>
                <button className={"gor-auditValidate-btn"}  type="button" onClick={this._validLocation}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>
              <div>
             
            </div>

                        </div>
              <div className={`location-mode ${self.state.locationMode === 'csv'  ? 'active-mode' : 'inactive-mode'}`}>
    <GorTabs defaultActiveTabIndex={0} tabClass={"tabs-audit"} internalTab={true}>               
<Tab tabName = "Upload CSV and validate" iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={true} index={0}>
                                 
              </Tab>
              <Tab tabName = "Select Attributes" iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={true} index={1}>
                                
              </Tab>
              </GorTabs>
          <div >
                        <div className="gor-audit-inputlist-wrap">
                <div className='gor-audit-drag-drop-container'> 
                  <CSVUpload onDrop={this._dropHandler} onFileUpload={this._onFileUpload}>
                    <div className={"file-drop"} >
                      <p style={{border: "1px solid grey"}}> Image here </p>
                      <p> Drag and drop </p>
                      <p> OR </p>
                    </div>
                  </CSVUpload>
                </div>
            </div>
                 </div> 
                        </div>
                        </div>
                    </Tab>
            </GorTabs>
          <div>
             <button onClick={()=>{this._validLocation("create")}} className={"gor-add-btn"}><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='Create audit'/></button>
            </div> 
            </div>
            
            </div>
          </div>
        </div>
      );
    }
  }

CreateAudit.PropTypes={
    skuValidationSpinner: React.PropTypes.boolean,
    locationValidationSpinner:React.PropTypes.boolean,
    locationValidationSpinnerCsv:React.PropTypes.boolean,
    auditType:React.PropTypes.object,
    skuCheck:React.PropTypes.object,
    locCheck:React.PropTypes.object,
    auth_token:React.PropTypes.string,
    skuAttributes:React.PropTypes.object,
    locationAttributes:React.PropTypes.object,
    locationAttributesCsv:React.PropTypes.object

}

CreateAudit.defaultProps = {
  skuValidationSpinner:false,
  locationValidationSpinner:false,
  locationValidationSpinnerCsv:false,
  auditType:{},
  skuCheck:{},
  locCheck:{},
  skuAttributes:{},
  locationAttributes:{},
  locationAttributesCsv:{},
  hasDataChanged:false
};
function mapStateToProps(state, ownProps){
  return {
      skuValidationSpinner: state.auditInfo.skuValidationSpinner ,
      locationValidationSpinner: state.auditInfo.locationValidationSpinner ,
      locationValidationSpinnerCsv: state.auditInfo.locationValidationSpinnerCsv ,
      auditType:  state.auditInfo.auditType,
      skuCheck: state.appInfo.skuInfo,
      locCheck: state.appInfo.locInfo,
      auth_token:state.authLogin.auth_token,
      skuAttributes: state.auditInfo.skuAttributes,
      locationAttributes:state.auditInfo.locationAttributes,
      locationAttributesCsv:state.auditInfo.locationAttributesCsv,
      hasDataChanged:state.auditInfo.hasDataChanged
  };
}

function mapDispatchToProps(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    setAuditType: function(data){ dispatch(setAuditType(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    validateSKU: function(data){ dispatch(validateSKU(data)); },
    validateLoc: function(data){ dispatch(validateLOC(data)); },            
    resetForm:   function(){ dispatch(resetForm()); },
    validateSKUcode: function(data){dispatch(validateSKUcode(data));},
    validateLocationcode: function(data){dispatch(validateLocationcode(data));},
    makeAjaxCall: function (data) {dispatch(makeAjaxCall(data))},
    validateLocationcodeCsv: function(data){dispatch(validateLocationcodeCsv(data))},
    validateSKUcodeSpinner: function(data){dispatch(validateSKUcodeSpinner(data));},
    validateLocationcodeSpinner: function(data){dispatch(validateLocationcodeSpinner(data));},
    validateLocationcodeSpinnerCsv: function(data){dispatch(validateLocationcodeSpinnerCsv(data));},
    auditValidatedAttributes: function(data){dispatch(auditValidatedAttributes(data));},
    auditValidatedAttributesLocation: function(data){dispatch(auditValidatedAttributesLocation(data));},
    auditValidatedAttributesLocationCsv: function(data){dispatch(auditValidatedAttributesLocationCsv(data));},
    setCheckAll: function (data) {dispatch(setCheckAll(data)) }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateAudit);

