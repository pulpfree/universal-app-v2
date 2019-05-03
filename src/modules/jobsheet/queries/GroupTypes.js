import gql from 'graphql-tag'

export default gql`
query GroupTypes {
  groupTypes {
    _id
    name
  }
  products {
    __typename
    _id
    maxHeight
    maxWidth
    minHeight
    minWidth
    name
    premium {
      cost
      oversizeLimit
    }
    sizeCost
  }
}`
