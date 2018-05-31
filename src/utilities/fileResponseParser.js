/**
 * Created by gaurav.m on 6/14/17.
 */

import {
    GET_REPORT,DOWNLOAD_STOCK_LEDGER_REPORT,DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT
} from '../constants/frontEndConstants';
import {saveFile} from '../utilities/utils';

import {setStockLedgerSpinner,setStockLedgerRawTransactionsSpinner} from '../actions/spinnerAction';
import {setDownloadReportSpinner} from '../actions/downloadReportsActions';
export function FileResponseParser(store, res, cause, fileName) {
    switch (cause) {
        case DOWNLOAD_STOCK_LEDGER_REPORT:
            saveFile(res, fileName);
            store.dispatch(setStockLedgerSpinner(false));
            break;
        case DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT:
            saveFile(res, fileName);
            store.dispatch(setStockLedgerRawTransactionsSpinner(false));
            break;
        case GET_REPORT:
            saveFile(res, fileName);
            store.dispatch(setDownloadReportSpinner(false));
            break;
        default:
            saveFile(res, fileName);
            break;
    }
}