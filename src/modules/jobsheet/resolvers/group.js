import gql from 'graphql-tag'
import ramda from 'ramda'
import { Types } from 'mongoose'

import { JOBSHEET_GROUP } from '../queries'
import { GROUP_QUERY, GROUP_WINDOW_QUERY } from '../queries/local'
import client from '../../../apollo'
import {
  calcGroupCosts,
  calcGroupSizes,
  calcGroupWindowCosts,
  calcSizes,
  callSetSizeCalc,
  execSetSizeCalc,
  validateSizes,
} from '../utils'

const GROUP_ID = '1'
const GROUP_ID_KEY = 'JobSheetGroup:1'
const GROUP_WINDOW_ID_KEY = 'JobSheetGroupItem:1'

export const defaults = {
  group: {
    __typename: 'JobSheetGroup',
    id: GROUP_ID,
    groupID: null,
    jobsheetID: '',
    costs: {
      __typename: 'JobSheetGroupCosts',
      discounted: 0.0,
      extendTotal: 0.0,
      extendUnit: 0.0,
      install: 0.0,
      installType: 0.0,
      netUnit: 0.0,
      options: '',
      trim: '',
      windows: 0.0,
    },
    dims: {
      __typename: 'JobSheetGroupDims',
      height: {
        __typename: 'GroupWindowDims',
        decimal: 0.0,
        diff: 0.0,
        fraction: '',
        inch: 0,
      },
      width: {
        __typename: 'GroupWindowDims',
        decimal: 0.0,
        diff: 0.0,
        fraction: '',
        inch: 0,
      },
    },
    items: {
      __typename: 'JobSheetGroupItem',
      _id: '',
      costs: {
        __typename: 'GroupItemCosts',
        extendUnit: 0.0,
        extendTotal: 0.0,
      },
      dims: {
        __typename: 'GroupItemDims',
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
      product: {
        __typename: 'Product',
        name: '',
      },
      productID: '',
      qty: 1,
      specs: {
        __typename: 'GroupItemSpecs',
        extendSqft: '',
        options: '',
        overSize: '',
        sqft: '',
      },
    },
    qty: 1,
    rooms: [],
    specs: {
      __typename: 'JobSheetGroupSpecs',
      groupTypeDescription: '',
      installType: '',
      options: '',
      sqft: '',
      style: '',
      trim: '',
    },
  },
  groupWindow: {
    __typename: 'JobSheetGroupItem',
    _id: GROUP_ID,
    windowID: null,
    costs: {
      __typename: 'GroupItemCosts',
      extendUnit: 0.0,
      extendTotal: 0.0,
    },
    dims: {
      __typename: 'GroupItemDims',
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
    productID: '',
    product: {
      __typename: 'Product',
      name: '',
    },
    qty: 1,
    specs: {
      __typename: 'GroupItemSpecs',
      extendSqft: '',
      overSize: '',
      sqft: '',
    },
  },
}

export const resolvers = {
  Mutation: {
    setGroupJobSheetID: (_, { jobSheetID }, { cache }) => {
      const id = GROUP_ID_KEY
      const fragment = gql`
      fragment setGroupJobSheetID on JobSheetGroup {
        jobsheetID
      }`
      const data = {
        __typename: 'JobSheetGroup',
        jobsheetID: jobSheetID,
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setGroupField: (_, { field, value }, { cache }) => {
      const id = GROUP_ID_KEY
      let fragment
      let data
      let parts = []
      let isSetSize = false
      let isSetCosts = false

      if (field.indexOf('.') > 0) parts = field.split('.')

      switch (parts.length) {
        case 2:
          fragment = gql`
            fragment ${parts.join('')}Group on JobSheetGroup {
              ${parts[0]} {
                ${parts[1]}
              }
            }`
          break
        case 3:
          fragment = gql`
          fragment ${parts.join('')}Group on JobSheetGroup {
            ${parts[0]} {
              ${parts[1]} {
                ${parts[2]}
              }
            }
          }`
          break
        default:
          fragment = gql`
          fragment ${field}Group on JobSheetGroup {
            ${field}
          }`
          break
      }

      const res = cache.readFragment({ fragment, id })

      switch (parts[0]) {
        case 'dims':
          isSetSize = true
          const typeVal = parts[2] === 'inch' ? Number(value) : value // eslint-disable-line no-case-declarations
          data = {
            ...res,
            dims: {
              __typename: 'JobSheetGroupDims',
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
              __typename: 'JobSheetGroupSpecs',
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
        resolvers.Mutation.setGroupSizes(_, null, { cache })
      }
      if (isSetCosts) {
        resolvers.Mutation.setGroupCosts(_, null, { cache })
      }
      return null
    },
    setGroupSizes: (_, _args, { cache }) => {
      const id = GROUP_ID_KEY
      const fragment = gql`
      fragment groupDims on  JobSheetGroup {
        dims {
          height {
            decimal
            diff
            fraction
            inch
          }
          width {
            decimal
            diff
            fraction
            inch
          }
        }
      }`
      const res = cache.readFragment({ fragment, id })
      const sizes = calcGroupSizes(res.dims)
      if (!sizes) return null

      const { dims } = sizes
      const data = {
        __typename: 'JobSheetGroup',
        dims: {
          __typename: 'JobSheetGroupDims',
          height: {
            __typename: 'GroupWindowDims',
            ...dims.height,
          },
          width: {
            __typename: 'GroupWindowDims',
            ...dims.width,
          },
        },
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setWindowFromGroup: (_, { windowID }, { cache }) => {
      const id = GROUP_WINDOW_ID_KEY
      const res = cache.readQuery({ query: GROUP_QUERY, id: GROUP_ID_KEY })
      const { group: { items } } = res
      const window = items.find(item => (item._id.toString() === windowID))
      const {
        costs,
        dims,
        productID,
        product,
        qty,
        specs,
      } = window

      const data = {
        groupWindow: {
          __typename: 'JobSheetGroupItem',
          _id: GROUP_ID,
          windowID,
          costs: {
            __typename: 'GroupItemCosts',
            ...costs,
          },
          dims: {
            __typename: 'GroupItemDims',
            height: {
              __typename: 'WindowDims',
              ...dims.height,
            },
            width: {
              __typename: 'WindowDims',
              ...dims.width,
            },
          },
          productID: productID.toString(),
          product: {
            __typename: 'Product',
            name: product.name,
          },
          qty,
          specs: {
            __typename: 'GroupItemSpecs',
            ...specs,
          },
        },
      }
      cache.writeData({ data, id })
      return null
    },
    setGroupWindowField: (_, { field, value }, { cache }) => {
      const id = GROUP_WINDOW_ID_KEY
      let fragment
      let data
      let parts = []
      const isSetSize = callSetSizeCalc(field)

      if (field.indexOf('.') > 0) parts = field.split('.')

      switch (parts.length) {
        case 2:
          fragment = gql`
            fragment ${parts.join('')} on JobSheetGroupItem {
              ${parts[0]} {
                ${parts[1]}
              }
            }`
          break
        case 3:
          fragment = gql`
          fragment ${parts.join('')} on JobSheetGroupItem {
            ${parts[0]} {
              ${parts[1]} {
                ${parts[2]}
              }
            }
          }`
          break
        default:
          fragment = gql`
          fragment ${field}Fragment on JobSheetGroupItem {
            ${field}
          }`
          break
      }

      const res = cache.readFragment({ fragment, id })

      switch (parts[0]) {
        case 'dims':
          const typeVal = parts[2] === 'inch' ? Number(value) : value // eslint-disable-line no-case-declarations
          data = {
            ...res,
            dims: {
              __typename: 'GroupItemDims',
              [parts[1]]: {
                __typename: 'WindowDims',
                [parts[2]]: typeVal,
              },
            },
          }
          break
        default:
          data = { ...res, [field]: value }
      }

      cache.writeFragment({ fragment, id, data })
      if (isSetSize) {
        resolvers.Mutation.setGroupWindowDetails(_, null, { cache })
      }
      return null
    },
    setGroupWindowDetails: (_, _args, { cache }) => {
      const id = GROUP_WINDOW_ID_KEY
      const res = cache.readQuery({ query: GROUP_WINDOW_QUERY, id })
      const { groupWindow } = res
      const doCalc = execSetSizeCalc(groupWindow)
      if (!doCalc) return null

      const { productID } = groupWindow
      const product = resolvers.Query.searchProduct(_, { productID }, { cache })

      const newWindow = Object.assign(
        {},
        groupWindow,
        calcSizes(groupWindow),
        { product: { name: product.name } },
      )
      const validWindow = Object.assign(
        {},
        newWindow,
        validateSizes(newWindow, product),
      )
      const retWindow = Object.assign(
        {},
        validWindow,
        { costs: calcGroupWindowCosts(validWindow, product) },
      )

      const fragment = gql`
      fragment windowDims on JobSheetGroupItem {
        costs {
          extendUnit
          extendTotal
        }
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
        product {
          name
        }
        productID
        qty
        specs {
          extendSqft
          overSize
          sqft
        }
      }`

      const data = {
        __typename: 'JobSheetGroupItem',
        _id: GROUP_ID,
        costs: {
          __typename: 'GroupItemCosts',
          ...retWindow.costs,
        },
        dims: {
          __typename: 'JobSheetWindowDims',
          height: {
            __typename: 'WindowDims',
            ...retWindow.dims.height,
          },
          width: {
            __typename: 'WindowDims',
            ...retWindow.dims.width,
          },
        },
        product: {
          __typename: 'Product',
          name: retWindow.product.name,
        },
        productID: retWindow.productID,
        qty: retWindow.qty,
        specs: {
          __typename: 'GroupItemSpecs',
          ...retWindow.specs,
        },
      }

      cache.writeFragment({ fragment, id, data })
      return null
    },
    setGroupCosts: (_, _args, { cache }) => {
      const id = GROUP_ID_KEY
      const COSTS_QUERY = gql` {
        group @client {
          id
          groupID
          jobsheetID
          costs {
            discounted
            extendTotal
            extendUnit
            install
            installType
            netUnit
            options
            trim
            windows
          }
          items {
            costs {
              extendTotal
            },
          }
          qty
        }
      }`
      const res = cache.readQuery({ query: COSTS_QUERY, id })
      const { group } = res
      const costs = calcGroupCosts(group)

      const fragment = gql`
      fragment groupCosts on JobSheetGroup {
        costs {
          discounted
          discountAmount
          extendTotal
          extendUnit
          install
          installType
          netUnit
          options
          trim
          windows
        }
      }`

      const data = {
        __typename: 'JobSheetGroup',
        id: GROUP_ID,
        costs: {
          __typename: 'Costs',
          ...costs,
        },
      }

      cache.writeFragment({ fragment, id, data })
    },
    persistGroupWindow: (_, args, { cache }) => {
      const groupID = GROUP_ID_KEY
      const groupWindowID = GROUP_WINDOW_ID_KEY
      const winRes = cache.readQuery({ query: GROUP_WINDOW_QUERY, id: groupWindowID })
      const { groupWindow } = winRes
      const grpRes = cache.readQuery({ query: GROUP_QUERY, id: groupID })
      const { group } = grpRes
      if (group.items.length === undefined) {
        group.items = []
      }

      if (groupWindow.windowID) {
        // if we have windowID, we're updating existing, else adding new
        const itemIdx = ramda.findIndex(ramda.propEq('_id', groupWindow.windowID))(group.items)
        groupWindow._id = groupWindow.windowID
        delete groupWindow.windowID
        group.items[itemIdx] = groupWindow
      } else {
        groupWindow._id = Types.ObjectId().toHexString()
        group.items.push(groupWindow)
      }

      // set total windows cost
      // we could use setGroupCosts here, but this seems more efficient
      const costs = calcGroupCosts(group)
      group.costs = {
        __typename: 'JobSheetGroupCosts',
        ...costs,
      }
      // update total sqft
      group.specs.sqft = group.items.reduce(
        (accumulator, curVal) => accumulator + curVal.specs.extendSqft,
        0
      )

      cache.writeData({ data: group, id: groupID })
      resolvers.Mutation.clearGroupWindow(_, null, { cache })
      return null
    },
    removeGroupWindow: (_, { windowID }, { cache }) => {
      const groupID = GROUP_ID_KEY
      const grpRes = cache.readQuery({ query: GROUP_QUERY, id: groupID })
      const { group } = grpRes

      // find and remove window from items
      const itemIdx = ramda.findIndex(ramda.propEq('_id', windowID))(group.items)
      group.items.splice(itemIdx, 1)
      // calculate costs
      const costs = calcGroupCosts(group)
      group.costs = {
        __typename: 'JobSheetGroupCosts',
        ...costs,
      }

      // update total sqft
      group.specs.sqft = group.items.reduce(
        (accumulator, curVal) => accumulator + curVal.specs.extendSqft,
        0
      )

      // save everything
      cache.writeData({ data: group, id: groupID })
      resolvers.Mutation.clearGroupWindow(_, null, { cache })

      return null
    },
    setGroupDuplicate: (_, args, { cache }) => {
      const id = GROUP_ID_KEY
      const fragment = gql`
      fragment duplicateGroup on JobSheetGroup {
        groupID
      }`

      const data = {
        __typename: 'JobSheetGroup',
        groupID: null,
      }

      cache.writeFragment({ fragment, id, data })
      return null
    },
    clearGroup: (_, args, { cache }) => {
      const id = GROUP_ID_KEY
      const data = defaults.group
      cache.writeData({ data, id })
      return null
    },
    clearGroupWindow: (_, args, { cache }) => {
      const id = GROUP_WINDOW_ID_KEY
      const data = defaults.groupWindow
      cache.writeData({ data, id })
      return null
    },
    setGroupFromRemote: async (_, { groupID }, { cache }) => {
      const id = GROUP_ID_KEY
      let groupRet
      try {
        groupRet = await client.query({
          query: JOBSHEET_GROUP,
          variables: { groupID },
          fetchPolicy: 'network-only',
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const group = groupRet.data.jobSheetGroup

      const {
        costs,
        dims,
        items,
        specs,
      } = group

      const data = {
        group: {
          __typename: 'JobSheetGroup',
          id: GROUP_ID,
          groupID,
          jobsheetID: group.jobsheetID,
          costs: {
            ...costs,
          },
          dims: {
            ...dims,
          },
          items: [...items],
          qty: group.qty,
          rooms: group.rooms,
          specs: {
            ...specs,
          },
        },
      }
      cache.writeData({ data, id })
      // console.log('data written in setGroupFromRemote:', data)
      return data
    },
  },
  Query: {
    group: (_, _args, { cache }) => {
      const res = cache.readQuery({ query: GROUP_QUERY, id: GROUP_ID_KEY })
      console.log('resolver group query:', res.group) // eslint-disable-line no-console
      return res.group
    },
  },
}

export const typeDefs = `
  type JobSheetGroup {
    _id: ID!
    qty: Int
  }
  type Dims {
    height: Dimension
  }
  type Dimension {
    decimal: Float
    fraction: String
    inch: Int
    overSize: Int
    round: Int
    underSize: Int
  }
`
