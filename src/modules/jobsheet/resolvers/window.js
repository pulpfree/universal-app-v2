import gql from 'graphql-tag'

import { JOBSHEET_WINDOW, PRODUCTS } from '../queries'
// import client from '../../../apollo'
import {
  calcSizes,
  calcCosts,
  callSetSizeCalc,
  execSetSizeCalc,
  parseJson,
  validateSizes,
} from '../utils'

const WINDOW_ID = '1'
const WINDOW_ID_KEY = 'Window:1'

export const defaults = {
  windowRooms: {
    __typename: 'Window',
    rooms: [],
  },
  window: {
    __typename: 'Window',
    _id: WINDOW_ID,
    jobsheetID: '',
    windowID: null,
    costs: {
      __typename: 'JobSheetItemCosts',
      discounted: 0.0,
      extendTotal: 0.0,
      extendUnit: 0.0,
      install: 0.0,
      installType: 0.0,
      netUnit: 0.0,
      options: '',
      trim: '',
      window: 0.0,
    },
    dims: {
      __typename: 'JobSheetWindowDims',
      height: {
        __typename: 'WindowDims',
        decimal: '',
        fraction: '',
        inch: '',
        overSize: '',
        round: '',
        underSize: '',
      },
      width: {
        __typename: 'WindowDims',
        decimal: '',
        fraction: '',
        inch: '',
        overSize: '',
        round: '',
        underSize: '',
      },
    },
    productID: {
      __typename: 'Product',
      _id: '',
      name: '',
    },
    qty: 1,
    rooms: [],
    specs: {
      __typename: 'Specs',
      installType: '',
      options: '',
      overSize: '',
      sqft: '',
      trim: '',
    },
  },
  // products: [],
}

