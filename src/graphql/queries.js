// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCustomer = `query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
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
export const searchCustomer = `query SearchCustomer($field: String!, $value: String!) {
  searchCustomer(field: $field, value: $value) {
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
export const searchCustomerByAddress = `query SearchCustomerByAddress($search: String!) {
  searchCustomerByAddress(search: $search) {
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
