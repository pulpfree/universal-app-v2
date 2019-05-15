import gql from 'graphql-tag'

export default gql`{
  customer @client {
    __typename
    id
    customerID
    address {
      __typename
      id
      addressID
      city
      postalCode
      provinceCode
      street1
      type
    }
    email
    name {
      __typename
      first
      last
      spouse
    }
    phones {
      __typename
      _id
      countryCode
      number
    }
  }
}`
