import gql from 'graphql-tag'

const WINDOW_QUERY = gql`{
  window @client {
    _id
    jobsheetID
    windowID
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
  }
  products @client {
    _id
    name
  }
}`

const GROUP_QUERY = gql`{
  group @client(always: true) {
    id
    groupID
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
      windows
    }
    dims {
      height {
        decimal
        diff
        fraction
        inch
      }
      width {
        decimal
        diff
        fraction
        inch
      }
    }
    items {
      _id
      costs {
        extendUnit
        extendTotal
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
      }
      installType
      options
      sqft
      style
      trim
    }
  }
  # products @client {
  #   _id
  #   name
  # }
}`

const GROUP_WINDOW_QUERY = gql`{
  groupWindow @client {
    _id
    windowID
    costs {
      extendUnit
      extendTotal
    }
    dims {
      height {
        decimal
        fraction
        inch
        overSize
        round
        underSize
      },
      width {
        decimal
        fraction
        inch
        overSize
        round
        underSize
      },
    },
    productID
    product {
      name
    }
    qty
    specs {
      extendSqft
      overSize
      sqft
    }
  }
  products @client {
    _id
    name
  }
}`

const OTHER_QUERY = gql`{
  other @client {
    __typename
    jobsheetID
    otherID
    costs {
      __typename
      extendTotal
      extendUnit
    }
    description
    qty
    rooms
    specs {
      __typename
      options
      location
    }
  }
}`

export {
  GROUP_QUERY,
  GROUP_WINDOW_QUERY,
  OTHER_QUERY,
  WINDOW_QUERY,
}