export const resolvers = {
  Mutation: {
    setJobSheetID: (_, { jobSheetID }, { cache }) => {
      const id = WINDOW_ID_KEY
      const fragment = gql`
      fragment setField on Window {
        jobsheetID
      }`
      const data = {
        __typename: 'Window',
        jobsheetID: jobSheetID,
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setField: (_, { field, value }, { cache }) => {
      const id = WINDOW_ID_KEY
      let fragment
      let fragName = ''
      let data
      let parts = []
      const isSetSize = callSetSizeCalc(field)
      let isSetCosts = false

      if (field.indexOf('.') > 0) parts = field.split('.')

      switch (parts[0]) {
        case 'costs':
        case 'productID':
        case 'specs':
          fragName = `setMisc${parts[0]}Field` // eslint-disable-line no-case-declarations
          fragment = gql`
          fragment ${fragName} on Window {
            ${parts[0]} {
              ${parts[1]}
            }
          }`
          break
        case 'dims':
          fragName = `setDim${parts[1]}${parts[2]}Field` // eslint-disable-line no-case-declarations
          fragment = gql`
          fragment ${fragName} on Window {
            ${parts[0]} {
              ${parts[1]} {
                ${parts[2]}
              }
            }
          }`
          break
        default:
          fragment = gql`
          fragment setWindowField on Window {
            ${field}
          }`
      }

      const res = cache.readFragment({ fragment, id })
      const typeVal = parts[2] === 'inch' ? Number(value) : value

      switch (parts[0]) {
        case 'productID':
          data = {
            ...res,
            productID: {
              __typename: 'Product',
              _id: value,
            },
          }
          break
        case 'dims':
          data = {
            ...res,
            dims: {
              __typename: 'JobSheetWindowDims',
              [parts[1]]: {
                __typename: 'WindowDims',
                [parts[2]]: typeVal,
              },
            },
          }
          break
        case 'specs':
          data = {
            ...res,
            specs: {
              ...res.specs,
              [parts[1]]: value,
            },
          }
          break
        case 'costs':
          isSetCosts = true
          data = {
            ...res,
            costs: {
              ...res.costs,
              [parts[1]]: parseFloat(value),
            },
          }
          break
        default:
          data = { ...res, [field]: value }
      }

      cache.writeFragment({ fragment, id, data })

      if (isSetSize) {
        resolvers.Mutation.setSizes(_, null, { cache })
      }
      if (isSetCosts) {
        resolvers.Mutation.setCosts(_, null, { cache })
      }
      return null
    },
    setSizes: (_, _args, { cache }) => {
      const id = WINDOW_ID_KEY
      const WINDOW_QUERY = gql`{
        window @client {
          dims {
            height {
              decimal
              fraction
              inch
              overSize
              round
              underSize
            }
            width {
              decimal
              fraction
              inch
              overSize
              round
              underSize
            }
          }
          productID {
            _id
          }
          qty
          specs {
            sqft
          }
        }
      }`
      const res = cache.readQuery({ query: WINDOW_QUERY, id })
      const { window } = res
      const doCalc = execSetSizeCalc(window)
      if (!doCalc) return null

      const newWindow = calcSizes(window)
      const productID = window.productID._id
      const product = resolvers.Query.searchProduct(_, { productID }, { cache })
      const validWindow = validateSizes(newWindow, product)

      const fragment = gql`
      fragment windowDims on Window {
        dims {
          height {
            decimal
            fraction
            inch
            overSize
            round
            underSize
          }
          width {
            decimal
            fraction
            inch
            overSize
            round
            underSize
          }
        }
        specs {
          extendSqft
          overSize
          sqft
        }
      }`

      const data = {
        __typename: 'Window',
        _id: WINDOW_ID,
        dims: {
          __typename: 'JobSheetWindowDims',
          height: {
            __typename: 'WindowDims',
            ...validWindow.dims.height,
          },
          width: {
            __typename: 'WindowDims',
            ...validWindow.dims.width,
          },
        },
        specs: {
          __typename: 'Specs',
          ...validWindow.specs,
        },
      }

      cache.writeFragment({ fragment, id, data })
      // at this point, we should have enough data to calculate the window cost
      resolvers.Mutation.setCosts(_, null, { cache })
      return null
    },
    setCosts: (_, args, { cache }) => {
      const id = WINDOW_ID_KEY
      const WINDOW_QUERY = gql`{
        window @client {
          costs {
            discounted
            extendTotal
            extendUnit
            install
            installType
            netUnit
            options
            trim
            window
          }
          productID {
            _id
          }
          qty
          specs {
            extendSqft
            overSize
            sqft
          }
        }
      }`
      const res = cache.readQuery({ query: WINDOW_QUERY, id })
      const { window } = res
      const productID = window.productID._id
      const product = resolvers.Query.searchProduct(_, { productID }, { cache })
      const costs = calcCosts(window, product)

      const fragment = gql`
      fragment windowCosts on Window {
        costs {
          discounted
          extendTotal
          extendUnit
          install
          installType
          netUnit
          options
          trim
          window
        }
      }`

      const data = {
        __typename: 'Window',
        _id: WINDOW_ID,
        costs: {
          __typename: 'Costs',
          ...costs,
        },
      }

      cache.writeFragment({ fragment, id, data })
    },
    setWindowFromRemote: async (_, { windowID }, { cache, client }) => {
      console.log('clien:', client)
      const id = WINDOW_ID_KEY
      let windowRet
      try {
        windowRet = await client.query({
          query: JOBSHEET_WINDOW,
          variables: { windowID },
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const window = windowRet.data.jobSheetWindow
      const {
        costs,
        dims,
        productID,
        specs,
      } = window

      const data = {
        window: {
          __typename: 'Window',
          _id: WINDOW_ID,
          windowID,
          jobsheetID: window.jobsheetID,
          costs: {
            __typename: 'JobSheetItemCosts',
            ...costs,
          },
          dims: {
            __typename: 'JobSheetWindowDims',
            height: {
              __typename: 'WindowDims',
              ...dims.height,
            },
            width: {
              __typename: 'WindowDims',
              ...dims.width,
            },
          },
          qty: window.qty,
          rooms: window.rooms,
          productID: {
            __typename: 'Product',
            ...productID,
          },
          specs: {
            __typename: 'Specs',
            ...specs,
          },
        },
      }
      cache.writeData({ data, id })
      return data
    },
    setDuplicate: (_, args, { cache }) => {
      const id = WINDOW_ID_KEY
      const fragment = gql`
      fragment duplicateWindow on Window {
        windowID
      }`

      const data = {
        __typename: 'Window',
        windowID: null,
      }

      cache.writeFragment({ fragment, id, data })
      return null
    },
    clearWindow: (_, { windowID }, { cache }) => { // eslint-disable-line no-unused-vars
      const id = WINDOW_ID_KEY
      const data = defaults.window
      cache.writeData({ data, id })
      return null
    },
    clearProducts: (_, args, { cache }) => { // eslint-disable-line
      // todo: this may not be working because we have no id... whew!
      // const data = { products: null }
      // cache.writeData({ data })
    },
  },
  Query: {
    products: async (_, _args, { cache, client }) => {
      const id = 'Products:1'
      // console.log('products local query -- should be loading this once')

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
      return data.products
    },
    searchProduct: (_, { productID }, { cache }) => {
      const query = PRODUCTS
      const pd = cache.readQuery({ query })
      const product = pd.products.find(p => (p._id === productID))
      product.sizeCost = parseJson(product.sizeCost)
      return product
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
