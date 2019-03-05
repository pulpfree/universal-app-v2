import gql from 'graphql-tag'

export default gql`
query JobSheetWindowWithProducts($windowID: ID!) {
  jobSheetWindowWithProducts(windowID: $windowID) {
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
  # products {
  #   _id
  #   maxHeight
  #   maxWidth
  #   minHeight
  #   minWidth
  #   name
  #   premium {
  #     cost
  #     oversizeLimit
  #   }
  #   sizeCost
  # }
}`
