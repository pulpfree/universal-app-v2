import gql from 'graphql-tag'
import ramda from 'ramda'

import { QUOTE_JOBSHEET } from '../queries.remote'
import { JOBSHEET as JOBSHEET_LOCAL, QUOTE_JOBSHEET as QUOTE_JS_LOCAL } from '../queries.local'
import client from '../../../apollo'
import constants from '../config/constants'

const QUOTE_ID = '1'
const QUOTE_ID_KEY = 'Quote:1'
// const JOBSHEET_ID_KEY = 'JobSheetData:1'

export const defaults = {
  quote: {
    __typename: 'Quote',
    quoteID: '',
    id: QUOTE_ID,
    closed: false,
    invoiced: false,
    number: '',
    customerID: {
      __typename: 'Customer',
      _id: '',
      name: {
        __typename: 'CustomerName',
        first: '',
        last: '',
      },
    },
    jobsheetID: {
      __typename: 'JobSheet',
      _id: '',
      addressID: {
        __typename: 'Address',
        street1: '',
        city: '',
        location: {
          __typename: 'Location',
          coordinates: [],
        },
      },
    },
    discount: {
      __typename: 'QuoteDiscount',
      description: '',
      discount: '',
      subtotal: '',
      tax: '',
      total: '',
    },
    items: {
      __typename: 'QuoteItems',
      group: [],
      other: [],
      window: [],
    },
    itemCosts: {
      __typename: 'QuoteItemCosts',
      group: '',
      other: '',
      subtotal: '',
      window: '',
    },
    quotePrice: {
      __typename: 'QuotePrice',
      outstanding: '',
      payments: '',
      subtotal: '',
      tax: '',
      total: '',
    },
  },
  jobSheet: {
    __typename: 'JobSheetData',
    id: QUOTE_ID,
    jobSheetID: '',
    jobsheet: {
      __typename: 'JobSheet',
      _id: '',
      features: '',
    },
    groups: {
      __typename: 'JobSheetGroup',
      _id: '',
      costs: {
        __typename: 'JobSheetGroupCosts',
        extendTotal: '',
        extendUnit: '',
      },
      qty: '',
      rooms: [],
      specs: {
        __typename: 'JobSheetGroupSpecs',
        groupTypeDescription: '',
      },
    },
    other: {
      __typename: 'JobSheetOther',
      _id: '',
      costs: {
        __typename: 'OtherCosts',
        extendTotal: '',
        extendUnit: '',
      },
      description: '',
      qty: '',
      rooms: [],
    },
    windows: {
      __typename: 'JobSheetWindow',
      _id: '',
      costs: {
        __typename: 'JobSheetItemCosts',
        extendTotal: '',
        extendUnit: '',
      },
      productID: {
        __typename: 'Product',
        _id: '',
        name: '',
      },
      qty: 5,
      rooms: [],
    },
  },
}

