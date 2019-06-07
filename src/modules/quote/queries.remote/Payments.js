import gql from 'graphql-tag'

export default gql`
query Payments($quoteID: ID!) {
  payments(quoteID: $quoteID) {
    _id
    amount
    quoteID
    type
    createdAt
    updatedAt
  }
}`
