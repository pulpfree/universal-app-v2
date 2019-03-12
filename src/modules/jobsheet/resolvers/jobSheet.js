import gql from 'graphql-tag'
import { PRODUCTS } from '../queries'
import client from '../../../apollo'

export const defaults = {
  jobSheet: {
    __typename: 'JobSheet',
    _id: 'new2',
  },
  products: {
    __typename: 'Product',
    _id: '',
    name: '',
  },
}

export const typeDefs = `
  type JobSheet {
    _id: ID
  }
`

export const resolvers = {
  Mutation: {
    createJobSheet: (_, { id }, { cache }) => {
      const data = {
        jobSheet: {
          __typename: 'JobSheet',
          _id: id,
        },
      }
      cache.writeData({ data })
      return null
    },
    setProductsFromRemote: async (_, _args, { cache }) => {
      const id = 'Products:1'

      // Check if products is already cached, if not proceed
      const prodQuery = gql`{
        products @client {
          _id
          name
        }
      }`
      const res = cache.readQuery({ query: prodQuery, id })
      if (res.products && res.products.length) return null

      // console.log('products remote query -- should only ever be loading this only once !!!')
      const query = PRODUCTS
      let productRet
      try {
        productRet = await client.query({
          query,
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const { data } = productRet
      cache.writeData({ data, id })
      return null
    },
  },
}
