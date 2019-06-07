import gql from 'graphql-tag'

export default gql`{
  jobSheet @client {
    id
    jobSheetID
    windows {
      _id
      costs {
        extendTotal
        extendUnit
      }
      productID {
        _id
        name
      }
      qty
      rooms
    }
    groups {
      _id
      costs {
        extendTotal
        extendUnit
      }
      qty
      rooms
      specs {
        groupTypeDescription
      }
    }
    other {
      _id
      costs {
        extendTotal
        extendUnit
      }
      description
      qty
      rooms
    }
  }
}`
