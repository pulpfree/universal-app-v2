import gql from 'graphql-tag'

export default gql`
query Products {
  products {
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
