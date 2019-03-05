import gql from 'graphql-tag'

export default gql`
query jobSheetGroup($groupID: ID!) {
  jobSheetGroup(groupID: $groupID) {
    _id
    jobsheetID
    costs {
      __typename
      discounted
      extendTotal
      extendUnit
      install
      installType
      netUnit
      options
      trim
      windows
    }
    dims {
      __typename
      height {
        __typename
        decimal
        diff
        fraction
        inch
      }
      width {
        __typename
        decimal
        diff
        fraction
        inch
      }
    }
    items {
      __typename
      _id
      costs {
        __typename
        extendUnit
        extendTotal
      }
      dims {
        __typename
        height {
          __typename
          decimal
          fraction
          inch
          overSize
          round
          underSize
        }
        width {
          __typename
          decimal
          fraction
          inch
          overSize
          round
          underSize
        }
      }
      product {
        name
      }
      productID
      qty
      specs {
        extendSqft
        overSize
        sqft
      }
    }
    qty
    rooms
    specs {
      groupID
      groupType {
        _id
        name
      }
      installType
      options
      sqft
      style
      trim
    }
    createdAt
    updatedAt
  }
}
`
