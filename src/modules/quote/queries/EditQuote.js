import gql from 'graphql-tag'

export default gql`
query EditQuoteData($jobSheetID: ID!, $quoteID: ID!) {
  jobSheetData(jobSheetID: $jobSheetID) {
    jobsheet {
      _id
      createdAt
      updatedAt
      features
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
  getQuote(quoteID: $quoteID) {
    __typename
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
    itemSummary {
      group {
        items {
          specs
          qty
          costs {
            extendTotal
            extendUnit
            netUnit
          }
          rooms
        }
        totals {
          extendTotal
        }
      }
      other {
        items {
          description
          specs
          qty
          costs {
            extendTotal
            extendUnit
            netUnit
          }
        }
        totals {
          extendTotal
        }
      }
      window {
        items {
          specs
          qty
          costs {
            extendTotal
            extendUnit
            netUnit
          }
          rooms
        }
        totals {
          extendTotal
        }
      }
    }
    quotePrice {
      outstanding
      payments
      subtotal
      tax
      total
    }
    createdAt
    updatedAt
  }
}
`
