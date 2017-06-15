import {
    DISPLAY_SPINNER,
    DISPLAY_LOGIN_SPINNER,
    DISPLAY_INVENTORY_SPINNER,
    DISPLAY_AUDIT_SPINNER,
    DISPLAY_ORDER_LIST_SPINNER,
    DISPLAY_WAVES_SPINNER,
    DISPLAY_BUTLER_SPINNER,
    DISPLAY_PPS_SPINNER,
    DISPLAY_CHARGING_STATION_SPINNER,
    DISPAY_RESOLVE_AUDIT_SPINNER,
    DISPLAY_SAFETY_SPINNER,
    DISPAY_USER_SPINNER,
    DISPLAY_PPS_FILTER_SPINNER,
    DISPLAY_BOT_FILTER_SPINNER,
    DISPLAY_WAVES_FILTER_SPINNER,
    DISPLAY_CHARGING_STATION_FILTER_SPINNER,
    DISPLAY_INVENTORY_REPORT_SPINNER,
    DISPLAY_STOCK_LEDGER_SPINNER,DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER
} from '../constants/frontEndConstants'

/**
 * [loader reducer function to set isLoading state]
 * @param  {Object} state  [state tree of the current reducer]
 * @param  {[type]} action [action that called the reducer]
 * @return {[object]}        [returns updated state object]
 */
export function spinner(state = {}, action) {
    switch (action.type) {

        case DISPLAY_SPINNER:
            return Object.assign({}, state, {
                "isLoading": action.data
            })
        case DISPLAY_LOGIN_SPINNER:
            return Object.assign({}, state, {
                "loginSpinner": action.data
            })
        case DISPLAY_INVENTORY_SPINNER:
            return Object.assign({}, state, {
                "inventorySpinner": action.data
            })
        case DISPLAY_WAVES_FILTER_SPINNER:
            return Object.assign({}, state, {
                "waveFIlterSpinner": action.data
            })

        case DISPLAY_BOT_FILTER_SPINNER:
            return Object.assign({}, state, {
                "butlerFilterSpinnerState": action.data
            })

        case DISPLAY_PPS_FILTER_SPINNER:
            return Object.assign({}, state, {
                "ppsFilterSpinnerState": action.data
            })


        case DISPLAY_CHARGING_STATION_FILTER_SPINNER:
            return Object.assign({}, state, {
                "csFilterSpinner": action.data
            })

        case DISPLAY_AUDIT_SPINNER:
            return Object.assign({}, state, {
                "auditSpinner": action.data
            })

        case DISPLAY_ORDER_LIST_SPINNER:
            return Object.assign({}, state, {
                "orderListSpinner": action.data
            })

        case DISPLAY_WAVES_SPINNER:
            return Object.assign({}, state, {
                "wavesSpinner": action.data
            })

        case DISPLAY_BUTLER_SPINNER:
            return Object.assign({}, state, {
                "butlerSpinner": action.data
            })

        case DISPLAY_PPS_SPINNER:
            return Object.assign({}, state, {
                "ppsSpinner": action.data
            })

        case DISPLAY_CHARGING_STATION_SPINNER:
            return Object.assign({}, state, {
                "csSpinner": action.data
            })

        case DISPAY_RESOLVE_AUDIT_SPINNER:
            return Object.assign({}, state, {
                "auditResolveSpinner": action.data
            })

        case DISPLAY_SAFETY_SPINNER:
            return Object.assign({}, state, {
                "safetySpinner": action.data
            })
        case DISPAY_USER_SPINNER:
            return Object.assign({}, state, {
                "userSpinner": action.data
            })

        case DISPLAY_INVENTORY_REPORT_SPINNER:
            return Object.assign({}, state, {
                "inventoryReportSpinner": action.data
            })

        case DISPLAY_STOCK_LEDGER_SPINNER:
            return Object.assign({}, state, {
                "stockLedgerSpinner": action.data
            })

        case DISPLAY_STOCK_LEDGER_RAW_TRANSACTIONS_SPINNER:
            return Object.assign({}, state, {
                "stockLedgerRawTransactionsSpinner": action.data
            })


        default:
            return state
    }
}
