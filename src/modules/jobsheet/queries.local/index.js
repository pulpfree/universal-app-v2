import gql from 'graphql-tag'

export const WINDOW = gql`
query GetWindow {
  window @client {
    windowID
    jobsheetID
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
  }
}`

export const SOME = gql`
{
  test @client
}`
