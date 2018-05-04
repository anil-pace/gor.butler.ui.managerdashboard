import React  from 'react';
import { FormattedMessage,injectIntl,intlShape,defineMessages } from 'react-intl'; 
import { resetForm } from '../../actions/validationActions';
import { connect } from 'react-redux';
import { APP_JSON,POST, GET, VALIDATE_SKU_ID,VALIDATE_LOCATION_ID,VALID_SKU,CREATE_AUDIT_REQUEST } from '../../constants/frontEndConstants';
import { AUDIT_VALIDATION_URL,AUDIT_CREATION_URL} from '../../constants/configConstants';
import SelectAttributes from '../../components/gor-select-attributes/selectAttributes';
import {InputComponent} from '../../components/InputComponent/InputComponent.js';
import Filter from '../../components/gor-filter-component/filter';
import SearchFilterComponent from '../../components/gor-search-component/searchFilter';
import GorTabs from '../../components/gor-tabs/tabs';
import {Tab} from '../../components/gor-tabs/tabContent';
import CSVUpload from '../../components/gor-drag-drop-upload/index';
import {makeAjaxCall} from '../../actions/ajaxActions';
import Spinner from '../../components/spinner/Spinner';
import {setValidationAuditSpinner} from '../../actions/auditActions';
import {modal} from 'react-redux-modal';
import SkuAlerts from './skuAlerts';


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
const  messages= defineMessages({
    auditnameplaceholder: {
        id: 'audit.nameplaceholder.text',
        description: 'text for audit name placeholder',
        defaultMessage: 'Time, place or products'
    },
    auditinputplaceholder: {
        id: 'audit.inputplaceholder.text',
        description: 'text for audit input placeholder',
        defaultMessage: 'e.g: 012678ABC'
    },
    searchPlaceholderSKU:{
        id: 'audit.searchinputplaceholder.text',
        description: 'text for search audit input placeholder',
        defaultMessage: 'Search SKU'
    },
    searchPlaceholderLocation:{
        id: 'audit.locinputplaceholder.text',
        description: 'text for search audit input placeholder',
        defaultMessage: 'Search Location'
    },
    e026: {
        id: 'audit.locationdoesnotexist.text',
        description: 'text for audit location does not exist error',
        defaultMessage: 'Location does not exist'
    },
    e027: {
        id: 'audit.skudoesnotexist.text',
        description: 'text for audit sku does not exist error',
        defaultMessage: 'SKU does not exist'
    },
    e0xx: {
        id: 'audit.duplicatelocation.text',
        description: 'text for audit duplicate location error',
        defaultMessage: 'Duplicate entry'
    }
    
});




