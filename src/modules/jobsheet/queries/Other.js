import gql from 'graphql-tag'

export default gql`
query jobSheetOther($otherID: ID!) {
  jobSheetOther(otherID: $otherID) {
    __typename
    _id
    jobsheetID
    costs {
      __typename
      extendTotal
      extendUnit
    }
    description
    product
    qty
    rooms
    specs {
      __typename
      options
      location
    }
    createdAt
    updatedAt
  }
}
`
