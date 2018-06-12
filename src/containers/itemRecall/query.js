import gql from 'graphql-tag';

export const VALIDATE_SKU_QUERY = gql`
    query SKUList($sku:SKUListParams){
		SKUList(input:$sku){
		  list
		}
}
`;

export const RECALL_ITEM = gql`
    query ItemRecall($params:ItemRecallParams){
		ItemRecall(input:$params){
		  status{
		    status
		    code
		    message
		    reason
		  }
		}
}
`;