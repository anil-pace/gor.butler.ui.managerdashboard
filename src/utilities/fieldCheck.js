import { ERROR, SUCCESS } from "../constants/frontEndConstants"
import { BUTLER_SUPERVISOR } from "../constants/backEndConstants"
import {
  EMPTY_PWD,
  TYPE_SUCCESS,
  EMPTY_NAME,
  INVALID_NAME,
  INVALID_PWD_OP,
  INVALID_PWD_MG,
  MATCH_PWD,
  INVALID_LOCID,
  INVALID_SKUID,
  INVALID_ID,
  INVALID_FORMAT,
  UE002
} from "../constants/messageConstants"

export function nameStatus(firstname, lastname) {
  // eslint-disable-next-line
  let nameInfo,
    format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  if (
    !firstname.trim().length ||
    !lastname.trim().length ||
    firstname.trim().length > 50 ||
    lastname.trim().length > 50
  ) {
    nameInfo = {
      type: ERROR,
      msg: EMPTY_NAME
    }
  } else if (format.test(firstname) || format.test(lastname)) {
    nameInfo = {
      type: ERROR,
      msg: INVALID_NAME
    }
  } else {
    nameInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }
  return nameInfo
}
export function passwordStatus(pswd, confirmPswd, selectedRole) {
  let passwordInfo, managerRole
  managerRole = BUTLER_SUPERVISOR
  if (!pswd.trim().length) {
    passwordInfo = {
      type: ERROR,
      msg: EMPTY_PWD
    }
  } else if (pswd.trim() !== confirmPswd.trim()) {
    passwordInfo = {
      type: ERROR,
      msg: MATCH_PWD
    }
  } else if (pswd.trim().length < 8) {
    if (selectedRole.includes(managerRole)) {
      passwordInfo = {
        type: ERROR,
        msg: INVALID_PWD_MG
      }
    } else if (pswd.trim().length < 6) {
      passwordInfo = {
        type: ERROR,
        msg: INVALID_PWD_OP
      }
    } else {
      passwordInfo = {
        type: SUCCESS,
        msg: TYPE_SUCCESS
      }
    }
  } else {
    passwordInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }

  return passwordInfo
}
export function locationStatus(locId) {
  let locInfo
  if (locId.length < 1) {
    locInfo = {
      type: ERROR,
      msg: INVALID_LOCID
    }
  } else {
    locInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }
  return locInfo
}
export function skuStatus(skuId) {
  let skuInfo
  if (skuId.length < 1) {
    skuInfo = {
      type: ERROR,
      msg: INVALID_SKUID
    }
  } else {
    skuInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }
  return skuInfo
}
export function idStatus(userid, existingUserIds) {
  // eslint-disable-next-line
  let idInfo,
    format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/
  if (userid.length < 1 || userid.length > 30) {
    idInfo = {
      type: ERROR,
      msg: INVALID_ID
    }
  } else if (format.test(userid)) {
    idInfo = {
      type: ERROR,
      msg: INVALID_FORMAT
    }
  } else if (existingUserIds.indexOf(userid) > -1) {
    idInfo = {
      type: ERROR,
      msg: UE002
    }
  } else {
    idInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }
  return idInfo
}
export function emptyField(field) {
  let fieldInfo
  if (field.length < 1) {
    fieldInfo = {
      type: ERROR,
      msg: EMPTY_PWD
    }
  } else {
    fieldInfo = {
      type: SUCCESS,
      msg: TYPE_SUCCESS
    }
  }
  return fieldInfo
}
