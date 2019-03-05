import gql from 'graphql-tag'

export default gql`
query($year: String, $invoiced: Boolean, $closed: Boolean) {
  searchQuotes(year: $year, invoiced: $invoiced, closed: $closed) {
    totalInvoiced
    totalOutstanding
    quotes {
      __typename
      _id
      number
      version
      closed
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
        features
      }
      quotePrice {
        outstanding
        total
      }
      createdAt
      updatedAt
    }
  }
}
`
