import {GET_OVERVIEW,GET_SYSTEM,GET_INVENTORY,GET_AUDIT,GET_USERS,GET_ORDERS,GET_STATUS,FIRE_EMERGENCY_POPUP_FLAG} from '../constants/frontEndConstants.js';

export function recieveOverviewStatus(data){
  return {
    type: GET_OVERVIEW,
      data
    }
}

export function recieveSystemStatus(data){
  return {
    type: GET_SYSTEM,
      data
    }
}

export function recieveInventoryStatus(data){
  return {
    type: GET_INVENTORY,
      data
    }
}

export function recieveAuditStatus(data){
  return {
    type: GET_AUDIT,
      data
    }
}

export function recieveOrdersStatus(data){
  return {
    type: GET_ORDERS,
      data
    }
}

export function recieveUsersStatus(data){
  return {
    type: GET_USERS,
      data
    }
}

export function recieveStatus(data){
  return {
    type: GET_STATUS,
      data
    }
}

export function setFireHazrdFlag(data) {
    return {
        type: FIRE_EMERGENCY_POPUP_FLAG,
        data
    }
}


