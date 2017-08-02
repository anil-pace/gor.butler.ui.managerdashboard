import {sysControllersReducer} from '../../../reducers/sysControllersReducer'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('System Controller reducer', () => {

  it('should handle ZONE_DATA true', () => {
    const data = {
  "complete_data": [{
      "controller_id": "10000",
      "zone_id": "1",
      "status": "connected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "latch_gate",
      "action_triggered": "zone_pause"
    },
    {
      "controller_id": "20000",
      "zone_id": "2",
      "status": "disconnected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "none",
      "action_triggered": "emergency_stop" ,
      "sensor": "emergency_pause_button_press"
    }
  ],
  "resource_type": "controllers"
}
const expectedControllersData = [{
      "controller_id": "10000",
      "zone_id": "1",
      "status": "connected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "latch_gate",
      "action_triggered": "zone_pause"
    },
    {
      "controller_id": "20000",
      "zone_id": "2",
      "status": "disconnected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "none",
      "action_triggered": "emergency_stop" ,
      "sensor": "emergency_pause_button_press"
    }
  ]

    expect(
      sysControllersReducer( {
          "hasDataChanged":true
        }, {
        type: CONSTANTS.CONTROLLER_DATA,
        data
      })
    ).toEqual(
        {
          "hasDataChanged":false,
          "controllers":expectedControllersData
        }
    )
    expect(
      sysControllersReducer( {
          "hasDataChanged":false
        }, {
        type: CONSTANTS.CONTROLLER_DATA,
        data
      })
    ).toEqual(
        {
          "hasDataChanged":true,
          "controllers":expectedControllersData
        }
    )

 
  })
})