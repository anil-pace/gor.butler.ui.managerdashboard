import {AUDIT_DATA,SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS,VALIDATE_SKU_SPINNER,VALIDATE_LOCATION_SPINNER,VALIDATE_LOCATION_SPINNER_CSV,VALIDATED_ATTIBUTES_DATA,VALIDATED_ATTIBUTES_DATA_LOCATION,VALIDATED_ATTIBUTES_DATA_LOCATION_CSV,TEXTBOX_STATUS,AUDIT_LIST_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
const dummyData = {
  "audit_location_validation_response": {
    "msu_list": [
      [
        "123",
        "s0",
        [
          "123.1.A.02"
        ],
        [
          "s0"
        ]
      ],
      [
        "434",
        "s0"
      ],
      [
        "657",
        "s1"
      ],
      [
        "011",
        "s0",
        [
          "011.1.A.02",
          "011.1.A.03"
        ],
        [
          "s0",
          "s0"
        ]
      ]
    ],
    "individual_slot_list": [
      [
        "031.1.G.05",
        "s1"
      ],
      [
        "051.1.G.05",
        "s1"
      ]
    ],
    "status": {
      "s0": true,
      "s1": {
        "error_code": "e026",
        "error_reason": "location does not exist"
      },
      "s2": {
        "error_code": "e0xx",
        "error_reason": "duplicate entry"
      }
    }
  }
}
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
           

    case VALIDATED_ATTIBUTES_DATA:
       return Object.assign({}, state, { 
            "skuAttributes" : action.data
          })
          

    case VALIDATED_ATTIBUTES_DATA_LOCATION:
       let processedData = processValidationData(dummyData.audit_location_validation_response)//(action.data)
       return Object.assign({}, state, { 
            "locationAttributes" : processedData,
            "hasDataChanged":!state.hasDataChanged
          })
           


     case VALIDATED_ATTIBUTES_DATA_LOCATION_CSV:
       return Object.assign({}, state, { 
            "locationAttributesCsv" : action.data
          })
          

    case TEXTBOX_STATUS:  
     return Object.assign({}, state, { 
            "textBoxStatus" : action.data
          })
          

      case AUDIT_LIST_REFRESHED:
          return Object.assign({}, state, {
              "auditListRefreshed": new Date()
          })
                     
    default:
      return state
  }
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

console.log(processedData);
return {
    data:processedData,
    totalValid,
    totalInvalid,
    totalLocations:totalValid+totalInvalid
  }
}