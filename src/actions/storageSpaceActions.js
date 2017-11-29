import {STORAGE_SPACE_FETCH} from './../constants/frontEndConstants'

export function recieveStorageSpaceData(data){
    return {
        type: STORAGE_SPACE_FETCH,
        data
    }
}

