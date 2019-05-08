import gql from 'graphql-tag'

export default gql`
query QuoteJobSheet($jobSheetID: ID!, $quoteID: ID!) {
  jobSheetData(jobSheetID: $jobSheetID) {
    jobsheet {
      _id
      features
    }
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
  quote(quoteID: $quoteID) {
    _id
    number
    version
    invoiced
    closed
    pdfCreated
    customerID {
      _id
      name {
        first
        last
      }
    }
    jobsheetID {
      _id
      addressID {
        _id
        street1
        city
      }
    }
    discount {
      description
      discount
      subtotal
      tax
      total
    }
    items {
      group
      other
      window
    }
    itemCosts {
      group
      other
      subtotal
      window
    }
    quotePrice {
      outstanding
      payments
      subtotal
      tax
      total
    }
  }
}`
