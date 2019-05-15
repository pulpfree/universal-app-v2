import gql from 'graphql-tag'
import ramda from 'ramda'
import { fmtPhone } from '../../../util/fmt'

import { CUSTOMER } from '../queries.local'

const CUSTOMER_ID = '1'
const ADDRESS_ID = '1'
const CUSTOMER_ID_KEY = 'Customer:1'

export const defaults = {
  customer: {
    __typename: 'Customer',
    id: CUSTOMER_ID,
    customerID: '',
    address: {
      __typename: 'Address',
      id: ADDRESS_ID,
      addressID: '',
      city: '',
      postalCode: '',
      provinceCode: 'ON',
      street1: '',
      type: 'res',
    },
    email: '',
    name: {
      __typename: 'CustomerName',
      first: '',
      last: '',
      spouse: '',
    },
    phones: {
      __typename: 'CustomerPhone',
      _id: '',
      countryCode: '',
      number: '',
    },
  },
}

export const resolvers = {
  Mutation: {
    setCustomerField: (_, { field, value }, { cache }) => {
      const id = CUSTOMER_ID_KEY
      let fragment
      let data
      let parts = []

      if (field.indexOf('.') > 0) parts = field.split('.')

      switch (parts.length) {
        case 2:
          fragment = gql`
            fragment ${parts.join('')}field on Customer {
              ${parts[0]} {
                ${parts[1]}
              }
            }`
          break
        default:
          fragment = gql`
          fragment ${field}field on Customer {
            ${field}
          }`
          break
      }

      const res = cache.readFragment({ fragment, id })

      switch (parts[0]) {
        case 'address':
          data = {
            ...res,
            address: {
              __typename: 'Address',
              ...res.address,
              id: ADDRESS_ID,
              [parts[1]]: value,
            },
          }
          break
        case 'name':
          data = {
            ...res,
            name: {
              __typename: 'CustomerName',
              ...res.name,
              [parts[1]]: value,
            },
          }
          break
        default:
          data = { ...res, [field]: value }
      }

      cache.writeFragment({ fragment, id, data })
      return null
    },
    setCustomerPhone: (_, { phoneID, number }, { cache }) => {
      const phone = {
        __typename: 'CustomerPhone',
        _id: phoneID,
        countryCode: 1,
        number: fmtPhone(number),
      }

      const id = CUSTOMER_ID_KEY

      const fragment = gql`
      fragment phonesField on Customer {
        phones {
          _id
          countryCode
          number
        }
      }`
      const res = cache.readFragment({ fragment, id })

      let phones = []
      if (Array.isArray(res.phones)) {
        phones = ramda.clone(res.phones)
        const phoneIdx = ramda.findIndex(ramda.propEq('_id', phoneID))(res.phones)
        if (phoneIdx >= 0) {
          phones[phoneIdx] = phone
        } else {
          phones.push(phone)
        }
      } else {
        phones.push(phone)
      }

      const data = {
        __typename: 'Customer',
        phones,
      }
      cache.writeFragment({ fragment, id, data })
      return null
    },
    setCustomerFromObject: (_, { customer }, { cache }) => {
      // todo: need to do similar with group and window objects
      const previous = cache.readQuery({ query: CUSTOMER })
      const customerClone = ramda.clone(customer)
      const address = ramda.clone(customer.address)
      const addressID = address._id
      delete address._id
      delete customerClone.address
      const customerID = customerClone._id
      delete customerClone._id

      const data = {
        customer: {
          ...previous.customer,
          ...customerClone,
          id: CUSTOMER_ID,
          customerID,
          address: {
            ...previous.customer.address,
            ...address,
            addressID,
          },
        },
      }

      cache.writeData({ data, id: CUSTOMER_ID_KEY })
      return null
    },
    clearCustomer: (_, _args, { cache }) => {
      const id = CUSTOMER_ID_KEY
      const data = defaults.customer
      cache.writeData({ data, id })
      return null
    },
  },
}
