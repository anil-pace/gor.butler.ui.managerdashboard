import {zoningReducer} from '../../../reducers/zoningReducer'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('Zoning reducer', () => {

  it('should handle ZONE_DATA true', () => {
    const data  = {
    "header_data": {
          "zones_data": {
            "total_zones": 20,
            "active_zones": 0
          },
          "emergency_data": {
            "emergency_on": true,
            "emergency_type": "stop"
          }
    },
    "resource_type": "zones"
}
const expectedZoneData = {
            "total_zones": 20,
            "active_zones": 0
          }
const expectedEmergencyData = {
            "emergency_on": true,
            "emergency_type": "stop"
          }

    expect(
      zoningReducer( {
          "hasDataChanged":false
        }, {
        type: CONSTANTS.RECIEVE_ZONE_DATA,
        data
      })
    ).toEqual(
        {
          "hasDataChanged":true,
          "zoneHeader":expectedZoneData,
          "emergencyData":expectedEmergencyData
        }
    )

 
  })
})