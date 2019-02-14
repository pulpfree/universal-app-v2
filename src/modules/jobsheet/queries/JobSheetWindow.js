import gql from 'graphql-tag'

export default gql`
query JobSheetWindow($windowID: ID!) {
  jobSheetWindow(windowID: $windowID) {
    _id
    costs {
      extendTotal
      extendUnit
      install
      installType
      netUnit
      options
      trim
      window
    }
    dims
    productID {
      _id
      name
    }
    qty
    rooms
    specs
    createdAt
    updatedAt
  }
}`
