import * as actions from '../../../actions/zoningActions'
import * as CONSTANTS from '../../../constants/frontEndConstants'

describe('actions', () => {
  it('should create an action to receive zoning header data', () => {
    const data =  {
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
    const expectedAction = {
      type: CONSTANTS.RECIEVE_ZONE_DATA,
      data
    }
    expect(actions.recieveZoningData(data)).toEqual(expectedAction)
  })
  

})