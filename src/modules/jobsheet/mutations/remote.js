import gql from 'graphql-tag'

const PERSIST_JOBSHEET = gql`
mutation jobSheetPersist(
  $jobSheetInput: JobSheetInput!,
  $addressInput: AddressInput,
  $addressID: ID
) {
  jobSheetPersist(
    jobSheetInput: $jobSheetInput,
    addressInput: $addressInput,
    addressID: $addressID
  ) {
    _id
  }
}`

const REMOVE_JOBSHEET = gql`
mutation jobSheetRemove($id: ID!) {
  jobSheetRemove(id: $id) {
    n
    ok
  }
}`

const PERSIST_GROUP = gql`
mutation jobSheetPersistGroup($input: GroupInput!) {
  jobSheetPersistGroup(input: $input) {
    _id
  }
}`

const REMOVE_GROUP = gql`
mutation jobSheetRemoveGroup($id: ID!) {
  jobSheetRemoveGroup(id: $id) {
    n
    ok
  }
}`

const PERSIST_OTHER = gql`
mutation jobSheetPersistOther($input: OtherInput!) {
  jobSheetPersistOther(input: $input) {
    _id
  }
}`

const REMOVE_OTHER = gql`
mutation jobSheetRemoveOther($id: ID!) {
  jobSheetRemoveOther(id: $id) {
    n
    ok
  }
}`

const PERSIST_WINDOW = gql`
mutation jobSheetPersistWindow($input: WindowInput!) {
  jobSheetPersistWindow(input: $input) {
    _id
  }
}`

const REMOVE_WINDOW = gql`
mutation jobSheetRemoveWindow($id: ID!) {
  jobSheetRemoveWindow(id: $id) {
    n
    ok
  }
}`

const PERSIST_FEATURES = gql`
mutation jobSheetPersistFeatures($id: ID!, $features: String!) {
  jobSheetPersistFeatures(id: $id, features: $features) {
    _id
    features
  }
}`

export {
  PERSIST_GROUP,
  PERSIST_FEATURES,
  PERSIST_JOBSHEET,
  PERSIST_OTHER,
  PERSIST_WINDOW,
  REMOVE_GROUP,
  REMOVE_JOBSHEET,
  REMOVE_OTHER,
  REMOVE_WINDOW,
}
