import gql from 'graphql-tag'

export default gql`{
  quote @client {
    __typename
    _id
    number
    version
    invoiced
    closed
    customerID {
      __typename
      _id
      name {
        first
        last
      }
    }
    jobsheetID {
      __typename
      _id
      addressID {
        __typename
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
