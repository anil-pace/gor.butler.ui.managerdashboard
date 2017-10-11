import {sysOverviewReducer} from '../../../reducers/sysOverviewReducer'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('Zoning reducer', () => {

  it('should handle ZONE_DATA true', () => {
    const data = {
      "complete_data": {
        "zones_data":{
        "1": {
          "zone_status": "operation_normal" 
        },
        "2": {
          "zone_status": "emergency_pause"
        },
        "3":{
          "zone_status": "emergency_stop"
        },
        "4":{
          "zone_status": "zone_pause_activated"
        },
        "5":{
          "zone_status": "zone_clear_initiated"
        },
        "6":{
          "zone_status": "zone_pause_initiated"
        },
        "7":{
          "zone_status": "zone_clear_activated"
        },
        "8":{
          "zone_status": "zone_clear_deactivated"
        }
      },
        "emergency_data":{
          "emergency_on": false,
          "emergency_type":"stop"
        }
      },
      "resource_type": "zones"
    }
const expectedZoneData = {
        "zones_data":{
        "1": {
          "zone_status": "operation_normal" 
        },
        "2": {
          "zone_status": "emergency_pause"
        },
        "3":{
          "zone_status": "emergency_stop"
        },
        "4":{
          "zone_status": "zone_pause_activated"
        },
        "5":{
          "zone_status": "zone_clear_initiated"
        },
        "6":{
          "zone_status": "zone_pause_initiated"
        },
        "7":{
          "zone_status": "zone_clear_activated"
        },
        "8":{
          "zone_status": "zone_clear_deactivated"
        }
      },
        "emergency_data":{
          "emergency_on": false,
          "emergency_type":"stop"
        }
      }

    expect(
      sysOverviewReducer( {
          "hasDataChanged":false
        }, {
        type: CONSTANTS.ZONE_DATA,
        data
      })
    ).toEqual(
        {
          "hasDataChanged":true,
          "zoneSubscriptionInitiated":true,
          "zones":expectedZoneData
        }
    )

 
  })
})