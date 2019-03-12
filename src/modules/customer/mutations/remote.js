import gql from 'graphql-tag'

const PERSIST_CUSTOMER = gql`
mutation customerPersist($customerInput: CustomerInput!, $addressInput: AddressInput) {
  customerPersist(customerInput: $customerInput, addressInput: $addressInput) {
    _id
  }
}`

export {
  PERSIST_CUSTOMER,
}
