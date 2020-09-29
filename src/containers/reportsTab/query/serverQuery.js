import gql from "graphql-tag"
export const GENERATE_ITEM_MASTER_REPORT = gql`
  query GenerateItemMasterReport {
    GenerateItemMasterReport {
      list
    }
  }
`
