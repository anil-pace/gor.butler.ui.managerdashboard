import {
    RECIEVE_ZONE_DATA
} from '../constants/frontEndConstants'



export function recieveZoningData(data) {
    return {
        type: RECIEVE_ZONE_DATA,
        data
    }
}



