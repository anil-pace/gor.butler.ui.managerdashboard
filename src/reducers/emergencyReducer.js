import {MODAL_STATUS,SAFETY_MAP,
  SAFETY_ERROR_MAP,CHECKLIST,MODAL_RESET} from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function emergency(state={},action){
  switch (action.type) {
  	case MODAL_STATUS:
          return Object.assign({}, state, { 
            "hideModal":action.data     
          })
          break;
    case SAFETY_MAP:
          return Object.assign({},state,{
            //"safetyList":action.data
            safetyList:['md007','md008','md009','md010','md011','md012'],
            botList:[{
              botid:"Bot1",
              botDirection:"North",
              rackid:"Rack02"
            },
            {
              botid:"Bot13",
              botDirection:"South",
              rackid:"Rack03"
            }
            ]
          });
          break;
    case SAFETY_ERROR_MAP:
          return Object.assign({},state,{
            "safetyErrorList":action.data
          });
          break;
    case CHECKLIST:
          return Object.assign({},state,{
            "checkingList":action.data
          });
          break;     
    case MODAL_RESET:
          return Object.assign({}, state, { 
            "hideModal":null,
            "safetyErrorList":[]
          })
          break;   
    default:
    	  return state;
  }
}
