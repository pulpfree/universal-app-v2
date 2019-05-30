import gql from 'graphql-tag'

export default gql`
query QuoteNearbyJobs($input: AddressGeoInput!) {
  quoteNearbyJobs(input: $input) {
    _id
    city
    customerID
    location {
      coordinates
    }
    postalCode
    provinceCode
    street1
    dist {
      calculated
    }
  }
}`