class CreateAudit extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.state={
        copyPasteSKU:{
          data:[{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }],
          focusedEl:"0",
          selectionStart:0,
          isInputEmpty:true
        },
        copyPasteLocation:{
          data:[{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }],
          focusedEl:"0",
          selectionStart:0,
          isInputEmpty:true
        },
        filterApplied:false,
        filterSelectionState:"none",
        locationAttributes:{},
        skuAttributes:{},
        csvUploaded:false,
        locationMode:"location",
        skuMode:"sku",
        checkedState:true,
        isValidCsv:true,
        isAuditCreated:false,
        activeTabIndex:0,
        validateclicked:false,
        selectedSKUList:{},
        auditSpinner:this.props.auditSpinner,
        panelClass:'collapsed'
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
      this._validateLocation=this._validateLocation.bind(this);
      this._onBackClick=this._onBackClick.bind(this);
      this._validateSKU=this._validateSKU.bind(this);
      this._onTabClick = this._onTabClick.bind(this);
      this._onAttributeSelection = this._onAttributeSelection.bind(this);
      this._invokeAlert = this._invokeAlert.bind(this);
      this._searchCallBack = this._searchCallBack.bind(this);
      this._createAudit=this._createAudit.bind(this);
      this._togglePanel = this._togglePanel.bind(this);
      
      
  }
  
  componentWillUnmount()
  {
    
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
      let locationAttributes =this.props.locationDataChanged !== nextProps.locationDataChanged?JSON.parse(JSON.stringify(nextProps.locationAttributes)):{},
      skuAttributes = this.props.skuDataChanged !== nextProps.skuDataChanged?JSON.parse(JSON.stringify(nextProps.skuAttributes)):{},
      validatedLocations = this.state.activeTabIndex === 0 ? this.state.copyPasteLocation.data : this._processLocationAttributes(locationAttributes.data || []),
      validatedSKUs = this.state.activeTabIndex === 0 ? this._processSkuAttributes(skuAttributes.data || []) : this.state.copyPasteSKU.data,
      validationDone = Object.keys(locationAttributes).length ? true : false,
      validationDoneSKU = Object.keys(skuAttributes).length ? true : false;

      this.setState({
      copyPasteLocation:{
        data:validatedLocations,
        focusedEl:"0",
        selectionStart:this.state.selectionStart
      },
      copyPasteSKU:{
        data:validatedSKUs,
        focusedEl:"0",
        selectionStart:this.state.selectionStart
      },
      locationAttributes,
      validationDone,
      skuAttributes,
      validationDoneSKU,
      auditSpinner:nextProps.auditSpinner

    })
    }
    if(this.props.auditSpinner !== nextProps.auditSpinner){
      this.setState({
        auditSpinner:nextProps.auditSpinner
      })
    }
  }
  _onAttributeSelection(selectedAttributes,index){
    var selAtt = JSON.parse(JSON.stringify(selectedAttributes));
    var selectedSKUList = JSON.parse(JSON.stringify(this.state.selectedSKUList));
    var sku = this.state.copyPasteSKU["data"][index].value;
    var tuple={};
    tuple.sku = sku;
    tuple.attributes_sets=[];
    for(let key in selAtt){
      let categories={};
      for(let k in selAtt[key]){
        if(!categories[selAtt[key][k].category]){
          categories[selAtt[key][k].category] = []
        }
        categories[selAtt[key][k].category].push(k);
      }
      tuple.attributes_sets.push(categories);
      
    }
    selectedSKUList[sku] = tuple;
    
    this.setState({
      selectedSKUList
    })
    

  }
  _onAttributeCheck(event,index){
    var copyPasteLocation = JSON.parse(JSON.stringify(this.state.activeTabIndex === 0 ? this.state.copyPasteSKU.data :this.state.copyPasteLocation.data));
    var tuple = Object.assign({},copyPasteLocation[parseInt(index)]);
    tuple.checked = event.target.checked;
    copyPasteLocation.splice(parseInt(index), 1, tuple);
    if(this.state.activeTabIndex === 0){
      this.setState({
      copyPasteSKU:{
        data:copyPasteLocation,
        focusedEl:this.state.copyPasteSKU.focusedEl,
        selectionStart:this.state.selectionStart
      }
    })
    }
    else{
       this.setState({
      copyPasteLocation:{
        data:copyPasteLocation,
        focusedEl:this.state.copyPasteLocation.focusedEl,
        selectionStart:this.state.selectionStart
      }
    })
    }
    
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
  _processLocationAttributes(data){
    var processedData=[];
    for(let i=0,len=data.length;i<len;i++){
      let children = data[i].children,
      tuple = {};
      tuple.checked=false;
      tuple.index=i;
      tuple.visible=true;
      tuple.value=data[i].name;
      let error_code = data[i].status===true ? "" :data[i].status.error_code;
      tuple.errorMessage = data[i].status===true ? data[i].status : this.props.intl.formatMessage(messages[error_code]);
      processedData.push(tuple);
      if(children){
      for(let j=0;j<children.length ;j++){
        let child = {}
        child.checked=false;
        child.index=j;
        child.value=children[j].name;
        let error_code = children[j].status===true ? "" : children[j].status.error_code;
        child.errorMessage = children[j].status===true ? children[j].status : this.props.intl.formatMessage(messages[error_code]);
        processedData.push(child);
      }
    }
    }
    return processedData
  }
 


  _validateSKU(type) {
    let validSKUData={
      "audit_param_name":this.auditNameSKU.value,
      "audit_param_type":"sku"
    };
    let arrSKU=this.state.copyPasteSKU.data.slice(0);
    let selectedSKUList = JSON.parse(JSON.stringify(this.state.selectedSKUList));
    let auditParamValue = [];
    let sendRequest = false;

    if(type === "validate"){
      validSKUData.audit_param_value = {};
      for(let i=0,len=arrSKU.length; i<len;i++){
      auditParamValue.push(arrSKU[i].value.trim())
      }
      validSKUData.audit_param_value.sku_list = auditParamValue;
      sendRequest = true;
    }
    else if(type === "confirm" || type === "create"){
      let selectedAttributeCount = Object.keys(selectedSKUList).length;
      let isAttributeSelected = (arrSKU.length === selectedAttributeCount)
      if(!isAttributeSelected && type === "create"){
        this._invokeAlert({
          validateSKU:this._validateSKU,
          noneSelected:!selectedAttributeCount ? true :false,
          totalSKUCount:arrSKU.length,
          missingSKUCount:arrSKU.length - selectedAttributeCount
        });
      }
      else{
      validSKUData.audit_param_value = {};
      validSKUData.audit_param_value.attributes_list = [];
      validSKUData.kq = this.kqCheck.checked;
      validSKUData.action=(type === "create" || type === "confirm")?'create':'';
      validSKUData.audit_creator_name=(type === "create" || type === "confirm")?this.props.username:'';
      let {selectedSKUList} = this.state;
      let skuList = this.state.copyPasteSKU.data;
      for(let i=0,len=skuList.length; i<len ;i++){
        if(selectedSKUList[skuList[i].value]){
          validSKUData.audit_param_value.attributes_list.push(selectedSKUList[skuList[i].value]);
        }
        else{
          let noAttributeSKU = {};
          noAttributeSKU.sku = skuList[i].value;
          noAttributeSKU.attributes_sets=[];
          validSKUData.audit_param_value.attributes_list.push(noAttributeSKU);
        }
      }
      sendRequest = true;
      this.props.removeModal();
    }
    }
    if(sendRequest){
      let urlData={
                  'url': (type === "create" || type === "confirm") ? AUDIT_CREATION_URL: AUDIT_VALIDATION_URL,
                  'formdata': validSKUData,
                  'method':POST,
                  'cause':(type === "create" || type === "confirm") ? CREATE_AUDIT_REQUEST : VALIDATE_SKU_ID,
                  'contentType':APP_JSON,
                  'accept':APP_JSON,
                  'token':this.props.auth_token
      }
    this.props.setAuditSpinner(true);
    this.props.makeAjaxCall(urlData);
  }
  }



  _validateLocation(type){
    let validLocationData, validLocationDataCreateAudit;
    let arrLocation=this.state.copyPasteLocation.data.slice(0);
    let auditParamValue = []

    for(let i=0,len=arrLocation.length; i<len;i++){
      auditParamValue.push(arrLocation[i].value.trim())
    }
   
    validLocationData={
      "audit_param_name":this.auditNameLoc.value,
      "audit_param_type":"location",
      "audit_param_value":{
        "locations_list":auditParamValue
      }
    }

    validLocationDataCreateAudit={
      "audit_param_name":this.auditNameLoc.value,
      "audit_param_type":"location",
      "kq":this.kqCheck.checked,
      "audit_creator_name":this.props.username,
      "action":(type === "create" || type === "confirm")?'create':'',
      "audit_param_value":{
        "locations_list":auditParamValue
      }
    }


     
    let urlData={
                'url': (type === "create") ? AUDIT_CREATION_URL: AUDIT_VALIDATION_URL,
                'formdata':(type === "create") ? validLocationDataCreateAudit : validLocationData,
                'method':POST,
                'cause':(type === "create") ? CREATE_AUDIT_REQUEST : VALIDATE_LOCATION_ID,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.setAuditSpinner(true);
    this.props.makeAjaxCall(urlData);
   
    if(type==="create"){
      this.props.removeModal();
     
    }

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
  _searchCallBack(value){
    value =  value.trim().toLowerCase();
    var activeTabIndex = this.state.activeTabIndex;
    var data = activeTabIndex === 0 ? JSON.parse(JSON.stringify(this.state.copyPasteSKU.data)) : JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
    var filteredList=[];
    if(value !== ""){
    //Traversing the list
    for(let i=0,len=data.length;i<len;i++){
      if(data[i].value.toLowerCase().indexOf(value) > -1){
        data[i].visible = true;
      }
      else{
        data[i].visible = false;
      }
    }
    if(activeTabIndex === 0){
      this.setState({
        copyPasteSKU:{
          data:data,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        },
        filterApplied:true
      })
    }
    else{
      this.setState({
        copyPasteLocation:{
          data:data,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        },
        filterApplied:true
      })
    }
  }
  else{
    let filteredData = this._resetStateData(data);
    if(activeTabIndex === 0){
      this.setState({
        filterApplied:false,
        copyPasteSKU:{
          data:filteredData,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        }
      })
    }
    else{
      this.setState({
        filterApplied:false,
        copyPasteLocation:{
          data:filteredData,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        }
      })
    }
    
  }
  }


  _addNewInput(type){
    var stateInputList = JSON.parse(JSON.stringify(type === "location" ? this.state.copyPasteLocation.data : this.state.copyPasteSKU.data));
    var tuple={
      checked:false,
      index:stateInputList.length,
      value:"",
      visible:true,
      errorMessage:true
    }
    stateInputList.push(tuple);
    if(type === "location"){
    this.setState({
      copyPasteLocation:{
        data:stateInputList,
        focusedEl:(stateInputList.length -1).toString()
      }
    })
  }
  else{
    this.setState({
      copyPasteSKU:{
        data:stateInputList,
        focusedEl:(stateInputList.length -1).toString(),
        selectionStart:this.state.selectionStart
      }
    })
  }
  }
  _updateInput(event,id) {
   
   var input = event.target.value.trim(),
   selectionStart = event.target.selectionStart,
   inputList = input.split(/[\s,;\t\n]+/),
   processedList=[],
   activeTabIndex = this.state.activeTabIndex,
   stateInputList = JSON.parse(JSON.stringify(activeTabIndex === 1 ? this.state.copyPasteLocation.data : this.state.copyPasteSKU.data)),
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
   if(activeTabIndex !== 0){
   this.setState({
      copyPasteLocation:{
        data:stateInputList,
        focusedEl,
        selectionStart,
        isInputEmpty:false
      }
    })
 }
 else{
  this.setState({
      copyPasteSKU:{
        data:stateInputList,
        focusedEl,
        selectionStart,
        isInputEmpty:false
      }
    })
 }
   
}

/*Function to check the location mode selection*/
  _onLocationModeSelection(selection){
      var curSel = this.state.locationMode;
      if(curSel !== selection){
      this.setState({
        locationMode:selection,
        validationDone:false,
        validationDoneSKU:false,
        skuAttributes:{},
        locationAttributes:{}
      })
    }
    
  }

  _onSkuModeSelection(selection){
    var curSel = this.state.skuMode;
    if(curSel !== selection){
    this.setState({
        skuMode:selection,
        validationDone:false,
        validationDoneSKU:false,
        skuAttributes:{},
        locationAttributes:{}
      })
  }
  }

  
    _deleteTuples(){
      var selectedTuples =[];
      var tuples = this.state.activeTabIndex === 0 ? this.state.copyPasteSKU.data :this.state.copyPasteLocation.data ;
      for(let i=0,len=tuples.length; i<len ;i++){
        if(!tuples[i].checked){
          selectedTuples.push(Object.assign({},tuples[i]))
        }
      }
      if(this.state.activeTabIndex === 0){
         this.setState({
          copyPasteSKU:{
          data:selectedTuples,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        }
      })
      }
      else{
         this.setState({
          copyPasteLocation:{
          data:selectedTuples,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        }
      })
      }
     
    }
    _onFilterSelection(selection){
      var activeTabIndex = this.state.activeTabIndex;
      var validatedData = JSON.parse(JSON.stringify(activeTabIndex !==0 ? this.state.copyPasteLocation.data : this.state.copyPasteSKU.data));
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
      
      if(activeTabIndex === 0){
        this.setState({
              copyPasteSKU:{
              data:processedData,
              focusedEl:this.state.copyPasteSKU.focusedEl,
              selectionStart:this.state.selectionStart
            },
            filterSelectionState
           })
      }
      else{
        this.setState({
            copyPasteLocation:{
            data:processedData,
            focusedEl:this.state.copyPasteLocation.focusedEl,
            selectionStart:this.state.selectionStart
          },
          filterSelectionState
         })
      }
      
     
      
    }
    _dropHandler(evt){
      evt.preventDefault();
    // If dropped items aren't files, reject them
    var dt = evt.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind === "file") {
          let fileName = dt.items[i].getAsFile();
          this._parseCSVFile(fileName);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i=0; i < dt.files.length; i++) {
        let fileName = dt.files[i].name;
        this._parseCSVFile(fileName);
      }  
    }
    }
    _parseCSVFile(fileObject){
    
    var _this =this;
    var textType = /text.*/;
    var fileExt = fileObject.name.substring(fileObject.name.lastIndexOf("."),fileObject.name.length);
      if (fileObject.type.match(textType) && fileExt === ".csv") {
        var reader = new FileReader();

        reader.onload = function() {
          let data = reader.result.split(/[\s,;\t\n]+/);
           let processedList=[];
           for(let i=0,len=data.length; i< len;i++){
            let tuple={};
            tuple.checked=false;
            tuple.index=i;
            tuple.value=data[i];
            tuple.visible=true;
            tuple.errorMessage = true;
            processedList.push(tuple);

           }
           
           if(_this.state.activeTabIndex === 1){
            _this.setState({
              copyPasteLocation:{
                data:processedList,
                focusedEl:"0",
                selectionStart:_this.state.selectionStart
              },
              locationMode:"location",
              locationAttributes:{},
              validationDone:false,
              csvUploaded:true,
              isValidCsv:true
            });
          }
          else{
             _this.setState({
              copyPasteSKU:{
                data:processedList,
                focusedEl:"0",
                selectionStart:_this.state.selectionStart
              },
              skuMode:"sku",
              skuAttributes:{},
              validationDoneSKU:false,
              csvUploaded:true,
              isValidCsv:true
            });
          }
        }
        reader.readAsText(fileObject);  
      } else {
        _this.setState({isValidCsv:false});
        console.log("File not supported!");
      }
    }
    _onFileUpload(event){
      var fileObject = event.target.files[0];
      this._parseCSVFile(fileObject);
    }
    _resetStateData(data){
      for(let i=0,len=data.length;i<len;i++){
        data[i].visible = true;
      }
      return data;
    }
    _onBackClick(){
      var data = this.state.activeTabIndex === 0 ? JSON.parse(JSON.stringify(this.state.copyPasteSKU.data)) : JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
      var resetData = this._resetStateData(data);
      if(this.state.activeTabIndex === 0){
        this.setState({
        validationDoneSKU:false,
        skuAttributes:{},
        copyPasteSKU:{
          data:resetData,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        },
        validateclicked:false,
        selectedSKUList:{},
        auditSpinner:false
      })
      }
      else{
        this.setState({
        validationDone:false,
        locationAttributes:{},
        copyPasteLocation:{
          data:resetData,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        },
        validateclicked:false,
        auditSpinner:false
      })
      }
      
    }
    _onTabClick(tabIndex){
      this.setState({
        activeTabIndex:tabIndex,
        locationAttributes: tabIndex === 0 ? {} : this.state.locationAttributes,
        skuAttributes:tabIndex === 1 ? {} : this.state.skuAttributes,
        validationDoneSKU:tabIndex === 1 ? false : this.state.validationDoneSKU,
        validationDone:tabIndex === 1 ? false : this.state.validationDone,
        filterApplied:false,
        copyPasteLocation:{
          data:tabIndex === 1 ? [{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }] : this.state.copyPasteLocation.data,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        },
        copyPasteSKU:{
          data:tabIndex === 0 ? [{
            checked:false,
            index:0,
            value:"",
            visible:true,
            errorMessage:""
          }] : this.state.copyPasteSKU.data,
          focusedEl:"0",
          selectionStart:this.state.selectionStart
        }
      })
    }
    _invokeAlert(additionalProps){
      modal.add(SkuAlerts, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            ...additionalProps // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;)
        });
    }
    _createAudit(){
      if(this.state.activeTabIndex === 0){
        this._validateSKU("create");
      }
      else{
        this._validateLocation("create");
      }
    }
    _togglePanel(){
      this.setState({
        panelClass:this.state.panelClass === 'expanded' ? 'collapsed' : 'expanded'
      })
    }

  render()
  {
      let self=this;
      let auditBySkuMessg=<FormattedMessage id="audit.auditbysku.text" description='text for Enter SKU and validate' defaultMessage='Enter SKU and validate'/>;
      let enterSkuMessg=<FormattedMessage id="audit.auditbysku.enterSKU" description='text for audit by sku' defaultMessage='Enter SKU and validate'/>;
      let enterCSVMessg=<FormattedMessage id="audit.auditbysku.enterCSV" description='text for audit by sku' defaultMessage='Upload CSV and validate'/>;
      let skuSelectAttributes = <FormattedMessage id="audit.auditbysku.selectAttributes" description='text for Select Attributes' defaultMessage='Select Attributes'/>;
      let auditByLocationMessg=<FormattedMessage id="audit.auditbylocation.text" description='text for audit by location' defaultMessage='Audit by Location'/>;
      let selectAllLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllLabel" description="audit dropdown option for Select All"
                                          defaultMessage="Select All"/>
      let selectAllInvalidLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllInvalidLabel" description="audit dropdown option for Select All Invalid"
                                          defaultMessage="Select all invalid"/>
      let selectAllValidLabel = <FormattedMessage id="Audit.inputCheckbox.selectAllValidLabel" description="audit dropdown option for Select All valid"
                                          defaultMessage="Select all valid"/>
      
      let deselectAllLabel = <FormattedMessage id="Audit.inputCheckbox.deselectAllLabel" description="audit dropdown option for Deselecting all"
                                          defaultMessage="Deselect All"/>
      let searchSKUPH = this.props.intl.formatMessage(messages.searchPlaceholderSKU);
      let searchLocPH = this.props.intl.formatMessage(messages.searchPlaceholderLocation);
      var validateclicked=self.state.validateclicked;
      let {validationDone,validationDoneSKU,activeTabIndex,filterApplied} = self.state; 
      let copyPasteSKU =  self.state.copyPasteSKU;
      let copyPasteLocation = self.state.copyPasteLocation;
      let allLocationsValid = (self.state.locationAttributes && !self.state.locationAttributes.totalInvalid) ? true : false;
      let allSKUsValid = (self.state.skuAttributes && self.state.skuAttributes.totalInvalid === 0) ? true : false;
      let enableCreateAudit;
      let skuCSVSelected = self.state.skuMode === "sku_csv";
      if(activeTabIndex === 0){
        if(validationDoneSKU && allSKUsValid){
          enableCreateAudit = true;
        }
        else{
          enableCreateAudit = false;
        }
      }
      else{
        if(validationDone && allLocationsValid){
          enableCreateAudit = true;
        }
        else{
          enableCreateAudit = false;
        }
      }
      const filterOptions=[{
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
      }]
      
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
            

            <div className='gor-audit-form new-audit'>
            <GorTabs onTabClick ={this._onTabClick} defaultActiveTabIndex={this.state.activeTabIndex} tabClass={"tabs-audit"} internalTab={false}>
                    <Tab tabName = {auditBySkuMessg} iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={false} >
                          <div>
                          <div className='gor-usr-hdsm-audit'><FormattedMessage id="audit.select.sku.value" description='Name of audit' defaultMessage='Enter audit name:'/></div>
                          <div>
                          <input className="gor-audit-name-wrap" type="text" ref={(input) => { this.auditNameSKU = input; }} placeholder={self.props.intl.formatMessage(messages.auditnameplaceholder)}  />
                          </div>                      
                            <div className='gor-usr-hdsm-audit'>
                          <FormattedMessage id="audit.select.sku.modeNew" description='Text for sku mode' defaultMessage='Select mode of input:'/>
                          </div>
                          
                         

              <div className='gor-audit-button-wrap'>
                            <button onClick={()=>(self._onSkuModeSelection('sku'))} className={`gor-loc-mode-btn ${self.state.skuMode === 'sku' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.enterSKU" description='Button for entering skus' defaultMessage='Enter SKU'/></button>
                            <button onClick={()=>(self._onSkuModeSelection('sku_csv'))} className={`gor-loc-mode-btn ${self.state.skuMode === 'sku_csv' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.csvUpload" description='Button for csv upload' defaultMessage='Upload CSV file'/></button>
                          </div>
                               
            <div className={`sku-mode`}>
            <GorTabs defaultActiveTabIndex={!validationDoneSKU ? 0 :1} disabledTabIndex={validationDoneSKU ? 0 :1} tabClass={"sub-tabs-audit"}>

            <Tab tabName = {<span className={"sub-tab-name"}><i className={"sub-tab-index"}>1</i>{skuCSVSelected ?enterCSVMessg: enterSkuMessg}</span>} iconClassName={'icon-class-0'}

                                 linkClassName={'link-class-0'}  >
          {!validationDoneSKU && !skuCSVSelected && <div>
            <div>
               <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku' 
            defaultMessage='Use copy and paste if you have muktiple sku numbers'/></div>
            </div>
            <div className="gor-audit-inputlist-wrap" >
              <div className="gor-audit-inputlist-cont">
              <div>
               {copyPasteSKU.data.map(function(tuple, i){
                    let focus = (self.state.copyPasteSKU.focusedEl === i.toString()) ? true : false;
                    return(tuple.visible ? <div className="gor-audit-input-wrap" key={tuple.value+i}>
                        <InputComponent.CopyPaste
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        selectionStart = {self.state.copyPasteSKU.selectionStart}
                        updateInput={self._updateInput} 
                        index={i} 
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                      </div>:null) 
              }) }
               </div>

             
              </div>
              <button className='gor-audit-addnew-button' type="button" onClick={()=>this._addNewInput("sku")}><FormattedMessage id="audits.addSku" description='Text for adding a location' 
                        defaultMessage='+ Add New'/></button>
              </div>
               
              </div>}
            {!validationDoneSKU && skuCSVSelected && <div className={'sku-mode active-mode'}>

          <div >
      <div className="gor-audit-csvupload-wrap">
                        
                        {!self.state.isValidCsv?
                  <div className="gor-global-notification"> 
                  <div className="message error"> 
                  <FormattedMessage id="audit.csvupload.error" description='Audit location Csv upload error message'
                                                              defaultMessage='Error found, Please upload a valid .csv file'
                                                             />
                  </div>
                  </div>
                :""
              }

                <div className='gor-audit-drag-drop-container'> 
                  <CSVUpload onDrop={this._dropHandler} onFileUpload={this._onFileUpload}>
                    <div className={"file-drop"} >

                      <div className="gor-file-upload"></div>
                      <p><FormattedMessage id="audits.draganddrop.text" description='Text for csv Drag and Drop' 
                        defaultMessage='Drag and drop'/></p>
                      <h1 className="gor-csv-upl-msg"><span className="gor-audit-csvupload-or"><FormattedMessage id="audits.draganddropor.text" description='Text for or' 
                        defaultMessage='OR'/></span></h1>
                    </div>
                  </CSVUpload>
                </div>
            </div>
                 </div> 
                        </div>}
            </Tab>
            <Tab tabName = {<span className={"sub-tab-name"}><i className={"sub-tab-index"}>2</i>{skuSelectAttributes}</span>} iconClassName={'icon-class-1'}
                                 linkClassName={'link-class-1'}  >
                        <div className={"gor-global-notification"}>
              {validationDoneSKU && allSKUsValid?
                 <div className={"gor-audit-att-ribbon"}>
                 <div className="gor-sku-validation-btn-wrap">
                 <button onClick={this._onBackClick} className={"gor-audit-edit-att"}><FormattedMessage id="audits.editSKUText" description='Text for editing a location' 
                        defaultMessage='BACK TO EDIT'/></button>
                <div className="sku-search"> <SearchFilterComponent animate={true} callBackDelay={300} placeHolder={searchSKUPH} searchCallBack={this._searchCallBack}/></div>

                 </div>
                 <div ref={(erMsg)=>{this.erMsg=erMsg}} className={"message success"}>
                  <FormattedMessage id="audit.skuValidation.success" description='Audit sku verification success message'
                                                              defaultMessage='{valid} out of {total} SKUs valid'
                                                              values={
                                                                {
                                                                  valid: self.state.skuAttributes.totalValid ? self.state.skuAttributes.totalValid.toString() : "0",
                                                                  total: self.state.skuAttributes.totalSKUs ? self.state.skuAttributes.totalSKUs.toString() : "0"
                                                                }
                                                              }/>
                </div></div>:<div><div className="gor-sku-validation-btn-wrap"><Filter options={filterOptions} checkState={self.state.filterSelectionState} onSelectHandler={this._onFilterSelection} />
                <span className="gor-delete-outline">
              <span className={self.state.filterSelectionState==="none"?"gor-delete-location-disabled":"gor-delete-location"} onClick={this._deleteTuples}></span>
              </span>
              <div className="sku-search"> <SearchFilterComponent animate={true} callBackDelay={300} placeHolder={searchSKUPH} searchCallBack={this._searchCallBack}/></div>
              </div>
              <div ref={(erMsg)=>{this.erMsg=erMsg}} className={"message error"}>
                  <FormattedMessage id="audit.skuValidation.error" description='Audit sku verification error message'
                                                              defaultMessage='{invalid} Error found out of {total} SKUs, Please rectify or enter valid SKUs'
                                                              values={
                                                                {
                                                                  invalid: self.state.skuAttributes.totalInvalid ? self.state.skuAttributes.totalInvalid.toString() : "0",
                                                                  total: self.state.skuAttributes.totalSKUs ? self.state.skuAttributes.totalSKUs.toString() : "0"
                                                                }
                                                              }/>
                </div></div>}
              
             
                
              </div>
          {validationDoneSKU && <div><div className={"gor-audit-inputlist-wrap"} >
          <div className={"gor-audit-inputlist-cont "+self.state.panelClass}>
          <div className={"note-message"}>
                  <FormattedMessage id="audit.skuValidation.note" description='Audit location verification error message'
                                                              defaultMessage='Note: Not setting any attributes will result in auditing the entire SKU with all attributes'
                                                              />
                </div>
              <div>
               {copyPasteSKU.data.map((tuple,i)=>{
                    let tuples=[],
                    attributeList = this.state.skuAttributes.data[i].attributeList;
                    if(tuple.visible){
                    tuples.push(<div className={allSKUsValid ? "gor-valid-row" : "gor-valid-row has-error"} key={tuple.value+i}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}
                        selectionStart = {self.state.copyPasteSKU.selectionStart}
                        allRowValid={allSKUsValid}
                        onAttributeCheck={self._onAttributeCheck}
                        checked={tuple.checked}
                        errorMessage={!allSKUsValid ? tuple.errorMessage : true}  
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                        {allSKUsValid && attributeList.length > 0 && <SelectAttributes 
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
                      <button className='gor-audit-addnew-button' type="button" onClick={()=>this._addNewInput("sku")}><FormattedMessage id="audits.addsku2" description='Text for adding a location' 
                        defaultMessage='+ ADD NEW'/></button>
              </div>}
               </div>

             
             </div>
              </div>
              <div className="gor-audit-excol-wrap"> <span onClick={this._togglePanel} className={"gor-exp-coll "+self.state.panelClass}></span>
              </div>
              </div>
            }
             
            </Tab>
            </GorTabs>



              {!allSKUsValid && !skuCSVSelected && <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationSpinner?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"}  type="button" onClick={(e)=>this._validateSKU("validate")}>{this.state.auditSpinner ? <Spinner isLoading={this.state.auditSpinner} utilClassNames={"gor-orange-spinner"} />:<FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='VALIDATE'/>}</button>
              </div>}
               
                  </div>

            
                          </div>  
                                
               
                    </Tab> 

                    <Tab tabName = {auditByLocationMessg} iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={false} >
                         
                      <div>
                        <div className='gor-usr-hdsm-audit'><FormattedMessage id="audit.select.sku.value" description='Name of audit' defaultMessage='Enter audit name:'/></div>
                        <input className="gor-audit-name-wrap" ref={(input) => { this.auditNameLoc = input; }} type="text" placeholder={self.props.intl.formatMessage(messages.auditnameplaceholder)} />
                        
                        
                        <div className='gor-usr-hdsm-audit'><FormattedMessage id="audit.select.sku.inputmode" description='Text for location mode' defaultMessage='Select mode of input:'/></div>
                          <div className='gor-audit-button-wrap'>
                            <button onClick={()=>(self._onLocationModeSelection('location'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.enterLocation" description='Button for entering skus' defaultMessage='Enter Location'/></button>
                            <button onClick={()=>(self._onLocationModeSelection('location_csv'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'location_csv' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.csvUpload" description='Button for csv upload' defaultMessage='Upload CSV file'/></button>
                          </div>


                          
                      <div className={`location-mode ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}>
                         <div className='gor-usr-hdsm-audit'><FormattedMessage id="audit.add.location.heading" description='Text for location heading' 
                        defaultMessage='Enter Location and validate'/></div>



                          
             
              
            {!validationDone?<div className="gor-audit-location-wrap" >
            <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.location.subheading" description='Subtext for enter location' 
            defaultMessage='Use copy and paste if you have multiple MSU and Slot numbers'/></div>

            <div className="gor-audit-location-list">
              
               {copyPasteLocation.data.map(function(tuple, i){
                    let focus = (self.state.copyPasteLocation.focusedEl === i.toString()) ? true : false;
                    return(tuple.visible?<div className="gor-audit-input-wrap" key={tuple.value+i}>
                        <InputComponent.CopyPaste
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        selectionStart = {self.state.copyPasteLocation.selectionStart}
                        index={i}  
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                      </div>:null) 
              }) }
              </div>
               <div>
    <button className='gor-audit-addnew-button' type="button" onClick={()=>this._addNewInput("location")}><FormattedMessage id="audits.addAuditLocation2" description='Text for adding a location' 
                        defaultMessage='+ ADD NEW'/></button>
                        </div>
              </div>:<div className="gor-audit-location-wrap" >
              <div className={"gor-global-notification"}>
              {allLocationsValid?
                 <div className={"gor-audit-att-ribbon"}>
                 <div className="gor-sku-validation-btn-wrap">
                 <button onClick={this._onBackClick} className={"gor-audit-edit-att"}><FormattedMessage id="audits.editLocation" description='Text for editing a location' 
                        defaultMessage='BACK TO EDIT'/></button>
                 </div>
                 <div className={"message success"}>
                  <FormattedMessage id="audit.locationValidation.success" description='Audit location verification success message'
                                                              defaultMessage='{valid} out of {total} locations valid'
                                                              values={
                                                                {
                                                                  valid: self.state.locationAttributes.totalValid?self.state.locationAttributes.totalValid.toString():'0',
                                                                  total: self.state.locationAttributes.totalLocations?self.state.locationAttributes.totalLocations.toString():'0'
                                                                }
                                                              }/>
                </div></div>:<div><div className="gor-sku-validation-btn-wrap"><Filter options={filterOptions} checkState={self.state.filterSelectionState} onSelectHandler={this._onFilterSelection} />
                <span className="gor-delete-outline">
              <span className={self.state.filterSelectionState==="none"?"gor-delete-location-disabled":"gor-delete-location"} onClick={this._deleteTuples}></span>
              </span>
              <div className="sku-search"> <SearchFilterComponent animate={true} callBackDelay={300} placeHolder={searchLocPH} searchCallBack={this._searchCallBack}/></div>
              </div>
              <div className={"message error"}>
                  <FormattedMessage id="audit.locationValidation.error" description='Audit location verification error message'
                                                              defaultMessage='{invalid} Error found out of {total} Locations, Please rectify or enter valid Location'
                                                              values={
                                                                {
                                                                  invalid:self.state.locationAttributes.totalInvalid? self.state.locationAttributes.totalInvalid.toString():'0',
                                                                  total: self.state.locationAttributes.totalLocations?self.state.locationAttributes.totalLocations.toString():'0'
                                                                }
                                                              }/>
                </div></div>}
              
             
                
              </div>
                  <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.locationValidation.subheading" description='Subtext for enter location' 
            defaultMessage='MSU will always supercede and all slots in the MSU will be audited'/></div>
             <div className="gor-audit-location-list">
            {copyPasteLocation.data.map((tuple,i)=>{
                    let tuples=[];
                    if(tuple.visible){
                    tuples.push(<div key={tuple.value+i}>
                        <InputComponent.AfterValidation
                        className={"gor-audit-input gor-input-ok"} 
                        autoFocus = {focus} 
                        updateInput={self._updateInput} 
                        index={i}
                        selectionStart = {self.state.copyPasteLocation.selectionStart}
                        allRowValid={allLocationsValid}
                        onAttributeCheck={self._onAttributeCheck}
                        checked={tuple.checked}
                        errorMessage={!allLocationsValid ? tuple.errorMessage : true}  
                        value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)}/>
                      </div>)
                  }
                    
                    
                    return(tuples) 
              })}
            </div>
            <div>
            <button className={!allLocationsValid?'gor-audit-addnew-button':'gor-audit-addnew-button-disabled'} type="button" onClick={()=>this._addNewInput("location")}><FormattedMessage id="audits.locationValidation.addLocation" description='Text for adding a location' 
                        defaultMessage='+ ADD NEW'/></button>
                        </div>
                        
              </div>
            }
                          <div  className={"gor-sku-validation-btn-wrap"}>
                <button className={(self.state.copyPasteLocation.isInputEmpty || (validationDone && allLocationsValid) )?"gor-auditValidate-btn-disabled":"gor-auditValidate-btn"}  type="button" onClick={this._validateLocation}>
                <label>
                {(!validationDone && validateclicked ) ? <div className='gor-spinner'></div> :<FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='VALIDATE'/>}
                        
            
            </label>
                          
        </button>
              </div>
              
              <div>
             
            </div>

                        </div>
              <div className={`location-mode ${self.state.locationMode === 'location_csv'  ? 'active-mode' : 'inactive-mode'}`}>

          <div >
      <div className="gor-audit-csvupload-wrap">
                        
                        {!self.state.isValidCsv?
                  <div className="gor-global-notification"> 
                  <div className="message error">  
                  <FormattedMessage id="audit.csvupload.error" description='Audit location Csv upload error message'
                                                              defaultMessage='Error found, Please upload a valid .csv file'
                                                             />
                  </div>
                  </div>
                :""
              }

                <div className='gor-audit-drag-drop-container'> 
                  <CSVUpload onDrop={this._dropHandler} onFileUpload={this._onFileUpload}>
                    <div className={"file-drop"} >

                      <div className="gor-file-upload"></div>
                      <p><FormattedMessage id="audits.draganddrop.text" description='Text for csv Drag and Drop' 
                        defaultMessage='Drag and drop'/></p>
                      <h1 className="gor-csv-upl-msg"><span className="gor-audit-csvupload-or"><FormattedMessage id="audits.draganddropor.text" description='Text for or' 
                        defaultMessage='OR'/></span></h1>
                    </div>
                  </CSVUpload>
                </div>
            </div>
                 </div> 
                        </div>
                        </div>
                    </Tab>

            </GorTabs>
           <div className={"audit-sub-footer"}>
           <section className={"set-kq-wrp"}>
              <div className={"kq-check-wrp"}>
              <span><input type="checkbox" ref={(input) => { this.kqCheck = input; }} /></span>
              </div>
              <div className={"kq-check-label"}>
                <p className={"kq-check-msg"}> <FormattedMessage id="audit.kq.label.msg" description='Audit location Csv upload error message'
                                                              defaultMessage='Show KQ on Butler Operator Interface'
                                                             /></p>
                <p className={"kq-check-submsg"}> <FormattedMessage id="audit.kq.label.submsg" description='Audit location Csv upload error message'
                                                              defaultMessage='Selecting this will enable key in quantity for this audit task'
                                                             /></p>
              </div>
           </section>
           </div>
            </div>
            <div className={"audit-footer"}>
             <button onClick={()=>{this._createAudit("create")}} className={enableCreateAudit ? "gor-create-audit-btn" : "gor-create-audit-btn disabled"}><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='CREATE AUDIT'/></button>
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
    intl: intlShape.isRequired,
    auditSpinner: React.PropTypes.bool,
    setAuditSpinner: React.PropTypes.func

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
  hasDataChanged:false,
  locationDataChanged:false,
  skuDataChanged:false,
  auditSpinner:false
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
      username: state.authLogin.username,
      skuAttributes: state.auditInfo.skuAttributes,
      locationAttributes:state.auditInfo.locationAttributes,
      hasDataChanged:state.auditInfo.hasDataChanged,
      locationDataChanged:state.auditInfo.locationDataChanged,
      skuDataChanged:state.auditInfo.skuDataChanged,
      auditSpinner: state.auditInfo.auditValidationSpinner 
  };
}

function mapDispatchToProps(dispatch){
  return {
    resetForm:   function(){ dispatch(resetForm()); },
    makeAjaxCall: function (data) {dispatch(makeAjaxCall(data))},
    setAuditSpinner: function (data) {
            dispatch(setValidationAuditSpinner(data))
        }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(CreateAudit));