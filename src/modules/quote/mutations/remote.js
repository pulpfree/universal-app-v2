import gql from 'graphql-tag'

const PERSIST_QUOTE = gql`
mutation quotePersist($input: QuoteInput!) {
  quotePersist(input: $input) {
    _id
  }
}`

const REMOVE_QUOTE = gql`
mutation quoteRemove($id: ID!) {
  quoteRemove(id: $id) {
    n
    ok
  }
}`

export {
  PERSIST_QUOTE,
  REMOVE_QUOTE,
}
