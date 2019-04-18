import gql from 'graphql-tag'

export default gql`
query Data($quoteID: ID!) {
  quote(quoteID: $quoteID) {
    __typename
    _id
    quotePrice {
      outstanding
      payments
      subtotal
      tax
      total
    }
  }
}`