export const resolvers = {
  Mutation: {
    setQuoteFromRemote: async (_, { jobSheetID, quoteID }, { cache }) => {
      const id = QUOTE_ID_KEY
      let queryRet
      try {
        queryRet = await client.query({
          query: QUOTE_JOBSHEET,
          variables: { jobSheetID, quoteID },
          fetchPolicy: 'network-only',
        })
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        return null
      }
      const { jobSheetData: jobSheet, quote } = queryRet.data

      const data = {
        quote: {
          id: QUOTE_ID,
          quoteID,
          ...quote,
        },
        jobSheet: {
          __typename: 'JobSheetData',
          id: QUOTE_ID,
          jobSheetID,
          ...jobSheet,
        },
      }
      cache.writeData({ data, id })
      return null
    },
    toggleQuoteItem: (_, { itemID, itemType }, { cache }) => {
      const id = QUOTE_ID_KEY
      const fragment = gql`
      fragment ${itemType}Toggle on Quote {
        items {
          ${itemType}
        }
      }`

      const res = cache.readFragment({ fragment, id })

      const itemIdx = ramda.indexOf(itemID, res.items[itemType])
      const items = res.items[itemType]
      if (itemIdx === -1) {
        items.push(itemID)
      } else if (itemIdx >= 0) {
        items.splice(itemIdx, 1)
      }

      const data = {
        ...res,
        items: {
          __typename: 'QuoteItems',
          [itemType]: items,
        },
      }

      cache.writeFragment({ fragment, id, data })
      // now recalculate quote
      resolvers.Mutation.calculateQuote(_, null, { cache })
      return null
    },
    toggleQuoteAll: (_, { toggleAll }, { cache }) => {
      const id = QUOTE_ID_KEY

      // fetch jobsheet
      const jsRes = cache.readQuery({ query: JOBSHEET_LOCAL })

      // extract all items
      const jsGroups = toggleAll ? jsRes.jobSheet.groups.map(w => w._id) : []
      const jsOther = toggleAll ? jsRes.jobSheet.other.map(w => w._id) : []
      const jsWins = toggleAll ? jsRes.jobSheet.windows.map(w => w._id) : []

      const fragment = gql`
      fragment QuoteItemToggle on Quote {
        items {
          group
          other
          window
        }
      }`
      const quoteRes = cache.readFragment({ fragment, id })

      const data = {
        ...quoteRes,
        items: {
          __typename: 'QuoteItems',
          group: jsGroups,
          other: jsOther,
          window: jsWins,
        },
      }
      cache.writeFragment({ fragment, id, data })
      // now recalculate quote
      resolvers.Mutation.calculateQuote(_, null, { cache })
      return null
    },
    calculateQuote: (_, _args, { cache }) => {
      const id = QUOTE_ID_KEY

      const taxMultiplier = parseFloat(constants.HST / 100)
      const taxDivisor = parseFloat(1 + taxMultiplier)

      // fetch jobsheetQuote
      const res = cache.readQuery({ query: QUOTE_JS_LOCAL, id })

      const quoteWins = res.quote.items.window
      const quoteGroups = res.quote.items.group
      const quoteOther = res.quote.items.other

      const windowCost = res.jobSheet.windows.reduce(
        (accum, curVal) => (
          quoteWins.includes(curVal._id) ? (accum + curVal.costs.extendTotal) : (accum + 0)
        ), 0.00
      )
      const groupCost = res.jobSheet.groups.reduce(
        (accum, curVal) => (
          quoteGroups.includes(curVal._id) ? (accum + curVal.costs.extendTotal) : (accum + 0)
        ), 0.00
      )
      const otherCost = res.jobSheet.other.reduce(
        (accum, curVal) => (
          quoteOther.includes(curVal._id) ? (accum + curVal.costs.extendTotal) : (accum + 0)
        ), 0.00
      )
      const totalItems = parseFloat(groupCost + otherCost + windowCost)
      const subtotal = parseFloat(totalItems / taxDivisor)
      const tax = totalItems - subtotal

      const fragment = gql`
      fragment quoteCosts on Quote {
        discount {
          description
          discount
          subtotal
          tax
          total
        },
        itemCosts {
          group
          other
          window
          subtotal
        }
        quotePrice {
          subtotal
          tax
          total
        }
      }`

      const fragRes = cache.readFragment({ fragment, id })

      // we reset the discount since total has changed and wouldn't typically apply
      const data = {
        ...fragRes,
        discount: {
          __typename: 'QuoteDiscount',
          description: '',
          discount: 0.00,
          subtotal: 0.00,
          tax: 0.00,
          total: 0.00,
        },
        itemCosts: {
          __typename: 'QuoteItemCosts',
          group: groupCost,
          other: otherCost,
          window: windowCost,
          subtotal: totalItems,
        },
        quotePrice: {
          __typename: 'QuotePrice',
          subtotal,
          tax,
          total: totalItems,
        },
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setQuoteDiscount: (_, { discount, description }, { cache }) => {
      const id = QUOTE_ID_KEY
      const taxMultiplier = parseFloat(constants.HST / 100)
      const taxDivisor = parseFloat(1 + taxMultiplier)

      const fragment = gql`
      fragment quoteCosts on Quote {
        discount {
          description
          discount
          subtotal
          tax
          total
        }
        quotePrice {
          subtotal
          tax
          total
        }
        itemCosts {
          subtotal
        }
      }`
      const fragRes = cache.readFragment({ fragment, id })

      const total = parseFloat(discount)
      const subtotal = parseFloat(total / taxDivisor)
      const tax = parseFloat(total - subtotal)
      const discountAmount = fragRes.itemCosts.subtotal - total

      const data = {
        ...fragRes,
        discount: {
          __typename: 'QuoteDiscount',
          description,
          discount: discountAmount,
          subtotal,
          tax,
          total,
        },
        quotePrice: {
          __typename: 'QuotePrice',
          subtotal,
          tax,
          total,
        },
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
  },
  Query: {},
}
