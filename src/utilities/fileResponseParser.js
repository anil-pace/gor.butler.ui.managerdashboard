/**
 * Created by gaurav.m on 6/14/17.
 */

import {DOWNLOAD_STOCK_LEDGER_REPORT,
    } from '../constants/frontEndConstants';
import {saveFile} from '../utilities/utils';

import {setStockLedgerSpinner} from '../actions/spinnerAction';
export function FileResponseParser(store,res,cause,fileName)
{
    switch(cause)
    {
        case DOWNLOAD_STOCK_LEDGER_REPORT:
            saveFile(res,fileName);
            store.dispatch(setStockLedgerSpinner(false));
            break;
        default:
            saveFile(res,fileName);
            break;
    }
}