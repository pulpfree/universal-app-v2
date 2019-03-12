import gql from 'graphql-tag'

export default gql`
query QuotesByCustomer($customerID: ID!) {
  searchQuotesByCustomer(customerID: $customerID) {
    quotes {
      _id
      closed
      invoiced
      number
      version
      quotePrice {
        outstanding
        total
      }
      jobsheetID {
        _id
        addressID {
          _id
          street1
          city
        }
      }
      updatedAt
    }
  }
}`
