import gql from 'graphql-tag'

export default gql`
  query($field: String, $value: String, $search: String, $active: Boolean) {
    searchCustomer(field: $field, value: $value, search: $search, active: $active) {
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
      createdAt
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
      updatedAt
    }
  }
`
