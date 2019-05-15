import gql from 'graphql-tag'

const SET_CUSTOMER_FIELD = gql`
mutation setCustomerField($field: String!, $value: String!) {
  setCustomerField(field: $field, value: $value) @client
}`

const SET_CUSTOMER_FROM_OBJ = gql`
mutation setCustomerFromObject($customer: Customer!) {
  setCustomerFromObject(customer: $customer) @client
}`

const SET_CUSTOMER_PHONE = gql`
mutation setCustomerPhone($phoneID: String!, $number: String!) {
  setCustomerPhone(phoneID: $phoneID, number: $number) @client
}`

const CLEAR_CUSTOMER = gql`
mutation clearCustomer {
  clearCustomer @client
}`

export {
  CLEAR_CUSTOMER,
  SET_CUSTOMER_FIELD,
  SET_CUSTOMER_FROM_OBJ,
  SET_CUSTOMER_PHONE,
}
