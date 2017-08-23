
import {GET_OVERVIEW,GET_SYSTEM,GET_INVENTORY,GET_AUDIT,GET_USERS,GET_ORDERS,
  GET_STATUS,SET_EMERGENCY_MODAL_STATUS} from '../constants/frontEndConstants.js';


export  function tabsData(state={},action){
  switch (action.type) {
      case GET_OVERVIEW:
      let overview_status='';
      if(action.data.header_data)
      {
        overview_status=action.data.header_data.status;
      }
      return Object.assign({}, state, {
        "overview_status":overview_status
      })
      case GET_SYSTEM:
      let system_data,system_emergency=false,zoneDetails,lastEmergencyState;
      if(action.data.header_data)
      {      
        system_emergency=action.data.header_data.emergency;
        system_data=action.data.header_data.emergency_level;
        lastEmergencyState = action.data.header_data.last_emergency_state;
        zoneDetails = action.data.header_data.zone_details

      }
      return Object.assign({}, state, {
        "system_emergency":system_emergency,
        "system_data":system_data,
        isEmergencyOpen:!system_emergency,
        zoneDetails,
        lastEmergencyState
      })
                
      case GET_USERS:
      let users_online=0;
      if(action.data.header_data)
      {
        users_online=Number(action.data.header_data.users_logged_in);
      }
      return Object.assign({}, state, {
        "users_online":users_online
      })
      case GET_AUDIT:
      let audit_count=0, audit_alert=0;
      if(action.data.header_data)
      {
        audit_count=Number(action.data.header_data.audits_in_progress);
        audit_alert=Number(action.data.header_data.audit_alert);
      }
      return Object.assign({}, state, {
        "audit_count":audit_count,
        "audit_alert":audit_alert
      })      
      case GET_INVENTORY:
      let space_utilized=0;
      if(action.data.header_data)
      {
        space_utilized=Number(action.data.header_data.space_utilized);
      }
      return Object.assign({}, state, {
        "space_utilized":space_utilized
      })      
      case GET_ORDERS:
      let orders_completed=0;
      if(action.data.header_data)
      {
        orders_completed=Number(action.data.header_data.percentage_completed).toFixed(2);
      }
      return Object.assign({}, state, {
        "orders_completed":orders_completed
      })      
      case GET_STATUS:
      let status=false;
      if(action.data.header_data)
      {
        status=action.data.header_data.online;
      }
      return Object.assign({}, state, {
        "status":status
      }) 
      case SET_EMERGENCY_MODAL_STATUS:
          return Object.assign({}, state, { 
            "isEmergencyOpen":action.data
          })     

    default:
      return state
  }
}