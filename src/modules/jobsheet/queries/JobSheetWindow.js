import gql from 'graphql-tag'

export default gql`
query JobSheetWindow($windowID: ID!) {
  jobSheetWindow(windowID: $windowID) {
    _id
    jobsheetID
    costs {
      discounted
      extendTotal
      extendUnit
      install
      installType
      netUnit
      options
      trim
      window
    }
    dims {
      height {
        decimal
        fraction
        inch
        overSize
        round
        underSize
      }
      width {
        decimal
        fraction
        inch
        overSize
        round
        underSize
      }
    }
    productID {
      _id
      name
    }
    qty
    rooms
    specs {
      installType
      options
      overSize
      sqft
      trim
    }
    createdAt
    updatedAt
  }
}`
