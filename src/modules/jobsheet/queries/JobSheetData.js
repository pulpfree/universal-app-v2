import gql from 'graphql-tag'

export default gql`
query JobSheetData($jobSheetID: ID!) {
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
      number
    }
    windows {
      _id
      costs {
        extendTotal
        extendUnit
      }
      dims {
        height {
          fraction
          inch
        }
        width {
          fraction
          inch
        }
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
      dims {
        height {
          fraction
          inch
        }
        width {
          fraction
          inch
        }
      }
      qty
      rooms
      specs {
        groupType {
          _id
          name
        }
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
      specs {
        options
        location
      }
      updatedAt
      createdAt
    }
  }
}`
