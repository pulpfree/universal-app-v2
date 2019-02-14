import gql from 'graphql-tag'

import JobSheetWindow from '../queries/JobSheetWindow'
import JobSheetWindowWithProducts from '../queries/JobSheetWindowWithProducts'
import client from '../../../apollo'

export const defaults = {
  windowRooms: {
    __typename: 'Window',
    rooms: [],
  },
  window: {
    __typename: 'Window',
    _id: 'newid',
    costs: {
      __typename: 'JobSheetItemCosts',
      extendTotal: 0.0,
    },
    qty: 1,
    productID: {
      __typename: 'Product',
      _id: '',
      name: '',
    },
    rooms: [],
    specs: {
      __typename: 'Specs',
      installType: '',
    },
  },
}

export const resolvers = {
  Mutation: {
    /* createWindow: (_, variables, { cache }) => {
      return null
    }, */
    addWindowRooms: (_, { rooms, windowID }, { cache, getCacheKey }) => {
      // const id = `Window:${windowID}`
      const id = 'Window:newid'
      const fragment = gql`
        fragment newRooms on Window {
          rooms
        }
      `
      const rms = cache.readFragment({ fragment, id })
      const data = { ...rms, rooms }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setWindowFromRemote: async (_, { windowID }, { cache, getCacheKey }) => {
      // const id = `Window:${windowID}`
      const id = 'Window:newid'
      // const id = getCacheKey({ __typename: 'Window', id: windowID })
      let windowRet
      try {
        windowRet = await client.query({
          query: JobSheetWindow,
          variables: { windowID },
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const window = windowRet.data.jobSheetWindow
      const specs = JSON.parse(window.specs)
      const data = {
        window: {
          __typename: 'Window',
          // _id: window._id,
          _id: 'newid',
          costs: {
            __typename: 'JobSheetItemCosts',
            extendTotal: window.costs.extendTotal,
          },
          qty: window.qty,
          rooms: window.rooms,
          productID: {
            __typename: 'Product',
            _id: window.productID._id,
            name: window.productID.name,
          },
          specs: {
            __typename: 'Specs',
            installType: specs.installType,
          },
        },
      }

      cache.writeData({ data, id })
      return data
    },
  },
  Query: {
    setWindowFromRemote: async (_, { windowID }) => {
      let windowRet
      try {
        windowRet = await client.query({
          query: JobSheetWindowWithProducts,
          variables: { windowID },
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const win = windowRet.data.jobSheetWindow
      const specs = JSON.parse(win.specs)
      // todo: here we need to write this to the 'window' default as
      // in the 'addWindowRooms' method above
      return {
        __typename: 'Window',
        _id: win._id,
        qty: win.qty,
        rooms: win.rooms,
        productID: {
          __typename: 'Product',
          // _id: win.productID._id,
          ...win.productID,
        },
        specs: {
          __typename: 'Specs',
          installType: specs.installType,
        },
        products: windowRet.data.products,
      }
    },
  },
}

export const typeDefs = `
  type Window {
    productID: Product
    costs: Costs
    dims: Dims
    qty: Int
    rooms: [String]
    specs: Specs
  }
  type Costs {
    extendTotal: Float
    extendUnit: Float
    install: Float
    installType: Float
    netUnit: Float
    options: Float
    trim: Float
    window: Float
  }
  type Dims {
    height: Dimension
    width: Dimension
  }
  type Dimension {
    decimal: Float
    fraction: String
    inch: Int
    overSize: Int
    round: Int
    underSize: Int
  }
  type Product {
    _id: ID
    name: String
  }
  type Specs {
    installType: String
    options: String
    overSize: Int
    sqft: Int
    trim: String
  }
`

const ADD_ROOMS = gql`
mutation AddRooms($rooms: [String]) {
  addWindowRooms(rooms: $rooms) @client {
    rooms
  }
}
`
