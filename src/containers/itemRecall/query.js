import gql from 'graphql-tag';

export const VALIDATE_SKU_QUERY = gql`
    query SKUList($sku:SKUListParams){
		SKUList(input:$sku){
		  list
		}
}
`;