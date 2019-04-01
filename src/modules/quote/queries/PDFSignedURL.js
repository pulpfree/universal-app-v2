import gql from 'graphql-tag'

export default gql`
query pdfSignedURL($input: SignedURLInput!) {
  pdfSignedURL(input: $input) {
    code
    data {
      url
    }
    message
    status
    timestamp
  }
}`
