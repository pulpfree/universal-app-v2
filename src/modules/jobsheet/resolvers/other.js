import gql from 'graphql-tag'

import { JOBSHEET_OTHER } from '../queries'
import client from '../../../apollo'

const OTHER_ID = '1'
const OTHER_ID_KEY = 'JobSheetOther:1'

export const defaults = {
  other: {
    __typename: 'JobSheetOther',
    _id: OTHER_ID,
    jobsheetID: '',
    otherID: null,
    costs: {
      __typename: 'OtherCosts',
      extendTotal: '',
      extendUnit: '',
    },
    description: '',
    product: '',
    qty: 1,
    rooms: [],
    specs: {
      __typename: 'OtherSpecs',
      options: '',
      location: '',
    },
  },
}

export const resolvers = {
  Mutation: {
    setOtherField: (_, { field, value }, { cache }) => {
      const id = OTHER_ID_KEY
      let fragment
      let data
      let parts = []
      let isSetCosts = false

      if (field.indexOf('.') > 0) parts = field.split('.')

      switch (parts.length) {
        case 2:
          fragment = gql`
            fragment ${parts.join('')}Other on JobSheetOther {
              ${parts[0]} {
                ${parts[1]}
              }
            }`
          break
        default:
          fragment = gql`
          fragment ${field}Other on JobSheetOther {
            ${field}
          }`
          break
      }

      const res = cache.readFragment({ fragment, id })

      if (field === 'qty') isSetCosts = true
      switch (parts[0]) {
        case 'specs':
          data = {
            ...res,
            specs: {
              __typename: 'OtherSpecs',
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
      if (isSetCosts) {
        resolvers.Mutation.setOtherCosts(_, null, { cache })
      }
      return null
    },
    setOtherCosts: (_, _args, { cache }) => {
      const id = OTHER_ID_KEY
      const COSTS_QUERY = gql`{
        other @client {
          costs {
            extendTotal
            extendUnit
          }
          qty
        }
      }`
      const res = cache.readQuery({ query: COSTS_QUERY, id })
      const { other } = res
      const extendTotal = parseFloat(other.qty * other.costs.extendUnit)

      const fragment = gql`
      fragment otherCosts on JobSheetOther {
        costs {
          extendTotal
        }
      }`

      const data = {
        __typename: 'JobSheetOther',
        _id: OTHER_ID,
        costs: {
          __typename: 'OtherCosts',
          extendTotal,
        },
      }

      cache.writeFragment({ fragment, id, data })
    },
    setOtherJobSheetID: (_, { jobSheetID }, { cache }) => {
      const id = OTHER_ID_KEY
      const fragment = gql`
      fragment setOtherJobSheetID on JobSheetOther {
        jobsheetID
      }`
      const data = {
        __typename: 'JobSheetOther',
        jobsheetID: jobSheetID,
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    clearOther: (_, args, { cache }) => {
      const id = OTHER_ID_KEY
      const data = defaults.other
      cache.writeData({ data, id })
      return null
    },
    setOtherFromRemote: async (_, { otherID }, { cache }) => {
      const id = OTHER_ID_KEY
      let otherRet
      try {
        otherRet = await client.query({
          query: JOBSHEET_OTHER,
          variables: { otherID },
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const other = otherRet.data.jobSheetOther

      const data = {
        other: {
          id: OTHER_ID,
          otherID,
          ...other,
        },
      }

      cache.writeData({ data, id })
      return null
    },
  },
  Query: {
  },
}
