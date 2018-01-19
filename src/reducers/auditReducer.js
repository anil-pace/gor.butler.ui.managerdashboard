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
        "s0"
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
        "s0"
      ]
    ],
    "slot_list": [
      [
        "123.1.A.02",
        "s0",
        0
      ],
      [
        "031.1.G.05",
        "s1",
        -1
      ],
      [
        "011.1.A.02",
        "s0",
        3
      ],
      [
        "011.1.A.03",
        "s0",
        3
      ],
      [
        "051.1.G.05",
        "s1",
        -1
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
       let processedData = processValidationData(dummyData)//(action.data)
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
  var orderedMSU = data.ordered_msus,
  ordered_relations = data.ordered_relations,
  ordered_slots = data.slot_list,
  status = data.status,
  processedData=[],
  totalValid=0,totalInvalid=0;

  for(let i=0; i < orderedMSU.length; i++){
    let tuple = Object.assign({},orderedMSU[i]),
    children = ordered_relations[i],
    tupleChildren=[];
    tuple.status = status[tuple.status];
    totalValid = tuple.status.constructor === Boolean ? (totalValid+1) : totalValid;
    totalInvalid = tuple.status.constructor !== Boolean ? (totalInvalid +1) : totalInvalid;

    for(let j=0; j < children.length;j++){
      let child = Object.assign({},ordered_slots[j]);
      child.status = status[child.status]
      totalValid = child.status.constructor === Boolean ? (totalValid+1) : totalValid;
      totalInvalid = child.status.constructor !== Boolean ? (totalInvalid +1) : totalInvalid;
      tupleChildren.push(child)
    }
    tuple.children = tupleChildren;
    processedData.push(tuple)
  }
console.log(totalValid);
console.log(totalInvalid)
return {
    data:processedData,
    totalValid,
    totalInvalid,
    totalLocations:totalValid+totalInvalid
  }
}