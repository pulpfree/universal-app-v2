import gql from 'graphql-tag'

const PERSIST_PAYMENT = gql`
mutation PaymentPersist($input: PaymentInput!) {
  paymentPersist(input: $input) {
    _id
    amount
  }
}`

const REMOVE_PAYMENT = gql`
mutation PaymentRemove($id: ID!) {
  paymentRemove(id: $id) {
    n
    ok
  }
}`

const PERSIST_QUOTE = gql`
mutation quotePersist($input: QuoteInput!) {
  quotePersist(input: $input) {
    _id
  }
}`

const PERSIST_QUOTE_DISCOUNT = gql`
mutation quotePersistDiscount($input: QuoteDiscountInput!) {
  quotePersistDiscount(input: $input) {
    _id
  }
}`

const REMOVE_QUOTE = gql`
mutation quoteRemove($id: ID!) {
  quoteRemove(id: $id) {
    n
    ok
  }
}`

const CREATE_INVOICE = gql`
mutation createInvoice($id: ID!) {
  createInvoice(id: $id) {
    _id
  }
}`

export {
  CREATE_INVOICE,
  PERSIST_PAYMENT,
  PERSIST_QUOTE,
  PERSIST_QUOTE_DISCOUNT,
  REMOVE_PAYMENT,
  REMOVE_QUOTE,
}
