import gql from 'graphql-tag'

export default gql`
query GroupTypes {
  groupTypes {
    _id
    name
  }
  products {
    _id
    name
  }
}`
