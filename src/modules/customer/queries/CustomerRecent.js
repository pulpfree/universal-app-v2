import gql from 'graphql-tag'

export default gql`
query SearchCustomerRecent {
  searchCustomerRecent {
    __typename
    _id
    invoiced
    version
    number
    customer {
      name {
        first
        last
      }
    }
    quotePrice {
      __typename
      outstanding
      total
    }
    updatedAt
    address {
      __typename
      _id
      city
      street1
    }
  }
}`
