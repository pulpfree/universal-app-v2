import gql from 'graphql-tag'

export default gql`
  query CustomerData($customerID: ID!) {
    customer(customerID: $customerID) {
      __typename
      _id
      active
      address {
        _id
        associate
        city
        country
        countryCode
        postalCode
        provinceCode
        street1
        street2
        type
      }
      email
      name {
        first
        last
        spouse
      }
      notes
      phones {
        _id
        countryCode
        number
      }
      createdAt
      updatedAt
    }
    searchQuotesByCustomer(customerID: $customerID) {
      quotes {
        _id
        closed
        invoiced
        number
        version
        quotePrice {
          outstanding
          payments
          subtotal
          tax
          total
        }
        itemCosts {
          group
          other
          subtotal
          window
        }
        jobsheetID {
          _id
          addressID {
            _id
            street1
            city
          }
          number
        }
        updatedAt
      }
    }
    searchJobSheetsByCustomer(customerID: $customerID) {
      _id
      addressID {
        _id
        street1
        city
      }
      number
      updatedAt
    }
  }
`
