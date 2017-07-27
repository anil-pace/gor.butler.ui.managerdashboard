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
    // let applicable,safetyList=[],botList=[];
    // applicable=action.data.applicable || false;

    // if(applicable){
        //safetyList=action.data.displaced_bots.length>0?action.data.safetyList.push('md013'):action.data.safetyList.push('md014');
    //   botList=action.data.displaced_bots;
    // }
    //else
    //{
    //  safetyList=action.data.safetyList;
    //}

          return Object.assign({},state,{
            //"safetyList":action.data
            safetyList:['md007','md008','md009','md010','md011','md012','md013'],
            botList:[]
          });
          break;
    case SAFETY_ERROR_MAP:
          return Object.assign({},state,{
            "safetyErrorList":action.data
          });
          break;
    case "SAFETY_ERROR_BOT":
          return Object.assign({},state,{
            "safetyErrorBotList":action.data
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
