import gql from 'graphql-tag';

export const INVENTORY_STOCK_LEDGER_QUERY = gql`query InventoryStockLedger($input: InventoryStockLedgerParams) {
  InventoryStockLedger(input:$input){
    fileName
    reponseData
  }
}
`;

export const STOCK_LEDGER_RAW_TRANSACTION_QUERY = gql`query StockLedgerRawTransaction($input: StockLedgerRawTransactionParams) {
  StockLedgerRawTransaction(input:$input){
    fileName
    reponseData
  }
}
`;

