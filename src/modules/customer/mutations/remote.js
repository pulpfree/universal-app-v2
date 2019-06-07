import gql from 'graphql-tag'

const PERSIST_CUSTOMER = gql`
mutation customerPersist($customerInput: CustomerInput!, $addressInput: AddressInput) {
  customerPersist(customerInput: $customerInput, addressInput: $addressInput) {
    _id
  }
}`

const REMOVE_CUSTOMER = gql`
mutation customerRemove($id: ID!) {
  customerRemove(id: $id) {
    n
    ok
  }
}`

const TOGGLE_ACTIVE_CUSTOMER = gql`
mutation customerToggleActive($id: ID!) {
  customerToggleActive(id: $id) {
    active
  }
}`

const PERSIST_NOTES = gql`
mutation customerPersistNotes($id: ID!, $notes: String!) {
  customerPersistNotes(id: $id, notes: $notes) {
    notes
  }
}`

export {
  PERSIST_CUSTOMER,
  PERSIST_NOTES,
  REMOVE_CUSTOMER,
  TOGGLE_ACTIVE_CUSTOMER,
}
