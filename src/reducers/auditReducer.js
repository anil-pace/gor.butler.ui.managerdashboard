
import {AUDIT_DATA,SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS,SETAUDIT_DETAILS,
  VALIDATE_SKU_SPINNER,VALIDATE_LOCATION_SPINNER,
  VALIDATE_LOCATION_SPINNER_CSV,
  VALIDATED_ATTIBUTES_DATA,
  VALIDATED_ATTIBUTES_DATA_SKU,
  VALIDATED_ATTIBUTES_DATA_LOCATION,
  VALIDATED_ATTIBUTES_DATA_LOCATION_CSV,
  SETAUDIT_USER,
  SETAUDIT_CHECKED,
  TEXTBOX_STATUS,
  SETAUDIT_PPS_CHECKED,
  SETOTHER_PPS_CHECKED,
  DISPLAY_AUDIT_VALIDATION_SPINNER,
  AUDIT_LIST_REFRESHED,
  CREATE_AUDIT_REQUEST,SET_AUDIT_EDIT_DATA} from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */



export  function auditInfo(state={},action){
  switch (action.type) {
    case AUDIT_DATA:

          var res,auditData={};
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.total_audited)
              auditData.total_audited=Number(res.aggregate_data.total_audited);

          }
          return Object.assign({}, state, { 
            "auditData" : auditData
          })
          

    case SET_AUDIT:
          return Object.assign({}, state, { 
            "auditType" : action.data
          })
          

    case RESET_AUDIT:
          return Object.assign({}, state, { 
            "auditType" : null
          })
          
    case SETAUDIT_PPS:
          return Object.assign({}, state, { 
            "ppsList" : action.data
          })

          break; 
    case SETAUDIT_USER:
          return Object.assign({}, state, { 
            "auditUserList" : action.data
          })
          break; 
          
    case SETAUDIT_DETAILS:
          return Object.assign({}, state, { 
            "auditDetails" : action.data
          })
          break;
          
    case SETAUDIT_CHECKED:
          return Object.assign({}, state, { 
            "checkedAuditList" : action.data
          })
          break; 
     case SETAUDIT_PPS_CHECKED:
          return Object.assign({}, state, { 
            "checkedAuditPPSList" : action.data
          })
          break;     
          case SETOTHER_PPS_CHECKED:
          return Object.assign({}, state, { 
            "checkedOtherPPSList" : action.data
          })
          break;

    case VALIDATE_SKU_SPINNER:
          return Object.assign({}, state, { 
            "skuValidationSpinner" : action.data
          })
           

    case VALIDATE_LOCATION_SPINNER:
            return Object.assign({}, state, { 
            "locationValidationSpinner" : action.data
          })
          

    case VALIDATE_LOCATION_SPINNER_CSV:
            return Object.assign({}, state, { 
            "locationValidationSpinnerCsv" : action.data
          })
          
    case VALIDATED_ATTIBUTES_DATA_SKU:
        let processedDataSKU = processValidationDataSKU(action.data,null,action.includeExpiry)
       return Object.assign({}, state, { 
            "skuAttributes" : processedDataSKU,
            "hasDataChanged":!state.hasDataChanged,
            "auditValidationSpinner":false
          })
    case VALIDATED_ATTIBUTES_DATA_LOCATION:
       let processedData = processValidationData(action.data.audit_location_validation_response)//(action.data)
       return Object.assign({}, state, { 
            "locationAttributes" : processedData,
            "hasDataChanged":!state.hasDataChanged,
            "auditValidationSpinner":false
          })
    case DISPLAY_AUDIT_VALIDATION_SPINNER:
            return Object.assign({}, state, {
                "auditValidationSpinner": action.data
            })

    case TEXTBOX_STATUS:  
     return Object.assign({}, state, { 
            "textBoxStatus" : action.data
          })


    case AUDIT_LIST_REFRESHED:
          return Object.assign({}, state, {
              "auditListRefreshed": new Date()
          })
    case CREATE_AUDIT_REQUEST:
           return Object.assign({}, state, {
              "auditCreationSuccessful": action.data.audit_id ? !state.auditCreationSuccessful : state.auditCreationSuccessful
          }) 
  case SET_AUDIT_EDIT_DATA:
  if(action.data && action.data.attributes_list_sets){
    let processedDataSKU1 = processValidationDataSKU(action.data,"Edit_Dup");
    return Object.assign({}, state, {
         "auditEditData":processedDataSKU1,              
        "hasDataChanged":!state.hasDataChanged,
         "auditSpinner":false,
         "auditValidationSpinner":false
    })
  }else
  {
    let processedData = processValidationData(action.data,"Edit_Dup")//(action.data)
    return Object.assign({}, state, { 
      "locationAttributes":processedData, 
         "hasDataChanged":!state.hasDataChanged,
         "auditValidationSpinner":false
       })
  }

                   
    default:
      return state
  }
}

