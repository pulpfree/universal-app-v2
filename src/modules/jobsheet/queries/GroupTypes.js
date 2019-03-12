import gql from 'graphql-tag'

export default gql`
query GroupTypes {
  groupTypes {
    _id
    name
  }
  products @client {
    _id
    name
  }
}`