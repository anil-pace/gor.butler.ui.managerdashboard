import { FETCH_MSU_CONFIG_LIST, 
		FETCH_MSU_CONFIG_DEST_TYPE_LIST,
        FETCH_MSU_CONFIG_LIST_VIA_FILTER,
        FETCH_MSU_CONFIG_RACK_STRUCTURE,
        FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE,
        FETCH_MSU_CONFIG_START_RECONFIG,
        FETCH_MSU_CONFIG_STOP_RECONFIG,
        FETCH_MSU_CONFIG_RELEASE_MSU
	} from './../constants/frontEndConstants'

export function receiveMsuConfigList(data){
	console.log("coming inside msuConfigAction => receiveMsuConfigList => FETCH_MSU_CONFIG_LIST");
    return {
        type: FETCH_MSU_CONFIG_LIST,
        data
    }
}

export function receiveMsuConfigDestTypesList(data){
	console.log("coming inside msuConfigAction => receiveDestTypes => FETCH_MSU_CONFIG_LIST");
    return {
        type: FETCH_MSU_CONFIG_DEST_TYPE_LIST,
        data
    }
}

export function receiveMsuConfigListViaFilter(data){
    console.log("coming inside msuConfigAction => receiveMsuConfigListViaFilter => FETCH_MSU_CONFIG_LIST_VIA_FILTER");
    return {
        type: FETCH_MSU_CONFIG_LIST_VIA_FILTER,
        data
    }
}

export function receiveMsuConfigRackStructure(data){
    return {
        type: FETCH_MSU_CONFIG_RACK_STRUCTURE,
        data
    }
}

export function msuConfigStartReconfig(data){
    return {
        type: FETCH_MSU_CONFIG_START_RECONFIG,
        data
    }
}

export function msuConfigStopReconfig(data){
    return {
        type: FETCH_MSU_CONFIG_STOP_RECONFIG,
        data
    }
}

export function msuConfigReleaseMsu(data){
    return {
        type: FETCH_MSU_CONFIG_RELEASE_MSU,
        data
    }
}

export function msuConfigBlockAndPutChangeType(data){
    return {
        type: FETCH_MSU_CONFIG_BLOCK_PUT_CHANGE_TYPE,
        data
    }
}