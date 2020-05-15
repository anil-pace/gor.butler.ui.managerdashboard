import { FIRE_EMERGENCY } from "../constants/frontEndConstants"
import React from "react"
import { FormattedMessage } from "react-intl"

export function fireHazardDetail(state = {}, action) {
  switch (action.type) {
    case FIRE_EMERGENCY:
      var res
      res = action.data
      var data,
        shutters,
        escapePath,
        emergencyStartTime,
        notifyTime,
        sourceOfFire
      sourceOfFire =
        res.complete_data[0].emergency_data &&
        res.complete_data[0].emergency_data.source_of_fire !== "none"
          ? res.complete_data[0].emergency_data.source_of_fire
          : null
      data = sourceOfFire ? res.complete_data[0].emergency_data : {}
      shutters = data.shutters || {}
      escapePath = data.escape_path || ""
      emergencyStartTime =
        sourceOfFire && res.complete_data[0].emergency_start_time
          ? res.complete_data[0].emergency_start_time
          : null
      notifyTime = !Object.keys(data).length ? new Date() : null
      return Object.assign({}, state, {
        shutters: shutters,
        escapePath: escapePath,
        emergencyStartTime: emergencyStartTime,
        emergency_type: res.complete_data[0].emergency_type,
        notifyTime: notifyTime,
        sourceOfFire: sourceOfFire
      })
      break
    default:
      return state
  }
}
