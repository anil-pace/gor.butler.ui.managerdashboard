import {AUDIT_DATA,SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS,
  VALIDATE_SKU_SPINNER,VALIDATE_LOCATION_SPINNER,
  VALIDATE_LOCATION_SPINNER_CSV,
  VALIDATED_ATTIBUTES_DATA,
  VALIDATED_ATTIBUTES_DATA_SKU,
  VALIDATED_ATTIBUTES_DATA_LOCATION,
  VALIDATED_ATTIBUTES_DATA_LOCATION_CSV,
  TEXTBOX_STATUS,
  DISPLAY_AUDIT_VALIDATION_SPINNER,
  AUDIT_LIST_REFRESHED,
  CREATE_AUDIT_REQUEST} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

/*const validSKU ={
  "audit_sku_validation_response": {
    "attributes_list": [
      {},
      {
        "product_color": [
          "Black"
        ]
      },
      {},
      {
        "product_color": [
          "Red",
          "Black"
        ],
        "product_internal_memory": [
          "32GB",
          "64GB"
        ],
        "product_region": [
          "India version",
          "China version"
        ]
      },
      {
        "product_internal_memory": [
          "128GB"
        ],
        "product_region": [
          "China version"
        ]
      }
    ],
    "i18n_values": {
      "product_color": [
        {
          "display_name": "Product color",
          "locale": "en-US"
        }
      ],
      "product_internal_memory": [
        {
          "display_name": "Internal memory",
          "locale": "en-US"
        }
      ],
      "product_region": [
        {
          "display_name": "Product region",
          "locale": "en-US"
        }
      ]
    },
    "sku_list": [
      "2002",
      "2003",
      "2001",
      "2004",
      "2005"
    ],
    "status": {
      "s0": true,
      "s1": {
        "error_code": "e027",
        "error_reason": "sku does not exist"
      }
    },
    "status_list": [
      "s0",
      "s0",
      "s0",
      "s0",
      "s0"
    ]
  }
}*/

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
        let processedDataSKU = processValidationDataSKU(action.data)//(action.data)
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
    default:
      return state
  }
}

function processValidationDataSKU(data){
  var processedData=[],
  skuList = data.sku_list,
  status = data.status,
  statusList = data.status_list,
  attList = data.attributes_list,
  i18n = data.i18n_values,
  totalValid=0,totalInvalid=0;

  for(let i=0,len = skuList.length; i< len ;i++){
    let tuple ={};
    tuple.skuName = skuList[i],
    tuple.status = status[statusList[i]];
    totalValid = (tuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
    totalInvalid = (tuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
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
    tuple.attributeList = categoryList;
    processedData.push(tuple)
    
  }
  return {
    data:processedData,
    totalValid,
    totalInvalid,
    totalSKUs:totalValid+totalInvalid
  };
}

function processValidationData(data){

var processedData=[],
msuList = data.msu_list,
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


return {
    data:processedData,
    totalValid,
    totalInvalid,
    totalLocations:totalValid+totalInvalid
  }
}