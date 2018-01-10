import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { resetForm,validateSKU,validateLOC,validateSKUcode,validateLocationcode, validateSKUcodeSpinner } from '../../actions/validationActions'; 
import {setAuditType,resetAuditType,auditValidatedAttributes} from '../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import { connect } from 'react-redux';
import { ERROR,SKU,LOCATION,CREATE_AUDIT,APP_JSON,POST, GET, VALIDATE_SKU_ID,VALIDATE_LOCATION_ID, VALID_SKU, NO_ATTRIBUTE_SKU, SKU_NOT_EXISTS,NO_SKU_VALIDATION,WATING_FOR_VALIDATION } from '../../constants/frontEndConstants';
import { AUDIT_URL ,SKU_VALIDATION_URL} from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import { locationStatus, skuStatus } from '../../utilities/fieldCheck';
import SearchDropdown from '../../components/dropdown/searchDropdown';
import {InputComponent} from '../../components/InputComponent/InputComponent.js';
//import ReactFileReader from 'react-file-reader';
import FileDragAndDrop from 'react-file-drag-and-drop';
import GorTabs from '../../components/gor-tabs/tabs';
import {Tab} from '../../components/gor-tabs/tabContent';


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
        arrGroup:[],
        value:"",
        valueCsv:"",
        userInput:[],
        userInputCSV:[],
        id:0,
        id_csv:0,
        csvUploaded:false,
        locationMode:"location",
        skuMode:"sku"
      };
      this.handleUploadCVSFile = this.handleUploadCVSFile.bind(this);
      this.handleDragAndDrop = this.handleDragAndDrop.bind(this);
      this.handleActiveTab = this.handleActiveTab.bind(this);
      this.displayUploadCSVFileContent = this.displayUploadCSVFileContent.bind(this);
      this.displayEnterSku = this.displayEnterSku.bind(this);
      this.updateInput=this.updateInput.bind(this);
      this.updateInputCSV=this.updateInputCSV.bind(this);
      this._checkType = this._checkType.bind(this);
      this._onLocationModeSelection = this._onLocationModeSelection.bind(this);
      this._onSkuModeSelection = this._onSkuModeSelection.bind(this);
      //this.parseCSVFile =  this.parseCSVFile.bind(this);
      //this.handleFiles = this.handleFiles.bind(this);
  }
  componentWillUnmount()
  {
    this.props.resetAuditType();
    this.props.resetForm();            
  }

  componentWillMount() {

    var initialSkuInfo={}, initialAttributes;
    var selectedList=[]; 
    //this.state={selected:selectedList,userInput:[],arrGroup:[],arrGroupCsv:[],csvUploaded:false}
    this.selectedList=[];
    this.noSkuValidation=true;
    this.nolocationValidation=true;
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

  parseCSVFile(fileInstance){
    var displayCSVFile = document.getElementById('displayCSVFile');
    var textType = /text.*/;
      if (fileInstance.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          let xyz = [];
          xyz.push(reader.result);
          displayCSVFile.innerText = reader.result;
          console.log("==========================================>");
          console.log(xyz);

        }
        reader.readAsText(fileInstance);  
      } else {
        console.log("=============File not supported!");
      }
  }

  handleUploadCVSFile(evt){
    
    let arrInput=[];
    let me=this
    var files = evt.target.files;
    var fileInput = document.getElementById('uploadCSVFile');
    var displayCSVFile = document.getElementById('displayCSVFile');
     fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
       var textType = /text.*/;
       if (file.type.match(textType)) {
         var reader = new FileReader();

         reader.onload = function(e) {
           let xyz = [];

           xyz.push(reader.result.split("\n"));
           
            me.setState({arrGroupCsv:xyz[0],valueCsv:xyz[0][0],csvUploaded:true});
           
           displayCSVFile.innerText = reader.result;
      

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

  _validLocation(){
    var initialAttributes;
    let validLocationData;
    let msu_list=[];
    let slot_list=[];
    let arrLocation=this.state.arrGroupCsv;
    for(let i=0;i<this.state.arrGroupCsv.length;i++){

      if(arrLocation[i].indexOf("MSU")!==-1){
        msu_list.push(arrLocation[i]);
      }
      else{
        slot_list.push(arrLocation[i]);
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
                'url': AUDIT_URL+'/validate',
                'validLocationData':validLocationData,
                'method':POST,
                'cause':VALIDATE_LOCATION_ID,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.validateLocationcode(urlData);   

      this.props.auditValidatedAttributes(initialAttributes)
      this.props.validateSKUcodeSpinner(true);
     
      this.noLocationValidation=false;
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
    skuState=(this.props.skuValidationResponse?WATING_FOR_VALIDATION:skuState);
    this.skuState=skuState;

    return skuState;
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

  _processLocationAttributes() {
    var isValidMSU=[], isValidSlot=[], isValid=false;
    var locationAttributeData={isValidMSU:isValidMSU,isValidSlot:isValidSlot, isValid:isValid};
    if(this.props.locationAttributes && this.props.locationAttributes.ordered_msus) {
      for(var i=0;i<this.props.locationAttributes.ordered_msus.length;i++){
        if(this.props.locationAttributes.ordered_msus[i].status==="s1"){
          isValidMSU[i]=true;
        }
        else{
          isValidMSU[i]=false;
        }
      }
    }
    if(this.props.locationAttributes && this.props.locationAttributes.ordered_slots) {
      for(var j=0;j<this.props.locationAttributes.ordered_slots.length;j++){
        if(this.props.locationAttributes.ordered_slots[j].status==="s1"){
          isValidSlot[j]=true;
        }
        else{
          isValidSlot[j]=false;
        }
      }
        
        
      }


      for(let j=0;j<isValidSlot.length;j++){
        if(isValidSlot[j]===false){
          isValid=false;
          break;
        }
      }

      for(let j=0;j<isValidMSU.length;j++){
        if(isValidMSU[j]===false){
          isValid=false;
          break;
        }
      }


        


    
    locationAttributeData={isValidMSU:isValidMSU, isValidSlot:isValidSlot, isValid:isValid};
     
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

  updateInput(id,event) {


    let arrInput=[];
    this.state.id=id;
    if(event){
      event.preventDefault();
      let userInput = event.target.value.split(" ");
      this.state.userInput=userInput;
    /*this.setState({value:event.target.value,arrGroup:event.target.value.split(" ")},() => { 
    for(let i=0;i<this.state.arrGroup.length;i++){
    rows.push(<InputComponent2 key={i}  updateInput = {null} value={this.state.arrGroup[i]}/>);
   }

 })  */
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

}

}

updateInputCSV(id,event) {


    let arrInput=[];
    
    this.setState({id_csv:id});
    if(event){
      event.preventDefault();
      let userInput = event.target.value.split(" ");
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
    if(selection === "location"){
      this.setState({
        locationMode:"location"
      })
    }
    else{
      this.setState({
        locationMode:"csv"
      })
    }
  }

  _onSkuModeSelection(selection){
    if(selection === "sku"){
      this.setState({
        skuMode:"sku"
      })
    }
    else{
      this.setState({
        skuMode:"csv"
      })
    }
  }

  render()
  {
      let validSkuMessg=<FormattedMessage id="audit.valid.sku" description='text for valid sku' defaultMessage='SKU confirmed'/>;
      let invalidSkuMessg=<FormattedMessage id="audit.invalid.sku" description='text for invalid sku' defaultMessage='Please enter correct SKU number'/>;
      let validSkuNoAtriMessg=<FormattedMessage id="audit.noAtrributes.sku" description='text for valid sku with no attributed' defaultMessage='SKU confirmed but no Box Id found'/>;
      var processedSkuResponse=this._processSkuAttributes();
      var processedLocationResponse=this._processLocationAttributes();
      var skuState=this._claculateSkuState(processedSkuResponse);
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
      let self=this;
      
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
              <div>
              <div className="gor-audit-input-wrap" >
              
              <InputComponent  className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} updateInput={this.updateInput} index={0}key={0}  value={this.state.value} placeholder="  e.g:012678ABC"/>
              
    <div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/>
    <div>
   <div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
               </div> 
              </div>
              </div>
               </div>
    
    
    {
      userInput.length>1?
      this.state.id===0?
      arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      })


      :
      this.state.id===0?
      arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
     })

    }
              </div>
              <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationResponse?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"+(this.state.arrGroup.length===0?" gor-disable-content-audit-validate":"")}  type="button" onClick={this._validSku.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>
                  </div>
            
                          </div>  
                                
            <div>
              <p className='gor-submit'>
             <button className={"gor-add-btn" + ((processedSkuResponse.isValid && confirmedSkuNotChanged)|| this.props.auditType===LOCATION?"":" gor-disable-content")}><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='Create audit'/></button>
            </p>
            </div>    
                    </Tab> 

                    <Tab tabName = "Audit by Location" iconClassName={'icon-class-0'}
                                 linkClassName={'link-class-0'} internalTab={false} >
                         
                      <div>
                        <div className='gor-usr-hdsm'><FormattedMessage id="audit.select.sku.value" description='Name of audit' defaultMessage='Enter audit name:'/></div>
                        <input className="gor-audit-name-wrap" type="text" placeholder="Time,place or products"  />
                        
                        
                        <div className='gor-usr-hdsm'><FormattedMessage id="audit.select.sku.mode" description='Text for sku mode' defaultMessage='Select mode of input:'/></div>
                          <div className='gor-audit-button-wrap'>
                            <button onClick={()=>(self._onLocationModeSelection('location'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.enterLocation" description='Button for entering skus' defaultMessage='Enter Location'/></button>
                            <button onClick={()=>(self._onLocationModeSelection('csv'))} className={`gor-loc-mode-btn ${self.state.locationMode === 'csv' ? 'active-mode' : 'inactive-mode'}`}  type="button" ><FormattedMessage id="audits.csvUpload" description='Button for csv upload' defaultMessage='Upload CSV file'/></button>
                          </div>


                          
                      <div className={`location-mode ${self.state.locationMode === 'location' ? 'active-mode' : 'inactive-mode'}`}>
                         <div className='gor-usr-hdsm'><FormattedMessage id="audit.add.location.heading" description='Text for location heading' 
                        defaultMessage='Enter Location and validate'/></div>
                          

                           <div className="gor-audit-inputlist-wrap" style={{'display':this.props.auditType!==LOCATION ?'block':'none'}}>
              <div>

              <div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter location' 
            defaultMessage='Use copy and paste if you have muktiple MSU and Slot numbers'/></div>
            </div>
              <div>
              <div className="gor-audit-input-wrap" >
              
              <InputComponent  className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} updateInput={this.updateInput} index={0}key={0}  value={this.state.value} placeholder="  e.g:012678ABC"/>
              
    <div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/>
    <div>
   <div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
               </div> 
              </div>
              </div>
               </div>
    
    
    {
      userInput.length>1?
      this.state.id===0?
      arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      })


      :
      this.state.id===0?
      arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrgroup.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInput = {self.updateInput} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
     })

    }
              </div>
                          <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationResponse?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"+(this.state.arrGroup.length===0?" gor-disable-content-audit-validate":"")}  type="button" onClick={this._validSku.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
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
                        <div className={`location-mode ${self.state.csvUploaded === false  ? 'active-mode' : 'inactive-mode'}`}>
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
             

            <div className="gor-audit-inputlist-wrap" >
            <div>
              <div className="gor-audit-input-wrap" >
              
              <InputComponent  className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} updateInputCSV={this.updateInputCSV.bind(self)} index={0}key={0}  value={self.state.valueCsv} />
              
    <div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/>
    <div>
   <div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
               </div> 
              </div>
              </div>
               </div>
    
              {
      userInputCSV.length>1?
      this.state.id_csv===0?
      arrGroupCsv.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInputCSV = {self.updateInputCSV.bind(self)} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrGroupCsv.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInputCSV = {self.updateInputCSV.bind(self)} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      })


      :
      this.state.id_csv===0?
      arrGroupCsv.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInputCSV = {self.updateInputCSV.bind(self)} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
      }):arrGroupCsv.map(function(field, i){
        return <div><div className="gor-audit-input-wrap"><InputComponent className={"gor-audit-input"+(skuState===SKU_NOT_EXISTS ? ' gor-input-error':' gor-input-ok')} key={i+1} index={i+1} updateInputCSV  = {self.updateInputCSV.bind(self)} value={field} /><div className={skuState===SKU_NOT_EXISTS?"gor-login-error":((skuState===VALID_SKU || skuState===NO_ATTRIBUTE_SKU )&& confirmedSkuNotChanged?"gor-verified-icon":"")}/><div className={skuState===SKU_NOT_EXISTS?"gor-sku-error":"gor-sku-valid"}>
               {confirmedSkuNotChanged?(skuState===SKU_NOT_EXISTS?invalidSkuMessg:(skuState===VALID_SKU?validSkuMessg:(skuState===NO_ATTRIBUTE_SKU?validSkuNoAtriMessg:""))):""}

               
                
              </div></div></div>;
     })

    }


    </div>
    <div  className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationResponse?" gor-disable-content":"")}>
                <button className={"gor-auditValidate-btn"+(this.state.arrGroupCsv.length===0?" gor-disable-content-audit-validate":"")}  type="button" onClick={this._validLocation.bind(this)}><FormattedMessage id="audits.validateSKU" description='Text for validate sku button' 
                        defaultMessage='Validate'/></button>
              </div>
              <div>
              <p className='gor-submit'>
             <button className={"gor-add-btn" + ((processedLocationResponse.isValid)?"":" gor-disable-content")}><FormattedMessage id="audits.add.password.button" description='Text for add audit button' 
            defaultMessage='Create audit'/></button>
            </p>
            </div>



    </div>
            
                        </div>
                        </div>
                    </Tab>
              
            
            </GorTabs>
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
      skuAttributes: state.auditInfo.skuAttributes,
      locationAttributes:state.auditInfo.locationAttributes
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    userRequest: function(data){ dispatch(userRequest(data)); },
    setAuditType: function(data){ dispatch(setAuditType(data)); },
    resetAuditType: function(data){ dispatch(resetAuditType(data)); },    
    validateSKU: function(data){ dispatch(validateSKU(data)); },
    validateLoc: function(data){ dispatch(validateLOC(data)); },            
    resetForm:   function(){ dispatch(resetForm()); },
    validateSKUcode: function(data){dispatch(validateSKUcode(data));},
    validateLocationcode: function(data){dispatch(validateLocationcode(data));},
    validateSKUcodeSpinner: function(data){dispatch(validateSKUcodeSpinner(data));},
    auditValidatedAttributes: function(data){dispatch(auditValidatedAttributes(data));}
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateAudit);

