/**
 * Created by raja.d on 2/28/18.
 */
import gql from 'graphql-tag'
const itemSearchInternalState = {
    defaults: {
        ppsCheckedData: {
            checkedItemSearchPPSList: [],
            checkedOtherPPSList: [],
            checkedItemSearch: [],
            itemSearchDetails: [],
            __typename: 'IntenalState'
        }
    },
    resolvers: {
        Mutation: {
            setCheckedItemSearchpps: (_, { checkedItemSearchPPSList }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedItemSearchPPSList
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedItemSearchPPSList = checkedItemSearchPPSList
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setCheckedOtherpps: (_, { checkedOtherPPSList }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedOtherPPSList
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedOtherPPSList = checkedOtherPPSList
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setCheckedItemSearch: (_, { checkedItemSearch }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedItemSearch
                            itemSearchDetails
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.checkedItemSearch = checkedItemSearch
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },
            setItemSearchDetails: (_, { itemSearchDetails }, { cache }) => {
                let query = gql`
                    query  {
                        ppsCheckedData @client{
                            checkedItemSearch
                            itemSearchDetails
                            __typename
                            }
                        }
                `;
                let previous = cache.readQuery({ query }).ppsCheckedData
                previous.itemSearchDetails = JSON.stringify(itemSearchDetails);
                cache.writeData({ data: { ppsCheckedData: previous } });
                return null;

            },

        },
    },
};



export default itemSearchInternalState;