import {
    RECIEVE_ZONE_DATA
} from '../constants/frontEndConstants'

const zoneData = {
    "header_data": {
        "total_zones": 20,
        "active_zones": 13
    },
    "resource_type": "zones"
}


export function recieveZoningData(data) {
    return {
        type: RECIEVE_ZONE_DATA,
        data
    }
}



