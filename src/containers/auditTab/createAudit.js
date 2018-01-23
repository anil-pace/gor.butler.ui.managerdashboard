import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { resetForm,validateSKU,validateLOC,validateSKUcode,validateLocationcode,validateLocationcodeCsv ,validateSKUcodeSpinner, validateLocationcodeSpinner,validateLocationcodeSpinnerCsv } from '../../actions/validationActions'; 
import {setAuditType,resetAuditType,auditValidatedAttributes,auditValidatedAttributesLocation,auditValidatedAttributesLocationCsv} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import { ERROR,SKU,LOCATION,CREATE_AUDIT,APP_JSON,POST, GET, VALIDATE_SKU_ID,VALIDATE_LOCATION_ID, VALIDATE_LOCATION_ID_CSV,VALID_SKU,VALID_LOCATION, NO_ATTRIBUTE_SKU, SKU_NOT_EXISTS,LOCATION_NOT_EXISTS,NO_SKU_VALIDATION,NO_LOCATION_VALIDATION,WATING_FOR_VALIDATION } from '../../constants/frontEndConstants';
import { AUDIT_URL,TIME_ZONE_URL,SKU_VALIDATION_URL} from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';
import SearchDropdown from '../../components/dropdown/searchDropdown';
import {InputComponent} from '../../components/InputComponent/InputComponent.js';
//import ReactFileReader from 'react-file-reader';
import FileDragAndDrop from 'react-file-drag-and-drop';
import GorTabs from '../../components/gor-tabs/tabs';
import {Tab} from '../../components/gor-tabs/tabContent';
import Filter from '../../components/gor-dropdown-component/filter';
import  {setCheckAll} from '../../actions/sortHeaderActions';
import {makeAjaxCall} from '../../actions/ajaxActions';


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
          data:[""],
          focusedEl:"0"
        },
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
      this.handleUploadCVSFile = this.handleUploadCVSFile.bind(this);
      this.handleDragAndDrop = this.handleDragAndDrop.bind(this);
      this.handleActiveTab = this.handleActiveTab.bind(this);
      this.displayUploadCSVFileContent = this.displayUploadCSVFileContent.bind(this);
      this.displayEnterSku = this.displayEnterSku.bind(this);
      this._updateInput=this._updateInput.bind(this);
      this._addNewInput= this._addNewInput.bind(this);
      this.updateInputCSV=this.updateInputCSV.bind(this);
      this._checkType = this._checkType.bind(this);
      this._onLocationModeSelection = this._onLocationModeSelection.bind(this);
      this._onSkuModeSelection = this._onSkuModeSelection.bind(this);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      
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
      validationDone = Object.keys(locationAttributes).length ? true : false;
      this.setState({
      locationAttributes,
      validationDone

    })
    }
    
    
  }
  _selectedAttributes(selectedList) {
    this.setState({selected:selectedList});
  }

  handleActiveTab(index){
    this.setState({
      active: index,
      active_sku:index,
      
    })
  }

  displayUploadCSVFileContent(){
    this.setState({
      active: 0,
      activeSku:false,
      activeCSV:true
    })

  }
  displayEnterSku(){
    this.setState({
      activeSku: true,
      activeCSV:false,
      active_sku:0
    })
  }

  

  handleUploadCVSFile(evt){
    
    var arrInput=[];
    var _this=this
    var files = evt.target.files;
    var fileInput = document.getElementById('uploadCSVFile');
    //var displayCSVFile = document.getElementById('displayCSVFile');
     fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
       var textType = /text.*/;
       if (file.type.match(textType)) {
         var reader = new FileReader();

         reader.onload = function(e) {
           let data = reader.result.split("\n");

           
           
            _this.setState({
              copyPasteLocation:{
                data,
                focusedEl:"0"
              },
              locationMode:"location",
              locationAttributes:{},
              validationDone:false,
              csvUploaded:true
            });
         }
         reader.readAsText(file);  
       } else {
         console.log("=============File not supported!");
       }
     });
  }



  handleDragAndDrop(dataTransfer){
    var file = dataTransfer.files[0];
    this.parseCSVFile(file);
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

   _validLocationCsv(){
    var initialAttributes;
    let validLocationData;
    let msu_list=[];
    let slot_list=[];
    let arrLocation=this.state.arrGroupCsv;
    for(let i=0;i<this.state.arrGroupCsv.length;i++){

      if(arrLocation[i].indexOf("MSU")!==-1){
        msu_list.push(arrLocation[i].replace("MSU","").trim());
      }
      else{
        slot_list.push(arrLocation[i].trim());
      }
    }
    validLocationData={
      "audit_param_name":"name",
      "audit_param_type":"location",
      "audit_param_value":{
      "msu_list":msu_list,
      "slot_list":slot_list
   }
    }

     
    let urlData={
                'url': 'https://192.168.14.124:5000/api/audit'+'/validate',
                'formdata':validLocationData,
                'method':POST,
                'cause':VALIDATE_LOCATION_ID_CSV,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.validateLocationcodeCsv(urlData);   

      this.props.auditValidatedAttributesLocationCsv(initialAttributes)
      this.props.validateLocationcodeSpinnerCsv(true);
     
      
      //this.setState({confirmedSku:this.skuId.value})
  }

  _validLocation(){
    let validLocationData;
    let msu_list=[];
    let slot_list=[];
    let arrLocation=this.state.copyPasteLocation.data.slice(0);
    /*for(let i=0 ;i < arrLocation.length;i++){
      let slotList = 
      
      if(arrLocation[i].indexOf("MSU")!==-1){
        msu_list.push(arrLocation[i].replace("MSU","").trim());
      }
      else{
        slot_list.push(arrLocation[i].trim());
      }
    }*/
    validLocationData={
      "audit_param_name":"name",
      "audit_param_type":"location",
      "audit_param_value":{
      "msu_list":arrLocation,
      "slot_list":slot_list
      }
    }

     
    let urlData={
                'url': TIME_ZONE_URL,//'https://192.168.14.124:5000/api/audit'+'/validate',
                'formdata':validLocationData,
                'method':GET,//POST,
                'cause':VALIDATE_LOCATION_ID,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    //this.props.validateLocationcode(urlData); 
    this.props.makeAjaxCall(urlData);
    this.props.validateLocationcodeSpinner(true);
     
      
      //this.setState({confirmedSku:this.skuId.value})
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
  _checkType(index){
    
    
    if(index===0 )
    {
            this.props.setAuditType("sku");
    }
    else if(index===1)
    {
            
            this.props.setAuditType("location");
    }
    this.setState({
      active_tab: index
    })
  }
  _handleAddaudit(e)
  {
    e.preventDefault();
    let op,md,sku,loc,formdata;
    op=this.sku;
    md=this.location;
    sku=this.skuId.value;
    loc=this.locationId.value;
    if((this.skuState=== NO_ATTRIBUTE_SKU || !this.state.selected.length) && this.props.auditType!==LOCATION) //if sku has no attributes || sku has attributes but not 
    {                                                                     //doing audit by pdfa
      if(!this._checkSku(sku))
        return;
      formdata={
         audit_param_type: op.value,
         audit_param_value: sku 
      };
    }
    else if(this.skuState=== VALID_SKU && this.state.selected.length) { //sku has attributes and doing audit by pdfa
      formdata={}
      formdata["audit_param_type"]="pdfa";
      formdata["audit_param_value"]={}
      formdata["audit_param_value"]["product_sku"]=sku;
      formdata["audit_param_value"]["pdfa_values"]={}
      formdata["audit_param_value"]["pdfa_values"][this.keys]=this.state.selected;
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

  

/*
  _processLocationAttributes(){
    var data={
  "ordered_msus": [{
      "msu": "123",
      "status": "s1"
    },
    {
      "msu": "456",
      "status": "s1"
    },
    {
      "msu": "789",
      "status": "s1"
    },
    {
      "msu": "147",
      "status": "s1"
    }
  ],
  "ordered_slots": [{
      "slot": "123.1.A.02",
      "status": "s1"
    },
    {
      "slot": "123.1.A.03",
      "status": "s1"
    },
    {
      "slot": "456.1.A.06",
      "status": "s1"
    },
    {
      "slot": "789.0.B.05",
      "status": "s1"
    },
    {
      "slot": "555.0.B.05",
      "status": "s1"
    }
  ],
  "status": {
    "s1": true,
    "s2": {
      "error_code": "e078",
      "error_reason": "reason"
    }
  },
  "ordered_relations": [
    [
      0,
      1
    ],
    [
      2
    ],
    [
      3
    ],
    []
  ]
};
var ordered_msus=data.ordered_msus;
var ordered_slots=data.ordered_slots;
var statusMap=data.status;
var ordered_relations=data.ordered_relations;
var data_final=[];
var final_object=[];


for(let i=0;i<ordered_msus.length;i++){
  let obj=ordered_msus[i];
  let status=data.status;
  obj.status=data.status.(ordered_msus[i].status)
  let slots=[];
  
  for(let j=0;j<ordered_relations[i].length;j++){
        slots.push(ordered_slots[ordered_relations[i][j]]);
  }


  final_object.push({"msu":obj.msu,"status":obj.status},{"slot":slots.slot},)

  }


}
*/


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
  

   _processLocationAttributesCsv() {
    var isValid=false;
    var invalidLocationCount=0;

    var msu_status=[];
    var slot_status=[];
    if(this.props.locationAttributesCsv){  
    var ordered_msus=this.props.locationAttributesCsv.ordered_msus || [];
      /*var ordered_msus=[{
      "msu": "123",
      "status": "s1"
    },
    {
      "msu": "456",
      "status": "s2"
    },
    {
      "msu": "789",
      "status": "s1"
    },
    {
      "msu": "147",
      "status": "s1"
    }
  ];
  */
    var ordered_slots=this.props.locationAttributesCsv.ordered_slots || [];
/*
      var ordered_slots= [{
      "slot": "123.1.A.02",
      "status": "s1"
    },
    {
      "slot": "123.1.A.03",
      "status": "s1"
    },
    {
      "slot": "456.1.A.06",
      "status": "s1"
    },
    {
      "slot": "789.0.B.05",
      "status": "s1"
    },
    {
      "slot": "555.0.B.05",
      "status": "s1"
    }
  ];
*/
    var ordered_relations=this.props.locationAttributesCsv.ordered_relations || [];
/*
    var ordered_relations=[
    [
      0,
      1
    ],
    [
      2
    ],
    [
      3
    ],
    []
  ];
  */
    var statusMap=this.props.locationAttributesCsv.status;
    /*
    var statusMap={
    "s1": true,
    "s2": {
      "error_code": "e078",
      "error_reason": "reason"
    }
  };
*/
    var isValid=false;
    var isValidMSU=true;
    var isValidSlot=true;
    

    var arrList=[];//modified list of msus and slots
    var statusList=[];//statusList of modifies msus and slots list
    var slotListCsv=[];
    //ordered_msus:
    for(let i=0;i<ordered_msus.length;i++){
      
        msu_status[i]=ordered_msus[i].status;
    }

    //ordered_slots:
    for( let i=0;i<ordered_slots.length;i++){
      slot_status[i]=ordered_slots[i].status;
    }
    //check if all msus are valid:
    for(let i=0;i<msu_status.length;i++){
      if(msu_status[i]!=="s0"){
        invalidLocationCount++;
        isValidMSU=false;
        
      }
    }
    //check whether all slots are valid:
    for(let i=0;i<slot_status.length;i++){
      if(slot_status[i]!=="s0"){
        isValidSlot=false;
        invalidLocationCount++;
      }
    }

    if(isValidMSU && isValidSlot){
      isValid=true;
    }
    else{
      invalidLocationCount=invalidLocationCount
    }

    var coveredSlotIndices=[];

      
    //place the slots of the msu beneath the corresponding msu:
    for(let i=0;i<ordered_msus.length;i++){
      arrList.push(ordered_msus[i].msu);
      statusList.push(ordered_msus[i].status);
      slotListCsv.push(false);
      for(let j=0;j<ordered_relations[i].length;j++){
        coveredSlotIndices.push(ordered_relations[i][j]);
        arrList.push(ordered_slots[ordered_relations[i][j]].slot);
        statusList.push(ordered_slots[ordered_relations[i][j]].status);
        slotListCsv.push(true);
      }

    }



    var locationAttributeData={isValid:isValid,invalidLocationCount:invalidLocationCount};
    this.state.arrGroupCsv=arrList;
    this.state.statusListCsv=statusList;
    this.state.valueCsv=arrList[0];
      this.state.slotListCsv=slotListCsv;

    }
    
                
     
     var locationAttributeData={isValid:isValid,invalidLocationCount:invalidLocationCount};
      return locationAttributeData;
  }

  _processLocationAttributes() {
    var isValid=false;
    var invalidLocationCount=0;

    var msu_status=[];
    var slot_status=[];
    if(this.props.locationAttributes){  
    var ordered_msus=this.props.locationAttributes.ordered_msus || [];
      /*var ordered_msus=[{
      "msu": "123",
      "status": "s1"
    },
    {
      "msu": "456",
      "status": "s2"
    },
    {
      "msu": "789",
      "status": "s1"
    },
    {
      "msu": "147",
      "status": "s1"
    }
  ];
  */
    var ordered_slots=this.props.locationAttributes.ordered_slots || [];
/*
      var ordered_slots= [{
      "slot": "123.1.A.02",
      "status": "s1"
    },
    {
      "slot": "123.1.A.03",
      "status": "s1"
    },
    {
      "slot": "456.1.A.06",
      "status": "s1"
    },
    {
      "slot": "789.0.B.05",
      "status": "s1"
    },
    {
      "slot": "555.0.B.05",
      "status": "s1"
    }
  ];
*/
    var ordered_relations=this.props.locationAttributes.ordered_relations || [];
/*
    var ordered_relations=[
    [
      0,
      1
    ],
    [
      2
    ],
    [
      3
    ],
    []
  ];
  */
    var statusMap=this.props.locationAttributes.status;
    /*
    var statusMap={
    "s1": true,
    "s2": {
      "error_code": "e078",
      "error_reason": "reason"
    }
  };
*/
    var isValid=false;
    var isValidMSU=true;
    var isValidSlot=true;
    

    var arrList=[];//modified list of msus and slots
    var statusList=[];//statusList of modifies msus and slots list
    var slotList=[];
    //ordered_msus:
    for(let i=0;i<ordered_msus.length;i++){
      
        msu_status[i]=ordered_msus[i].status;
    }

    //ordered_slots:
    for( let i=0;i<ordered_slots.length;i++){
      slot_status[i]=ordered_slots[i].status;
    }
    //check if all msus are valid:
    for(let i=0;i<msu_status.length;i++){
      if(msu_status[i]!=="s0"){
        invalidLocationCount++;
        isValidMSU=false;
        
      }
    }
    //check whether all slots are valid:
    for(let i=0;i<slot_status.length;i++){
      if(slot_status[i]!=="s0"){
        isValidSlot=false;
        invalidLocationCount++;
      }
    }

    if(isValidMSU && isValidSlot){
      isValid=true;
    }
    else{
      invalidLocationCount=invalidLocationCount
    }

    var coveredSlotIndices=[];

      
    //place the slots of the msu beneath the corresponding msu:
    for(let i=0;i<ordered_msus.length;i++){
      arrList.push(ordered_msus[i].msu);
      statusList.push(ordered_msus[i].status);
      slotList.push(false);
      for(let j=0;j<ordered_relations[i].length;j++){
        coveredSlotIndices.push(ordered_relations[i][j]);
        arrList.push(ordered_slots[ordered_relations[i][j]].slot);
        statusList.push(ordered_slots[ordered_relations[i][j]].status);
        slotList.push(true);
      }

    }



    var locationAttributeData={isValid:isValid,invalidLocationCount:invalidLocationCount};
    this.state.arrGroup=arrList;
    this.state.statusList=statusList;
    this.state.value=arrList[0];
      this.state.slotList=slotList;
    }
    
                
     
     var locationAttributeData={isValid:isValid,invalidLocationCount:invalidLocationCount};
      return locationAttributeData;
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
    var stateInputList = this.state.copyPasteLocation.data.slice(0);
    stateInputList.push("");
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
   stateInputList = this.state.copyPasteLocation.data.slice(0),
   focusedEl = id.toString();

   if(inputList.length > 1){
    stateInputList = inputList;
    focusedEl="0"
   }
   else{
    stateInputList[parseInt(id)] = input;
    focusedEl = id.toString();
   }
   this.setState({
      copyPasteLocation:{
        data:stateInputList,
        focusedEl
      }
    })
    /*let arrInput=[];
    this.state.id=id;
    if(event){
      event.preventDefault();
      let userInput = event.target.value!==undefined?event.target.value.split(" "):[this.state.arrGroup[this.state.arrGroup.length-1],""];
      this.state.userInput=userInput;
    
//Paste:
if(userInput.length>1){

  if(id===0){
    arrInput=userInput;
    this.state.arrGroup[0]=userInput[0];
    
  }
  else{

    arrInput[0]=this.state.arrGroup[0];
    for(let i=1;i<id;i++){
      arrInput.push(this.state.arrGroup[i]);
    }
    for(let i=id;i<id+userInput.length;i++){
      arrInput.push(userInput[i-id]);
    }
  } 
  
}

//For editing:
else if(userInput.length===1){

  //To make the first input field editable:
  if(id===0){
    for(var i=1;i<this.state.arrGroup.length;i++){
      arrInput.push(this.state.arrGroup[i]);

    }

    this.state.arrGroup[0]=userInput[0];
    arrInput=this.state.arrGroup;
  }

  else{

   arrInput[0]=this.state.arrGroup[0];
   for(var i=1;i<this.state.arrGroup.length;i++){
    if(i===id){
      arrInput.push(userInput[0]);
    }
    else{
      arrInput.push(this.state.arrGroup[i]);
    }
  }

}

}


this.setState({arrGroup:arrInput,value:this.state.arrGroup[0]});

}*/


}

updateInputCSV(id,event) {


    let arrInput=[];
    
    this.setState({id_csv:id});
    if(event){
      event.preventDefault();
      let userInput = event.target.value!==undefined?event.target.value.split(" "):[this.state.arrGroupCsv[this.state.arrGroupCsv.length-1],""];
      this.setState({userInputCSV:userInput});
    
//Paste:
if(userInput.length>1){

  if(id===0){
    arrInput=userInput;
    this.state.arrGroupCsv[0]=userInput[0];
    
  }
  else{

    arrInput[0]=this.state.arrGroupCsv[0];
    for(let i=1;i<id;i++){
      arrInput.push(this.state.arrGroupCsv[i]);
    }
    for(let i=id;i<id+userInput.length;i++){
      arrInput.push(userInput[i-id]);
    }
  } 
  
}

//For editing:
else if(userInput.length===1){

  //To make the first input field editable:
  if(id===0){
    for(var i=1;i<this.state.arrGroupCsv.length;i++){
      arrInput.push(this.state.arrGroupCsv[i]);

    }

    this.state.arrGroupCsv[0]=userInput[0];
    arrInput=this.state.arrGroupCsv;
  }

  else{

   arrInput[0]=this.state.arrGroupCsv[0];
   for(var i=1;i<this.state.arrGroupCsv.length;i++){
    if(i===id){
      arrInput.push(userInput[0]);
    }
    else{
      arrInput.push(this.state.arrGroupCsv[i]);
    }
  }

}

}
this.setState({arrGroupCsv:arrInput,valueCsv:this.state.arrGroupCsv[0]});

}

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

  handleFilterChange(event) {
    var checkedState=false;
    
        var checkedPPS=[], j=0, mode=event.value, sortedIndex,formData={};
        var checkedInput=[],filter=event.value;
        if(filter==="Select All"){
          checkedState=false;
          
        }
        this.setState({checkedState:checkedState});

    }

  render()
  {
      let validSkuMessg=<FormattedMessage id="audit.valid.sku" description='text for valid sku' defaultMessage='SKU confirmed'/>;
      let validLocationMessg=<FormattedMessage id="audit.valid.location" description='text for valid location' defaultMessage='Location valid'/>;
      let invalidSkuMessg=<FormattedMessage id="audit.invalid.sku" description='text for invalid sku' defaultMessage='Please enter correct SKU number'/>;
      let invalidLocationMessg=<FormattedMessage id="audit.invalid.location" description='text for invalid location' defaultMessage='Please enter correct Location number'/>;
      let validSkuNoAtriMessg=<FormattedMessage id="audit.noAtrributes.sku" description='text for valid sku with no attributed' defaultMessage='SKU confirmed but no Box Id found'/>;
      var processedSkuResponse=this._processSkuAttributes();
      var processedLocationResponse=this._processLocationAttributes();
      var processedLocationResponseCsv=this._processLocationAttributesCsv();
      var skuState=this._claculateSkuState(processedSkuResponse);
      var locationStateCsv=this._claculateLocationStateCsv(processedLocationResponseCsv);
      var locationState=this._claculateLocationState(processedLocationResponse);
      var dropdownData=this._searchDropdownEntries(skuState,processedSkuResponse);
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
            <form action="#"  id="createauditForm" ref={node=> { this.addauditForm=node }} 
                onSubmit={(e)=> this._handleAddaudit(e)}>

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
            
              
               {self.state.copyPasteLocation.data.map(function(value, i){
                    let focus = (self.state.copyPasteLocation.focusedEl === i.toString()) ? true : false;
                    return(<div className="gor-audit-input-wrap" key={value}>
                        <InputComponent.CopyPaste
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i} key={i}  
                        value={value} placeholder={"e.g: 012678ABC"}/>
                      </div>) 
              }) }
              

    <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.addLocation" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>:<div className="gor-audit-inputlist-wrap gor-audit-location-wrap" >
              <div className={"gor-global-notification"}>
              {allLocationsValid?
                 <div className={"message success"}>
                  <FormattedMessage id="audit.locationValidation.success" description='Audit location verification success message'
                                                              defaultMessage='{valid} out of {total} locations valid'
                                                              values={
                                                                {
                                                                  valid: self.state.locationAttributes.totalValid.toString(),
                                                                  total: self.state.locationAttributes.totalLocations.toString()
                                                                }
                                                              }/>
                </div>:<div className={"message error"}>
                  <FormattedMessage id="audit.locationValidation.error" description='Audit location verification error message'
                                                              defaultMessage='{invalid} Error found out of {total} Locations, Please rectify or enter valid Location'
                                                              values={
                                                                {
                                                                  invalid: self.state.locationAttributes.totalInvalid.toString(),
                                                                  total: self.state.locationAttributes.totalLocations.toString()
                                                                }
                                                              }/>
                </div>}
              
             
                
              </div>
                  <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.locationValidation.subheading" description='Subtext for enter location' 
            defaultMessage='MSU will always supercede and all slots in the MSU will be audited'/></div>
            {self.state.locationAttributes.data.map((value,i)=>{
                    let tuples=[];
                    tuples.push(<div key={value.name}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}
                        allRowValid={allLocationsValid}
                        errorMessage={!allLocationsValid ? value.status : null}  
                        value={value.name} placeholder={"e.g: 012678ABC"}/>
                      </div>)
                    if(value.children){
                        value.children.map((child,j)=>{
                          tuples.push(<div key={child.name}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={j} 
                        allRowValid={allLocationsValid} 
                        errorMessage={!allLocationsValid ? value.status : null} 
                        value={child.name} placeholder={"e.g: 012678ABC"}/>
                      </div>)
                      })
                    }
                    
                    return(tuples) 
              })}
            <button className='gor-audit-addnew-button' type="button" onClick={this._addNewInput}><FormattedMessage id="audits.locationValidation.addLocation" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>
            }
            
                          <div  className={"gor-sku-validation-btn-wrap" + (this.props.locationValidationSpinner?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"}  type="button" onClick={this._validLocation.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
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
            
            <div className='gor-usr-details'>
              <div className='gor-audit-drag-drop-wrapper'>
                <div className='gor-audit-drag-drop-content'> 
                  <FileDragAndDrop onDrop={this.handleDragAndDrop}>
                    <p style={{border: "1px solid grey"}}> Image here </p>
                    <p> Drag and drop </p>
                    <p> OR </p>
                  </FileDragAndDrop>
                </div>
                <div className='gor-audit-upload-file'>
                    <a href="#"> Upload .CSV file </a>
                    <input type="file" id="uploadCSVFile" multiple size="50" onClick={this.handleUploadCVSFile}/>
                </div>
              </div>
              
            </div>
            </div>
                 </div>           
             <div className={`location-mode ${self.state.csvUploaded === true  ? 'active-mode' : 'inactive-mode'}`}>
             {statusListCsv.length!==0 ?(locationStateCsv===VALID_LOCATION )?
              <div className='gor-audit-validation_response'>
              
              <span >{this.state.arrGroupCsv.length + " out of "+this.state.arrGroupCsv.length +" locations valid"}</span></div>
              :<div><div className="gorToolBarDropDown pps">
                                        {drop}
                                    </div><div className='gor-audit-validation_response_invalid'><span >{processedLocationResponseCsv.invalidLocationCount + " Error foundout of "+this.state.arrGroupCsv.length+" locations, Please rectify or enter the valid SKU numbers"}</span></div></div>
              :""
              }
              
        
              <div>
              
            </div>



    </div>
            
                        </div>
                        </div>
                    </Tab>
              
            
            </GorTabs>
          <div>
             <button className={"gor-add-btn"}><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='Create audit'/></button>
            </div> 
            </div>
            </form>
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

