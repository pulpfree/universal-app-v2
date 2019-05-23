import gql from 'graphql-tag'

export default gql`
query Customer($customerID: ID!) {
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
      location {
        type
        coordinates
      }
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
    phones {
      _id
      countryCode
      number
    }
  }
}`
