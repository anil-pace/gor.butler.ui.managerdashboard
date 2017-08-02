import * as actions from '../../../actions/sysControllersActions'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('actions', () => {
  it('should create an action to recieve controllers data', () => {
    const data =  {
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
    const expectedAction = {
      type: CONSTANTS.CONTROLLER_DATA,
      data
    }
    expect(actions.recieveControllerData(data)).toEqual(expectedAction)
  })
  

})