function processValidationDataSKU(data,param,includeExpiry){
  let finalArr=[],outerObj={}
  var processedData=[],
  skuList = data.sku_list,
  status = data.status,
  statusList = data.status_list,
  attList = data.attributes_list,
  i18n = data.i18n_values,
  totalValid=0,totalInvalid=0;
  const expiryCategory = {
    category_text:"",
    category_value:"expired",
    attributeList:{
      "$expired":{
        text:"Expired",
        checked:false,
        excludeFromSet:true
      }
    }
  }
 if(param=="Edit_Dup")
 {
let attrSet=data.attributes_list_sets;

for(let a=0,len=attrSet.length;a<len;a++){
  let skuobj={}, obj2={};
  let arr=attrSet[a].attributes_sets;
  for(let b=0,len=arr.length;b<len;b++){
    let obj1={};
    Object.keys(arr[b]).map(function(key,index){
      
      for(let c=0,len=arr[b][key].length;c<len;c++){
        let obj={};
        obj.text=arr[b][key][c];
        obj.category=key;
        obj1[arr[b][key][c]]=obj;
        
      }
      obj2[b]=obj1;
  
    })

  }
  outerObj[attrSet[a].sku]=obj2;
}

}


  for(let i=0,len = skuList.length; i< len ;i++){
    let tuple ={};
    tuple.skuName = skuList[i];
    if(param=="Edit_Dup")
    {
    totalValid++;
  }else
  {
    tuple.status = status[statusList[i]];
    totalValid = (tuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
    totalInvalid = (tuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
    }
    let attributeList = attList[i];
    let categoryList = [];
    for(let key in attributeList){
      let attTuple = {}
      attTuple.category_text = i18n[key][0].display_name;
      attTuple.category_value = key;
      let attObj={};
      attributeList[key].forEach(function(el){
        attObj[el] = {};
        attObj[el].text = el;
        attObj[el].checked = false;
      })
      attTuple.attributeList = attObj;
      categoryList.push(attTuple);
    }
    if(includeExpiry && categoryList.length){
      categoryList.unshift(expiryCategory);
    }
    tuple.attributeList = categoryList;
    processedData.push(tuple)
    
  }
  return {
   data:processedData,
    totalValid,
    totalInvalid,outerObj,
    totalSKUs:totalValid+totalInvalid
  };
}

function processValidationData(data,param){
  var processedData=[],totalValid=0,totalInvalid=0;
if(param!=="Edit_Dup"){
  var msuList = data.msu_list,
statusList = data.status,totalValid=0,totalInvalid=0,
indSlotList = data.individual_slot_list;

for(let i=0,len=msuList.length; i<len ;i++){
  let tuple = {},children=[];
  tuple.name = msuList[i][0],
  tuple.status = statusList[msuList[i][1]];
  totalValid = (tuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
  totalInvalid = (tuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
  for(let j=0,childLen =msuList[i][2] ? msuList[i][2].length : 0; j<childLen ;j++ ){
    let childTuple = {}
    childTuple.name = msuList[i][2][j];
    childTuple.status = statusList[msuList[i][3][j]];
    totalValid = (childTuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
    totalInvalid = (childTuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
    children.push(childTuple);
  }
  if(children.length){
    tuple.children = children
  }
  processedData.push(tuple)
}
indSlotList.map(function(value,i){
  let tuple= {
    name:value[0],
    status:statusList[value[1]]
  }
  totalValid = (tuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
  totalInvalid = (tuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
  processedData.push(tuple)
  
})
}
else{
var arr= data.locations_list;
processedData=[];
for(var i=0,len=arr.length;i<len;i++){
  var objLoc={
    'name':arr[i],
    'status':true
  }
  totalValid++;
  processedData.push(objLoc);
}
totalInvalid=0;
}
return {
    data:processedData,
    totalValid,
    totalInvalid,
    totalLocations:totalValid+totalInvalid
  }
}