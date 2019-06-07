import gql from 'graphql-tag'

const SET_QUOTE = gql`
mutation setQuoteFromRemote($jobSheetID: ID!, $quoteID: ID!) {
  setQuoteFromRemote(jobSheetID: $jobSheetID, quoteID: $quoteID) @client
}`

const TOGGLE_ITEM = gql`
mutation toggleQuoteItem($itemID: ID!, $itemType: String!) {
  toggleQuoteItem(itemID: $itemID, itemType: $itemType) @client
}`

const TOGGLE_ALL = gql`
mutation toggleQuoteAll($toggleAll: Bool!) {
  toggleQuoteAll(toggleAll: $toggleAll) @client
}`

const SET_DISCOUNT = gql`
mutation setQuoteDiscount($discount: Int!, $description: String) {
  setQuoteDiscount(discount: $discount, description: $description) @client
} `

export {
  SET_DISCOUNT,
  SET_QUOTE,
  TOGGLE_ALL,
  TOGGLE_ITEM,
}
