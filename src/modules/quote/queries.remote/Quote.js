import gql from 'graphql-tag'

export default gql`
query Data($quoteID: ID!) {
  quote(quoteID: $quoteID) {
    __typename
    _id
    number
    version
    invoiced
    closed
    customerID {
      _id
      name {
        first
        last
      }
    }
    jobsheetID {
      _id
      addressID {
        _id
        street1
        city
      }
    }
    discount {
      description
      discount
      subtotal
      tax
      total
    }
    items {
      group
      other
      window
    }
    itemCosts {
      group
      other
      subtotal
      window
    }
    quotePrice {
      outstanding
      payments
      subtotal
      tax
      total
    }
  }
}`
