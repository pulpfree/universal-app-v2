// eslint-disable
// this is an auto generated file. This will be overwritten

export const createCustomer = `mutation CreateCustomer($id: ID!) {
  createCustomer(id: $id) {
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
`;
