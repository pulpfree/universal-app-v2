import gql from 'graphql-tag'

export default gql`
query GetJobSheetData($jobSheetID: ID!) {
  jobSheetData(jobSheetID: $jobSheetID) {
    jobsheet {
      _id
      createdAt
      updatedAt
      features
       addressID {
        _id
        street1
        city
      }
      customerID {
        _id
        name {
          first
          last
          spouse
        }
      }
    }
    windows {
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
      productID
      qty
      rooms
      specs
    }
    groups {
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
      items
      qty
      rooms
      specs
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
      specs
      updatedAt
      createdAt
    }
  }
}
`
